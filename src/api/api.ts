/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** An error thrown by the FSRE API */
export interface FsreError {
  /**
   * HTTP status code of the error
   * @example "500"
   */
  status:
    | "100 CONTINUE"
    | "101 SWITCHING_PROTOCOLS"
    | "102 PROCESSING"
    | "103 EARLY_HINTS"
    | "103 CHECKPOINT"
    | "200 OK"
    | "201 CREATED"
    | "202 ACCEPTED"
    | "203 NON_AUTHORITATIVE_INFORMATION"
    | "204 NO_CONTENT"
    | "205 RESET_CONTENT"
    | "206 PARTIAL_CONTENT"
    | "207 MULTI_STATUS"
    | "208 ALREADY_REPORTED"
    | "226 IM_USED"
    | "300 MULTIPLE_CHOICES"
    | "301 MOVED_PERMANENTLY"
    | "302 FOUND"
    | "302 MOVED_TEMPORARILY"
    | "303 SEE_OTHER"
    | "304 NOT_MODIFIED"
    | "305 USE_PROXY"
    | "307 TEMPORARY_REDIRECT"
    | "308 PERMANENT_REDIRECT"
    | "400 BAD_REQUEST"
    | "401 UNAUTHORIZED"
    | "402 PAYMENT_REQUIRED"
    | "403 FORBIDDEN"
    | "404 NOT_FOUND"
    | "405 METHOD_NOT_ALLOWED"
    | "406 NOT_ACCEPTABLE"
    | "407 PROXY_AUTHENTICATION_REQUIRED"
    | "408 REQUEST_TIMEOUT"
    | "409 CONFLICT"
    | "410 GONE"
    | "411 LENGTH_REQUIRED"
    | "412 PRECONDITION_FAILED"
    | "413 PAYLOAD_TOO_LARGE"
    | "413 REQUEST_ENTITY_TOO_LARGE"
    | "414 URI_TOO_LONG"
    | "414 REQUEST_URI_TOO_LONG"
    | "415 UNSUPPORTED_MEDIA_TYPE"
    | "416 REQUESTED_RANGE_NOT_SATISFIABLE"
    | "417 EXPECTATION_FAILED"
    | "418 I_AM_A_TEAPOT"
    | "419 INSUFFICIENT_SPACE_ON_RESOURCE"
    | "420 METHOD_FAILURE"
    | "421 DESTINATION_LOCKED"
    | "422 UNPROCESSABLE_ENTITY"
    | "423 LOCKED"
    | "424 FAILED_DEPENDENCY"
    | "425 TOO_EARLY"
    | "426 UPGRADE_REQUIRED"
    | "428 PRECONDITION_REQUIRED"
    | "429 TOO_MANY_REQUESTS"
    | "431 REQUEST_HEADER_FIELDS_TOO_LARGE"
    | "451 UNAVAILABLE_FOR_LEGAL_REASONS"
    | "500 INTERNAL_SERVER_ERROR"
    | "501 NOT_IMPLEMENTED"
    | "502 BAD_GATEWAY"
    | "503 SERVICE_UNAVAILABLE"
    | "504 GATEWAY_TIMEOUT"
    | "505 HTTP_VERSION_NOT_SUPPORTED"
    | "506 VARIANT_ALSO_NEGOTIATES"
    | "507 INSUFFICIENT_STORAGE"
    | "508 LOOP_DETECTED"
    | "509 BANDWIDTH_LIMIT_EXCEEDED"
    | "510 NOT_EXTENDED"
    | "511 NETWORK_AUTHENTICATION_REQUIRED";
  /**
   * Error code of the error
   * @example "Internal Server Error"
   */
  error: string;
  /**
   * An message which describes the error
   * @example "An error occurred while processing the request"
   */
  message: string;
  /**
   * Optional details of the error
   * @example "The request failed because the network is unreachable"
   */
  details?: string;
}

/** DTO to subscribe an email to a specific study program */
export interface MessagingSubscribeDto {
  /** The email of the subscriber */
  email?: string;
  /** The FCM token of the subscriber */
  fcmToken?: string;
  /**
   * The ID of the study program to subscribe to
   * @format int64
   */
  studyProgramId: number;
}

/** A subscription to receive messages */
export interface MessagingSubscription {
  /**
   * The ID of the subscription
   * @format uuid
   */
  id: string;
  /** The FCM token of the subscription */
  fcmToken?: string;
  /** The email of the subscription */
  email?: string;
  /**
   * The ID of the study program to subscribe to
   * @format int64
   */
  studyProgramId: number;
}

/** The timetable for a week */
export interface Timetable {
  /** The event list for Monday */
  monday: TimetableEvent[];
  /** The event list for Tuesday */
  tuesday: TimetableEvent[];
  /** The event list for Wednesday */
  wednesday: TimetableEvent[];
  /** The event list for Thursday */
  thursday: TimetableEvent[];
  /** The event list for Friday */
  friday: TimetableEvent[];
  /** The event list for Saturday */
  saturday: TimetableEvent[];
  /** The event list for Sunday */
  sunday: TimetableEvent[];
}

