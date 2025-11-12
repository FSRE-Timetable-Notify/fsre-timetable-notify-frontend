import { useEffect, useMemo } from "react";

import { useQueryParams } from "@/hooks/useQueryParams";
import { useTimetableStudyProgramStore } from "@/store/useTimetableStudyProgramStore";

export function useTimetableUrlState() {
  const {
    selectedTimetableStudyProgramId,
    selectTimetableStudyProgram,
    timetableStudyPrograms,
  } = useTimetableStudyProgramStore();

  const { getParam, searchParams, setParam, setSearchParams } =
    useQueryParams();

  const selectedTimetableStudyProgramIdParam = useMemo(
    () => getParam("selectedTimetableStudyProgramId"),
    [getParam]
  );

  const effectiveSelectedTimetableStudyProgramId = useMemo(() => {
    const parsed = selectedTimetableStudyProgramIdParam
      ? Number(selectedTimetableStudyProgramIdParam)
      : NaN;
    return Number.isFinite(parsed) ? parsed : selectedTimetableStudyProgramId;
  }, [selectedTimetableStudyProgramIdParam, selectedTimetableStudyProgramId]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!params.get("selectedTimetableStudyProgramId")) {
      params.set(
        "selectedTimetableStudyProgramId",
        String(selectedTimetableStudyProgramId)
      );
      setSearchParams(params, { replace: true });
    }
  }, [selectedTimetableStudyProgramId, searchParams, setSearchParams]);

  const setSelectedProgramAndUrl = (id: number) => {
    selectTimetableStudyProgram(id);

    setParam("selectedTimetableStudyProgramId", String(id));
  };

  return {
    selectedTimetableStudyProgramId: effectiveSelectedTimetableStudyProgramId,
    setSelectedProgram: setSelectedProgramAndUrl,
    setSelectedProgramAndUrl,
    timetableStudyPrograms,
  } as const;
}
