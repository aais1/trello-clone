"use client";

import { useParams, useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();
  const { id } = useParams();
  router.push("/modal/" + id);
  return;
}
