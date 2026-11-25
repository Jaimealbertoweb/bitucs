import { Suspense } from "react";
import Hero from "@/components/Hero";
import StepsSection from "@/components/StepsSection";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <Hero />
      </Suspense>
      <StepsSection />
    </>
  );
}
