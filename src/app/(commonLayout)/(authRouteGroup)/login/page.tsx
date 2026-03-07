import LoginFrom from "@/components/modules/Auth/LoginFrom";

interface LoginParams {
    searchParams: Promise<{ redirect?: string }>;
}

const LoginPage = async ({ searchParams }: LoginParams) => {
    const params = await searchParams;
    const redirectPath = params.redirect;


    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <LoginFrom redirectPath={redirectPath} />
        </div>
    );
};

export default LoginPage;
