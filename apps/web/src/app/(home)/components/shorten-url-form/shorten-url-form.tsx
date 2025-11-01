"use client";

import { shortenUrlAction } from "@/app/actions/shorten-url/shorten-url.action";
import styles from "./shorten-url-form.module.css";
import { TextInput } from "@/components/inputs/text-input/text-input";
import { TextButton } from "@/components/buttons/text-button/text-button";
import React from "react";
import { Modal } from "@/components/modal/modal";
import { ShortenedUrlEntity } from "@/app/actions/entities/shortened-url.entity";
import { useToastStore } from "@/components/toast/store/toast-store";
import { ApiError } from "next/dist/server/api-utils";
import AppLink from "@/components/app-link/app-link";
import { useShallow } from "zustand/shallow";
import { useShortenedUrlStore } from "@/lib/store/shortened-url-store";

export function ShortenUrlForm() {
  const setToast = useToastStore(useShallow((state) => state.setToast));
  const addUrl = useShortenedUrlStore(useShallow((state) => state.addUrl));

  const [isLoading, setIsLoading] = React.useState(false);
  const [urlInput, setUrlInput] = React.useState("");
  const [urlInputError, setUrlInputError] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [createdShortUrl, setCreatedShortUrl] =
    React.useState<ShortenedUrlEntity | null>(null);

  const handleOnInputChange = (newValue: string) => {
    newValue = newValue.trim();
    setUrlInputError("");

    const isUrlValid = validateUrl(newValue);
    if (newValue.length !== 0 && !isUrlValid) {
      setUrlInputError("Invalid URL");
    }

    setUrlInput(newValue);
  };

  const validateUrl = (url: string): boolean => {
    return /^[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/.test(url);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const response = await shortenUrlAction({ url: urlInput })
      .then((response) => {
        addUrl(response);
        return response;
      })
      .catch((error) => {
        const errorTyped = error as ApiError;

        setToast({
          type: "error",
          message: "Error shortening URL: " + errorTyped.message,
        });

        return null;
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (!response) return;

    setCreatedShortUrl(response);
    setIsModalOpen(true);
  };

  const handleCopyShortUrl = () => {
    if (createdShortUrl) {
      navigator.clipboard.writeText(createdShortUrl.shortenedUrl);
      setToast({
        type: "success",
        message: "Short URL copied to clipboard!",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
        className={styles.formWrapper}
      >
        <TextInput
          label="Type a URL"
          id="shorten-url-text-input"
          value={urlInput}
          onChange={handleOnInputChange}
          errorMessage={urlInputError}
          props={{
            required: true,
          }}
        />

        <TextButton
          text="Shorten URL"
          // onClick is empty because the form submission is handled by the form's action
          onClick={() => {}}
          isLoading={isLoading}
          disabled={urlInputError.length > 0 || urlInput.length === 0}
          props={{ type: "submit" }}
        />
      </form>

      <Modal
        isOpen={isModalOpen && createdShortUrl !== null}
        title="URL Shortened Successfully!"
        onClose={() => setIsModalOpen(false)}
        confirmButtonProps={{
          buttonText: "Copy short URL",
          onConfirm: handleCopyShortUrl
        }}
      >
        <div className={styles.modalContent}>
          <p>Original URL: </p>
          <AppLink href={createdShortUrl?.originalUrl || ""}>
            {createdShortUrl?.originalUrl}
          </AppLink>
          <p>Shortened URL: </p>
          <AppLink href={createdShortUrl?.shortenedUrl || ""}>
            {createdShortUrl?.shortenedUrl}
          </AppLink>
        </div>
      </Modal>
    </>
  );
}
