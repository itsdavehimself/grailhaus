import { ChevronDown, ChevronUp } from "lucide-react";
import type { SectionName } from "../../features/add/components/AddDetails";

type AccordionTitleProps = {
  label: string;
  sectionKey: SectionName;
  handleSectionOpen: (section: SectionName) => void;
  setHoveringSection: React.Dispatch<React.SetStateAction<SectionName | null>>;
  openSection: SectionName | null;
  hoveringSection: SectionName | null;
};

const AccordionTitle: React.FC<AccordionTitleProps> = ({
  label,
  sectionKey,
  handleSectionOpen,
  setHoveringSection,
  openSection,
  hoveringSection,
}) => {
  return (
    <div
      className="flex gap-2 items-center hover:cursor-pointer"
      onClick={() => handleSectionOpen(sectionKey)}
      onMouseEnter={() => setHoveringSection(sectionKey)}
      onMouseLeave={() => setHoveringSection(null)}
    >
      <h5 className="text-lg font-semibold">{label}</h5>
      {openSection === sectionKey ? (
        <ChevronUp
          className={`w-5 h-5 text-gray-400 transition-all duration-200 ${
            hoveringSection === sectionKey ? "text-primary" : ""
          }`}
        />
      ) : (
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-all duration-200 ${
            hoveringSection === sectionKey ? "text-primary" : ""
          }`}
        />
      )}
    </div>
  );
};

export default AccordionTitle;
