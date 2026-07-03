"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  LayoutDashboard,
  ShoppingBag,
  Image as ImageIcon,
  FileText,
  BookOpen,
  ClipboardList,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    }
    checkUser();
  }, [supabase]);

  // Hide nav sidebar on login page
  const isLoginPage = pathname === "/admin/login";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: ShoppingBag },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    { label: "Page Content", href: "/admin/content", icon: FileText },
    { label: "Blog Posts", href: "/admin/blog", icon: BookOpen },
    { label: "Orders Log", href: "/admin/orders", icon: ClipboardList },
    { label: "Settings", href: "/admin/settings", icon: SettingsIcon },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
          <p className="font-sans text-label text-stone tracking-widest uppercase">Loading Admin...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-bone text-espresso">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-bone text-espresso flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-espresso text-bone border-b border-stone/20 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-serif font-semibold text-lg">Ridhana Admin</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-bone/80 hover:text-bone"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Navigation (Desktop & Mobile Drawer) */}
      <aside
        className={`bg-espresso text-bone w-full md:w-64 flex-shrink-0 md:min-h-screen border-r border-stone/20 flex flex-col justify-between transition-all duration-300 z-30 fixed md:sticky top-0 md:top-auto h-[calc(100vh-60px)] md:h-screen md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="hidden md:flex items-center gap-3 mb-8">
            <div>
              <span className="block font-serif text-lg font-semibold tracking-tight">
                Ridhana
              </span>
              <span className="block text-gold text-[0.65rem] tracking-widest uppercase font-semibold">
                Admin Console
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans tracking-wide transition-all ${
                    isActive
                      ? "bg-gold text-espresso font-semibold"
                      : "text-wheat/70 hover:text-bone hover:bg-stone-dark/30"
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer profile & logout */}
        <div className="p-6 border-t border-bone/10 bg-stone-dark/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
              <User size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-bone truncate">{user?.email || "Admin User"}</p>
              <p className="text-[10px] text-wheat/50 uppercase tracking-widest font-semibold">Owner</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 bg-stone-dark/20 text-wheat hover:text-bone hover:bg-stone-dark/40 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-bone p-6 md:p-10">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
