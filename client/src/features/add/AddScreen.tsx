import { useState } from "react";
import { SaveLocation } from "../../types/SaveLocation";
import WatchSearch from "./components/WatchSearch";
import type { Watch } from "../../types/Watch";
import WatchDetails from "./WatchDetails";

interface AddScreenProps {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddScreen: React.FC<AddScreenProps> = ({ setShowAddModal }) => {
  const [saveLocation, setSaveLocation] = useState<SaveLocation>(
    SaveLocation.Collection
  );
  const [choice, setChoice] = useState<Watch | null>(null);

  return (
    <>
      <WatchSearch
        saveLocation={saveLocation}
        setSaveLocation={setSaveLocation}
        setShowAddModal={setShowAddModal}
        setChoice={setChoice}
      />
      {choice && (
        <WatchDetails
          watch={choice}
          setShowAddModal={setShowAddModal}
          setChoice={setChoice}
          saveLocation={saveLocation}
        />
      )}
    </>
  );
};

export default AddScreen;
