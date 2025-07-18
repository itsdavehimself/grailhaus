import { useState } from "react";
import { AddScreenType } from "../types/AddScreenType";
import AddSearch from "../components/AddSearch";
import type { Watch } from "../types/Watch";
import AddToCollection from "../components/AddToCollection";

interface AddScreenProps {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddScreen: React.FC<AddScreenProps> = ({ setShowAddModal }) => {
  const [showScreen, setShowScreen] = useState<AddScreenType>(
    AddScreenType.Collection
  );
  const [choice, setChoice] = useState<Watch | null>(null);

  return (
    <>
      <AddSearch
        showScreen={showScreen}
        setShowScreen={setShowScreen}
        setShowAddModal={setShowAddModal}
        setChoice={setChoice}
      />
      {choice && showScreen === AddScreenType.Collection && (
        <AddToCollection
          watch={choice}
          setShowAddModal={setShowAddModal}
          setChoice={setChoice}
        />
      )}
    </>
  );
};

export default AddScreen;
