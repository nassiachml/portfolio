"use client";

import { FitnessProvider } from "./context/FitnessContext";
import Navigation from "./components/Navigation";
import "./fitness.css";

export default function FitnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FitnessProvider>
      <div className="fitness-app min-h-screen bg-wellness-beige flex flex-col text-wellness-black antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
      </div>
    </FitnessProvider>
  );
}
