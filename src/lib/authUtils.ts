export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN" | "SUPER_ADMIN";

export const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
];

export const isAuthRoute = (pathname: string) => authRoutes.includes(pathname);

export const getRoleFromPathname = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
};

export type RouteConfig = {
    exact: string[];
    prefixPatterns: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/change-password"],
    prefixPatterns: [],
};

export const doctorProtectedRoutes: RouteConfig = {
    prefixPatterns: [/^\/doctor\/dashboard/], // Matches any path that starts with /doctor/dashboard
    exact: [],
};

export const adminOrSuperAdminProtectedRoutes: RouteConfig = {
    prefixPatterns: [/^\/admin\/dashboard/], // Matches any path that starts with /admin/dashboard
    exact: [],
};

export const patientProtectedRoutes: RouteConfig = {
    prefixPatterns: [/^\/dashboard/], // Matches any path that starts with /dashboard
    exact: ["/payment/success", "/payment/cancel"],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) return true;

    return routes.prefixPatterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (
    pathname: string
): "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
    if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";

    if (isRouteMatches(pathname, doctorProtectedRoutes)) return "DOCTOR";

    // if (isRouteMatches(pathname, adminOrSuperAdminProtectedRoutes)) return "SUPER_ADMIN";

    if (isRouteMatches(pathname, adminOrSuperAdminProtectedRoutes)) return "ADMIN";

    if (isRouteMatches(pathname, patientProtectedRoutes)) return "PATIENT";

    return null; // public route
};

export const getDefaultDashboardRoute = (role: UserRole) => {
    if (role === "DOCTOR") return "/doctor/dashboard";

    if (role === "ADMIN" || role === "SUPER_ADMIN") return "/admin/dashboard";

    if (role === "PATIENT") return "/dashboard";

    return "/";
};

export const isValidRedirectPathForRole = (redirectPath: string, role: UserRole) => {
    const unifySuperAdminAndAdminRole = role === "SUPER_ADMIN" ? "ADMIN" : role;

    role = unifySuperAdminAndAdminRole;

    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
};
