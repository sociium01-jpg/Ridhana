"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Check, X, ClipboardList, ShoppingCart, Calendar } from "lucide-react";

interface OrderLog {
  id: string;
  customer_name: string;
  product_name: string;
  quantity: number;
  channel: "WhatsApp" | "Phone" | "Other";
  status: "New" | "Confirmed" | "Fulfilled" | "Cancelled";
  created_at: string;
}

const mockOrders: OrderLog[] = [
  {
    id: "1",
    customer_name: "Amit Patel",
    product_name: "MH Khapli Wheat Atta",
    quantity: 5,
    channel: "WhatsApp",
    status: "Fulfilled",
    created_at: "2026-07-02T11:30:00Z",
  },
  {
    id: "2",
    customer_name: "Pooja Sharma",
    product_name: "MP Sharbati Wheat Atta",
    quantity: 3,
    channel: "WhatsApp",
    status: "New",
    created_at: "2026-07-03T09:15:00Z",
  },
  {
    id: "3",
    customer_name: "Rajesh Rao",
    product_name: "Bajra (Pearl Millet) Atta",
    quantity: 2,
    channel: "Phone",
    status: "Confirmed",
    created_at: "2026-07-03T10:00:00Z",
  },
];

export default function OrdersLogAdmin() {
  const supabase = createClient();
  const [orders, setOrders] = useState<OrderLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [dbConnected, setDbConnected] = useState(true);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("MP Sharbati Wheat Atta");
  const [quantity, setQuantity] = useState(1);
  const [channel, setChannel] = useState<"WhatsApp" | "Phone" | "Other">("WhatsApp");
  const [status, setStatus] = useState<"New" | "Confirmed" | "Fulfilled" | "Cancelled">("New");

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data, error } = await supabase
          .from("orders_log")
          .select("*, products(name)")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const resolved = (data || []).map((o: any) => ({
          ...o,
          product_name: o.products?.name || "Unknown Product",
        }));
        setOrders(resolved);
      } catch (err) {
        console.warn("Using fallback local orders log list.");
        setDbConnected(false);
        setOrders(mockOrders);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [supabase]);

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || quantity <= 0) return;

    const payload = {
      customer_name: customerName,
      quantity: Number(quantity),
      channel,
      status,
    };

    if (dbConnected) {
      // Find matching product id in Supabase
      const { data: prod } = await supabase
        .from("products")
        .select("id")
        .eq("name", productName)
        .single();

      const { error } = await supabase.from("orders_log").insert([
        {
          ...payload,
          product_id: prod?.id || null,
        },
      ]);

      if (error) {
        alert("Error saving order: " + error.message);
        return;
      }
    }

    const newOrder: OrderLog = {
      id: Math.random().toString(),
      customer_name: customerName,
      product_name: productName,
      quantity: Number(quantity),
      channel,
      status,
      created_at: new Date().toISOString(),
    };

    setOrders([newOrder, ...orders]);
    setShowAddForm(false);
    setCustomerName("");
    setQuantity(1);
  };

  const handleStatusChange = async (id: string, newStatus: any) => {
    if (dbConnected) {
      const { error } = await supabase
        .from("orders_log")
        .update({ status: newStatus })
        .eq("id", id);
      if (error) {
        alert("Error updating order status: " + error.message);
        return;
      }
    }

    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-display-md text-espresso">Orders Log</h1>
          <p className="font-sans text-stone text-sm">
            Manual log tracking WhatsApp and phone flour inquiries & order statuses
          </p>
        </div>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-espresso text-bone hover:bg-stone-dark px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
          >
            <Plus size={14} />
            Log Order
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md max-w-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg text-espresso font-semibold">Log WhatsApp/Phone Order</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-stone hover:text-espresso"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleAddOrder} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Customer Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Amit Patel"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Quantity (Bags/Kgs)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Product</label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                >
                  <option value="MP Sharbati Wheat Atta">MP Sharbati Wheat Atta</option>
                  <option value="MH Khapli Wheat Atta">MH Khapli Wheat Atta</option>
                  <option value="Bajra (Pearl Millet) Atta">Bajra (Pearl Millet) Atta</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Inquiry Channel</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Phone">Phone Call</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                >
                  <option value="New">New / Inquired</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Fulfilled">Fulfilled</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-espresso text-bone hover:bg-stone-dark py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
            >
              Add to Logs
            </button>
          </form>
        </div>
      )}

      {/* Orders Table Log */}
      <div className="bg-cream border border-stone/10 rounded-card overflow-hidden shadow-warm-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-sm">
            <thead>
              <tr className="bg-espresso/5 border-b border-stone/10">
                <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Customer</th>
                <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Product details</th>
                <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Channel</th>
                <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Date Logged</th>
                <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-espresso/[0.02] transition-colors">
                  <td className="p-4 font-semibold text-espresso">{order.customer_name}</td>
                  <td className="p-4">
                    <span className="font-medium text-espresso">{order.product_name}</span>
                    <span className="block text-xs text-stone/60">Qty: {order.quantity} Bags</span>
                  </td>
                  <td className="p-4">
                    <span className="text-stone font-medium text-xs bg-stone/5 border border-stone/15 px-2.5 py-1 rounded">
                      {order.channel}
                    </span>
                  </td>
                  <td className="p-4 text-stone text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-stone/60" />
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </div>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase focus:outline-none ${
                        order.status === "New"
                          ? "bg-gold/15 text-gold border border-gold/30"
                          : order.status === "Confirmed"
                          ? "bg-stone/10 text-stone border border-stone/20"
                          : order.status === "Fulfilled"
                          ? "bg-espresso text-bone"
                          : "bg-terracotta/15 text-terracotta border border-terracotta/30"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Fulfilled">Fulfilled</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
