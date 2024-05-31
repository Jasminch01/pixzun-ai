import Container from "@/components/Container";
import Counter from "@/components/Counter";
import EnhancePhoto from "@/components/EnhancePhoto";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Steps from "@/components/Steps";

export default function Home() {
  return (
    <main className="min-h-screen mt-32">
      <Container>
        <Hero />
        <Steps/>
        <EnhancePhoto/>
        <Counter/>
        <Pricing/>
      </Container>
    </main>
  );
}
