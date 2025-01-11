"use client";
import "@/styles/globals.css";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"w-full h-dvh grid grid-rows-[auto_1fr_auto]"}>
      <Header />
      <main className={"flex h-full overflow-hidden"}>
        <Aside />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
