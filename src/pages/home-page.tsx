import { FsreError, Timetable } from "@/api/api";
import { client } from "@/api/client";
import ClassCombobox from "@/components/class-combobox";
import SignUpCard from "@/components/sign-up-card";
import TimetableDatePicker from "@/components/timetable-date-picker";
import TimetableView from "@/components/timetable-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useTimetableUrlState } from "@/hooks/useTimetableUrlState";
import { dateToIsoWeek, isoWeekToDateRange } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const HomePage: React.FC = () => {
  const {
    timetableStudyPrograms,
    selectedTimetableStudyProgramId,
    isoWeek,
    setSelectedProgram,
    setIsoWeek,
  } = useTimetableUrlState();

  const { data: timetable, isPending } = useQuery<Timetable, FsreError>({
    queryKey: ["timetable", selectedTimetableStudyProgramId, isoWeek],
    queryFn: async () =>
      (
        await client.timetable.getTimetable({
          studyProgram: selectedTimetableStudyProgramId,
          isoWeek,
        })
      ).data,
    placeholderData: keepPreviousData,
  });

  if (
    timetableStudyPrograms === null ||
    (isPending && timetable === undefined)
  ) {
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
              setSelectedProgram(newTimetableStudyProgram);
            }}
          />
          <TimetableDatePicker
            range={isoWeekToDateRange(isoWeek)}
            setRange={range => {
              if (range.from === undefined) return;
              const nextIsoWeek = dateToIsoWeek(
                range.from
              ) as `${number}-W${number}`;
              setIsoWeek(nextIsoWeek);
            }}
          />
        </div>
      </div>
      <div className="h-full w-full overflow-x-auto p-8 pl-0 pt-0 md:p-16 md:pl-0 md:pt-0">
        {timetable === undefined ? (
          <div className="flex min-w-[500px] gap-4 pt-[5%]">
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
          </div>
        ) : (
          <TimetableView
            timetable={timetable}
            isoWeek={isoWeek}
          />
        )}
      </div>
      <div className="flex items-center justify-center">
        <SignUpCard timetableStudyPrograms={timetableStudyPrograms} />
      </div>
    </main>
  );
};

export default HomePage;
