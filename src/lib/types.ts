import { InferResponseType } from "hono";
import { client } from "./client";

export type TimetableEvents = InferResponseType<typeof client.week.$get>;
