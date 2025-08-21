import {
  BarChart,
  Briefcase,
  Building2,
  Calendar,
  CheckSquare,
  ChevronsRight,
  Database,
  Home,
  List,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Star,
  User,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { useState } from "react";

const menuGroups = [
  {
    items: [{ icon: <Home size={18} />, label: "Home" }],
  },
  {
    label: "Prospect & Enrich",
    items: [
      { icon: <Users size={18} />, label: "People" },
      { icon: <Building2 size={18} />, label: "Companies" },
      { icon: <List size={18} />, label: "Lists" },
      { icon: <Database size={18} />, label: "Data Enrichment" },
    ],
  },
  {
    label: "Engage",
    items: [
      { icon: <Workflow size={18} />, label: "Sequences" },
      { icon: <Mail size={18} />, label: "Emails" },
      { icon: <Phone size={18} />, label: "Calls" },
    ],
  },
  {
    label: "Win Deals",
    items: [
      { icon: <Calendar size={18} />, label: "Meetings" },
      { icon: <MessageSquare size={18} />, label: "Conversations" },
      { icon: <Briefcase size={18} />, label: "Deals" },
    ],
  },
  {
    label: "Tools & Automations",
    items: [
      { icon: <CheckSquare size={18} />, label: "Tasks" },
      { icon: <Workflow size={18} />, label: "Workflows" },
      { icon: <BarChart size={18} />, label: "Analytics" },
    ],
  },
];

export default function AppSidebar() {
  const [sticky, setSticky] = useState(false);
  const [hovered, setHovered] = useState(false);

  const expanded = sticky || hovered;

  return (
    <div
      className={`fixed z-99 left-0 top-0 h-screen bg-white text-black border-r border-neutral-200 flex flex-col transition-all duration-300 ease-in-out
        ${expanded ? "w-64" : "w-12"}`}
      onMouseEnter={() => !sticky && setHovered(true)}
      onMouseLeave={() => !sticky && setHovered(false)}
    >
      <div className="flex items-center justify-between px-2 py-2 border-b border-neutral-200">
        <Star size={20} className="text-yellow-500 shrink-0" />
        {expanded && (
          <button
            onClick={() => setSticky(!sticky)}
            className="p-1 hover:bg-neutral-100 rounded"
          >
            <ChevronsRight size={16} />
          </button>
        )}
      </div>

      {expanded && (
        <div className="flex items-center gap-2 px-2 py-2 border-b border-neutral-200">
          <div className="flex items-center bg-neutral-100 rounded px-2 flex-1 h-8">
            <Search size={14} className="text-neutral-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-xs px-1 outline-none flex-1"
            />
          </div>
          <Phone size={16} className="text-neutral-600 cursor-pointer" />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-1 py-2 space-y-2">
        {menuGroups.map((group, i) => (
          <div key={i} className="space-y-1">
            {expanded && (
              <p className="text-[10px] uppercase text-neutral-500 mb-0.5 px-2 tracking-wide">
                {group.label}
              </p>
            )}
            {group.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-neutral-100 text-sm"
              >
                {item.icon}
                {expanded && <span>{item.label}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="h-1/5 border-t border-neutral-200 p-2 flex flex-col justify-between">
        {expanded ? (
          <>
            <button className="bg-[#EBF212] text-gray-800 text-sm font-medium py-1.5 px-2 rounded-lg">
              Upgrade
            </button>

            <div className="mt-2 bg-neutral-100 rounded px-2 py-1.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-neutral-600">Onboarding</span>
                <div className="w-20 h-1 bg-neutral-300 rounded mt-0.5">
                  <div className="w-10 h-1 bg-green-500 rounded"></div>
                </div>
              </div>
              <X size={14} className="cursor-pointer text-neutral-600" />
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded">
                <Settings size={16} />
                <span className="text-xs">Settings</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded">
                <User size={16} />
                <span className="text-xs">Profile</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Settings size={16} className="cursor-pointer" />
            <User size={16} className="cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
}
