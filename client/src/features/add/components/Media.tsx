import Dropzone from "react-dropzone";
import { CloudUpload } from "lucide-react";
import { useState } from "react";

const Media: React.FC = () => {
  const [watchPhotos, setWatchPhotos] = useState();
  const [documentPhotos, setDocumentPhotos] = useState();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Watch Photos</h3>
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Receipts & Documents</h3>
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
      </div>
    </div>
  );
};

export default Media;
