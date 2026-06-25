import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return NextResponse.json(
        { error: "Нэвтрэх токен шаардлагатай" },
        { status: 401 },
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json(
        { error: "Хүчингүй эсвэл хугацаа нь дууссан токен" },
        { status: 401 },
      );
    }

    const userId = decoded.userId;
    const { currentPassword, phone, name, profileImage, newPassword } =
      await request.json();

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Үйлдэл хийхийн тулд одоогийн нууц үгээ оруулна уу" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Хэрэглэгч олдсонгүй" },
        { status: 404 },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Одоогийн нууц үг буруу байна" },
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

    const updateData: any = {};
    if (phone) updateData.phone = phone;
    if (name) updateData.name = name;
    if (profileImage) updateData.profileImage = profileImage;

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        username: updatedUser.username,
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
