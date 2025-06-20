import React from 'react';

interface LegalModalProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ open, title, content, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg shadow-xl p-6 relative">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
        <button
          onClick={onClose}
          className="mt-6 w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
        >
          关闭
        </button>
      </div>
    </div>
  );
};

export default LegalModal; 