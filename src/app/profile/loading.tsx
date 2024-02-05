import { Loader } from "@/components/ui/loader";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Loader />
    </div>
  );
}
