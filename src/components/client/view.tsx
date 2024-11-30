"use client";

import { MemeResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ViewProps {
  response: MemeResponse | null;
  isLoading: boolean;
  error: string;
}

export const View: React.FC<ViewProps> = ({ response, isLoading, error }) => {
  const { toast } = useToast();

  const handleCopyImageUrl = async () => {
    if (response?.imageUrl) {
      try {
        await navigator.clipboard.writeText(response.imageUrl);
        toast({
          title: "Success!!",
          description: "Image URL copied to clipboard!",
        });
      } catch (error) {
        console.error("Failed to copy image URL:", error);
      }
    }
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      {isLoading && (
        <div className="p-4 flex align-center justify-center">
          <Loader className="animate-spin w-4 h-4" />
        </div>
      )}

      {!response && !isLoading && (
        <p className="text text-gray-800">
          Please type your meme idea in the form on the left and see the result
          here
        </p>
      )}

      {response && !isLoading && (
        <div className="whitespace-pre-line">
          <p className="text-sm text-gray-800">Generated Meme Text:</p>
          <p className="mt-2 font-medium">{response.memeText}</p>

          {response.imageUrl && (
            <div className="mt-6">
              <p className="text-sm text-gray-800">Meme Image:</p>
              <img
                src={response.imageUrl}
                alt="Generated Meme"
                className="mt-2 max-w-full"
              />
              <Button onClick={handleCopyImageUrl} className="mt-4">
                Copy Image URL
              </Button>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
