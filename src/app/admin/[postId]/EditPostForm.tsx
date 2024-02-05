"use client";

import React, { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { PostProps } from "@/query/post.query";
import { editPostAction } from "./edit.action";
import { ContentTextArea } from "@/components/ui/content-textarea";
import Tiptap from "@/components/Tiptap";
import { Checkbox } from "@/components/ui/checkbox";

interface EditPostFormProps {
  post: PostProps;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Le titre est obligatoire",
  }),
  content: z.string().min(1, {
    message: "La description du post ne doit pas être vide",
  }),
  images: z
    .object({ url: z.string() })
    .array()
    .min(1, {
      message: "Vous devez upload au moin 1 image",
    })
    .max(5, {
      message: "Vous pouvez mettre au maximum 5 images",
    }),
  isPublished: z.boolean(),
});

const EditPostForm: FC<EditPostFormProps> = ({ post }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...post,
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);

      setIsLoading(true);
      if (post) {
        const result = await editPostAction(post.id, values);
        if (result?.error) {
          toast.error(result.error);
          setIsLoading(false);
          return;
        }
      }

      router.push("/admin");
      router.refresh();
      toast.success("Votre post a été mis a jour avec succès");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    {/* <ContentTextArea {...field} /> */}
                    <Tiptap
                      description={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={isLoading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mettre en ligne</FormLabel>
                    <FormDescription>
                      Choissisez de mettre votre post en ligne maintenant ou
                      plus tard.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Mettre a jour
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditPostForm;
