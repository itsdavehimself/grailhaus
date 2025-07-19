import type { Watch } from "../../../types/Watch";

interface WatchCardProps {
  watch: Watch;
  setChoice: React.Dispatch<React.SetStateAction<Watch | null>>;
}

const WatchCard: React.FC<WatchCardProps> = ({ watch, setChoice }) => {
  return (
    <div
      onClick={() => setChoice(watch)}
      className="flex flex-col border-1 border-gray-100 p-2 rounded-lg bg-white hover:cursor-pointer hover:border-black/10 transition-all duration-200"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={watch.imageUrl}
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt={watch.name}
        />
      </div>
      <div className="mt-2">
        <h4 className="text-xs">{watch.brand}</h4>
        <h5 className="text-xs text-gray-400">{watch.reference}</h5>
        <div className="mt-1">
          <h3 className="font-semibold text-sm text-primary">{watch.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
