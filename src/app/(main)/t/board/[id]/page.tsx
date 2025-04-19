"use client";

import { useParams } from "next/navigation";

export default function BoardPage() {
  const { id } = useParams();
  return <>{id}</>;
}
