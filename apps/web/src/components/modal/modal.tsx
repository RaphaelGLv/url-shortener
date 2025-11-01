"use client";

import React, { useEffect, useRef } from "react";
import { TextButton } from "../buttons/text-button/text-button";
import styles from "./modal.module.css";
import { FocusTrap } from "focus-trap-react";
import { IconButton } from "../buttons/icon-button/icon-button";
import { AppIcons } from "@/assets/icons/_index";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  confirmButtonProps?: {
    onConfirm: () => void;
    buttonText: string;
  };
}

export function Modal({
  isOpen,
  onClose,
  title,
  confirmButtonProps,
  children,
}: React.PropsWithChildren<ModalProps>) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Disable background scrolling
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <FocusTrap active={isOpen}>
      <div
        ref={overlayRef}
        className={`${styles.overlay} ${!isOpen ? styles.closed : ""}`}
        onMouseDown={onOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label="Modal dialog"
      >
        <div
          className={`${styles.dialog} ${!isOpen ? styles.closed : ""}`}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <IconButton
              icon={AppIcons.CLOSE}
              onClick={onClose}
              ariaLabel="Close modal"
            />
          </div>
          <div className={styles.content}>{children}</div>
          {confirmButtonProps && (
            <div className={styles.footer}>
              <TextButton
                text={confirmButtonProps.buttonText}
                onClick={confirmButtonProps.onConfirm}
              />
            </div>
          )}
        </div>
      </div>
    </FocusTrap>
  );
}
