"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/landing/Hero";
import ValueProps from "@/components/landing/ValueProps";
import Features from "@/components/landing/Features";
import SocialProof from "@/components/landing/SocialProof";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";
import StartModal from "@/components/landing/StartModal";
import OnboardingStepper from "@/components/landing/OnboardingStepper";
import StickyHeader from "@/components/landing/StickyHeader";
import Toast from "@/components/landing/Toast";

export default function FlowlyLandingPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [onboardingData, setOnboardingData] = useState<any>(null);

  const handleStartClick = () => {
    setShowModal(true);
  };

  const handleModalContinue = (email: string, newsletter: boolean) => {
    setShowModal(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (data: any) => {
    setOnboardingData(data);
    setShowOnboarding(false);
    setShowToast(true);
    
    // Store data in sessionStorage for demo page
    sessionStorage.setItem("flowlyOnboarding", JSON.stringify(data));
    
    // Redirect to demo after a short delay
    setTimeout(() => {
      router.push("/demo");
    }, 1500);
  };

  return (
    <div className="min-h-screen text-gray-900">
      <StickyHeader onStartClick={handleStartClick} />
      
      {/* Urgency message */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center py-2 text-sm font-medium">
        ⏳ Accès démo gratuit pour une durée limitée
      </div>

      <Hero onStartClick={handleStartClick} />
      <ValueProps />
      <Features />
      <SocialProof />
      <HowItWorks />
      <CTA onStartClick={handleStartClick} />

      <StartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onContinue={handleModalContinue}
      />

      <OnboardingStepper
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onClose={() => setShowOnboarding(false)}
      />

      <Toast
        message="Configuration enregistrée (démo)"
        isVisible={showToast}
      />
    </div>
  );
}
