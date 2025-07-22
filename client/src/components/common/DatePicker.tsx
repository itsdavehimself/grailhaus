import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

interface DatePickerProps {
  label: string;
  date: Date;
  onSelect: (val: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, date, onSelect }) => {
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    setOpenDatePicker(false);
  }, [date]);

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-sm font-semibold">{label}</label>

      <div className="relative">
        <div
          onClick={() => setOpenDatePicker(!openDatePicker)}
          className="flex items-center text-sm ring-1 w-full rounded-lg h-10 pl-2 gap-2 transition-all duration-200 ring-gray-200 hover:cursor-pointer hover:ring-black focus:ring-primary"
        >
          <Calendar className="h-5 w-5" />
          <div>{date ? format(date, "MM/dd/yyyy") : "Select a date"}</div>
        </div>

        {openDatePicker && (
          <div className="absolute flex justify-center left-0 top-full z-50 mt-1 bg-white shadow-md rounded-lg ring-gray-200 w-full">
            <DayPicker
              animate
              mode="single"
              selected={date}
              onSelect={onSelect}
              captionLayout="dropdown"
              classNames={{
                selected: `bg-primary text-white rounded-lg`,
                root: `${defaultClassNames.root} shadow-lg p-5 w-full flex justify-center`,
                chevron: `${defaultClassNames.chevron} fill-primary hover:cursor-pointer`,
                today: `${date || !date ? "text-primary" : "text-white"}`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
