import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Trophy, User } from "lucide-react";
import type { Enrollment } from "@shared/schema";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  
  const { data: enrollments = [], isLoading } = useQuery<Enrollment[]>({
    queryKey: ["/api/my-enrollments"],
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">Please login to access your dashboard.</p>
            <Button onClick={() => window.location.href = '/api/login'}>
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark">
                  Welcome back, {user?.firstName || 'Student'}!
                </h1>
                <p className="text-gray-600">Continue your learning journey</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  Enrolled Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{enrollments.length}</div>
                <p className="text-sm text-gray-600">Active enrollments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Clock className="w-5 h-5 mr-2 text-accent" />
                  Learning Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">24</div>
                <p className="text-sm text-gray-600">Hours completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Trophy className="w-5 h-5 mr-2 text-orange-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-500">3</div>
                <p className="text-sm text-gray-600">Certificates earned</p>
              </CardContent>
            </Card>
          </div>

          {/* Enrolled Courses */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">My Courses</h2>
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : enrollments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses enrolled yet</h3>
                  <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course</p>
                  <Button 
                    className="bg-gradient-primary text-white"
                    onClick={() => window.location.href = '/courses'}
                  >
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Progress</div>
                          <div className="text-lg font-bold text-primary">25%</div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Course #{enrollment.courseId}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Enrolled on {new Date(enrollment.enrolledAt!).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Continue Learning
                        </Button>
                        <Button className="flex-1 bg-gradient-primary text-white">
                          View Course
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 text-left justify-start p-4"
                onClick={() => window.location.href = '/courses'}
              >
                <BookOpen className="w-6 h-6 mr-3 text-primary" />
                <div>
                  <div className="font-semibold">Browse Courses</div>
                  <div className="text-sm text-gray-500">Find new courses</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 text-left justify-start p-4"
                onClick={() => window.location.href = '/contact'}
              >
                <User className="w-6 h-6 mr-3 text-primary" />
                <div>
                  <div className="font-semibold">Get Support</div>
                  <div className="text-sm text-gray-500">Contact our team</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="h-20 text-left justify-start p-4"
              >
                <Trophy className="w-6 h-6 mr-3 text-primary" />
                <div>
                  <div className="font-semibold">Certificates</div>
                  <div className="text-sm text-gray-500">View achievements</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="h-20 text-left justify-start p-4"
              >
                <Clock className="w-6 h-6 mr-3 text-primary" />
                <div>
                  <div className="font-semibold">Study Schedule</div>
                  <div className="text-sm text-gray-500">Plan your time</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}