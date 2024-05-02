import { FetchException, HttpException } from "@/lib/errors";

type ErrorTransformer = {
  filter: (e: unknown) => boolean;
  map: (e: any) => string;
};

const errorTransformers: ErrorTransformer[] = [
  {
    filter: (e): e is FetchException => e instanceof FetchException,
    map: (e: FetchException) => "Connection error: " + e.message,
  },
  {
    filter: (e: unknown): e is HttpException => e instanceof HttpException,
    map: (e: HttpException) => `${e.statusCode} ${e.cause} error: ${e.message}`,
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
