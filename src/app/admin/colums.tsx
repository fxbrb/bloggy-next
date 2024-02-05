"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { deletePostAction } from "./delete.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PostsProps } from "@/query/post.query";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<PostsProps>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <img
            src={row.original.images[0].url}
            alt={`${row.original.title} image`}
            className="w-40 h-24 object-cover object-center z-10"
          />
          {row.original.images[1] && (
            <img
              src={row.original.images[1].url}
              alt={`${row.original.title} image`}
              className="w-40 h-24 object-cover object-center -translate-x-32"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "isPublished",
    header: "Publié",
    cell: ({ row }) => {
      console.log(row.original.isPublished);

      return (
        <div>
          {row.original.isPublished ? (
            <Badge>Publié</Badge>
          ) : (
            <Badge>Non Publié</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <DropdownMenu>
          <AlertDialog>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/post/${row.original.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Voir le post
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/${row.original.id}`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editer
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <AlertDialogTrigger className="w-full">
                  <Trash className="w-4 h-4 mr-2" />
                  Supprimer
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Êtes vous sûr de vouloir supprimer ce post?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action ne peut pas être annulée. Cela supprimera
                  définitivement votre compte et supprimez vos données de nos
                  serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      const result = await deletePostAction(row.original.id);

                      if (result.error) {
                        toast.error(result.error);
                        return;
                      }
                      router.refresh();
                      toast.success(result.message);
                    }}
                  >
                    Supprimer
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenu>
      );
    },
  },
];
