/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

const glassInputClass =
    "bg-white/15 border-white/25 text-white placeholder:text-white/55 " +
    "focus-visible:ring-white/20 focus-visible:border-white/30";

const PasswordInput = ({ field }: { field: any }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AppField
            field={field}
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            inputClassName={glassInputClass}
            append={
                <Button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-transparent"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                >
                    {showPassword ? (
                        <EyeOff className="size-4" aria-hidden />
                    ) : (
                        <Eye className="size-4" aria-hidden />
                    )}
                </Button>
            }
        />
    );
};

const LoginFrom = () => {
    const [serverError, setServerError] = useState<string | null>(null);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload),
    });

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = (await mutateAsync(value)) as any;

                if (!result.success) {
                    setServerError(result.message || "Login failed");
                    return;
                }
            } catch (error: any) {
                console.log(`Login failed: ${error.message}`);
                setServerError(`Login failed: ${error.message}`);
            }
        },
    });

    return (
        <Card className="w-full max-w-md mx-auto rounded-3xl border border-white/20 bg-white/12 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] text-white">
            <CardHeader className="text-center space-y-2 pb-4">
                <div className="flex justify-center mb-4">
                    <Image
                        src="/icons/MediFlow-logo.png"
                        alt="MediFlow Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight text-white">
                    Welcome Back To MediFlow
                </CardTitle>
                <CardDescription className="text-base text-white/70">
                    Please enter your email and password to login
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    method="POST"
                    action="#"
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <div className="space-y-1">
                        <form.Field
                            name="email"
                            validators={{ onChange: loginZodSchema.shape.email }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Email"
                                    type="email"
                                    placeholder="name@example.com"
                                    inputClassName={glassInputClass}
                                />
                            )}
                        </form.Field>
                    </div>

                    <div className="space-y-1">
                        <form.Field
                            name="password"
                            validators={{ onChange: loginZodSchema.shape.password }}
                        >
                            {(field) => (
                                <div>
                                    <PasswordInput field={field} />

                                    <div className="flex justify-end mt-1">
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {serverError && (
                        <Alert
                            variant="destructive"
                            className="animate-in fade-in slide-in-from-top-2"
                        >
                            <AlertTitle className="text-sm font-semibold">Error</AlertTitle>
                            <AlertDescription className="text-sm">{serverError}</AlertDescription>
                        </Alert>
                    )}

                    <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                        {([canSubmit, isSubmitting]) => (
                            <AppSubmitButton
                                isPending={isSubmitting || isPending}
                                pendingLabel="Logging In..."
                                disabled={!canSubmit}
                                className="w-full font-semibold tracking-wide bg-blue-500/80 hover:bg-blue-500 text-white border border-white/10"
                            >
                                Log in
                            </AppSubmitButton>
                        )}
                    </form.Subscribe>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-8">
                    <div className="h-px flex-1 bg-white/20"></div>

                    <span className="text-xs uppercase text-white/70 tracking-wide">
                        Or continue with
                    </span>

                    <div className="h-px flex-1 bg-white/20"></div>
                </div>

                <Button
                    variant="outline"
                    className="w-full bg-white/10 hover:bg-white border-white/20 text-white transition-colors font-medium duration-500 hover:duration-500"
                    onClick={() => {
                        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

                        // TODO: change this url to the actual google login url
                        window.location.href = `${baseUrl}/auth/login/google`;
                    }}
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Sign in with Google
                </Button>
            </CardContent>

            <CardFooter className="justify-center border-t border-white/15 py-4 rounded-b-3xl">
                <p className="text-center text-sm text-white/70">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-white font-semibold hover:text-white/90 transition-colors underline-offset-4 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};

export default LoginFrom;
