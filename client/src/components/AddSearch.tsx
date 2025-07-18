import { X } from "lucide-react";
import { AddScreenType } from "../types/AddScreenType";
import SegmentedToggle from "../components/SegementedToggle";
import SearchBar from "../components/SearchBar";
import WatchCard from "../components/WatchCard";
import type { Watch } from "../types/Watch";
import { fetchSearchResults } from "../service/fetchSearchResults";
import { useDebounce } from "../hooks/useDebounce";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface AddSearchProps {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowScreen: React.Dispatch<React.SetStateAction<AddScreenType>>;
  showScreen: AddScreenType;
  setChoice: React.Dispatch<React.SetStateAction<Watch | null>>;
}

const AddSearch: React.FC<AddSearchProps> = ({
  setShowAddModal,
  setShowScreen,
  showScreen,
  setChoice,
}) => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Watch[]>([]);

  const handleSearch = async () => {
    try {
      const watches = await fetchSearchResults(apiUrl, search);
      setResults(watches);
    } catch (err: any) {
      console.error("Failed to fetch:", err.message);
      setError(err.message);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 1250);

  return (
    <div className="flex flex-col absolute z-100 inset-0 h-screen w-full bg-white p-4">
      <div className="flex justify-end">
        <X
          onClick={() => setShowAddModal(false)}
          className="text-gray-400 hover:cursor-pointer hover:text-primary transition-all duration-200"
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-8 gap-2 mb-6">
        <h2 className="font-semibold text-primary">
          Where would you like to add to?
        </h2>
        <SegmentedToggle
          option={showScreen}
          setOption={setShowScreen}
          options={[AddScreenType.Collection, AddScreenType.Grails]}
          labels={["Collection", "Grails"]}
        />
      </div>
      <SearchBar
        placeholder="Search by brand, model, or reference"
        search={search}
        setSearch={setSearch}
        debouncedSearch={debouncedSearch}
        setResults={setResults}
      />
      {search === "" && (
        <div className="flex justify-center items-center h-full w-full text-gray-300 text-sm">
          Search for a piece to add to your{" "}
          {showScreen === "Collection" ? "collection" : "grail list"}
        </div>
      )}
      {search !== "" && (
        <div className="flex flex-col gap-y-6 mt-6">
          <p className="font-semibold text-primary">
            {results.length} result{results.length > 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {results.map((watch) => (
              <WatchCard key={watch.id} watch={watch} setChoice={setChoice} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSearch;
