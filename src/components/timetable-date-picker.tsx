import { addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
  const weekOptions = { weekStartsOn: 1 as const };

  const handleNavigate = (direction: "next" | "prev") => {
    if (!range?.from) return;

    const step = direction === "next" ? 1 : -1;
    const normalizedStart = startOfWeek(range.from, weekOptions);
    const newFrom = addWeeks(normalizedStart, step);
    const newTo = endOfWeek(newFrom, weekOptions);

    setRange({ from: newFrom, to: newTo });
  };

  return (
    <div className="flex gap-2 max-md:mx-auto xl:px-16">
      <Button
        onClick={() => {
          handleNavigate("prev");
        }}
        size="icon"
        variant="outline">
        <ChevronLeft />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "justify-start text-left font-normal",
              !range && "text-muted-foreground"
            )}
            variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from && range.to ? (
              `${format(range.from, "LLLL dd. MM.")} - ${format(range.to, "LLLL dd. MM.")}`
            ) : (
              <span>Pick a week</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="border-border p-0">
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
                from: startOfWeek(day, weekOptions),
                to: endOfWeek(day, weekOptions),
              });
            }}
            showOutsideDays
          />
        </PopoverContent>
      </Popover>
      <Button
        onClick={() => {
          handleNavigate("next");
        }}
        size="icon"
        variant="outline">
        <ChevronRight />
      </Button>
    </div>
  );
};

export default memo(TimetableDatePicker);
