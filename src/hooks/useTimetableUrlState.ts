import { useEffect, useMemo, useState } from "react";

import { useQueryParams } from "@/hooks/useQueryParams";
import { dateToIsoWeek } from "@/lib/utils";
import { useTimetableStudyProgramStore } from "@/store/useTimetableStudyProgramStore";

type IsoWeek = `${number}-W${number}`;

const ISO_WEEK_REGEX = /^\d{4}-W\d{1,2}$/;

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

  const isoWeekParam = useMemo(() => getParam("isoWeek"), [getParam]);

  const [isoWeek, setIsoWeek] = useState<IsoWeek>(() => {
    return isoWeekParam && ISO_WEEK_REGEX.test(isoWeekParam)
      ? (isoWeekParam as IsoWeek)
      : dateToIsoWeek(new Date());
  });

  const effectiveSelectedTimetableStudyProgramId = useMemo(() => {
    const parsed = selectedTimetableStudyProgramIdParam
      ? Number(selectedTimetableStudyProgramIdParam)
      : NaN;
    return Number.isFinite(parsed) ? parsed : selectedTimetableStudyProgramId;
  }, [selectedTimetableStudyProgramIdParam, selectedTimetableStudyProgramId]);

  const effectiveIsoWeek: IsoWeek =
    isoWeekParam && ISO_WEEK_REGEX.test(isoWeekParam)
      ? (isoWeekParam as IsoWeek)
      : isoWeek;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let changed = false;

    if (!params.get("selectedTimetableStudyProgramId")) {
      params.set(
        "selectedTimetableStudyProgramId",
        String(selectedTimetableStudyProgramId)
      );

      changed = true;
    }
    if (!params.get("isoWeek")) {
      params.set("isoWeek", isoWeek);

      changed = true;
    }

    if (changed) setSearchParams(params, { replace: true });
  }, [selectedTimetableStudyProgramId, isoWeek, searchParams, setSearchParams]);

  const setSelectedProgramAndUrl = (id: number) => {
    selectTimetableStudyProgram(id);

    setParam("selectedTimetableStudyProgramId", String(id));
  };

  const setIsoWeekAndUrl = (next: IsoWeek) => {
    setIsoWeek(next);

    setParam("isoWeek", next);
  };

  return {
    isoWeek: effectiveIsoWeek,
    selectedTimetableStudyProgramId: effectiveSelectedTimetableStudyProgramId,
    setIsoWeek: setIsoWeekAndUrl,
    setIsoWeekAndUrl,
    setSelectedProgram: setSelectedProgramAndUrl,
    setSelectedProgramAndUrl,
    timetableStudyPrograms,
  } as const;
}
