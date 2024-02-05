"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export type PaginationButtonProps = {
  totalPages: number;
  page: number;
  baseUrl: string;
};

export const PaginationButton = (props: PaginationButtonProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={props.page === 1}
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(props.page - 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;

          router.push(url);
        }}
      >
        Précédent
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={props.page === props.totalPages}
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(props.page + 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
      >
        Suivant
      </Button>
    </div>
  );
};
