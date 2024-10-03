import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const users = (await prisma.users.findMany()).sort((a, b) => a.id - b.id);

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const args = await request.json();
  const { userId } = args;

  const users = await prisma.users.update({
    where: { id: userId },
    data: { counter: { increment: 1 } },
  });

  return NextResponse.json(users);
}
