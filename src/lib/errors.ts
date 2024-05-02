import { z } from "zod";
import mapErrorToMessage from "./mapError";
import { KeyedMutator } from "swr";
import { toast } from "sonner";

/**
 * This exception is thrown when the fetch request fails. Examples include network issues, CORS violations, server timeouts, and incorrect response bodies.
 */
export class FetchException extends Error {
  public message: string;

  constructor(message: string | string[]) {
    const formattedMessage = Array.isArray(message)
      ? message.join(", ")
      : message;

    super(formattedMessage);

    this.message = formattedMessage;
    this.name = "FetchException";
  }
}

/**
 * This exception is thrown when the server responds with an HTTP error status code such as 404 or 500.
 *
 * This exception is extracted from the data contained within the {@link ErrorResponse} object.
 */
export class HttpException extends Error {
  public message: string;
  public cause: string;

  constructor(
    message: string | string[],
    cause: string | string[],
    public statusCode: ErrorStatusCode,
    public data?: Record<string, unknown>
  ) {
    const formattedMessage = Array.isArray(message)
      ? message.join(", ")
      : message;
    const formattedCause = Array.isArray(cause) ? cause.join(", ") : cause;

    super(formattedMessage);

    this.message = formattedMessage;
    this.cause = formattedCause;
    this.name = "HttpException";
  }
}

export type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;
export type ErrorStatusCode = -1 | 400 | 401 | 403 | 404 | 500;

/**
 * This is the JSON body which the server responds with when an error occurs.
 */
export interface ErrorResponse {
  statusCode: ErrorStatusCode;
  message: string | string[];
  cause: string | string[];
  data?: Record<string, unknown>;
}

export const errorResponseSchema = z.object({
  statusCode: z
    .number()
    .int()
    .refine(value => {
      return [400, 401, 403, 404, 500].includes(value);
    }),
  message: z.union([z.string(), z.array(z.string())]),
  cause: z.union([z.string(), z.array(z.string())]),
  data: z.record(z.unknown()).optional(),
});

export const handleError = <T>(
  error: ErrorResponse,
  mutate?: KeyedMutator<T>
) => {
  if (error.data)
    console.error(
      `${error.message}. Cause: ${error.cause}. Extra data:`,
      error.data
    );

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
      mutate === undefined
        ? undefined
        : {
            label: "Retry",
            onClick: () => {
              mutate();
            },
          },
  });
};
