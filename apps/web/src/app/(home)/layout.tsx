import { Navbar } from "@/components/navbar/navbar";

export default function WithNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ minHeight: "100dvh", }}>
      <Navbar />
      <main style={{ padding: '0 calc(12vw + 1rem)' }}>{children}</main>
    </div>
  );
}