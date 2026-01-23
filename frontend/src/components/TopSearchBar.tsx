"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  Filter,
  MapPin,
  Droplet,
  Stethoscope,
  Home,
  Battery,
  Utensils,
  ChevronDown,
} from "lucide-react";
import { Resource } from "@/types";

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
  { id: "all", name: "All Resources", icon: MapPin, color: "bg-primary" },
  { id: "water", name: "Water", icon: Droplet, color: "bg-blue-500" },
  { id: "medical", name: "Medical", icon: Stethoscope, color: "bg-danger" },
  { id: "shelter", name: "Shelter", icon: Home, color: "bg-secondary" },
  { id: "food", name: "Food", icon: Utensils, color: "bg-warning" },
  { id: "power", name: "Power", icon: Battery, color: "bg-success" },
];

export default function TopSearchBar({
  onSearch,
  onFilterChange,
  resourceTypes = defaultResourceTypes,
}: TopSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected type data or fallback to 'all'
  const selectedTypeData = useMemo(() => {
    const found = resourceTypes.find((type) => type.id === selectedType);
    return found || resourceTypes[0] || { id: "all", name: "All Resources" };
  }, [selectedType, resourceTypes]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTypeDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedType === "all" ? undefined : selectedType);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setIsTypeDropdownOpen(false);
    onSearch(searchQuery, type === "all" ? undefined : type);
    if (onFilterChange) {
      onFilterChange(type === "all" ? "" : type);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("", selectedType === "all" ? undefined : selectedType);
  };

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Google Maps"
                className="
                    w-full h-12 md:h-14
                    pl-12 pr-14
                    rounded-full
                    bg-background
                    border border-border
                    text-sm md:text-base
                    shadow-sm
                    focus:ring-2 focus:ring-primary/30
                    focus:outline-none
                  "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 inset-y-0 flex items-center"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </form>
          </div>

          <div className="mt-3 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 px-1">
              {resourceTypes.map((type) => {
                const Icon = type.icon;
                const active = selectedType === type.id;

                return (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`
                        flex items-center gap-2
                        px-4 py-2
                        rounded-full
                        text-sm whitespace-nowrap
                        border transition
                        ${active
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-card border-primary text-primary hover:bg-accent"
                      }
                      `}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {type.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
