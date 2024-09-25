import mapErrorToMessage from "./mapError";
import { toast } from "sonner";

export const handleError = (
  error: unknown,
  refetch?: () => Promise<unknown>
) => {
  console.error(error);

  const message = mapErrorToMessage(error);
  const id = toast.error("An error has occured", {
    description: message,
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
