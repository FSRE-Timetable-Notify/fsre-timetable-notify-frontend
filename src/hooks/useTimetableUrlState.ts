import { dateToIsoWeek } from "@/lib/utils";
import { useTimetableStudyProgramStore } from "@/store/useTimetableStudyProgramStore";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

type IsoWeek = `${number}-W${number}`;

const ISO_WEEK_REGEX = /^\d{4}-W\d{1,2}$/;

export function useTimetableUrlState() {
  const {
    selectedTimetableStudyProgramId,
    timetableStudyPrograms,
    selectTimetableStudyProgram,
  } = useTimetableStudyProgramStore();

  const [isoWeek, setIsoWeek] = useState<IsoWeek>(dateToIsoWeek(new Date()));

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const selectedTimetableStudyProgramIdParam = searchParams.get(
    "selectedTimetableStudyProgramId"
  );
  const isoWeekParam = searchParams.get("isoWeek");

  useEffect(() => {
    if (
      isoWeekParam &&
      ISO_WEEK_REGEX.test(isoWeekParam) &&
      isoWeekParam !== isoWeek
    ) {
      setIsoWeek(isoWeekParam as IsoWeek);
    }
  }, [isoWeekParam, isoWeek]);

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
    const params = new URLSearchParams(location.search);
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
  }, [
    selectedTimetableStudyProgramId,
    isoWeek,
    location.search,
    setSearchParams,
  ]);

  const setSelectedProgramAndUrl = (id: number) => {
    selectTimetableStudyProgram(id);

    const params = new URLSearchParams(searchParams);
    params.set("selectedTimetableStudyProgramId", String(id));

    setSearchParams(params);
  };

  const setIsoWeekAndUrl = (next: IsoWeek) => {
    setIsoWeek(next);

    const params = new URLSearchParams(searchParams);
    params.set("isoWeek", next);

    setSearchParams(params);
  };

  return {
    timetableStudyPrograms,
    selectedTimetableStudyProgramId: effectiveSelectedTimetableStudyProgramId,
    isoWeek: effectiveIsoWeek,
    setSelectedProgram: setSelectedProgramAndUrl,
    setIsoWeek: setIsoWeekAndUrl,
  } as const;
}
