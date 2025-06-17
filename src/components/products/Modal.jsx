import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({ children, onClose, title, size = "md", isOpen }) => {
  const modalRef = useRef(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose, isOpen]);

  // Handle click outside modal
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
  
      const handleTabKey = (event) => {
        if (event.key === "Tab") {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              event.preventDefault();
            }
          }
        }
      };
  
      modal.addEventListener("keydown", handleTabKey);
      firstElement?.focus();

      return () => {
        modal.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [isOpen]);

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-2xl";
      case "xl":
        return "max-w-4xl";
      default:
        return "max-w-md";
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 500 },
    },
    exit: { y: 20, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal content */}
          <motion.div
            ref={modalRef}
            className={`relative bg-white rounded-xl shadow-xl w-full ${getSizeClasses()} max-h-[90vh] overflow-hidden border border-gray-100`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              {title && (
                <h2 id="modal-title" className="text-xl font-medium text-gray-900">
                   {title}
                </h2>
              )}

              <motion.button
                onClick={onClose}
                className=" ml-auto p-2 rounded-full hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                aria-label="Close modal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                   className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors"
                   fill="none"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                 >
                   <path d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </motion.button>
            </div>

            {/* Content */}
            <motion.div
              className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default Modal;
