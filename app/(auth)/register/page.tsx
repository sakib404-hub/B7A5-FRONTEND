import Link from "next/link";

import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Create an Account
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your information to create your account
        </p>
      </div>

      {/* register form component  */}
      <RegisterForm></RegisterForm>
      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
