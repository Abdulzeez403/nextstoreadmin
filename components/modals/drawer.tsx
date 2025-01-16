// components/Drawer.tsx
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string; // Width of the drawer (e.g., "w-64", "w-80")
  id?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  width = "w-80",
  id,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
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
        {/* Drawer content */}
        <div className="p-6">
          {/* Close Button */}
          <button
            className="text-gray-500 absolute top-4 right-4"
            onClick={onClose}
          >
            Close
          </button>
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Drawer;
