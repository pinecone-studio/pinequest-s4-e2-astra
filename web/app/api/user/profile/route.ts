import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { userId, phone, name, profileImage } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Хэрэглэгчийн ID шаардлагатай" },
        { status: 400 },
      );
    }

    if (phone) {
      const existingUserWithPhone = await prisma.user.findUnique({
        where: { phone },
      });

      if (existingUserWithPhone && existingUserWithPhone.id !== userId) {
        return NextResponse.json(
          {
            error: "Энэ утасны дугаар аль хэдийн өөр бүртгэлд холбогдсон байна",
          },
          { status: 400 },
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(phone && { phone }),
        ...(name && { name }),
        ...(profileImage && { profileImage }),
      },
    });

    return NextResponse.json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        name: updatedUser.name,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Серверийн алдаа гарлаа" },
      { status: 500 },
    );
  }
}
