'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, CheckCircle2, Info, Send, AlertCircle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useAppContext } from '@/data/context/AppContext';
import { Resource, ResourceType, ResourceStatus } from '@/data/types';
import LocationPicker from '@/components/LocationPicker';

export default function SubmitResource() {
  const router = useRouter();
  const { submitResource } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Omit<Resource, 'id' | 'verified' | 'lastUpdated'>>({
    name: '',
    type: 'shelter',
    location: {
      lat: '',
      lng: '',
      address: '',
      city: '',
      country: ''
    },
    status: 'available',
    description: '',
    contactInfo: {
      phone: '',
      email: ''
    },
    capacity: 0,
    currentOccupancy: 0,
    notes: ''
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested objects in form data
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object || {}),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'capacity' || name === 'currentOccupancy' 
          ? parseInt(value, 10) || 0 
          : value
      }));
    }
  };

  // Handle location selection from map
  const handleLocationSelect = (lat: string, lng: string, address: string) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        lat,
        lng,
        address
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {

      // Basic validation
      if (!formData.name || !formData.location.lat || !formData.location.lng) {
        throw new Error('Please fill in all required fields');
      }

      // Submit the resource
      const success = await submitResource(formData);
      
      if (success) {
        setSubmitted(true);
        // Reset form after successful submission
        setFormData({
          name: '',
          type: 'shelter',
          location: {
            lat: '',
            lng: '',
            address: '',
            city: '',
            country: ''
          },
          status: 'available',
          description: '',
          contactInfo: {
            phone: '',
            email: ''
          },
          capacity: 0,
          currentOccupancy: 0,
          notes: ''
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the resource');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-card-dark border border-light-bg/10 p-8 rounded-3xl shadow-2xl">
          <div className="bg-success/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-success" />
          </div>
          <h2 className="text-3xl font-bold text-light-bg mb-4">Submission Received</h2>
          <p className="text-light-bg/70 mb-8 leading-relaxed">
            Thank you for your help. Our team is verifying the details now. It will appear on the map shortly once confirmed.
          </p>
          <Link 
            href="/map" 
            className="block w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors"
          >
            Return to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-light-bg pb-20">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 bg-card-dark/50 sticky top-0 z-10 backdrop-blur-md border-b border-light-bg/10">
        <Link href="/map" className="p-2 hover:bg-card-light/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-light-bg">Submit Aid Resource</h1>
      </div>

      <main className="max-w-2xl mx-auto p-6 mt-4">
        {/* Verification Alert */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-4 flex gap-4 items-start">
          <Info className="text-primary shrink-0 mt-1" size={20} />
          <p className="text-sm text-light-bg/80 leading-relaxed">
            To prevent misinformation, all submissions are reviewed by moderators before they go live on the map.
          </p>
        </div>

        {/* Add this to your Submit Page UI */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4 flex gap-3">
          <ShieldAlert className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-amber-200/70 leading-relaxed">
            <strong>No account required.</strong> To ensure accuracy during this crisis, your submission will be reviewed by a moderator before appearing on the live map.
          </p>
        </div>

        {error && (
          <div className="bg-danger/10 border border-danger/20 rounded-2xl p-4 mb-6 flex gap-3 items-start">
            <AlertCircle className="text-danger shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-light-bg/90">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resource Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-light-bg/70">Resource Name *</label>
            <input 
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Central Park Shelter, Community Water Tank" 
              className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
            />
          </div>

          {/* Resource Type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-light-bg/70">Resource Type *</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              required 
              className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all appearance-none text-light-bg"
            >
              <option value="medical">Medical Aid</option>
              <option value="shelter">Emergency Shelter</option>
              <option value="food">Food Distribution</option>
              <option value="water">Clean Water</option>
              <option value="power">Power Station / Charging</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-light-bg/70">Current Status *</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              required 
              className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all appearance-none text-light-bg"
            >
              <option value="available">Available</option>
              <option value="limited">Limited Availability</option>
              <option value="unavailable">Currently Unavailable</option>
              <option value="temporary_closed">Temporarily Closed</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-light-bg/70">Location *</label>
              <div className="relative h-72 bg-card-light/5 rounded-xl border border-light-bg/10 overflow-hidden group cursor-pointer">
                <LocationPicker formData={formData} setFormData={setFormData} />
              </div>
            </div>

            {/* Address Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-light-bg/70">City</label>
                <input 
                  name="location.city"
                  type="text" 
                  value={formData.location.city || ''}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-light-bg/70">Country</label>
                <input 
                  name="location.country"
                  type="text" 
                  value={formData.location.country || ''}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
                />
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-light-bg/70">Total Capacity</label>
              <input 
                name="capacity"
                type="number" 
                min="0"
                value={formData.capacity || ''}
                onChange={handleChange}
                placeholder="e.g., 100"
                className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-light-bg/70">Current Occupancy</label>
              <input 
                name="currentOccupancy"
                type="number" 
                min="0"
                value={formData.currentOccupancy || ''}
                onChange={handleChange}
                placeholder="e.g., 50"
                className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-light-bg/90 mt-6 mb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-light-bg/70">Phone Number</label>
                <input 
                  name="contactInfo.phone"
                  type="tel" 
                  value={formData.contactInfo?.phone || ''}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-light-bg/70">Email</label>
                <input 
                  name="contactInfo.email"
                  type="email" 
                  value={formData.contactInfo?.email || ''}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                  className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-light-bg/70">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Provide details about this resource, such as services offered, hours of operation, and any requirements for access."
              className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40 resize-none"
            />
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-light-bg/70">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Any other important information that volunteers or those in need should know."
              className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? 'bg-primary/70 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Resource
                </>
              )}
            </button>
            <p className="text-xs text-light-bg/50 mt-2 text-center">
              By submitting, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}