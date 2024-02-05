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
  password: z
    .string()
    .min(1, { message: "Le mot de passe est requis" })
    .min(8, {
      message: "Le mot de passe doit contenir au minimum 8 characters",
    }),
});

export default function SignInForm() {
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
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/",
      });

      if (result?.status === 200) {
        return toast.success("Vous vous êtes connecté avec succès!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setMessage({
          error: result.error,
          success: "",
        });
        setIsLoading(false);
      } else {
        router.refresh();
        toast.success("Vous vous êtes connecté avec succès!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Mot de passe</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline hover:underline-offset-4"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-10">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader className="mr-2" />}
              Connexion
            </Button>
          </div>
        </form>
        {message.error && (
          <div className="text-red-500 mt-4 text-center text-sm">
            {message.error}
          </div>
        )}
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou connectez-vous avec
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={signInWithGoogle}
      >
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Image
            src="/google-icon.svg"
            alt="google logo"
            className="mr-2"
            width={16}
            height={16}
          />
        )}{" "}
        Google
      </Button>
    </>
  );
}
