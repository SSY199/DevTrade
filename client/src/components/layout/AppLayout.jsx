import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useSidebar } from "@/context/SidebarContext";

export default function AppLayout({ children }) {
  const { open } = useSidebar(); // ✅ load state from context

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Wrapper */}
      <div
        className={`
          flex min-h-screen flex-col transition-all duration-300 ease-in-out
          ${open ? "md:ml-64" : "md:ml-16"}
        `}
      >
        <Header />

        <main className="flex-1 px-6 py-6">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
