import Appbar from "@/components/Appbar";
import BeforeAfter from "@/components/BeforeAfter";
import Container from "@/components/Container";
import Counter from "@/components/Counter";
import EnhancePhoto from "@/components/EnhancePhoto";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Steps from "@/components/Steps";
import TrustedBrands from "@/components/TrustedBrands";

export default function Home() {
  return (
    <main className="min-h-screen mt-32">
      <Appbar />
      <Container>
        <Hero />
        <Steps />
        <EnhancePhoto />
        <Counter />
        <Pricing />
        <Reviews />
        <TrustedBrands />
      </Container>
      <BeforeAfter />
      <Container>
        <FAQ />
      </Container>
    </main>
  );
}
