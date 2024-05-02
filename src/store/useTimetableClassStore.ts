import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TimetableClassStore = {
  timetableClasses: Record<number, string> | null;
  selectedTimetableClassId: number;
  selectTimetableClass: (selectedTimetableClass: number) => void;
  setTimetableClasses: (timetableClasses: Record<number, string>) => void;
};

export const useTimetableClassStore = create(
  persist<TimetableClassStore>(
    set => ({
      timetableClasses: null,
      selectedTimetableClassId: -54,
      selectTimetableClass: selectedTimetableClassId =>
        set({ selectedTimetableClassId }),
      setTimetableClasses: timetableClasses => set({ timetableClasses }),
    }),
    {
      name: "timetableClasses",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
