import { NextRequest, NextResponse } from "next/server";
import { UserRole, getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from "./lib/authUtils";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpired, isTokenExpiringSoon } from "./lib/tokenUtils";

type RefreshedTokens = { accessToken: string; refreshToken: string; token: string };

function applyTokensToResponse(response: NextResponse, tokens: RefreshedTokens | null) {
    if (tokens) {
        if (tokens.accessToken) {
            response.cookies.set("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
            });
        }
        if (tokens.refreshToken) {
            response.cookies.set("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
            });
        }
        if (tokens.token) {
            response.cookies.set("better-auth.session_token", tokens.token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24,
            });
        }
    }
    return response;
}

export async function proxy(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;

        let accessToken = request.cookies.get("accessToken")?.value;
        const refreshToken = request.cookies.get("refreshToken")?.value;

        let refreshedTokens: RefreshedTokens | null = null;

        const isExpiringSoon = accessToken ? await isTokenExpiringSoon(accessToken) : false;
        const isExpired = accessToken ? await isTokenExpired(accessToken) : false;

        //* Proactively refresh token if refresh token exists and access token is expired or about to expire
        if (accessToken && refreshToken && (isExpired || isExpiringSoon)) {
            try {
                const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `refreshToken=${refreshToken}`,
                    },
                });

                if (res.ok) {
                    const { data } = await res.json();
                    refreshedTokens = data;
                    if (data.accessToken) {
                        accessToken = data.accessToken;
                        // Also update request headers so `getUserInfo` inside middleware sees the new token
                        request.cookies.set("accessToken", data.accessToken);
                    }
                }
            } catch (error) {
                console.error("Error refreshing token in middleware fetch:", error);
            }
        }

        const decodedAccessToken =
            accessToken &&
            jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string).data;

        const isValidAccessToken =
            accessToken &&
            jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string)
                .success;

        let userRole: UserRole | null = null;

        if (decodedAccessToken) {
            userRole = decodedAccessToken.role;
        }

        const routeOwner = getRouteOwner(pathname);

        const unifySuperAdminAndAdmin = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;

        userRole = unifySuperAdminAndAdmin;

        const isAuth = isAuthRoute(pathname);

        //* Rule - 1: If User logged in and trying to access auth route
        if (isAuth && isValidAccessToken) {
            return applyTokensToResponse(
                NextResponse.redirect(
                    new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
                ),
                refreshedTokens
            );
        }

        //* Rule - 2: If User logged in and trying to access reset-password route
        if (pathname === "/reset-password") {
            const email = request.nextUrl.searchParams.get("email");

            //* Case - 1: User has needPasswordChange true
            if (accessToken && email) {
                // Fetch user info directly here to avoid external auth.services Server Action edge runtime issues
                let needPasswordChange = false;
                try {
                    const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                    const res = await fetch(`${BASE_API_URL}/auth/me`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Cookie: `accessToken=${accessToken}`,
                        },
                    });
                    if (res.ok) {
                        const { data } = await res.json();
                        needPasswordChange = data.needPasswordChange;
                    }
                } catch (e) {
                    console.error("Error fetching user info:", e);
                }

                if (needPasswordChange) {
                    return applyTokensToResponse(NextResponse.next(), refreshedTokens);
                } else {
                    return applyTokensToResponse(
                        NextResponse.redirect(
                            new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
                        ),
                        refreshedTokens
                    );
                }
            }

            //* Case - 2: User coming from forgot-password route
            if (email) {
                return applyTokensToResponse(NextResponse.next(), refreshedTokens);
            }

            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return applyTokensToResponse(NextResponse.redirect(loginUrl), refreshedTokens);
        }

        //* Rule - 3: User trying to access public route
        if (routeOwner === null) {
            return applyTokensToResponse(NextResponse.next(), refreshedTokens);
        }

        //* Rule - 4: User is not logged in but trying to access protected route
        if (!accessToken || !isValidAccessToken) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return applyTokensToResponse(NextResponse.redirect(loginUrl), refreshedTokens);
        }

        //* Rule - 5: Enforing user to stay in the reset-password route | verify email if their needPasswordChange is true
        if (accessToken) {
            let userInfo = null;
            try {
                const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                const res = await fetch(`${BASE_API_URL}/auth/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `accessToken=${accessToken}`,
                    },
                });
                if (res.ok) {
                    const { data } = await res.json();
                    userInfo = data;
                }
            } catch (e) {
                console.error("Error fetching user info in Rule 5:", e);
            }

            //* Case - 1: need Email Verification
            if (userInfo && userInfo.emailVerified === false) {
                if (pathname !== "/verify-email") {
                    const verifyEmailUrl = new URL("/verify-email", request.url);
                    verifyEmailUrl.searchParams.set("email", userInfo.email);
                    return applyTokensToResponse(
                        NextResponse.redirect(verifyEmailUrl),
                        refreshedTokens
                    );
                }
                return applyTokensToResponse(NextResponse.next(), refreshedTokens);
            }

            //* Case - 2: User has verified email but trying to access verify-email route
            if (userInfo && userInfo.emailVerified && pathname === "/verify-email") {
                return applyTokensToResponse(
                    NextResponse.redirect(
                        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
                    ),
                    refreshedTokens
                );
            }

            //* Case - 3: User has needPasswordChange true
            if (userInfo && userInfo.needPasswordChange) {
                if (pathname !== "/reset-password") {
                    const resetPasswordUrl = new URL("/reset-password", request.url);
                    resetPasswordUrl.searchParams.set("email", userInfo.email);
                    return applyTokensToResponse(
                        NextResponse.redirect(resetPasswordUrl),
                        refreshedTokens
                    );
                }
                return applyTokensToResponse(NextResponse.next(), refreshedTokens);
            }

            //* Case - 4: User has needPasswordChange false
            if (userInfo && !userInfo.needPasswordChange && pathname === "/reset-password") {
                return applyTokensToResponse(
                    NextResponse.redirect(
                        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
                    ),
                    refreshedTokens
                );
            }
        }

        //* Rule - 6: User is logged in and trying to access common protected route
        if (routeOwner === "COMMON") {
            return applyTokensToResponse(NextResponse.next(), refreshedTokens);
        }

        //* Rule - 7: User is logged in and trying to access role based protected route but doesn't have required role
        if (routeOwner === "ADMIN" || routeOwner === "DOCTOR" || routeOwner === "PATIENT") {
            if (routeOwner !== userRole) {
                return applyTokensToResponse(
                    NextResponse.redirect(
                        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
                    ),
                    refreshedTokens
                );
            }
        }

        return applyTokensToResponse(NextResponse.next(), refreshedTokens);
    } catch (error) {
        console.log("Error in proxy middleware:", error);
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
    ],
};
