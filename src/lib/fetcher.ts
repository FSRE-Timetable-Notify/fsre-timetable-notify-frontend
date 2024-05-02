import { Fetcher } from "swr";
import {
  ErrorResponse,
  errorResponseSchema,
  ErrorStatusCode,
  FetchException,
  HttpException,
} from "@/lib/errors";
import { z } from "zod";
import {
  ClientRequestOptions,
  InferRequestType,
  InferResponseType,
} from "hono";
import { ClientResponse } from "hono/client";

export type FetcherOptions<
  TResponseBodySchema extends z.Schema,
  TRequestBodySchema extends z.Schema,
> = {
  fetchFunction: (url: string, options: RequestInit) => Promise<Response>;
  schemas: {
    requestBody?: TRequestBodySchema;
    responseBody?: TResponseBodySchema;
  };
  fetchOptions: RequestInit;
};

/**
 * A SWR-specific utility type-safe fetch wrapper function.
 *
 * @example
 * ```tsx
 * const { data, error, isLoading } = useSWR("/posts", fetcher(
 *   {
 *     fetchFunction: fetch,
 *     schemas: {
 *       responseBody: z.array(
 *         z.object({
 *           id: z.number(),
 *           title: z.string(),
 *           body: z.string(),
 *         })
 *       ),
 *     },
 *     fetchOptions: {
 *       headers: {
 *         "Authorization": "Bearer <token>",
 *       },
 *     },
 *   }
 * ));
 * ```
 *
 * @param options Fetch wrapper options. You can either use a fetch function (along with options for the fetch function and Zod schemas for validation) or a data function which returns the data directly.
 * @param options.schemas Request and response Zod schemas for runtime validation and compile-type checking. Empty by default.
 * @param options.options Fetch request options. Empty by default.
 * @param options.fetchFunction Fetch function to use. Default is `fetch`.
 *
 * @returns A fetch function that can be used with SWR.
 */
export const fetcher = <
  TResponseBodySchema extends z.Schema,
  TRequestBodySchema extends z.Schema,
>(
  options: FetcherOptions<TResponseBodySchema, TRequestBodySchema> = {
    schemas: {},
    fetchOptions: {},
    fetchFunction: fetch,
  }
): Fetcher<z.infer<TResponseBodySchema>, string> => {
  return async url => {
    let response: Response;
    try {
      response = await options.fetchFunction(url, options.fetchOptions);
    } catch (e) {
      console.error(e);

      throw new FetchException(`Network error. Error: ${e}`);
    }

    let json: any;
    try {
      json = await response.json();
    } catch (e) {
      console.error(e);

      throw new FetchException(`Failed to parse response body. Error: ${e}`);
    }

    if (!response.ok) {
      const result = errorResponseSchema.safeParse(json);

      if (!result.success) {
        console.error(result.error);

        throw new HttpException(
          result.error.errors.map(e => e.message),
          "Request failed. Failed to parse error response.",
          response.status as ErrorStatusCode
        );
      }

      const errorJson = result.data;

      throw new HttpException(
        errorJson.message,
        errorJson.cause,
        response.status as ErrorStatusCode
      );
    }

    let body: z.infer<TResponseBodySchema>;
    if (options.schemas.responseBody) {
      const result = options.schemas.responseBody.safeParse(json);

      if (!result.success) {
        console.error(result.error);

        throw new FetchException(
          `Response data invalid. Reasons: ${result.error.errors.map(e => e.message).join(", ")}`
        );
      }

      body = result.data;
    } else {
      body = json;
    }

    return body;
  };
};

export type HonoFunction<TInput, TOutput> = (
  args?: TInput,
  options?: ClientRequestOptions
) => Promise<ClientResponse<TOutput>>;

/**
 * A SWR-specific utility type-safe fetch wrapper function for the hono/client RPC client.
 *
 * @example
 * ```tsx
 * const { data, error, isLoading } = useSWR("/posts", honoFetcher(client.posts.$get));
 * ```
 *
 * @param url URL to fetch.
 * @param arg Hono request data object.
 *
 * @returns A fetch function that can be used with SWR.
 */
export const honoFetcher = <
  T extends HonoFunction<InferRequestType<T>, InferResponseType<T>>,
>(
  honoFunction: T,
  args?: InferRequestType<T>,
  options?: ClientRequestOptions
): Fetcher<InferResponseType<T>, string> => {
  return async () => {
    let response: ClientResponse<unknown>;
    try {
      response = await honoFunction(args, options);
    } catch (e) {
      throw new FetchException(`Failed to fetch data. Error: ${e}`);
    }

    let json: InferResponseType<T> | ErrorResponse;
    try {
      json = await response.json();
    } catch (e) {
      console.log(e);

      throw new FetchException(`Failed to parse response body. Error: ${e}`);
    }

    if (!response.ok) {
      const result = errorResponseSchema.safeParse(json);

      if (!result.success) {
        console.error(result.error);

        throw new HttpException(
          result.error.errors.map(e => e.message),
          "Request failed. Failed to parse error response.",
          response.status as ErrorStatusCode
        );
      }

      const errorJson = result.data;

      throw new HttpException(
        errorJson.message,
        errorJson.cause,
        response.status as ErrorStatusCode,
        errorJson.data
      );
    }

    return json;
  };
};
