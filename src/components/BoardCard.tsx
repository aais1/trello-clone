import React from "react";
import { BoardCardProps } from "@/types";
import Link from "next/link"; // Import Link for navigation

export const BoardCard: React.FC<BoardCardProps> = ({ id, title }) => {
  return (
    <div className="max-w-sm  rounded-lg overflow-hidden shadow-lg bg-white relative">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x322/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg')",
        }}
      />

      {/* Content */}
      <div className="relative p-6 z-10">
        <h2 className="text-xl text-white font-bold">
          {/* Link to the board page using the board's id */}
          <Link
            href={`board/${id}`}
            className="text-xl font-semibold text-white hover:text-blue-300"
          >
            {title}
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default BoardCard;
