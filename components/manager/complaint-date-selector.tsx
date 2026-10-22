"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComplaintDateSelectorProps = {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
};

const ComplaintDateSelector = ({
  date: externalDate,
  onDateChange,
}: ComplaintDateSelectorProps) => {
  const [internalDate, setInternalDate] = React.useState<Date>();

  const date = externalDate ?? internalDate;

  const handleDateChange = (selectedDate: Date | undefined) => {
    setInternalDate(selectedDate);
    onDateChange?.(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {date ? format(date, "PPP") : <span>Complaint date</span>}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ComplaintDateSelector;
