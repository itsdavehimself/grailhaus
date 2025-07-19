import LabelValue from "../../../components/LabelValue";

interface SpecSectionProps {
  title: string;
  specs: { label: string; value: string | number | null }[];
}

const SpecSection: React.FC<SpecSectionProps> = ({ title, specs }) => {
  return (
    <div className="flex flex-col gap-2 mt-8 pl-1">
      <h5 className="font-semibold text-lg mb-2">{title}</h5>
      <div className="grid grid-cols-2 gap-y-3 gap-x-10">
        {specs.map((spec, i) =>
          spec.value ? (
            <LabelValue key={i} label={spec.label} value={spec.value} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default SpecSection;
