"use client";
import Modal from "@/components/Modal";
import { useParams } from "next/navigation";

export default function InterceptedModal() {
  const { id } = useParams();
  return (
    <Modal>
      <div className="w-[35vw] p-4 h-[80vh] bg-gray-900 rounded-4xl">
        MODAL {id}
      </div>
    </Modal>
  );
}
