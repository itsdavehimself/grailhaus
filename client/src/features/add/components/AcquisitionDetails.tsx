import DatePicker from "../../../components/common/DatePicker";
import { NumericFormat } from "react-number-format";
import StyledInput from "../../../components/common/StyledInput";
import Dropdown from "../../../components/common/Dropdown";
import CheckboxInput from "../../../components/common/CheckboxInput";
import { useState, useRef, useEffect } from "react";
import { WATCH_CONDITION_OPTIONS } from "../../../types/WatchCondition";
import type {
  UseFormSetValue,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import type { DetailInputs } from "./AddDetails";

interface AcquisitionDetailsProps {
  date: Date;
  setValue: UseFormSetValue<DetailInputs>;
  getValues: UseFormGetValues<DetailInputs>;
  register: UseFormRegister<DetailInputs>;
  condition: string;
  boxAndPapers: string[];
}

const AcquisitionDetails: React.FC<AcquisitionDetailsProps> = ({
  date,
  setValue,
  getValues,
  condition,
  boxAndPapers,
  register,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = (val: string) => {
    const current = getValues("boxAndPapers") || [];
    const newValue = current.includes(val)
      ? current.filter((item: string) => item !== val)
      : [...current, val];

    setValue("boxAndPapers", newValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-4 mt-2">
      <DatePicker
        label="Date Acquired"
        date={date}
        onSelect={(val) => setValue("date", val)}
      />
      <NumericFormat
        prefix="$"
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        onValueChange={(values) => {
          const val = values.floatValue ?? 0;
          setValue("purchasePrice", val);
        }}
        customInput={(props) => (
          <StyledInput
            {...props}
            label="Purchase Price"
            placeholder="$1,000.00"
          />
        )}
      />
      <StyledInput
        label="Place of Purchase"
        register={{ ...register("placeOfPurchase") }}
        placeholder="Name of store, dealer, event, country, etc."
      />
      <Dropdown
        ref={dropdownRef}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        label="Condition"
        value={condition}
        onChange={(val) => setValue("condition", val)}
        options={WATCH_CONDITION_OPTIONS}
      />
      <CheckboxInput
        label="Box & Papers"
        options={[
          { label: "Box", value: "box" },
          { label: "Papers", value: "papers" },
        ]}
        selection={boxAndPapers}
        onClick={handleToggle}
      />
    </div>
  );
};

export default AcquisitionDetails;
