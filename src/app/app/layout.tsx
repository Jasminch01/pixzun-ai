import DehsboardAppbar from "@/components/Deshboard/DeshboardAppbar";
import { ContextProvider } from "../context/ContextProvider";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ContextProvider>
        <DehsboardAppbar />
        {children}
      </ContextProvider>
    </section>
  );
}
