import type { Timetable, TimetableEvent } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNow } from "@/hooks/useNow";
import {
  cn,
  dateToIsoWeek,
  formatDate,
  formatDayMonth,
  formatShortWeekDay,
  formatTime,
  getDaysInTimetable,
  isoWeekToWeekStartDate,
  range,
} from "@/lib/utils";
import { addDays } from "date-fns";
import { useMemo } from "react";

type Props = {
  timetable: Timetable;
  isoWeek: `${number}-W${number}`;
};

const TimetableView: React.FC<Props> = ({ timetable, isoWeek }) => {
  const timetableEvents = (Object.values(timetable) as TimetableEvent[]).flat();

  const daysInTimetable = useMemo(
    () => getDaysInTimetable(timetable),
    [timetable]
  );

  const weekDays = range(daysInTimetable).map(i => ({
    label: formatShortWeekDay(addDays(isoWeekToWeekStartDate(isoWeek), i)),
    date: formatDayMonth(addDays(isoWeekToWeekStartDate(isoWeek), i)),
  }));

  const now = useNow();

  // distance of the "now line" from the top of the timetable in percent
  // must be clamped between 0% (08:00) and 100% (20:00)
  const topPercent = useMemo(() => {
    const minutes =
      now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    const min = 8 * 60;
    const max = 20 * 60;
    const clamped = Math.min(Math.max(minutes, min), max);
    return ((clamped - min) / (max - min)) * 100;
  }, [now]);

  // don't show "now line" if not in the current week
  const showTimeLine = useMemo(() => {
    const isCurrentWeek = dateToIsoWeek(now) === isoWeek;
    return isCurrentWeek;
  }, [now, isoWeek]);

  const leftPercent = useMemo(() => {
    const zeroBasedIndex = Math.min(
      Math.max(now.getDay() - 1, 0),
      daysInTimetable - 1
    );
    const width = daysInTimetable > 0 ? 100 / daysInTimetable : 0;
    return zeroBasedIndex * width;
  }, [now, daysInTimetable]);

  return (
    <table className="w-full min-w-[500px] table-fixed">
      <thead>
        <tr>
          <th className="pb-8"></th>
          {weekDays.map(day => {
            return (
              <th
                key={day.label}
                className="pb-8">
                <p>{day.label}</p>
                <p className="text-sm font-normal text-muted-foreground">
                  {day.date}
                </p>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="relative">
        {showTimeLine && (
          <tr>
            <td>
              <Tooltip>
                <div
                  className="absolute z-20 ml-[16.66%] w-5/6"
                  style={{ top: `${topPercent}%` }}>
                  <TooltipTrigger
                    className="group relative top-1/2 h-4 -translate-y-1/2"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${100 / daysInTimetable}%`,
                    }}>
                    <div className="absolute inset-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-rose-500/90 group-hover:h-[4px]" />
                  </TooltipTrigger>
                </div>
                <TooltipContent className="border-border/40 bg-transparent bg-gradient-to-t from-background to-background/80">
                  <span>{formatTime({ date: now })}</span>
                </TooltipContent>
              </Tooltip>
            </td>
          </tr>
        )}
        <tr
          className={cn(
            "absolute ml-[16.66%] grid h-full w-5/6 grid-rows-[repeat(48,minmax(0,1fr))]",
            {
              "grid-cols-7": daysInTimetable === 7,
              "grid-cols-6": daysInTimetable === 6,
              "grid-cols-5": daysInTimetable === 5,
            }
          )}>
          {timetableEvents.map(timetableEvent => {
            const startDate = new Date(timetableEvent.startDateTime);
            const endDate = new Date(timetableEvent.endDateTime);

            const startIndex =
              startDate.getHours() <= 8 && startDate.getMinutes() < 15
                ? 1
                : (startDate.getHours() - 8) * 4 +
                  1 +
                  startDate.getMinutes() / 15;
            const endIndex =
              endDate.getHours() >= 20
                ? 49
                : (endDate.getHours() - 8) * 4 + 1 + endDate.getMinutes() / 15;

            const isSmall = endIndex - startIndex <= 6;

            // check for both left and right events
            // events can have the same id or name, and can have the same start and end dates
            // only way to differentiate them is to check their id and name
            // the first and second events are positioned either using id (lower value is left) or name (lower alphabetically is left)
            const isOverlappedWithAnotherEvent = timetableEvents.some(event => {
              return (
                (event.id !== timetableEvent.id ||
                  event.name !== timetableEvent.name) &&
                new Date(event.startDateTime).getTime() < endDate.getTime() &&
                new Date(event.endDateTime).getTime() > startDate.getTime()
              );
            });

            // the second event is higher in id value or alphabetically by nae
            const isSecondEventInOverlapCase = timetableEvents.some(event => {
              return (
                (event.id !== timetableEvent.id ||
                  event.name !== timetableEvent.name) &&
                new Date(event.startDateTime).getTime() < endDate.getTime() &&
                new Date(event.endDateTime).getTime() > startDate.getTime() &&
                (event.id < timetableEvent.id ||
                  event.name < timetableEvent.name)
              );
            });

            return (
              <td
                key={
                  timetableEvent.id +
                  timetableEvent.name +
                  timetableEvent.startDateTime
                }
                style={{
                  gridRowStart: startIndex,
                  gridRowEnd: endIndex,
                  gridColumn: startDate.getDay(),
                }}
                className={cn(
                  "m-px rounded-md",
                  isOverlappedWithAnotherEvent
                    ? "w-[calc(50%-2px)]"
                    : "w-unset",
                  isSecondEventInOverlapCase ? "ml-auto" : ""
                )}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        "flex h-full justify-between bg-primary/90 p-1 text-primary-foreground hover:bg-primary/80",
                        isSmall ? "flex-row-reverse" : "flex-col",
                        "w-full"
                      )}
                      variant="secondary">
                      <span
                        className={cn(
                          "ml-auto text-xs",
                          isSmall ? "mb-auto" : ""
                        )}>
                        {timetableEvent.classRoomNames.join("/")}
                      </span>
                      <h3
                        className={cn(
                          "w-full whitespace-normal px-2 font-bold",
                          isSmall
                            ? "line-clamp-1 text-base"
                            : "line-clamp-3 text-lg"
                        )}>
                        {timetableEvent.name}
                      </h3>
                      {!isSmall && (
                        <span className="line-clamp-1 w-full text-xs">
                          {timetableEvent.teacherNames}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent asChild>
                    <Card className="min-w-min border-border/40 bg-transparent bg-gradient-to-t from-background to-background/80 p-0">
                      <CardHeader className="pb-0">
                        <CardTitle className="whitespace-nowrap text-xl">
                          {timetableEvent.name}
                        </CardTitle>
                        <CardDescription className="flex flex-col">
                          <span>
                            {formatDate(new Date(timetableEvent.startDateTime))}
                          </span>
                          <span>
                            {`${formatTime({ date: new Date(timetableEvent.startDateTime) })} - ${formatTime({ date: new Date(timetableEvent.endDateTime) })}`}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <Separator className="my-4" />
                      <CardContent>
                        <p>Nastavnik: {timetableEvent.teacherNames}</p>
                        <p>
                          Učionic
                          {timetableEvent.classRoomNames.length > 1 ? "e" : "a"}
                          : {timetableEvent.classRoomNames.join(", ")}
                        </p>
                      </CardContent>
                    </Card>
                  </PopoverContent>
                </Popover>
              </td>
            );
          })}
        </tr>
        {range(12).map(n => (
          <tr key={n}>
            <th className="py-2">
              <div className="flex flex-col">
                <h3>{n + 1}</h3>
                <span className="text-xs font-medium">
                  {`${formatTime({ h: 8 + n, m: 15 })} - ${formatTime({ h: 8 + n + 1, m: 0 })}`}
                </span>
              </div>
            </th>
            {range(daysInTimetable).map(m => (
              <td
                className="border border-border"
                key={m}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimetableView;
