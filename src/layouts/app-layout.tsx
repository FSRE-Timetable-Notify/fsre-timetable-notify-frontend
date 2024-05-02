import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/lib/client";
import { ErrorResponse, handleError } from "@/lib/errors";
import { honoFetcher } from "@/lib/fetcher";
import { useTimetableClassStore } from "@/store/useTimetableClassStore";
import { InferResponseType } from "hono";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import useSWR from "swr";

const AppLayout: React.FC = () => {
  const setTimetableClasses = useTimetableClassStore(
    state => state.setTimetableClasses
  );

  const $get = client.db.$get;

  const { data, error, isLoading, mutate } = useSWR<
    InferResponseType<typeof $get>,
    ErrorResponse
  >("/db", honoFetcher($get), {
    onSuccess: () => {
      toast.dismiss();

      if (data !== null && data !== undefined) {
        const newTimetableClasses: Record<number, string> = {};

        data.classes.forEach(timetableClass => {
          newTimetableClasses[timetableClass.id] = timetableClass.name;
        });

        setTimetableClasses(newTimetableClasses);
      }
    },
  });

  if (error) {
    handleError(error, mutate);
  }

  if (isLoading || data === undefined) {
    return (
      <main className="flex h-full w-full flex-col p-8">
        <h1 className="mb-16 text-center text-2xl font-bold">FSRE Timetable</h1>
        <div className="flex h-1/2 w-full gap-8">
          <div className="flex flex-1 flex-col gap-6">
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
          </div>
          <div className="flex flex-[5] gap-4 pt-[5%]">
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
