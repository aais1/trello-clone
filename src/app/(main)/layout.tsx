import type { Metadata } from "next";
import Header from "@/components/shared/Header";
export const metadata: Metadata = {
  title: "Trello NEXTJSs",
  description: "Trello Clone using Next.js",
};

export default function RootLayout({
  children,
  modelview,
}: Readonly<{
  children: React.ReactNode;
  modelview: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      {modelview}
    </>
  );
}
