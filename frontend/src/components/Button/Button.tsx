import type React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  label?: React.ReactNode;
  onClick?: () => void;
  type?: "button";
  disabled?: boolean;
}

export function Button({
  label,
  onClick,
  type = "button",
  disabled
}: ButtonProps) {

  return (
    <button
      className={styles.primary}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}