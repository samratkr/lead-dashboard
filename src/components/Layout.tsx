import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar />

      <main className="flex-1 ml-12 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
