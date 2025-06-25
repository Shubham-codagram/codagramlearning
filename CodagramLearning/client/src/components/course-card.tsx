import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Star, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@shared/schema";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const enrollMutation = useMutation({
    mutationFn: async (courseId: number) => {
      return await apiRequest("POST", "/api/enroll", { courseId });
    },
    onSuccess: () => {
      toast({
        title: "Enrollment Successful!",
        description: "You have been enrolled in the course. Check your email for details.",
      });
    },
    onError: (error: any) => {
      if (error.message.includes('401')) {
        toast({
          title: "Login Required",
          description: "Please login to enroll in courses.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = '/api/login';
        }, 1000);
      } else {
        toast({
          title: "Enrollment Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });

  const handleEnroll = () => {
    if (!isAuthenticated) {
      window.location.href = '/api/login';
      return;
    }
    enrollMutation.mutate(course.id);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Full Stack":
        return "bg-gradient-to-r from-primary to-secondary";
      case "Python":
        return "bg-gradient-to-r from-accent to-emerald-600";
      case "Mobile":
        return "bg-gradient-to-r from-secondary to-pink-500";
      case "Backend":
        return "bg-gradient-to-r from-orange-500 to-red-500";
      case "DevOps":
        return "bg-gradient-to-r from-cyan-500 to-blue-500";
      case "DSA":
        return "bg-gradient-to-r from-purple-500 to-indigo-500";
      default:
        return "bg-gradient-to-r from-primary to-secondary";
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {course.isBestseller && (
            <Badge className="bg-orange-500 text-white">
              Bestseller
            </Badge>
          )}
          {course.isPopular && (
            <Badge className="bg-accent text-white">
              Popular
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={`${getCategoryColor(course.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {course.category}
          </Badge>
          <div className="text-right">
            <div className="text-lg font-bold text-accent">₹{course.price.toLocaleString()}</div>
            {course.originalPrice && (
              <div className="text-sm text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</div>
            )}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span className="mr-4">{course.duration}</span>
          <TrendingUp className="w-4 h-4 mr-2" />
          <span>{course.studentsEnrolled} students</span>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Instructor:</div>
          <div className="flex items-center">
            <img 
              src={course.instructorImage} 
              alt={course.instructor}
              className="w-8 h-8 rounded-full mr-2" 
            />
            <span className="text-sm font-medium">{course.instructor}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link href={`/courses/${course.id}`} className="flex-1">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
              View Details
            </Button>
          </Link>
          <Button 
            className="flex-1 bg-gradient-primary text-white hover:shadow-lg transition-all duration-300"
            onClick={handleEnroll}
            disabled={enrollMutation.isPending}
          >
            {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
