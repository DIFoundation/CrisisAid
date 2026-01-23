import React from 'react';
import { X, MapPin, Clock, Phone, Globe, AlertTriangle, CheckCircle, XCircle, User, Shield, Mail } from 'lucide-react';
import { Resource } from '@/types';
import { useAppContext } from '@/data/context/AppContext';

type ResourceDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource | null;
};

const ResourceDrawer: React.FC<ResourceDrawerProps> = ({ isOpen, onClose, resource }) => {
  const { user, isAuthenticated } = useAppContext();

  if (!isOpen || !resource) return null;

  const getStatusBadge = () => {
    if (resource.verified) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-success/20 text-success">
          <CheckCircle className="w-3 h-3 mr-1" /> Verified
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-warning/20 text-warning">
        <AlertTriangle className="w-3 h-3 mr-1" /> Unverified
      </span>
    );
  };

  const getContactInfo = () => {
    if (!resource.location) return null;
    
    return (
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-bold text-foreground/80">Contact Information</h4>
        {resource.contactInfo && (
          <div className="flex items-center text-sm text-foreground/70">
            <Phone className="w-4 h-4 mr-2 text-primary" />
            <a href={`tel:${resource.contactInfo.phone}`} className="hover:underline">
              {resource.contactInfo.phone}
            </a>
          </div>
        )}
        {resource.contactInfo && (
          <div className="flex items-center text-sm text-foreground/70">
            <Mail className="w-4 h-4 mr-2 text-primary" />
            <a href={`mailto:${resource.contactInfo.email}`} className="hover:underline">
              {resource.contactInfo.email}
            </a>
          </div>
        )}
        {/* {resource.contactInfo.website && (
          <div className="flex items-center text-sm text-foreground/70">
            <Globe className="w-4 h-4 mr-2 text-primary" />
            <a 
              href={resource.contactInfo.website.startsWith('http') 
                ? resource.contactInfo.website 
                : `https://${resource.contactInfo.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline break-all"
            >
              {resource.contactInfo.website}
            </a>
          </div>
        )} */}
      </div>
    );
  };

  // const getHours = () => {
  //   if (!resource.hours) return null;
    
  //   return (
  //     <div className="mt-4">
  //       <h4 className="text-sm font-bold text-foreground/80 mb-2">Hours</h4>
  //       <div className="space-y-1 text-sm text-foreground/70">
  //         {Object.entries(resource.hours).map(([day, time]) => (
  //           <div key={day} className="flex justify-between">
  //             <span className="capitalize">{day}:</span>
  //             <span>{time || 'Closed'}</span>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  const getAdminActions = () => {
    if (!isAuthenticated || user?.role !== 'admin') return null;

    return (
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-bold text-foreground/80 mb-3">Admin Actions</h4>
        <div className="space-y-2">
          <button className="w-full px-3 py-2 text-sm font-bold rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            Edit Resource
          </button>
          <button className="w-full px-3 py-2 text-sm font-bold rounded-md bg-danger/10 text-danger hover:bg-danger/20 transition-colors">
            Delete Resource
          </button>
        </div>
      </div>
    );
  };

  const encodeLocation = (resource.location)
  // (lat: number, lng: number, address: string, city: string, country: string) => {
    // return `${lat},${lng},${address},${city},${country}`;
  // };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-background shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">{resource.name}</h2>
                <button
                  onClick={onClose}
                  className="rounded-md text-foreground/50 hover:text-foreground focus:outline-none"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className={`w-3 h-3 rounded-full mr-2 ${
                      resource.status === 'available' ? 'bg-success' : 
                      resource.status === 'limited' ? 'bg-warning' : 'bg-danger'
                    }`}
                  />
                  <span className="text-sm font-bold capitalize">
                    {resource.status === 'available' ? 'Available' : 
                     resource.status === 'limited' ? 'Limited Availability' : 'Unavailable'}
                  </span>
                </div>
                {getStatusBadge()}
              </div>
              
              <div className="mt-4 flex items-center text-sm text-foreground/70">
                <MapPin className="w-4 h-4 mr-2 text-primary shrink-0" />
                <span>{resource.location.lat}N, {resource.location.lng}E, {resource.location.address}, {resource.location.city}, {resource.location.country}</span>
              </div>
              
              <div className="mt-2 flex items-center text-sm text-foreground/70">
                <Clock className="w-4 h-4 mr-2 text-primary shrink-0" />
                <span>Last updated: {new Date(resource.lastUpdated).toLocaleDateString()}</span>
              </div>
              
              {resource.description && (
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-foreground/80 mb-1">Description</h4>
                  <p className="text-sm text-foreground/70">{resource.description}</p>
                </div>
              )}
              
              {resource.capacity && (
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-foreground/80 mb-1">Capacity</h4>
                  <p className="text-sm text-foreground/70">{resource.capacity} people</p>
                </div>
              )}
              
              {getContactInfo()}
              {/* {getHours()} */}
              
              {resource.notes && (
                <div className="mt-4 p-3 bg-secondary/10 rounded-md">
                  <h4 className="text-sm font-bold text-foreground/80 mb-1">Important Notes</h4>
                  <p className="text-sm text-foreground/70">{resource.notes}</p>
                </div>
              )}
              
              {/* {resource.submittedBy && (
                <div className="mt-4 text-xs text-foreground/50">
                  <p>Submitted by: {resource.submittedBy}</p>
                </div>
              )} */}
              
              {getAdminActions()}
            </div>
            
            <div className="mt-auto p-4 bg-card border-t border-border">
              <button
                onClick={() => {
                  // TODO: Implement get directions
                  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(resource.location.address || ''), encodeURIComponent(resource.location.city || ''), encodeURIComponent(resource.location.country || '')}`;
                  window.open(mapsUrl, '_blank');
                }}
                className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDrawer;