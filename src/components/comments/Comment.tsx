"use client";

import { CommentsProps } from "@/query/comment.query";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ArrowDownToLine, Edit, Trash2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCommentAction, editCommentAction } from "./comment.action";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Textarea } from "../ui/textarea";
import { Loader } from "../ui/loader";
import Link from "next/link";

const Comment = ({ comment }: { comment: CommentsProps }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(comment.message);
  const [editing, setEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    if (editing) {
      setMessage(comment.message);
    }
    setEditing((prev) => !prev);
  };

  const editComment = async (commentId: string, message: string) => {
    try {
      setIsLoading(true);
      if (editing) {
        const result = await editCommentAction(commentId, message);

        if (result?.error) {
          toast.error(result.error);
          return;
        }
      }
      router.refresh();
      setEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async () => {
    try {
      setIsLoading(true);
      const result = await deleteCommentAction(comment.id);

      if (result.error) {
        toast.error(result.error);
        return;
      }
      router.refresh();
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(message);

  return (
    <div
      className={`min-h-[100px] h-full bg-card rounded-md ${
        pathname === "/profile" ? "py-2" : "shadow-md p-5"
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center border-b py-2 justify-between">
          <div className="flex items-center gap-1">
            <Avatar className="w-6 h-6 mr-2">
              <AvatarFallback>
                {comment?.User?.firstname?.split("")[0]}
                {comment?.User?.lastname?.split("")[0]}
              </AvatarFallback>
              {comment?.User.image && (
                <AvatarImage src={comment?.User.image} alt="user image" />
              )}
            </Avatar>

            <span className="text-sm">
              {comment?.User.firstname} {comment?.User.lastname}
            </span>
            {pathname === "/profile" && (
              <Link
                href={`/post/${comment.Post.id}`}
                className="text-sm ml-5 text-blue-500 underline-offset-4 hover:underline"
              >
                Lien vers le post
              </Link>
            )}
          </div>

          <div className="flex gap-2 items-center">
            {session?.user.id === comment.User.id && (
              <div className="flex items-center gap-2">
                {editing ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        editComment(comment.id, message);
                      }}
                    >
                      {isLoading ? (
                        <Loader size={16} />
                      ) : (
                        <ArrowDownToLine size={16} />
                      )}
                    </Button>
                    <Button variant="ghost" onClick={toggleEditing}>
                      <X size={16} />
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" onClick={toggleEditing}>
                    <Edit size={16} />
                  </Button>
                )}

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="ghost">
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Etes vous sur de vouloir supprimer votre commentaire ?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button variant="destructive" onClick={deleteComment}>
                        {isLoading && <Loader className="w-4 h-4 mr-2" />}
                        Supprimer
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </div>
        <div>
          <Textarea
            readOnly={!editing}
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            className="resize-none bg-card focus-visible:ring-0 outline-none focus-visible:ring-offset-0 border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
