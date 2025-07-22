import NavHeader from "../../../components/common/NavHeader";
import StyledInput from "../../../components/common/StyledInput";
import type { Watch } from "../../../types/Watch";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useEffect, useState, useRef } from "react";
import { WATCH_CONDITION_OPTIONS } from "../../../types/WatchCondition";
import Dropdown from "../../../components/common/Dropdown";
import DatePicker from "../../../components/common/DatePicker";
import CheckboxInput from "../../../components/common/CheckboxInput";

interface AddDetailsProps {
  watch: Watch;
  setIsAddingDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type DetailInputs = {
  date: Date;
  purchasePrice: number;
  placeOfPurchase: string;
  condition: string;
  boxAndPapers: string[];
};

const AddDetails: React.FC<AddDetailsProps> = ({
  watch,
  setIsAddingDetails,
  setShowAddModal,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch: formWatch,
  } = useForm<DetailInputs>({
    defaultValues: {
      boxAndPapers: [],
    },
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const condition = formWatch("condition");
  const date = formWatch("date");
  const boxAndPapers = formWatch("boxAndPapers");

  useEffect(() => {
    register("purchasePrice", { valueAsNumber: true });
    register("condition");

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
  }, [register]);

  const onSubmit: SubmitHandler<DetailInputs> = async (data) => {
    console.log(data);
  };

  const handleToggle = (val: string) => {
    const current = getValues("boxAndPapers") || [];
    const newValue = current.includes(val)
      ? current.filter((item: string) => item !== val)
      : [...current, val];

    setValue("boxAndPapers", newValue);
  };

  return (
    <div className="flex flex-col h-full w-full absolute inset-0 z-300 bg-white">
      <NavHeader
        chevronClick={() => setIsAddingDetails(false)}
        xClick={() => setShowAddModal(false)}
        label="Add Your Details"
      />
      <div className="flex flex-1 flex-col px-4 overflow-y-auto">
        <h4 className="text-xl font-semibold mt-4">
          Add details about your {watch.brand}
        </h4>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-lg font-semibold">Acquisition</h5>
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
          <button
            type="submit"
            className="mt-6 bg-black text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;
