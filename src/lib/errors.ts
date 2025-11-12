import { toast } from "sonner";

import mapErrorToMessage from "./mapError";

export const handleError = (
  error: unknown,
  refetch?: () => Promise<unknown>
) => {
  const message = mapErrorToMessage(error);

  const title = Array.isArray(message) ? message[0] : "An error has occurred";
  const description = Array.isArray(message) ? message[1] : message;

  const id = toast.error(title, {
    action:
      refetch === undefined
        ? undefined
        : {
            label: "Retry",
            onClick: () => {
              void refetch();
            },
          },
    cancel: {
      label: "Dismiss",
      onClick: () => {
        toast.dismiss(id);
      },
    },
    description,
  });
};
