"use client";

import { useState } from "react";
import { AuthFormCard } from "../auth-form-card/auth-form-card";
import { InputState } from "@/components/inputs/input.types";
import { useToastStore } from "@/components/toast/store/toast-store";
import { useShallow } from "zustand/shallow";
import { AppRoutes } from "@/constants/app-routes";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth/auth.action";

interface LoginFormProps {
  onClickRegisterButton: () => void;
  className?: string;
}

export function LoginForm({ onClickRegisterButton, className }: LoginFormProps) {
  const router = useRouter();
  const { setToast } = useToastStore(
    useShallow((state) => ({ setToast: state.setToast }))
  );

  const [emailInput, setEmailInput] = useState<InputState<string>>({
    value: "",
    errorMessage: "",
  });
  const [passwordInput, setPasswordInput] = useState<InputState<string>>({
    value: "",
    errorMessage: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const isSubmitButtonDisabled =
    isLoading ||
    emailInput.value.length === 0 ||
    emailInput.errorMessage.length > 0 ||
    passwordInput.value.length === 0 ||
    passwordInput.errorMessage.length > 0;

  const handleEmailChange = (newValue: string) => {
    setEmailInput({ value: newValue, errorMessage: "" });
  };

  const handlePasswordChange = (newValue: string) => {
    setPasswordInput({ value: newValue, errorMessage: "" });
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);

    try {
      await loginAction({
        email: emailInput.value,
        password: passwordInput.value,
      });

      setToast({ type: "success", message: "Login successful!" });

      router.replace(AppRoutes.HOME);
    } catch (error) {
      const errorTyped = error as ApiError;

      setToast({ type: "error", message: errorTyped.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormCard
      className={className}
      title="Login"
      inputs={[
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          required: true,
          value: emailInput.value,
          errorMessage: emailInput.errorMessage,
          onChange: handleEmailChange,
        },
        {
          id: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          required: true,
          value: passwordInput.value,
          errorMessage: passwordInput.errorMessage,
          onChange: handlePasswordChange,
        },
      ]}
      submitButton={{
        text: "Login",
        onClick: handleOnSubmit,
        isLoading,
        disabled: isSubmitButtonDisabled,
      }}
      secondaryButton={{
        text: "Create account",
        onClick: onClickRegisterButton,
        disabled: isLoading,
      }}
    />
  );
}
