import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import TrelloSidebar from "@/components/Siderbar";
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
      <div className="md:flex min-h-[calc(100vh-56px)]">
        <div className="hidden md:flex">
          <TrelloSidebar />
        </div>
        <div className="md:flex flex-1 bg-[#1d2125] min-h-[calc(100vh-56px)] ">
          {children}
        </div>
      </div>
      {modelview}
    </>
  );
}
