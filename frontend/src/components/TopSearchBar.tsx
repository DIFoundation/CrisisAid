"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Filter, MapPin, Droplet, Stethoscope, Home, Battery, Utensils, ChevronDown } from 'lucide-react';
import { Resource } from '@/data/types';

interface ResourceTypeOption {
  id: string;
  name: string;
  icon?: any; // Optional icon
  color?: string; // Optional color
}

interface TopSearchBarProps {
  onSearch: (query: string, type?: string) => void;
  onFilterChange?: (type: string) => void;
  resourceTypes?: ResourceTypeOption[];
}

// Default resource types in case none are provided
const defaultResourceTypes: ResourceTypeOption[] = [
  { id: 'all', name: 'All Resources', icon: MapPin, color: 'bg-primary' },
  { id: 'water', name: 'Water', icon: Droplet, color: 'bg-blue-500' },
  { id: 'medical', name: 'Medical', icon: Stethoscope, color: 'bg-danger' },
  { id: 'shelter', name: 'Shelter', icon: Home, color: 'bg-secondary' },
  { id: 'food', name: 'Food', icon: Utensils, color: 'bg-warning' },
  { id: 'power', name: 'Power', icon: Battery, color: 'bg-success' },
];

export default function TopSearchBar({ 
  onSearch, 
  onFilterChange, 
  resourceTypes = defaultResourceTypes 
}: TopSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected type data or fallback to 'all'
  const selectedTypeData = useMemo(() => {
    const found = resourceTypes.find(type => type.id === selectedType);
    return found || resourceTypes[0] || { id: 'all', name: 'All Resources' };
  }, [selectedType, resourceTypes]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedType === 'all' ? undefined : selectedType);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setIsTypeDropdownOpen(false);
    onSearch(searchQuery, type === 'all' ? undefined : type);
    if (onFilterChange) {
      onFilterChange(type === 'all' ? '' : type);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('', selectedType === 'all' ? undefined : selectedType);
  };

  return (
    <div 
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-md' : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search Bar */}
          <div className="flex-1 flex items-center">
            <div className="relative w-full max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-foreground/50" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-12 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  placeholder="Search for resources..."
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    if (!value) {
                      onSearch('', selectedType === 'all' ? undefined : selectedType);
                    }
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-16 pr-3 flex items-center text-foreground/50 hover:text-foreground"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <div className="h-6 w-px bg-border" />
                  <div className="hidden md:flex items-center ml-4 relative" ref={dropdownRef}>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-border rounded-lg bg-card text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                    >
                      {selectedTypeData.icon && (
                        <selectedTypeData.icon className="h-4 w-4 mr-2" />
                      )}
                      <span className="text-sm font-medium">
                        {selectedTypeData.name}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </button>

                    {/* Dropdown */}
                    {isTypeDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border border-border overflow-hidden z-50">
                        <div className="py-1">
                          {resourceTypes.map((type) => (
                            <button
                              key={type.id}
                              className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                                selectedType === type.id
                                  ? 'bg-accent text-accent-foreground'
                                  : 'text-foreground hover:bg-accent/50'
                              }`}
                              onClick={() => handleTypeSelect(type.id)}
                            >
                              {type.icon && <type.icon className="h-4 w-4 mr-3" />}
                              {type.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}