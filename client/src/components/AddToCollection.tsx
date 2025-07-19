import type { Watch } from "../types/Watch";
import { X } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import SubmitButton from "./SubmitButton";
import SecondaryButton from "./SecondaryButton";
import SpecSection from "./SpecSection";

interface AddToCollectionProps {
  watch: Watch;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setChoice: React.Dispatch<React.SetStateAction<Watch | null>>;
}

const AddToCollection: React.FC<AddToCollectionProps> = ({
  watch,
  setShowAddModal,
  setChoice,
}) => {
  return (
    <div className="flex flex-col absolute inset-0 z-200 bg-white">
      <div className="flex justify-between p-4">
        <ChevronLeft
          onClick={() => setChoice(null)}
          className="text-gray-400 hover:cursor-pointer hover:text-primary transition-all duration-200"
        />
        <h4 className="text-sm font-semibold text-primary mt-1">
          Add to Collection
        </h4>
        <X
          onClick={() => setShowAddModal(false)}
          className="text-gray-400 hover:cursor-pointer hover:text-primary transition-all duration-200"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-100">
            <img
              src={watch.imageUrl}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
          <div className="px-1">
            <h2 className="text-xl font-semibold">{watch.name}</h2>
            <h3 className="text-lg">{watch.brand}</h3>
            <p className="text-sm text-gray-400 mt-1">
              Reference: {watch.reference}
            </p>
          </div>
        </div>
        <SpecSection
          title="Basic Details"
          specs={[
            { label: "Brand", value: watch.brand },
            { label: "Model", value: watch.model },
            { label: "Reference", value: watch.reference },
            { label: "Bracelet", value: watch.bracelet },
            { label: "Dial Color", value: watch.dialColor },
          ]}
        />
        <SpecSection
          title="Specifications"
          specs={[
            { label: "Case Size (mm)", value: watch.specs.caseSizeMm },
            { label: "Lug to Lug (mm)", value: watch.specs.lugToLugMm },
            { label: "Case Thickness (mm)", value: watch.specs.thicknessMm },
            { label: "Case Material", value: watch.specs.caseMaterial },
            { label: "Crystal", value: watch.specs.crystal },
            {
              label: "Water Resistance (m)",
              value: watch.specs.waterResistanceM,
            },
          ]}
        />
        <SpecSection
          title="Movement"
          specs={[
            { label: "Type", value: watch.movement.type },
            { label: "Movement", value: watch.movement.name },
            {
              label: "Power Reserve Hours",
              value: watch.movement.powerReserveHours,
            },
          ]}
        />
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-50 bg-white p-4 border-t border-gray-100">
        <div className="flex flex-col gap-3">
          <SubmitButton label="Add to Collection" />
          <SecondaryButton label="Add Details" />
        </div>
      </div>
    </div>
  );
};

export default AddToCollection;
