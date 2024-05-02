import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";

type Props = {
  timetableClasses: Record<number, string> | null;
  selectedTimetableClass: number;
  selectTimetableClass?: (timetableClassId: number) => void;
};

const ClassCombobox: React.FC<Props> = ({
  timetableClasses,
  selectedTimetableClass,
  selectTimetableClass,
}) => {
  const timetableClassItems =
    timetableClasses === null
      ? null
      : Object.entries(timetableClasses).map(([id, name]) => ({
          value: parseInt(id, 10),
          label: name,
        }));

  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <div className="flex items-center justify-center gap-4">
        <Label
          htmlFor="class"
          className="mb-1 hidden text-muted-foreground md:flex md:text-lg">
          Select class
        </Label>
        <PopoverTrigger asChild>
          <Button
            id="class"
            variant="outline"
            aria-expanded={open}
            disabled={timetableClassItems === null}
            className="justify-between">
            {timetableClassItems === null
              ? "Loading..."
              : timetableClassItems.find(
                  timetableClassItem =>
                    timetableClassItem.value === selectedTimetableClass
                )!.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[200px] p-0">
        {timetableClassItems !== null && (
          <Command>
            <CommandInput placeholder="Search class..." />
            <CommandList>
              <CommandEmpty>No class found.</CommandEmpty>
              <CommandGroup>
                {timetableClassItems.map(timetableClassItem => (
                  <CommandItem
                    key={timetableClassItem.value}
                    value={timetableClassItem.label}
                    onSelect={currentValue => {
                      const value = timetableClassItems.find(
                        timetableClassItem =>
                          timetableClassItem.label
                            .toLowerCase()
                            .includes(currentValue.toLowerCase())
                      )?.value;

                      selectTimetableClass?.(value ?? selectedTimetableClass);
                      setOpen(false);
                    }}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTimetableClass === timetableClassItem.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {timetableClassItem.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ClassCombobox;
