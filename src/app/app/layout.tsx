import DehsboardAppbar from "@/components/Deshboard/DeshboardAppbar";
import { ContextProvider } from "../context/ContextProvider";
import QueryProvider from "../context/QueryProvider";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <QueryProvider>
        <ContextProvider>
          <DehsboardAppbar />
          {children}
        </ContextProvider>
      </QueryProvider>
    </section>
  );
}
