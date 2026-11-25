import { Suspense } from "react";
import Hero from "@/components/Hero";
import StepsSection from "@/components/StepsSection";
import Carousel from "@/components/Carousel";
import FrameCards from "@/components/FrameCards";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StepsSection />
      <Suspense fallback={<div className="py-16" />}>
        <Carousel />
      </Suspense>
      <FrameCards />
    </>
  );
}