/** A single event in the timetable */
export interface TimetableEvent {
  /**
   * The ID of the event
   * @format int64
   */
  id: number;
  /** Name of the event */
  name: string;
  /**
   * Start date and time of the event
   * @format date-time
   */
  startDate: string;
  /**
   * End date and time of the event
   * @format date-time
   */
  endDate: string;
  /** The IDs of the study programs this event is intended for */
  studyProgramIds: number[];
  /** The IDs of the classrooms the event will take place in */
  classRoomIds: number[];
  /** The IDs of the teachers that will teach this event */
  teacherIds: number[];
  /** The readable names of the study programs this event is intended for */
  studyProgramNames: string[];
  /** The readable names of the classrooms the event will take place in */
  classRoomNames: string[];
  /** The readable names of the teachers that will teach this event */
  teacherNames: string[];
}

/** A pair of an ID and a name, used in the timetable database */
export interface IdNamePairLong {
  /**
   * The ID of the item
   * @format int64
   */
  id: number;
  /** The name of the item */
  name: string;
}

/** A pair of an ID and a name, used in the timetable database */
export interface IdNamePairString {
  /** The ID of the item */
  id: string;
  /** The name of the item */
  name: string;
}

/** The database of timetable definitions (names of subjects, teachers, etc.) */
export interface TimetableDatabase {
  /** List of study programs (id of the study program and readable name) */
  studyPrograms: IdNamePairLong[];
  /** List of classrooms (id of the classroom and readable name) */
  classRooms: IdNamePairLong[];
  /** List of event types (id of the event type and readable name) */
  eventTypes: IdNamePairString[];
  /** List of subjects (id of the subject and readable name) */
  subjects: IdNamePairLong[];
  /** List of teachers (id of the teacher and readable name) */
  teachers: IdNamePairLong[];
}

export namespace Messaging {
  /**
   * No description
   * @tags messaging-controller
   * @name Unsubscribe
   * @summary Unsubscribe from a study program for a specific email and/or FCM token
   * @request POST:/messaging/unsubscribe
   * @response `200` `void` Successfully unsubscribed from a topic
   * @response `409` `FsreError` Messaging Subscription Already Registered
   */
  export namespace Unsubscribe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MessagingSubscribeDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags messaging-controller
   * @name Subscribe
   * @summary Subscribe to a study program using an email and/or FCM token
   * @request POST:/messaging/subscribe
   * @response `200` `MessagingSubscription` Successfully subscribed to a topic
   * @response `409` `FsreError` Messaging Subscription Already Registered
   */
  export namespace Subscribe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MessagingSubscribeDto;
    export type RequestHeaders = {};
    export type ResponseBody = MessagingSubscription;
  }
}

export namespace Timetable {
  /**
   * No description
   * @tags timetable-controller
   * @name GetTimetable
   * @summary Get the timetable data for a study program
   * @request GET:/timetable
   * @response `200` `Timetable` Timetable data retrieved successfully
   * @response `400` `FsreError` Failed to parse ISO week
   * @response `502` `FsreError` Bad Gateway
   */
  export namespace GetTimetable {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Study program
       * @format int64
       * @example -54
       */
      studyProgram: number;
      /**
       * ISO week
       * @example "2024-W09"
       */
      isoWeek: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Timetable;
  }
}

export namespace TimetableDatabase {
  /**
   * No description
   * @tags timetable-database-controller
   * @name GetTimetableDatabase
   * @summary Get the timetable definitions database for the current study year
   * @request GET:/timetable-database
   * @response `200` `TimetableDatabase` Timetable database retrieved successfully
   */
  export namespace GetTimetableDatabase {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TimetableDatabase;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:5000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      key => "undefined" !== typeof query[key]
    );
    return keys
      .map(key =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async response => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch(e => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:5000
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  messaging = {
    /**
     * No description
     *
     * @tags messaging-controller
     * @name Unsubscribe
     * @summary Unsubscribe from a study program for a specific email and/or FCM token
     * @request POST:/messaging/unsubscribe
     * @response `200` `void` Successfully unsubscribed from a topic
     * @response `409` `FsreError` Messaging Subscription Already Registered
     */
    unsubscribe: (data: MessagingSubscribeDto, params: RequestParams = {}) =>
      this.request<void, FsreError>({
        path: `/messaging/unsubscribe`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags messaging-controller
     * @name Subscribe
     * @summary Subscribe to a study program using an email and/or FCM token
     * @request POST:/messaging/subscribe
     * @response `200` `MessagingSubscription` Successfully subscribed to a topic
     * @response `409` `FsreError` Messaging Subscription Already Registered
     */
    subscribe: (data: MessagingSubscribeDto, params: RequestParams = {}) =>
      this.request<MessagingSubscription, FsreError>({
        path: `/messaging/subscribe`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  timetable = {
    /**
     * No description
     *
     * @tags timetable-controller
     * @name GetTimetable
     * @summary Get the timetable data for a study program
     * @request GET:/timetable
     * @response `200` `Timetable` Timetable data retrieved successfully
     * @response `400` `FsreError` Failed to parse ISO week
     * @response `502` `FsreError` Bad Gateway
     */
    getTimetable: (
      query: {
        /**
         * Study program
         * @format int64
         * @example -54
         */
        studyProgram: number;
        /**
         * ISO week
         * @example "2024-W09"
         */
        isoWeek: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<Timetable, FsreError>({
        path: `/timetable`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  timetableDatabase = {
    /**
     * No description
     *
     * @tags timetable-database-controller
     * @name GetTimetableDatabase
     * @summary Get the timetable definitions database for the current study year
     * @request GET:/timetable-database
     * @response `200` `TimetableDatabase` Timetable database retrieved successfully
     */
    getTimetableDatabase: (params: RequestParams = {}) =>
      this.request<TimetableDatabase, any>({
        path: `/timetable-database`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
