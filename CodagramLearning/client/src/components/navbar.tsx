import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import codagramLogo from "@assets/codagram_edtech_logo_1750753764668.jpeg";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  if (isAuthenticated) {
    navItems.push({ href: "/dashboard", label: "Dashboard" });
  }

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src={codagramLogo} 
              alt="Codagram" 
              className="w-10 h-10 rounded-lg object-contain"
            />
            <span className="text-2xl font-bold text-gradient">Codagram</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href)
                    ? "text-primary font-medium"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="animate-pulse flex space-x-2">
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    {user?.firstName || 'User'}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-primary"
                  onClick={() => window.location.href = '/api/logout'}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-secondary"
                  onClick={() => window.location.href = '/api/login'}
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-primary text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.location.href = '/api/login'}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg transition-colors ${
                        isActive(item.href)
                          ? "text-primary font-medium"
                          : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 mt-8">
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 p-2">
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">
                            {user?.firstName || 'User'}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          className="text-gray-600 w-full"
                          onClick={() => window.location.href = '/api/logout'}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button 
                          variant="ghost" 
                          className="text-primary"
                          onClick={() => window.location.href = '/api/login'}
                        >
                          Login
                        </Button>
                        <Button 
                          className="bg-gradient-primary text-white"
                          onClick={() => window.location.href = '/api/login'}
                        >
                          Get Started
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
