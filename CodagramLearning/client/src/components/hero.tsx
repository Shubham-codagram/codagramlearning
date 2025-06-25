import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Calendar, Users, Building, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-20 pb-16 bg-gradient-light min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20">
              <Star className="w-4 h-4 mr-2 text-accent" />
              India's #1 Coding Bootcamp
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-dark leading-tight mb-6">
              Master{" "}
              <span className="text-gradient">Coding</span>{" "}
              Skills &{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">Get Placed</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Learn industry-ready programming skills with hands-on projects, personalized mentoring, and guaranteed placement assistance until you land your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-primary text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = '/courses'}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => window.location.href = '/contact'}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-accent mr-2" />
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center">
                <Building className="w-5 h-5 text-accent mr-2" />
                <span>500+ Companies</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-accent mr-2" />
                <span>95% Placement Rate</span>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in relative">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Students coding together in modern classroom" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            
            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 bg-white rounded-xl shadow-lg p-4 animate-bounce-subtle hidden lg:block">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-sm font-medium">Live Coding Session</span>
              </div>
            </div>
            
            <div 
              className="absolute -bottom-10 -left-10 bg-white rounded-xl shadow-lg p-4 animate-bounce-subtle hidden lg:block"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Job Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
