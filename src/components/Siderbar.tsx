"use client";

import {
  LayoutGrid,
  Users,
  Settings,
  Plus,
  Table,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TrelloSidebar() {
  const userName = "boreal sol";

  const boards = [
    { name: "Kanban Template", icon: "/board1.png" },
    { name: "Kanban Template", icon: "/board2.png" },
    { name: "test", icon: "/board3.png" },
  ];

  return (
    <aside className="w-64 bg-[#1d2125] text-white flex-col h-[calc(100vh-56px)] hidden md:flex shadow-inner border-r border-black/10">
      {/* Top User Info */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-6 h-6 rounded-sm text-sm font-bold flex items-center justify-center">
            {userName[0].toUpperCase()}
          </div>
          <div className="text-sm font-medium">{userName}</div>
        </div>
        <div className="text-xs text-gray-400 pl-8 -mt-1">Free</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 text-sm">
        {/* Static options */}
        <SidebarSection>
          <SidebarItem icon={LayoutGrid} label="Boards" disabled />
          <SidebarItem icon={Users} label="Members" />
          <SidebarItem icon={Settings} label="Workspace settings" hasDropdown />
        </SidebarSection>

        <SidebarSection title="Workspace views">
          <SidebarItem icon={Table} label="Table" />
          <SidebarItem icon={Calendar} label="Calendar" />
        </SidebarSection>

        <SidebarSection
          title="Your boards"
          actionIcon={<Plus className="w-4 h-4" />}
        >
          {boards.map((board, index) => (
            <SidebarBoardItem
              key={index}
              icon={board.icon}
              label={board.name}
            />
          ))}
        </SidebarSection>
      </nav>

      <div className="text-xs bg-[#2c333a] text-gray-300 py-3 px-4 mt-auto">
        Try Premium for free
      </div>
    </aside>
  );
}

function SidebarSection({ title, children, actionIcon }: any) {
  return (
    <div className="mb-4">
      {title && (
        <div className="flex items-center justify-between text-gray-400 text-[11px] uppercase px-2 pb-1">
          <span>{title}</span>
          {actionIcon && (
            <div className="p-2 rounded-md duration-50 transition-all cursor-pointer hover:bg-[#404142]">
              {actionIcon}
            </div>
          )}
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  hasDropdown = false,
  hasAdd = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
  hasAdd?: boolean;
}) {
  return (
    <Link
      href={`/t/${label.toLowerCase()}`}
      className="flex items-center gap-2"
    >
      <Button
        variant="ghost"
        className={`
        w-full justify-between px-3 py-2 text-white text-whiterounded-none text-sm font-medium
        cursor-pointer
        ${active ? "bg-[#4e5359]  font-bold border-l-4 border-blue-500" : " "}
        flex items-center
      `}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {label}
        </div>
        {hasDropdown && <span className="text-gray-400">▾</span>}
        {hasAdd && <Plus className="w-4 h-4" />}
      </Button>
    </Link>
  );
}

function SidebarBoardItem({ icon, label }: { icon: string; label: string }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-left text-white text-sm font-normal px-2 py-2 rounded  cursor-pointer"
    >
      <div className="flex items-center gap-2">
        {/* <img src={icon} alt={label} className="w-6 h-4 rounded object-cover" /> */}
        {label}
      </div>
    </Button>
  );
}
