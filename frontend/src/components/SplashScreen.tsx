"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SplashScreenProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading, children }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after 2 seconds if loading is complete
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // If still loading or splash screen is still visible, show the splash screen
  if (isLoading || isVisible) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M24 4C13 4 4 13 4 24C4 35 13 44 24 44C35 44 44 35 44 24C44 13 35 4 24 4ZM24 40C15.2 40 8 32.8 8 24C8 15.2 15.2 8 24 8C32.8 8 40 15.2 40 24C40 32.8 32.8 40 24 40Z"
                  fill="currentColor"
                />
                <path
                  d="M24 12C20.7 12 18 14.7 18 18C18 21.3 20.7 24 24 24C27.3 24 30 21.3 30 18C30 14.7 27.3 12 24 12ZM24 20C22.9 20 22 19.1 22 18C22 16.9 22.9 16 24 16C25.1 16 26 16.9 26 18C26 19.1 25.1 20 24 20Z"
                  fill="currentColor"
                />
                <path
                  d="M24 26C20.1 26 16.3 27.5 13.5 30.2C14.9 32.9 17.8 34.8 21 35.3C21.1 33.4 22.1 32 24 32C25.9 32 26.9 33.4 27 35.3C30.2 34.8 33.1 32.9 34.5 30.2C31.7 27.5 27.9 26 24 26Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">CrisisAid</h1>
            <p className="text-muted-foreground mt-2">Connecting help with those in need</p>
          </motion.div>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-2 text-muted-foreground"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading resources...</span>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }

  // When splash screen is done, render the children
  return <>{children}</>;
};

export default SplashScreen;