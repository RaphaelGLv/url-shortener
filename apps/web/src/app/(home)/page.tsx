import { ShortenUrlForm } from "./components/shorten-url-form/shorten-url-form";
import { UserUrlTable } from "./components/user-urls-table/user-url-table";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.shortenUrlFormSection}>
        <h2>Shorten Your URL</h2>
        <ShortenUrlForm />
      </section>

      <section className={styles.historySection}>
        <h3>Your Shortened URLs</h3>
        <UserUrlTable />
      </section>
    </main>
  );
}
