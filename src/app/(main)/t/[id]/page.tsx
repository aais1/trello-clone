"use client";

import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading")
    return <div className="p-6 text-center text-white">Loading...</div>;

  let user;
  if (session) {
    user = session.user;
  }

  return (
    <div className="min-h-[calc(100vh-66px)] w-[calc(100vw-275px)] flex justify-center items-center bg-muted">
      {/* {JSON.stringify(user)} */}
      <Card className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-2xl">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/avatar-placeholder.png" alt="User avatar" />
            <AvatarFallback>
              {id?.toString().slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">Hello, {id}</h2>
            <p className="text-muted-foreground text-sm">
              Manage your profile info here
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                defaultValue={user?.name || ""}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                defaultValue={user?.email || ""}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, Country" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="e.g. Frontend Developer" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
