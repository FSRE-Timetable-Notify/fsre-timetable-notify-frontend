import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format, startOfWeek } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { memo } from "react";
import { DateRange } from "react-day-picker";

type Props = {
  range: DateRange;
  setRange: (range: DateRange) => void;
};

const TimetableDatePicker: React.FC<Props> = ({ range, setRange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !range && "text-muted-foreground"
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {range?.from && range?.to ? (
            `${format(range.from, "LLLL dd. MM.")} - ${format(range.to, "LLLL dd. MM.")}`
          ) : (
            <span>Pick a week</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          showOutsideDays
          fixedWeeks
          ISOWeek
          classNames={{
            day_today: "bg-muted",
          }}
          selected={range}
          onDayClick={day => {
            setRange({
              from: startOfWeek(day),
              to: addDays(startOfWeek(day), 6),
            });
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default memo(TimetableDatePicker);
