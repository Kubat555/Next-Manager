import { useState } from 'react';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm text-left py-2 px-3 rounded-lg text-gray-500 bg-slate-100 hover:bg-slate-200"
      >
        {title}
      </button>
      {isOpen && (
        <div className="p-3 border rounded-lg text-sm text-gray-500 bg-slate-100 mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
