"use client";

import { MemeResponse } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { postRequest } from "@/providers/api";
import { Loader } from "lucide-react";

const schema = z.object({
  text: z.string().min(1, "Please enter some text to generate a meme."),
});

type FormData = z.infer<typeof schema>;

interface ChatProps {
  setResponse: (response: MemeResponse | null) => void;
  setError: (error: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const Chat: React.FC<ChatProps> = ({
  setResponse,
  setError,
  setIsLoading,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    setError("");
    setResponse({ memeText: "", imageUrl: "" });

    try {
      const { data: memeData } = await postRequest("/api/generateMemeText", {
        inputText: values.text,
      });

      const { data: memeImageData } = await postRequest(
        "/api/generateMemeImage",
        {
          // template_id: "181913649",
          text: memeData.memeText,
        }
      );

      setResponse({
        memeText: memeData.memeText,
        imageUrl: memeImageData.url,
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate your meme</CardTitle>
        <CardDescription>
          This is a card where you can type your meme idea and get some meme as
          a result
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your meme idea here..."
                      rows={4}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
