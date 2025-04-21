import { auth } from "@/auth"; // Assuming this is your authentication module
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";

export default async function Page() {
  const session = await auth();

  if (!session) {
    throw new Error("No session");
  }

  const handleCreateBoard = async (formData: FormData) => {
    "use server";
    const boardname = formData.get("boardname") as string;

    if (!boardname.trim()) return;

    const userId = session.user?.id;

    if (!userId) {
      throw new Error("User is not authenticated");
    }

    await prisma.board.create({
      data: {
        title: boardname,
        ownerId: userId,
      },
    });
  };

  return (
    <div className="w-full h-full min-h-full bg-[#d1d1d1] flex items-center justify-center p-4">
      <div className="text-black bg-white rounded-xl shadow-4xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create a New Board
        </h1>

        <form action={handleCreateBoard} className="flex gap-2 max-w-5xl">
          <Input
            type="text"
            name="boardname"
            placeholder="Enter board name"
            className="flex-1 px-4 py-2 rounded-md border bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            variant="default"
            type="submit"
            className="px-4 py-2 rounded-md"
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
