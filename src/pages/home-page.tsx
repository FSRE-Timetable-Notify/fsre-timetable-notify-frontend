import { FsreError, Timetable } from "@/api/api";
import { client } from "@/api/client";
import ClassCombobox from "@/components/class-combobox";
import TimetableComponent from "@/components/timetable";
import TimetableDatePicker from "@/components/timetable-date-picker";
import { Skeleton } from "@/components/ui/skeleton";
import { handleError } from "@/lib/errors";
import { dateToIsoWeek, isoWeekToDateRange } from "@/lib/utils";
import { useTimetableStudyProgramStore } from "@/store/useTimetableStudyProgramStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SignUpCard from "@/components/sign-up-card";
import { useQuery } from "@tanstack/react-query";

const HomePage: React.FC = () => {
  const [isoWeek, setIsoWeek] = useState<`${number}-W${number}`>(
    dateToIsoWeek(new Date())
  );

  const {
    selectedTimetableStudyProgramId,
    timetableStudyPrograms,
    selectTimetableStudyProgram,
  } = useTimetableStudyProgramStore();

  const {
    data: timetable,
    error,
    isLoading,
    refetch,
  } = useQuery<Timetable, FsreError>({
    queryKey: ["timetable", selectedTimetableStudyProgramId, isoWeek],
    queryFn: async () =>
      (
        await client.timetable.getTimetable({
          studyProgram: selectedTimetableStudyProgramId,
          isoWeek,
        })
      ).data,
  });

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        handleError(error, refetch);
      } else {
        toast.dismiss();
      }
    }
  }, [error, isLoading, refetch]);

  if (timetableStudyPrograms === null || isLoading || timetable === undefined) {
    return (
      <main className="flex h-full w-full flex-col">
        <div className="flex flex-col p-8">
          <h1 className="mb-16 text-center text-2xl font-bold">
            FSRE Timetable
          </h1>
          <div className="mb-8 flex flex-col justify-between gap-2 md:flex-row">
            <Skeleton className="h-16 w-32" />
            <Skeleton className="h-16 w-32" />
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
            timetableStudyPrograms={timetableStudyPrograms}
            selectedTimetableStudyProgramId={selectedTimetableStudyProgramId}
            onTimetableStudyProgramSelected={newTimetableStudyProgram => {
              selectTimetableStudyProgram(newTimetableStudyProgram);
              refetch();
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
        <TimetableComponent
          timetable={timetable}
          isoWeek={isoWeek}
        />
      </div>
      <div className="flex items-center justify-center">
        <SignUpCard timetableStudyPrograms={timetableStudyPrograms} />
      </div>
    </main>
  );
};

export default HomePage;
