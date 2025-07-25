import NavHeader from "../../../components/common/NavHeader";
import type { Watch } from "../../../types/Watch";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AcquisitionDetails from "./AcquisitionDetails";
import AccordionTitle from "../../../components/common/AccordionTitle";
import Media from "./Media";

interface AddDetailsProps {
  watch: Watch;
  setIsAddingDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DetailInputs = {
  date: Date;
  purchasePrice: number;
  placeOfPurchase: string;
  condition: string;
  boxAndPapers: string[];
};

export type SectionName = "acquisition" | "media" | "maintenance";

const AddDetails: React.FC<AddDetailsProps> = ({
  watch,
  setIsAddingDetails,
  setShowAddModal,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch: formWatch,
  } = useForm<DetailInputs>({
    defaultValues: {
      boxAndPapers: [],
    },
  });
  const condition = formWatch("condition");
  const date = formWatch("date");
  const boxAndPapers = formWatch("boxAndPapers");
  const purchasePrice = formWatch("purchasePrice");
  const [watchImages, setWatchImages] = useState<File[]>([]);
  const [documentImages, setDocumentImages] = useState<File[]>([]);
  const [uploadingWatch, setUploadingWatch] = useState(false);
  const [uploadingDocs, setUploadingDocs] = useState(false);

  const [openSection, setOpenSection] = useState<SectionName | null>(
    "acquisition"
  );
  const [hoveringSection, setHoveringSection] = useState<SectionName | null>(
    null
  );

  useEffect(() => {
    register("purchasePrice", { valueAsNumber: true });
    register("condition");
  }, [register]);

  const onSubmit: SubmitHandler<DetailInputs> = async (data) => {
    console.log(data);
  };

  const handleSectionOpen = (section: SectionName) => {
    if (openSection === section) {
      setOpenSection(null);
    } else setOpenSection(section);
  };

  return (
    <div className="flex flex-col h-full w-full absolute inset-0 z-300 bg-white">
      <NavHeader
        chevronClick={() => setIsAddingDetails(false)}
        xClick={() => setShowAddModal(false)}
        label="Add Your Details"
      />
      <div className="flex flex-1 flex-col px-4 overflow-y-auto">
        <h4 className="text-xl font-semibold mt-4">
          Add details about your {watch.brand}
        </h4>
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 border-1 border-gray-200 rounded-xl px-4 py-2">
            <AccordionTitle
              label="Acquisition"
              sectionKey="acquisition"
              handleSectionOpen={handleSectionOpen}
              setHoveringSection={setHoveringSection}
              openSection={openSection}
              hoveringSection={hoveringSection}
            />
            {openSection === "acquisition" && (
              <AcquisitionDetails
                date={date}
                setValue={setValue}
                getValues={getValues}
                register={register}
                condition={condition}
                boxAndPapers={boxAndPapers}
                purchasePrice={purchasePrice}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 border-1 border-gray-200 rounded-xl px-4 py-2">
            <AccordionTitle
              label="Media"
              sectionKey="media"
              handleSectionOpen={handleSectionOpen}
              setHoveringSection={setHoveringSection}
              openSection={openSection}
              hoveringSection={hoveringSection}
            />
            {openSection === "media" && (
              <Media
                watchImages={watchImages}
                documentImages={documentImages}
                setWatchImages={setWatchImages}
                setDocumentImages={setDocumentImages}
                uploadingWatch={uploadingWatch}
                uploadingDocs={uploadingDocs}
                setUploadingWatch={setUploadingWatch}
                setUploadingDocs={setUploadingDocs}
              />
            )}
          </div>
          <button
            type="submit"
            className="mt-6 bg-black text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;
