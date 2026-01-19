import type React from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: React.ReactNode;
};

export function Button({ label, ...props }: ButtonProps) {
  return (
    <button
      className={styles.primary}
      {...props}
    >
      {label}
    </button>
  );
}
