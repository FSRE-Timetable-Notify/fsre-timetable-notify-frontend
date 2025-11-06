import type { FsreError } from "@/api/api";

const isFsreError = (e: unknown): e is FsreError =>
  e instanceof Object && "status" in e && "message" in e && "error" in e;

const mapErrorToMessage = (e: unknown) => {
  if (isFsreError(e)) {
    return [e.error, e.message];
  }

  if (e instanceof Error) {
    return e.message;
  }

  if (typeof e === "string") {
    return e;
  }

  return "An unexpected error occurred";
};

export default mapErrorToMessage;
