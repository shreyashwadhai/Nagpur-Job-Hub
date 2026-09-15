import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-lg border text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-[#0B5D3B] text-white border-[#087F5B]'
                  : toast.type === 'error'
                  ? 'bg-red-600 text-white border-red-700'
                  : toast.type === 'warning'
                  ? 'bg-[#F28C28] text-white border-[#FF9F43]'
                  : 'bg-gray-900 text-white border-gray-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  icon={
                    toast.type === 'success'
                      ? 'solar:check-circle-bold'
                      : toast.type === 'error'
                      ? 'solar:danger-triangle-bold'
                      : toast.type === 'warning'
                      ? 'solar:bell-bold'
                      : 'solar:info-circle-bold'
                  }
                  className="w-5 h-5 flex-shrink-0"
                />
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="hover:opacity-75 transition-opacity"
              >
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
