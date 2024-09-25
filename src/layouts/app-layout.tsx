import { FsreError, TimetableDatabase } from "@/api/api";
import { client } from "@/api/client";
import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTimetableStudyProgramStore } from "@/store/useTimetableStudyProgramStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";

const AppLayout: React.FC = () => {
  const setTimetableStudyPrograms = useTimetableStudyProgramStore(
    state => state.setTimetableStudyPrograms
  );

  const { data, isLoading } = useQuery<TimetableDatabase, FsreError>({
    queryKey: ["timetable-database"],
    queryFn: async () =>
      (await client.timetableDatabase.getTimetableDatabase()).data,
  });

  useEffect(() => {
    if (!isLoading && data !== null && data !== undefined) {
      toast.dismiss();

      const newTimetableStudyPrograms: Record<number, string> = {};

      data.studyPrograms.forEach(studyProgram => {
        newTimetableStudyPrograms[studyProgram.id] = studyProgram.name;
      });

      setTimetableStudyPrograms(newTimetableStudyPrograms);
    }
  }, [data, isLoading, setTimetableStudyPrograms]);

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
