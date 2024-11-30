"use client";

import { useState } from "react";
import { Chat, View } from "@/components/client";
import { MemeResponse } from "@/types";

export default function Page() {
  const [response, setResponse] = useState<MemeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen py-10 gap-16 sm:py-20 font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto px-4 grid lg:grid-cols-[1fr_2fr] gap-8 items-center justify-center sm:items-start">
        <div className="lg:col-span-1">
          <Chat
            setResponse={setResponse}
            setError={setError}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className="lg:col-span-1">
          <View response={response} isLoading={isLoading} error={error} />
        </div>
      </main>
    </div>
  );
}
