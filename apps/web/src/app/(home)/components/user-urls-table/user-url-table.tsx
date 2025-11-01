"use client";

import React from "react";
import styles from "./user-url-table.module.css";
import { IconButton } from "@/components/buttons/icon-button/icon-button";
import { AppIcons } from "@/assets/icons/_index";
import { useToastStore } from "@/components/toast/store/toast-store";
import AppLink from "@/components/app-link/app-link";
import { useShallow } from "zustand/shallow";
import { useShortenedUrlStore } from "@/lib/store/shortened-url-store";

export function UserUrlTable() {
  const { setToast } = useToastStore(
    useShallow((state) => ({ setToast: state.setToast }))
  );
  const { urls, removeUrl } = useShortenedUrlStore(
    useShallow((state) => ({ urls: state.urls, removeUrl: state.removeUrl }))
  );

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({ type: "success", message: "Copied to clipboard" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setToast({ type: "error", message: "Failed to copy" });
    }
  };

  const getExpirationInDays = (expiresAt: string | null): string => {
    if (!expiresAt) {
      return "Never";
    }

    const now = new Date();
    const diffInMs = new Date(expiresAt).getTime() - now.getTime();

    if (diffInMs < 0) {
      return "Expired";
    }

    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"}`;
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.grid}>
        <li className={styles.row + " " + styles.header}>
          <div className={styles.cell}>Original URL</div>
          <div className={styles.cell}>Short URL</div>
          <div className={styles.cell}>Expires in</div>
        </li>

        {urls.map((url) => {
          const expiration: string = getExpirationInDays(url.expiresAt);

          return (
            <li
              className={`${styles.row} ${
                expiration === "Expired" ? styles.expired : ""
              }`}
              key={url.hash}
            >
              <div className={styles.cell + " " + styles.urlCell}>
                <AppLink className={styles.link} href={url.originalUrl}>
                  {url.originalUrl}
                </AppLink>

                <IconButton
                  icon={AppIcons.COPY}
                  onClick={() => handleCopy(url.originalUrl)}
                  ariaLabel="Copy original URL"
                  className={styles.copyBtn}
                />
              </div>

              <div className={styles.cell + " " + styles.urlCell}>
                <AppLink className={styles.link} href={url.shortenedUrl}>
                  {url.shortenedUrl}
                </AppLink>

                <IconButton
                  icon={AppIcons.COPY}
                  onClick={() => handleCopy(url.shortenedUrl)}
                  ariaLabel="Copy short URL"
                  className={styles.copyBtn}
                />
              </div>

              <div className={styles.cell}>{expiration}</div>

              <IconButton
                icon={() => <AppIcons.TRASH aria-label="" color="var(--error-300)" />}
                onClick={() => removeUrl(url.hash)}
                ariaLabel="Delete shortened URL"
                className={styles.deleteBtn}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
