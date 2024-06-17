import DehsboardAppbar from "@/components/Deshboard/DeshboardAppbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DehsboardAppbar />
      {children}
    </section>
  );
}
