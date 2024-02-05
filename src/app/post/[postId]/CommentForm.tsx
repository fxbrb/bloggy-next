"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createCommentAction } from "../../../components/comments/comment.action";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader";

const formSchema = z.object({
  message: z
    .string()
    .min(1, {
      message: "Le champ ne peux pas être vide",
    })
    .max(255, {
      message: "Le commentaire doit contenir au maximum 255 caractères",
    }),
});

const CommentForm = ({ postId }: { postId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const result = await createCommentAction(postId, values);

      if (result?.error) {
        toast.error(result.error);
        setIsLoading(false);
        form.reset();
        return;
      }

      form.reset();
      router.refresh();
      toast.success("Commentaire ajouté avec succès");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-5 items-end"
      >
        <div className="max-w-xl w-full">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre commentaire</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[150px]"
                    placeholder="Mon message..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading} size="lg">
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Publier
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
