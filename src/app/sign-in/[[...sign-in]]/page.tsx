import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen mt-5">
      <SignIn />
    </div>
  );
}