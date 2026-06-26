import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Нэвтрэх токен олдсонгүй" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const userId = decoded.userId;

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Файл олдсонгүй" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
    });

    await prisma.user.update({
      where: { id: userId },
      data: { profileImage: blob.url },
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
