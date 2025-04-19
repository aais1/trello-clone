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
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board: BoardCardProps) => (
          <BoardCard key={board.id} {...board} />
        ))}
      </div>
    </div>
  );
}
