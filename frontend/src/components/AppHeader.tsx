"use client";

import { useState } from 'react';
import { Search, Menu, X, MapPin, LogOut, User, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { ResourceType } from '@/types';
import Image from 'next/image';

interface AppHeaderProps {
  searchPlaceholder?: string;
  onSearch?: (query: string, type?: ResourceType) => void;
  showBackButton?: boolean;
  onBack?: () => void;
  initialSearchQuery?: string;
  initialResourceType?: ResourceType;
}

export default function AppHeader({
  searchPlaceholder = 'Search for resources...',
  onSearch,
  showBackButton = false,
  onBack,
  initialSearchQuery = '',
  //   initialResourceType = 'all',
}: AppHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [resourceType, setResourceType] = useState<ResourceType>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery, resourceType);
  };

  const handleLogout = () => {
    const token = Cookies.get('authToken');

    if (!token) {
      toast.error('You are not logged in');
      return;
    }

    try {
      fetch('https://crisisaid-backend.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            Cookies.remove('authToken');
            Cookies.remove('userData');
            router.push('/user');
          }
        })
        .catch(error => {
          console.error('Logout failed:', error);
        });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6 justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <nav className="flex flex-col h-full p-4 space-y-4">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => router.push('/')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => router.push('/userProfile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          {showBackButton && onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <X className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
        </div>

        {/* Logo / Title */}
        <div className="hidden md:flex items-center">
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

        {/* Search Bar */}
        <div className="flex-1 px-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 bg-transparent text-sm focus:outline-none"
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value as ResourceType)}
            >
              <option value="--">All Types</option>
              <option value="FOOD">Food</option>
              <option value="SHELTER">Shelter</option>
              <option value="MEDICAL">Medical</option>
              <option value="WATER">Water</option>
              <option value="CLOTHING">Clothing</option>
              <option value="OTHER">Other</option>
            </select>
          </form>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/userProfile')}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}
