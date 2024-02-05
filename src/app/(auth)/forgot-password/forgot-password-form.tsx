"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import Image from "next/image";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "l'Email est requis",
    })
    .email({
      message: "l'Email est invalide",
    }),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log(values);

      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        form.reset();
        setMessage({
          success: data.message,
          error: "",
        });
      } else {
        setMessage({
          success: "",
          error: data.message,
        });
      }

      setIsLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader className="mr-2" />}
            Envoyer
          </Button>
        </form>
        {message.error && (
          <div className="text-red-500 mt-4 text-center text-sm">
            {message.error}
          </div>
        )}
        {message.success && (
          <div className="text-green-500 mt-4 text-center text-sm">
            {message.success}
          </div>
        )}
      </Form>

      <div className="mt-4 flex items-center justify-center">
        <Button onClick={() => router.back()} variant="link">
          Annuler
        </Button>
      </div>
    </>
  );
}
