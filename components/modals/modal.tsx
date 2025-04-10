import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { CircleX } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, width }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 overflow-y-auto"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed top-0 right-0 h-full ${width} bg-white shadow-lg z-50`}
      >
        {/* Drawer content with scrollable area */}
        <div className="p-6 h-full overflow-y-auto">
          {/* Close Button */}
          <button
            className="text-gray-500 absolute top-4 right-4"
            onClick={onClose}
          >
            <CircleX />
          </button>
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
