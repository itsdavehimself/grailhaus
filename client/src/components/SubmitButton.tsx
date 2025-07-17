interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
  return (
    <button
      type="submit"
      className="bg-primary text-white w-full rounded-lg h-10 font-bold hover:cursor-pointer hover:bg-primary-hover transition-all duration-200"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
