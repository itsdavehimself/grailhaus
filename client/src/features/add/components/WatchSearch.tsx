import { X } from "lucide-react";
import { SaveLocation } from "../../../types/SaveLocation";
import SegmentedToggle from "./SegementedToggle";
import SearchBar from "../../../components/common/SearchBar";
import WatchCard from "./WatchCard";
import type { Watch } from "../../../types/Watch";
import { fetchSearchResults } from "../../../service/fetchSearchResults";
import { useDebounce } from "../../../hooks/useDebounce";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface WatchSearchProps {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSaveLocation: React.Dispatch<React.SetStateAction<SaveLocation>>;
  saveLocation: SaveLocation;
  setChoice: React.Dispatch<React.SetStateAction<Watch | null>>;
}

const WatchSearch: React.FC<WatchSearchProps> = ({
  setShowAddModal,
  setSaveLocation,
  saveLocation,
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
    <div className="flex flex-col absolute z-100 inset-0 bg-white">
      <div className="p-4 bg-white shrink-0">
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
            option={saveLocation}
            setOption={setSaveLocation}
            options={[SaveLocation.Collection, SaveLocation.Grails]}
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
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {search === "" && (
          <div className="flex justify-center items-center h-full w-full text-gray-300 text-sm">
            Search for a piece to add to your{" "}
            {saveLocation === "Collection" ? "collection" : "grail list"}
          </div>
        )}
        {search !== "" && (
          <div className="flex flex-col gap-y-6 mt-2 pb-6">
            <p className="font-semibold text-primary">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {results.map((watch) => (
                <WatchCard key={watch.id} watch={watch} setChoice={setChoice} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchSearch;
