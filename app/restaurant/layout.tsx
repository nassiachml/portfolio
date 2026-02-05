"use client";

import { RestaurantProvider } from "./context/RestaurantContext";
import { ToastProvider } from "./context/ToastContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { ToastContainer } from "./components/Toast";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RestaurantProvider>
      <ToastProvider>
        <div className="min-h-screen bg-white flex flex-col text-slate-800">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer />
        </div>
      </ToastProvider>
    </RestaurantProvider>
  );
}

