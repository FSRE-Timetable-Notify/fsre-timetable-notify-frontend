import { FsreError } from "@/api/api";

type ErrorTransformer = {
  filter: (e: unknown) => boolean;
  map: (e: any) => string;
};

const errorTransformers: ErrorTransformer[] = [
  {
    filter: (e): e is FsreError =>
      e instanceof Object && "status" in e && "message" in e && "error" in e,
    map: (e: FsreError) => `An error occurred: ${e.message}`,
  },
  {
    filter: (e: unknown): e is Error => e instanceof Error,
    map: (e: Error) => e.message,
  },
  {
    filter: (e: unknown): e is string => typeof e === "string",
    map: (e: string) => e,
  },
];

const mapErrorToMessage = (e: unknown) => {
  const transformer = errorTransformers.find(t => t.filter(e));
  return transformer ? transformer.map(e) : "An unexpected error occurred";
};

export default mapErrorToMessage;
