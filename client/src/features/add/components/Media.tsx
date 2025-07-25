import Dropzone from "react-dropzone";
import { CloudUpload } from "lucide-react";
import imageCompression from "browser-image-compression";
import PhotoCards from "./PhotoCards";

interface MediaProps {
  watchImages: File[];
  documentImages: File[];
  setWatchImages: React.Dispatch<React.SetStateAction<File[]>>;
  setDocumentImages: React.Dispatch<React.SetStateAction<File[]>>;
  uploadingWatch: boolean;
  uploadingDocs: boolean;
  setUploadingWatch: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadingDocs: React.Dispatch<React.SetStateAction<boolean>>;
}

const Media: React.FC<MediaProps> = ({
  watchImages,
  documentImages,
  setWatchImages,
  setDocumentImages,
  uploadingWatch,
  uploadingDocs,
  setUploadingWatch,
  setUploadingDocs,
}) => {
  const handleImageUpload = async (
    files: File[],
    photoType: "watch" | "document"
  ): Promise<void> => {
    const imageFile = files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    if (photoType === "watch") {
      setUploadingWatch(true);
    } else {
      setUploadingDocs(true);
    }

    try {
      const compressedFile = await imageCompression(imageFile, options);
      if (photoType === "watch") {
        setWatchImages((prev) => [...prev, compressedFile as File]);
      } else {
        setDocumentImages((prev) => [...prev, compressedFile as File]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (photoType === "watch") {
        setUploadingWatch(false);
      } else {
        setUploadingDocs(false);
      }
    }
  };

  const deleteImage = (i: number, photoType: "watch" | "document"): void => {
    if (photoType === "watch") {
      const newPhotos = [...watchImages];
      newPhotos.splice(i, 1);
      setWatchImages(newPhotos);
    } else {
      const newDocs = [...documentImages];
      newDocs.splice(i, 1);
      setDocumentImages(newDocs);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Watch Photos</h3>
        <Dropzone
          onDrop={(acceptedFiles: File[]) =>
            handleImageUpload(acceptedFiles, "watch")
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section className="flex justify-center items-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-100 p-4 hover:cursor-pointer">
              <div
                {...getRootProps()}
                className="flex flex-col justify-center items-center gap-2"
              >
                <input {...getInputProps()} />
                <CloudUpload className="bg-white p-2 w-10 h-10 rounded-lg shadow-md" />
                <p className="text-sm font-semibold">
                  Drop your files here or browse
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <PhotoCards
          images={watchImages}
          deleteImage={deleteImage}
          uploading={uploadingWatch}
          imageType="watch"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Receipts & Documents</h3>
        <Dropzone
          onDrop={(acceptedFiles: File[]) =>
            handleImageUpload(acceptedFiles, "document")
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section className="flex justify-center items-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-100 p-4 hover:cursor-pointer">
              <div
                {...getRootProps()}
                className="flex flex-col justify-center items-center gap-2"
              >
                <input {...getInputProps()} />
                <CloudUpload className="bg-white p-2 w-10 h-10 rounded-lg shadow-md" />
                <p className="text-sm font-semibold">
                  Drop your files here or browse
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <PhotoCards
          images={documentImages}
          deleteImage={deleteImage}
          uploading={uploadingDocs}
          imageType="document"
        />
      </div>
    </div>
  );
};

export default Media;
