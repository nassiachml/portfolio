"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToast } from "../context/ToastContext";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className={`min-w-[300px] max-w-md rounded-lg shadow-lg p-4 flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-green-50 border-2 border-green-500"
                : toast.type === "error"
                ? "bg-red-50 border-2 border-red-500"
                : toast.type === "warning"
                ? "bg-yellow-50 border-2 border-yellow-500"
                : "bg-blue-50 border-2 border-blue-500"
            }`}
          >
            {toast.type === "success" && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
            {toast.type === "error" && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
            {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />}
            {toast.type === "info" && <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />}
            <p
              className={`flex-1 font-medium ${
                toast.type === "success"
                  ? "text-green-800"
                  : toast.type === "error"
                  ? "text-red-800"
                  : toast.type === "warning"
                  ? "text-yellow-800"
                  : "text-blue-800"
              }`}
            >
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className={`flex-shrink-0 ${
                toast.type === "success"
                  ? "text-green-600 hover:text-green-800"
                  : toast.type === "error"
                  ? "text-red-600 hover:text-red-800"
                  : toast.type === "warning"
                  ? "text-yellow-600 hover:text-yellow-800"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

