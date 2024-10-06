import mapErrorToMessage from "./mapError";
import { toast } from "sonner";

export const handleError = (
  error: unknown,
  refetch?: () => Promise<unknown>
) => {
  const message = mapErrorToMessage(error);

  const title = Array.isArray(message) ? message[0] : "An error has occured";
  const description = Array.isArray(message) ? message[1] : message;

  const id = toast.error(title, {
    description,
    cancel: {
      label: "Dismiss",
      onClick: () => {
        toast.dismiss(id);
      },
    },
    action:
      refetch === undefined
        ? undefined
        : {
            label: "Retry",
            onClick: () => {
              refetch();
            },
          },
  });
};
