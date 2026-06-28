import React from "react";
import {
  User,
  Bookmark,
  MapPin,
  Settings,
  LogOut,
  Heart,
  Clock,
  MessageCircle,
  Home,
} from "lucide-react";
import Footer from "@/components/home/Footer";
import { Header } from "@/app/components/Header";
import PhoneFrame from "@/components/home/PhoneFrame";
import HomeBackdrop from "@/components/home/HomeBackdrop";
import { LinkProps } from "next/link";
import TravelChatbot from "@/app/chat/components/TravelChatBot";

export const chat = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <HomeBackdrop active={true} />
      <div className="relative z-10">
        <PhoneFrame>
          <div className="flex flex-col h-full">
            <div className="h-[90%]">
              <TravelChatbot />
            </div>
            <div className="mt-0">
              <Footer />
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
};
export default chat;
