import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { X } from "lucide-react";

interface PhotoCardsProps {
  images: File[];
  deleteImage: (i: number, imageType: "watch" | "document") => void;
  uploading: boolean;
  imageType: "watch" | "document";
}

const PhotoCards: React.FC<PhotoCardsProps> = ({
  images,
  deleteImage,
  uploading,
  imageType,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {images.map((file, i) => (
        <div key={i} className="relative">
          <div
            className="flex justify-center items-center absolute bg-primary h-4 w-4 right-0 rounded-xl m-0.5 p-0.5 hover:cursor-pointer"
            onClick={() => deleteImage(i, imageType)}
          >
            <X className="text-white" />
          </div>
          <img
            src={URL.createObjectURL(file)}
            alt={`watch-photo-${i}`}
            className="w-24 h-24 object-cover rounded-md shadow"
          />
        </div>
      ))}
      {uploading && <LoadingSpinner />}
    </div>
  );
};

export default PhotoCards;
