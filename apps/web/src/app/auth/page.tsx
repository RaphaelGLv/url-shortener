"use client";

import { useState } from "react";
import { LoginForm } from "./components/login-form/login-form";
import styles from "./page.module.css";
import { RegisterForm } from "./components/register-form/register-form";

export default function AuthPage() {
  const [displayedForm, setDisplayedForm] = useState<"login" | "register">(
    "login"
  );

  return (
    <main
      className={`${styles.main} ${
        displayedForm === "login"
          ? styles.showLoginForm
          : styles.showRegisterForm
      }`}
    >
      <LoginForm className={styles.loginForm} onClickRegisterButton={() => setDisplayedForm("register")} />
      <section className={styles.textSection}>
        <h2>Welcome to URL Shortener</h2>
        <p>
          Create and manage your shortened URLs with ease. Sign up or log in to
          get started!
        </p>
        <p>
          Authenticated users can create permanent shortened URLs, deactivate
          and reactivate them as needed, see information about their links
          (e.g., click statistics, usage data, etc.), and enjoy a seamless URL
          management experience.
        </p>
        <p>Join us today and take control of your links!</p>
      </section>
      <RegisterForm className={styles.registerForm} onClickLoginButton={() => setDisplayedForm("login")} />
    </main>
  );
}
