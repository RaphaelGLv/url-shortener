"use client";

import { useState } from "react";
import { AuthFormCard } from "../auth-form-card/auth-form-card";
import { InputState } from "@/components/inputs/input.types";
import { useToastStore } from "@/components/toast/store/toast-store";
import { useShallow } from "zustand/shallow";
import { AppRoutes } from "@/constants/app-routes";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { InputValidator } from "@/lib/input-validator";
import { registerAction } from "@/app/actions/auth/auth.action";
import { isStatusCodeError } from "@/lib/api-utils";

interface RegisterFormProps {
  onClickLoginButton: () => void;
  className?: string;
}

export function RegisterForm({ onClickLoginButton, className }: RegisterFormProps) {
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
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<
    InputState<string>
  >({ value: "", errorMessage: "" });
  const [isLoading, setIsLoading] = useState(false);

  const isSubmitButtonDisabled =
    isLoading ||
    emailInput.value.length === 0 ||
    emailInput.errorMessage.length > 0 ||
    passwordInput.value.length === 0 ||
    passwordInput.errorMessage.length > 0 ||
    confirmPasswordInput.value.length === 0 ||
    confirmPasswordInput.errorMessage.length > 0;

  const handleEmailChange = (newValue: string) => {
    const errorMessage = InputValidator.getEmailValidationError(newValue);

    setEmailInput({ value: newValue, errorMessage: errorMessage });
  };

  const handlePasswordChange = (newValue: string) => {
    const errorMessage = InputValidator.getPasswordValidationError(newValue);

    setPasswordInput({ value: newValue, errorMessage: errorMessage });
  };

  const handleConfirmPasswordChange = (newValue: string) => {
    const isValid = newValue === passwordInput.value;

    let errorMessage = "";
    if (!isValid) {
      errorMessage = "Passwords do not match";
    }

    setConfirmPasswordInput({ value: newValue, errorMessage });
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await registerAction({
        email: emailInput.value,
        password: passwordInput.value,
      });

      const errorResponse = response as ApiError;
      if (isStatusCodeError(errorResponse.statusCode)) {
        throw errorResponse;
      }

      setToast({ type: "success", message: "Registration successful!" });

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
      title="Create Account"
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
        {
          id: "confirm-password",
          label: "Confirm Password",
          type: "password",
          placeholder: "Confirm your password",
          required: true,
          value: confirmPasswordInput.value,
          errorMessage: confirmPasswordInput.errorMessage,
          onChange: handleConfirmPasswordChange,
        },
      ]}
      submitButton={{
        text: "Create Account",
        onClick: handleOnSubmit,
        isLoading,
        disabled: isSubmitButtonDisabled,
      }}
      secondaryButton={{
        text: "Login",
        onClick: onClickLoginButton,
        disabled: isLoading,
      }}
    />
  );
}
