import ClassCombobox from "@/components/class-combobox";
import Timetable from "@/components/timetable";
import TimetableDatePicker from "@/components/timetable-date-picker";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/lib/client";
import { ErrorResponse, handleError } from "@/lib/errors";
import { honoFetcher } from "@/lib/fetcher";
import { dateToIsoWeek, isoWeekToDateRange } from "@/lib/utils";
import { useTimetableClassStore } from "@/store/useTimetableClassStore";
import { InferResponseType } from "hono";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const HomePage: React.FC = () => {
  const [isoWeek, setIsoWeek] = useState<`${number}-W${number}`>(
    dateToIsoWeek(new Date())
  );

  const { selectedTimetableClassId, timetableClasses, selectTimetableClass } =
    useTimetableClassStore();

  const $get = client.week.$get;
  const {
    data: timetableEvents,
    error,
    isLoading,
    mutate,
  } = useSWR<InferResponseType<typeof $get>, ErrorResponse>(
    `/week?classId=${selectedTimetableClassId.toString()}&isoWeek=${isoWeek}`,
    honoFetcher(() =>
      $get({ query: { classId: selectedTimetableClassId.toString(), isoWeek } })
    ),
    {
      onSuccess: () => {
        toast.dismiss();
      },
    }
  );

  if (error) {
    handleError(error, mutate);
  }

  if (timetableClasses === null || isLoading || timetableEvents === undefined) {
    return (
      <main className="flex h-full w-full flex-col">
        <div className="flex flex-col p-8">
          <h1 className="mb-16 text-center text-2xl font-bold">
            FSRE Timetable
          </h1>
          <div className="mb-8 flex flex-col justify-between gap-2 md:flex-row">
            <ClassCombobox
              timetableClasses={timetableClasses}
              selectedTimetableClass={selectedTimetableClassId}
              selectTimetableClass={newTimetableClass => {
                selectTimetableClass(newTimetableClass);
                mutate();
              }}
            />
            <TimetableDatePicker
              range={isoWeekToDateRange(isoWeek)}
              setRange={range => {
                if (range.from === undefined) return;

                setIsoWeek(dateToIsoWeek(range.from));
              }}
            />
          </div>
        </div>
        <div className="flex h-full min-h-[600px] w-full gap-8 overflow-x-auto p-8 pt-0">
          <div className="flex min-w-[100px] flex-1 flex-col gap-6">
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
          </div>
          <div className="flex min-w-[500px] flex-[5] gap-4 pt-[5%]">
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
    <main className="flex h-full w-full flex-col">
      <div className="flex flex-col p-8">
        <h1 className="mb-16 text-center text-2xl font-bold">FSRE Timetable</h1>
        <div className="mb-8 flex flex-col justify-between gap-2 md:flex-row">
          <ClassCombobox
            timetableClasses={timetableClasses}
            selectedTimetableClass={selectedTimetableClassId}
            selectTimetableClass={newTimetableClass => {
              selectTimetableClass(newTimetableClass);
              mutate();
            }}
          />
          <TimetableDatePicker
            range={isoWeekToDateRange(isoWeek)}
            setRange={range => {
              if (range.from === undefined) return;

              setIsoWeek(dateToIsoWeek(range.from));
            }}
          />
        </div>
      </div>
      <div className="h-full w-full overflow-x-auto p-8 pl-0 pt-0 md:p-16 md:pl-0 md:pt-0">
        <Timetable timetableEvents={timetableEvents} />
      </div>
    </main>
  );
};

export default HomePage;
