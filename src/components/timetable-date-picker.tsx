import { endOfWeek, format, startOfWeek } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { memo } from "react";
import { type DateRange, rangeIncludesDate } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  range?: DateRange;
  setRange: (range: DateRange | undefined) => void;
}

const TimetableDatePicker: React.FC<Props> = ({ range, setRange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "justify-start text-left font-normal",
            !range && "text-muted-foreground"
          )}
          variant={"outline"}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {range?.from && range.to ? (
            `${format(range.from, "LLLL dd. MM.")} - ${format(range.to, "LLLL dd. MM.")}`
          ) : (
            <span>Pick a week</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          className="h-full w-full rounded-md"
          classNames={{
            today: "bg-muted rounded-md",
          }}
          ISOWeek
          modifiers={{
            range_end: range?.to,
            range_middle: (date: Date) =>
              range ? rangeIncludesDate(range, date, true) : false,
            range_start: range?.from,
            selected: range,
          }}
          onDayClick={(day, modifiers) => {
            if (modifiers.selected) {
              setRange(undefined);
              return;
            }
            setRange({
              from: startOfWeek(day),
              to: endOfWeek(day),
            });
          }}
          showOutsideDays
        />
      </PopoverContent>
    </Popover>
  );
};

export default memo(TimetableDatePicker);
