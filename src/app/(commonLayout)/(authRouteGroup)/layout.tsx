"use client";

import React from "react";

const AuthRouteGroupLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Glow overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/20 via-purple-500/10 to-sky-500/15" />

            {/* Vignette */}
            <div className="absolute inset-0 [background:radial-gradient(80%_60%_at_50%_40%,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

            {/* Centered content */}
            <div className="relative z-10 flex h-full items-center justify-center px-4">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </div>
    );
};

export default AuthRouteGroupLayout;
