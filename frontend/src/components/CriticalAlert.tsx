"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Info, AlertCircle, Bell } from 'lucide-react';
import useCriticalAlerts from '../hooks/useCriticalAlerts';

const getAlertIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <AlertTriangle size={20} className="text-white" />;
    case 'danger':
      return <AlertTriangle size={20} className="text-white" />;
    case 'warning':
      return <AlertCircle size={20} className="text-white" />;
    case 'info':
    default:
      return <Info size={20} className="text-white" />;
  }
};

const getAlertColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-danger/90 border-danger/80 shadow-[0_0_30px_rgba(239,68,68,0.4)]';
    case 'danger':
      return 'bg-danger/90 border-danger/80 shadow-[0_0_30px_rgba(239,68,68,0.3)]';
    case 'warning':
      return 'bg-warning/90 border-warning/80 shadow-[0_0_30px_rgba(234,179,8,0.3)]';
    case 'info':
    default:
      return 'bg-primary/90 border-primary/80 shadow-[0_0_30px_rgba(30,58,138,0.3)]';
  }
};

export default function CriticalAlert() {
  const { alerts, dismissAlert } = useCriticalAlerts();
  const [visibleAlert, setVisibleAlert] = React.useState<typeof alerts[number] | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Auto-dismiss after 10 seconds, unless hovered
  React.useEffect(() => {
    if (!alerts.length || isHovered) return;

    const timer = setTimeout(() => {
      setVisibleAlert(null);
    }, 10000);

    return () => clearTimeout(timer);
  }, [alerts, isHovered]);

  // Show the next alert when the current one is dismissed
  const handleDismiss = (alertId: string) => {
    dismissAlert(alertId);
    setVisibleAlert(null);
  };

  // Set the next alert to show when alerts change or current is dismissed
  React.useEffect(() => {
    if (alerts.length > 0 && !visibleAlert) {
      setVisibleAlert(alerts[0]);
    } else if (alerts.length === 0) {
      setVisibleAlert(null);
    }
  }, [alerts, visibleAlert]);

  if (!visibleAlert) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-2000 w-[90%] max-w-lg ${getAlertColor(visibleAlert.severity)}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4 rounded-2xl flex items-start gap-4 border backdrop-blur-sm">
          <div className="bg-white/20 p-2 rounded-full animate-pulse">
            {getAlertIcon(visibleAlert.severity)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Bell size={14} className="text-white/80" />
              <h4 className="font-bold text-sm uppercase tracking-wider text-white/90">
                {visibleAlert.title}
              </h4>
            </div>
            
            <p className="text-sm text-white/90 leading-relaxed">
              {visibleAlert.message}
            </p>
            
            {visibleAlert.instructions && (
              <div className="mt-2 pt-2 border-t border-white/10">
                <p className="text-xs font-medium text-white/80">Instructions:</p>
                <p className="text-xs text-white/70">{visibleAlert.instructions}</p>
              </div>
            )}
            
            {visibleAlert.affectedAreas && visibleAlert.affectedAreas.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-xs font-medium text-white/80">Affected Areas:</span>
                <div className="flex flex-wrap gap-1">
                  {visibleAlert.affectedAreas.map((area, index) => (
                    <span key={index} className="text-xs bg-white/10 text-white/80 px-2 py-0.5 rounded-full">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => handleDismiss(visibleAlert.id)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}