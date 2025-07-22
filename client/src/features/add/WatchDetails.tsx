import type { Watch } from "../../types/Watch";
import SubmitButton from "../../components/common/SubmitButton";
import SecondaryButton from "../../components/common/SecondaryButton";
import SpecSection from "./components/SpecSection";
import type { SaveLocation } from "../../types/SaveLocation";
import { useState } from "react";
import AddDetails from "./components/AddDetails";
import NavHeader from "../../components/common/NavHeader";

interface WatchDetails {
  watch: Watch;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setChoice: React.Dispatch<React.SetStateAction<Watch | null>>;
  saveLocation: SaveLocation;
}

const WatchDetails: React.FC<WatchDetails> = ({
  watch,
  setShowAddModal,
  setChoice,
  saveLocation,
}) => {
  const [isAddingDetails, setIsAddingDetails] = useState<boolean>(false);

  return (
    <div className="flex flex-col absolute inset-0 z-200 bg-white">
      {isAddingDetails && (
        <AddDetails
          watch={watch}
          setIsAddingDetails={setIsAddingDetails}
          setShowAddModal={setShowAddModal}
        />
      )}
      <NavHeader
        chevronClick={() => setChoice(null)}
        xClick={() => setShowAddModal(false)}
        label={`Add to ${saveLocation}`}
      />
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
        <div className="flex flex-col gap-y-8 mt-6">
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
              {
                label: "Case Thickness (mm)",
                value: watch.specs.thicknessMm,
              },
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
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-50 bg-white p-4 border-t border-gray-100">
        <div className="flex flex-col gap-3">
          <SubmitButton label={`Add to ${saveLocation}`} />
          <SecondaryButton
            onClick={() => setIsAddingDetails(true)}
            label="Add Details"
          />
        </div>
      </div>
    </div>
  );
};

export default WatchDetails;
