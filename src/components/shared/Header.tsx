"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-14 bg-[#1d2125] text-white flex items-center px-4 justify-between shadow-sm">
      {/* Left: Logo and Menus */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-white text-sm"
        >
          <img src="/trello-icon.png" alt="logo" className="w-5 h-5" />
          Trello
        </Link>

        <Dropdown label="Workspaces" />
        <Dropdown label="Recent" />
        <Dropdown label="Starred" />
        <Dropdown label="Templates" />

        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-8 px-4">
          Create
        </Button>
      </div>

      {/* Right: Beta tag, search, avatar */}
      <div className="flex items-center gap-4">
        <Dropdown label="Beta" variant="purple" />
        <Input
          type="text"
          placeholder="Search"
          className="h-8 w-[200px] bg-[#22272b] border-none text-sm text-white placeholder:text-muted-foreground"
        />
        <Button variant="ghost" size="icon" className="text-white">
          <span className="sr-only">Notifications</span>🔔
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar-placeholder.png" />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function Dropdown({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "purple";
}) {
  const bg =
    variant === "purple"
      ? "bg-purple-600  text-white"
      : "bg-transparent  text-white";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={`text-sm h-8 px-3 ${bg}`} variant="ghost">
          {label}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
