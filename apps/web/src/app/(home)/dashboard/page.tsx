import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { clearSessionAction, getSessionAction } from "@/app/actions/session/session.action";
import { ShortenUrlForm } from "../components/shorten-url-form/shorten-url-form";
import { UserUrlTable } from "../components/user-urls-table/user-url-table";
import { TextButton } from "@/components/buttons/text-button/text-button";

export default async function DashboardPage() {
  const session = await getSessionAction();
  if (!session) {
    // Not logged in -> send to auth
    redirect("/auth");
  }

  return (
    <main className={styles.main}>
      <div className={styles.warning}>
        <div className={styles.warningIcon} aria-hidden>
          ⚠️
        </div>
        <div>
          <h2 className={styles.warningTitle}>Attention — page under construction</h2>
          <p className={styles.warningText}>This page is under construction.</p>
          <p className={styles.warningDescription}>
            It will enable the logged user to have an overview of their shortened
            URLs, showing the most accessed ones, enabling to deactivate and
            activate them, filtering options and also seeing URL analytics (clicks,
            location heatmap and the periods of time they were more accessed).
          </p>
        </div>
      </div>

      <TextButton text="Logout" onClick={clearSessionAction} />

      <section className={styles.shortenUrlFormSection}>
        <h2>Your Dashboard</h2>
        <ShortenUrlForm />
      </section>

      <section className={styles.historySection}>
        <h3>Your Shortened URLs</h3>
        <UserUrlTable />
      </section>
    </main>
  );
}
