import { auth } from "@/auth";
import BoardCard from "@/components/BoardCard";
import { BoardCardProps } from "@/types";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return <div>Not authenticated</div>;
  }

  const { user } = session;

  if (!user || !user.id) {
    return <div>User information is missing</div>;
  }

  async function getUserBoards(id: string) {
    const resp = await fetch("http://localhost:3000/api/user/boards/" + id);
    const data = await resp.json();
    return data;
  }

  const { boards } = await getUserBoards(user.id);

  return (
    <div className="p-2 md:p-6 bg-[#1d2125] md:w-[calc(100vw-256px)] overflow-hidden">
      <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board: BoardCardProps) => (
          <BoardCard key={board.id} {...board} />
        ))}
      </div>
    </div>
  );
}
