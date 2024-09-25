import {
  cn,
  formatDate,
  formatDayMonth,
  formatShortWeekDay,
  formatTime,
  isoWeekToWeekStartDate,
  range,
} from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { addDays } from "date-fns";
import type { Timetable, TimetableEvent } from "@/api/api";

type Props = {
  timetable: Timetable;
  isoWeek: `${number}-W${number}`;
};

const Timetable: React.FC<Props> = ({ timetable, isoWeek }) => {
  const timetableEvents = (Object.values(timetable) as TimetableEvent[]).flat();

  const weekDays = range(5).map(i => ({
    label: formatShortWeekDay(addDays(isoWeekToWeekStartDate(isoWeek), i)),
    date: formatDayMonth(addDays(isoWeekToWeekStartDate(isoWeek), i)),
  }));

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
        <tr className="absolute ml-[16.66%] grid h-full w-5/6 grid-cols-5 grid-rows-[repeat(48,minmax(0,1fr))]">
          {timetableEvents.map(timetableEvent => {
            const startDate = new Date(timetableEvent.startDate);
            const endDate = new Date(timetableEvent.endDate);

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

            const isOverlappedWithAnotherEvent = timetableEvents.some(
              event =>
                event.id !== timetableEvent.id &&
                new Date(event.startDate).getTime() < endDate.getTime() &&
                new Date(event.endDate).getTime() > startDate.getTime()
            );

            const isSecondEventInOverlapCase =
              isOverlappedWithAnotherEvent &&
              timetableEvents.some(
                event =>
                  event.id !== timetableEvent.id &&
                  new Date(event.startDate).getTime() < endDate.getTime() &&
                  new Date(event.endDate).getTime() > startDate.getTime() &&
                  new Date(event.startDate).getTime() < startDate.getTime()
              );

            return (
              <td
                key={timetableEvent.id + timetableEvent.startDate}
                style={{
                  gridRowStart: startIndex,
                  gridRowEnd: endIndex,
                  gridColumn: startDate.getDay(),
                }}
                className="m-px rounded-md">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        "flex h-full justify-between bg-primary/90 p-1 text-primary-foreground hover:bg-primary/80",
                        isSmall ? "flex-row-reverse" : "flex-col",
                        isOverlappedWithAnotherEvent
                          ? "w-[calc(50%-1px)]"
                          : "w-full",
                        isSecondEventInOverlapCase ? "ml-auto" : ""
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
                          <span>{formatDate(timetableEvent.startDate)}</span>
                          <span>
                            {`${formatTime({ date: timetableEvent.startDate })} - ${formatTime({ date: timetableEvent.endDate })}`}
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
            {range(5).map(m => (
              <td
                className="border border-border/40"
                key={m}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Timetable;
