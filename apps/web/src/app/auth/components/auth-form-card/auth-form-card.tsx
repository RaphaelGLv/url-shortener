import {
  TextInput,
  TextInputProps,
} from "@/components/inputs/text-input/text-input";
import styles from "./auth-form-card.module.css";
import {
  TextButton,
  TextButtonProps,
} from "@/components/buttons/text-button/text-button";

interface AuthFormCardProps {
  title: string;
  inputs: TextInputProps[];
  submitButton: Omit<TextButtonProps, "props" | "className">;
  secondaryButton: Omit<TextButtonProps, "props" | "className">;
  className?: string;
}

export function AuthFormCard({
  title,
  inputs,
  submitButton,
  secondaryButton,
  className,
}: AuthFormCardProps) {
  return (
    <form className={`${styles.form} ${className ? className : ""}`}>
      <h2 className={styles.title}>{title}</h2>
      <fieldset className={styles.inputsSection}>
        {inputs.map((input) => (
          <TextInput key={input.id} {...input} />
        ))}
      </fieldset>
      <fieldset className={styles.buttonsSection}>
        <TextButton
          className={styles.secondaryButton}
          {...secondaryButton}
          buttonStyle="secondary"
          props={{ type: "reset" }}
        />
        <TextButton
          className={styles.submitButton}
          {...submitButton}
          props={{ type: "submit" }}
        />
      </fieldset>
    </form>
  );
}
