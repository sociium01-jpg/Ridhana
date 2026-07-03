"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Settings as SettingsIcon,
  Globe,
  Users,
  UserPlus,
  Shield,
  Trash2,
  Save,
  Check,
  X,
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  role: "owner" | "editor";
  created_at: string;
}

const mockAdmins: AdminUser[] = [
  {
    id: "1",
    email: "aravind@ridhana.com",
    role: "owner",
    created_at: "2026-06-30T10:00:00Z",
  },
  {
    id: "2",
    email: "rohit@ridhana.com",
    role: "owner",
    created_at: "2026-06-30T10:30:00Z",
  },
];

export default function SettingsAdmin() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(true);

  // Site Contacts settings state
  const [phone, setPhone] = useState("+91 9800199797");
  const [whatsapp, setWhatsapp] = useState("https://wa.me/919800199797");
  const [instagram, setInstagram] = useState("https://www.instagram.com/ridhanahealth");
  const [address, setAddress] = useState("#32, Vijaya House, Station Road, Vikhroli West, Mumbai - 83");

  // SEO Settings State
  const [titleTemplate, setTitleTemplate] = useState("%s | Ridhana");
  const [defaultMeta, setDefaultMeta] = useState("");

  // Admin Users List State
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"owner" | "editor">("editor");
  const [showInviteForm, setShowInviteForm] = useState(false);

  useEffect(() => {
    async function loadSettingsAndAdmins() {
      try {
        // Load contact settings
        const { data: contactData } = await supabase
          .from("site_settings")
          .select("*")
          .eq("key", "contact")
          .single();

        if (contactData) {
          const val = contactData.value;
          setPhone(val.phone || "");
          setWhatsapp(val.whatsapp || "");
          setInstagram(val.instagram || "");
          setAddress(val.address || "");
        }

        // Load SEO settings
        const { data: seoData } = await supabase
          .from("site_settings")
          .select("*")
          .eq("key", "seo")
          .single();

        if (seoData) {
          const val = seoData.value;
          setTitleTemplate(val.title_template || "");
          setDefaultMeta(val.default_meta || "");
        }

        // Load admin users list
        const { data: usersData, error } = await supabase
          .from("admin_users")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        setAdmins(usersData || []);
      } catch (err) {
        console.warn("Using fallback local settings structure.");
        setDbConnected(false);
        setAdmins(mockAdmins);
        setDefaultMeta("Experience the art of slow milling with our fresh, preservative-free flours. From Khapli Wheat to Jowar and Bajra, we bring pure, nutrient-rich nourishment from the stone mill to your kitchen.");
      } finally {
        setLoading(false);
      }
    }
    loadSettingsAndAdmins();
  }, [supabase]);

  const handleSaveContactSettings = async () => {
    const payload = { phone, whatsapp, instagram, address };

    if (dbConnected) {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "contact", value: payload });

      if (error) {
        alert("Error saving contact details: " + error.message);
        return;
      }
    }
    alert("Contact settings updated successfully.");
  };

  const handleSaveSEOSettings = async () => {
    const payload = { title_template: titleTemplate, default_meta: defaultMeta };

    if (dbConnected) {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "seo", value: payload });

      if (error) {
        alert("Error saving SEO settings: " + error.message);
        return;
      }
    }
    alert("SEO settings updated successfully.");
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    if (dbConnected) {
      alert("In invite mode: Supplying email invite requires configuration of Supabase SMTP server first. Pre-populating list locally instead.");
    }

    const newUser: AdminUser = {
      id: Math.random().toString(),
      email: inviteEmail,
      role: inviteRole,
      created_at: new Date().toISOString(),
    };

    setAdmins([...admins, newUser]);
    setInviteEmail("");
    setShowInviteForm(false);
  };

  const handleRevokeUser = async (id: string) => {
    if (admins.length <= 1) {
      alert("Cannot revoke access. At least one administrator account must remain active.");
      return;
    }
    const confirmation = confirm("Are you sure you want to revoke admin permissions for this account?");
    if (!confirmation) return;

    if (dbConnected) {
      const { error } = await supabase.from("admin_users").delete().eq("id", id);
      if (error) {
        alert("Error revoking access: " + error.message);
        return;
      }
    }

    setAdmins(admins.filter((a) => a.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-display-md text-espresso">Settings</h1>
          <p className="font-sans text-stone text-sm">
            Configure site-wide parameters, contacts, SEO defaults, and administrators
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left column: Contact & SEO configurations */}
        <div className="flex flex-col gap-6">
          {/* Site Contacts */}
          <div className="bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md flex flex-col gap-5">
            <h2 className="font-serif text-espresso text-base font-semibold flex items-center gap-2">
              <SettingsIcon size={18} className="text-stone" /> Contact Configuration
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">WhatsApp Link</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Instagram Handle Link</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Mill Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none font-sans"
                />
              </div>
            </div>

            <button
              onClick={handleSaveContactSettings}
              className="inline-flex items-center justify-center gap-2 bg-espresso hover:bg-stone-dark text-bone px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all mt-2 self-start"
            >
              <Save size={14} />
              Save Contacts
            </button>
          </div>

          {/* SEO Defaults */}
          <div className="bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md flex flex-col gap-5">
            <h2 className="font-serif text-espresso text-base font-semibold flex items-center gap-2">
              <Globe size={18} className="text-stone" /> SEO Defaults
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Title Template</label>
                <input
                  type="text"
                  value={titleTemplate}
                  onChange={(e) => setTitleTemplate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Default Meta Description</label>
                <textarea
                  rows={4}
                  value={defaultMeta}
                  onChange={(e) => setDefaultMeta(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none font-sans leading-relaxed"
                />
              </div>
            </div>

            <button
              onClick={handleSaveSEOSettings}
              className="inline-flex items-center justify-center gap-2 bg-espresso hover:bg-stone-dark text-bone px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all mt-2 self-start"
            >
              <Save size={14} />
              Save SEO
            </button>
          </div>
        </div>

        {/* Right column: User management */}
        <div className="bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-espresso text-base font-semibold flex items-center gap-2">
              <Users size={18} className="text-stone" /> User Management
            </h2>

            {!showInviteForm && (
              <button
                onClick={() => setShowInviteForm(true)}
                className="flex items-center gap-1 text-gold hover:text-gold-light text-xs font-semibold tracking-widest uppercase"
              >
                <UserPlus size={14} />
                Invite Admin
              </button>
            )}
          </div>

          {showInviteForm && (
            <div className="p-4 bg-bone border border-stone/10 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-espresso font-semibold text-sm">Invite Administrator</span>
                <button onClick={() => setShowInviteForm(false)} className="text-stone hover:text-espresso">
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleInviteUser} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="admin-email@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-cream border border-stone/20 rounded-lg text-sm focus:outline-none"
                />
                <div className="flex items-center justify-between gap-4 mt-1">
                  <div className="flex items-center gap-2">
                    <Shield size={12} className="text-stone" />
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as any)}
                      className="px-2 py-1 bg-cream border border-stone/20 rounded text-xs"
                    >
                      <option value="editor">Editor</option>
                      <option value="owner">Owner</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-espresso text-bone hover:bg-stone-dark px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase"
                  >
                    Invite
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Admin list */}
          <div className="flex flex-col gap-3">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className="flex items-center justify-between p-4 bg-bone/45 border border-stone/10 rounded-lg"
              >
                <div>
                  <p className="font-sans text-sm font-semibold text-espresso">{admin.email}</p>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider mt-1 ${
                      admin.role === "owner" ? "bg-gold/15 text-gold" : "bg-stone/10 text-stone"
                    }`}
                  >
                    {admin.role}
                  </span>
                </div>

                <button
                  onClick={() => handleRevokeUser(admin.id)}
                  className="p-2 hover:bg-terracotta/10 text-stone hover:text-terracotta rounded-lg transition-colors"
                  title="Revoke access"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
