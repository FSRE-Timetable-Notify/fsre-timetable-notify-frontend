import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TimetableStudyProgramStore = {
  timetableStudyPrograms: Record<number, string> | null;
  selectedTimetableStudyProgramId: number;
  selectTimetableStudyProgram: (
    selectedTimetableStudyProgramId: number
  ) => void;
  setTimetableStudyPrograms: (
    timetableStudyPrograms: Record<number, string>
  ) => void;
};

export const useTimetableStudyProgramStore = create(
  persist<TimetableStudyProgramStore>(
    set => ({
      timetableStudyPrograms: null,
      selectedTimetableStudyProgramId: -55,
      selectTimetableStudyProgram: selectedTimetableStudyProgramId =>
        set({ selectedTimetableStudyProgramId }),
      setTimetableStudyPrograms: timetableStudyPrograms =>
        set({ timetableStudyPrograms }),
    }),
    {
      name: "timetableStudyPrograms",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
