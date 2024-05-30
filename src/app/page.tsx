import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";

export default function Home() {
  return (
    <main className="min-h-screen mt-32">
      <Container>
        <Hero />
        <Steps/>
      </Container>
    </main>
  );
}
