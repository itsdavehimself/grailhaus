interface SecondaryButtonProps {
  label: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label }) => {
  return (
    <button
      type="submit"
      className="outline-1 outline-primary text-primary w-full rounded-lg h-10 hover:cursor-pointer hover:bg-gray-50 transition-all duration-200"
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
