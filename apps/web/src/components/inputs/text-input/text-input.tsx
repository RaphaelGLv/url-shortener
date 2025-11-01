import styles from "./text-input.module.css";

export interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  errorMessage?: string;
  showLabel?: boolean;
  placeholder?: string;
  type?: string;
  required?: boolean;
  props?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "placeholder" | "type" | "id" | "required"
  >;
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  errorMessage = "",
  placeholder = "",
  type = "text",
  showLabel = true,
  required = false,
  props,
}: TextInputProps) {
  const hasError = errorMessage.length > 0;

  return (
    <div>
      <label className={styles.wrapper}>
        {showLabel && <span className={styles.label}>{label}</span>}
        <input
          className={`${styles.input} ${hasError ? styles.hasError : ""}`}
          type={type}
          id={id}
          value={value}
          aria-label={!showLabel ? label : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          required={required}
          {...props}
        />
      </label>
      {hasError && (
        <span className={styles.errorMessage} aria-live="polite">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
