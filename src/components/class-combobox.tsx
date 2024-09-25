import { Check, ChevronsUpDown } from "lucide-react";

import { cn, smartSearch } from "@/lib/utils";
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

type Props = {
  timetableStudyPrograms: Record<number, string> | null;
  selectedTimetableStudyProgramId: number;
  onTimetableStudyProgramSelected?: (timetableStudyProgramId: number) => void;
};

const ClassCombobox: React.FC<Props> = ({
  timetableStudyPrograms,
  selectedTimetableStudyProgramId,
  onTimetableStudyProgramSelected,
}) => {
  const timetableStudyProgramItems =
    timetableStudyPrograms === null
      ? null
      : Object.entries(timetableStudyPrograms).map(([id, name]) => ({
          value: parseInt(id, 10),
          label: name,
        }));

  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <div className="flex items-center justify-center gap-4">
        <PopoverTrigger asChild>
          <Button
            id="study-program"
            variant="outline"
            aria-expanded={open}
            disabled={timetableStudyProgramItems === null}
            className="justify-between">
            {timetableStudyProgramItems === null
              ? "Loading..."
              : timetableStudyProgramItems.find(
                  timetableStudyProgramItem =>
                    timetableStudyProgramItem.value ===
                    selectedTimetableStudyProgramId
                )!.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[200px] p-0">
        {timetableStudyProgramItems !== null && (
          <Command filter={(value, search) => smartSearch(value, search)}>
            <CommandInput placeholder="Search study programs..." />
            <CommandList>
              <CommandEmpty>No study program found.</CommandEmpty>
              <CommandGroup>
                {timetableStudyProgramItems.map(timetableStudyProgramItem => (
                  <CommandItem
                    key={timetableStudyProgramItem.value}
                    value={timetableStudyProgramItem.label}
                    onSelect={currentValue => {
                      const value = timetableStudyProgramItems.find(
                        timetableStudyProgramItem =>
                          timetableStudyProgramItem.label
                            .toLowerCase()
                            .includes(currentValue.toLowerCase())
                      )?.value;

                      onTimetableStudyProgramSelected?.(
                        value ?? selectedTimetableStudyProgramId
                      );
                      setOpen(false);
                    }}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTimetableStudyProgramId ===
                          timetableStudyProgramItem.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {timetableStudyProgramItem.label}
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
