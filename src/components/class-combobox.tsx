import { Check, ChevronsUpDown } from "lucide-react";
import { useRef, useState } from "react";

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
import { smartSearch } from "@/lib/smartSearch";
import { cn } from "@/lib/utils";

interface Props {
  onTimetableStudyProgramSelected?: (timetableStudyProgramId: number) => void;
  selectedTimetableStudyProgramId: number;
  timetableStudyPrograms: null | Record<number, string>;
}

const ClassCombobox: React.FC<Props> = ({
  onTimetableStudyProgramSelected,
  selectedTimetableStudyProgramId,
  timetableStudyPrograms,
}) => {
  const timetableStudyProgramItems =
    timetableStudyPrograms === null
      ? null
      : Object.entries(timetableStudyPrograms).map(([id, name]) => ({
          label: name,
          value: parseInt(id, 10),
        }));

  const [open, setOpen] = useState(false);
  const commandListRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (commandListRef.current) {
      commandListRef.current.scrollTop = 0;
    }
  };

  return (
    <Popover
      onOpenChange={setOpen}
      open={open}>
      <div className="flex items-center justify-center gap-4">
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="justify-between"
            disabled={timetableStudyProgramItems === null}
            id="study-program"
            variant="outline">
            {timetableStudyProgramItems === null
              ? "Loading..."
              : (timetableStudyProgramItems.find(
                  timetableStudyProgramItem =>
                    timetableStudyProgramItem.value ===
                    selectedTimetableStudyProgramId
                )?.label ?? "Select study program")}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[300px] p-0">
        {timetableStudyProgramItems !== null && (
          <Command filter={(value, search) => smartSearch(value, search)}>
            <CommandInput
              onInput={scrollToTop}
              placeholder="Search study programs..."
            />
            <CommandList ref={commandListRef}>
              <CommandEmpty>No study program found.</CommandEmpty>
              <CommandGroup>
                {timetableStudyProgramItems.map(timetableStudyProgramItem => (
                  <CommandItem
                    key={timetableStudyProgramItem.value}
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
                    }}
                    value={timetableStudyProgramItem.label}>
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
