import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface TimetableStudyProgramStore {
  selectedTimetableStudyProgramId: number;
  selectTimetableStudyProgram: (
    selectedTimetableStudyProgramId: number
  ) => void;
  setTimetableStudyPrograms: (
    timetableStudyPrograms: Record<number, string>
  ) => void;
  timetableStudyPrograms: null | Record<number, string>;
}

export const useTimetableStudyProgramStore = create(
  persist<TimetableStudyProgramStore>(
    set => ({
      selectedTimetableStudyProgramId: -55,
      selectTimetableStudyProgram: selectedTimetableStudyProgramId =>
        { set({ selectedTimetableStudyProgramId }); },
      setTimetableStudyPrograms: timetableStudyPrograms =>
        { set({ timetableStudyPrograms }); },
      timetableStudyPrograms: null,
    }),
    {
      name: "timetableStudyPrograms",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
