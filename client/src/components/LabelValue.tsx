interface LabelValueProps {
  label: string;
  value: string | number | null;
}

const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => {
  return (
    <>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-sm">{value}</p>
    </>
  );
};

export default LabelValue;
