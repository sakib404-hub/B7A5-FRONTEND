import Link from "next/link";
import { LoginForm } from "../_components/LoginForm";




const LoginPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome Back!
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

     {/* login form  */}
     <LoginForm></LoginForm>

      {/* Register */}
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
