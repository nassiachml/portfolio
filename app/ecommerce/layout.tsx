"use client";

import { StoreProvider } from "./context/StoreContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Metadata } from "next";

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-white flex flex-col text-slate-800">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </StoreProvider>
  );
}
