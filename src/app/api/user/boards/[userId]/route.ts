import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  request: NextApiRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  }
) {
  const { userId } = await params;

  const dummyData = [
    {
      id: "1",
      title: "Personal Board",
      ownerId: userId,
      createdAt: "2025-04-19T10:00:00Z",
      updatedAt: "2025-04-19T10:00:00Z",
    },
    {
      id: "2",
      title: "Work Projects",
      ownerId: userId,
      createdAt: "2025-04-19T11:00:00Z",
      updatedAt: "2025-04-19T11:00:00Z",
    },
  ];

  return NextResponse.json({ boards: dummyData });
}
