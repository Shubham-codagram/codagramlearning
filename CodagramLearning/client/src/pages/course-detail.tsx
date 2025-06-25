import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TestimonialCard from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Users, CheckCircle, Star, Play, Download, Award, Target, BookOpen, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Course, Testimonial } from "@shared/schema";

export default function CourseDetail() {
  const [match, params] = useRoute("/courses/:id");
  const courseId = params?.id ? parseInt(params.id) : 0;
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: ["/api/courses", courseId],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${courseId}`);
      if (!response.ok) {
        throw new Error("Course not found");
      }
      return response.json();
    },
    enabled: !!courseId,
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials/course", courseId],
    queryFn: async () => {
      const response = await fetch(`/api/testimonials/course/${courseId}`);
      return response.json();
    },
    enabled: !!courseId,
  });

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
    enrollMutation.mutate(courseId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div>Loading course details...</div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <p className="text-gray-600">The course you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Course Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${getCategoryColor(course.category)} text-white`}>
                    {course.category}
                  </Badge>
                  {course.isBestseller && (
                    <Badge className="bg-orange-500 text-white">Bestseller</Badge>
                  )}
                  {course.isPopular && (
                    <Badge className="bg-accent text-white">Popular</Badge>
                  )}
                </div>
                
                <h1 className="text-4xl font-bold text-dark mb-4">{course.title}</h1>
                <p className="text-xl text-gray-600 mb-6">{course.description}</p>
                
                <div className="flex items-center space-x-6 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500 fill-current" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{course.studentsEnrolled.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center mb-8">
                  <img 
                    src={course.instructorImage} 
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <div>
                    <div className="text-sm text-gray-500">Created by</div>
                    <div className="font-semibold text-primary">{course.instructor}</div>
                  </div>
                </div>
              </div>

              {/* Course Video Preview */}
              <div className="mb-8">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  {course.videoUrl ? (
                    <iframe
                      src={course.videoUrl}
                      title={course.title}
                      className="w-full h-64 md:h-96"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-64 md:h-96 object-cover" 
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                          <Play className="w-6 h-6 mr-2" />
                          Preview Course
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Course Content Tabs */}
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Learning Outcomes</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start">
                            <Target className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Requirements</h3>
                      <div className="space-y-2">
                        {course.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="curriculum" className="mt-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Course Curriculum</h3>
                    <Accordion type="single" collapsible className="space-y-4">
                      {course.syllabus.map((topic, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`item-${index}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-3 text-primary" />
                              <span>Module {index + 1}: {topic}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 pt-4 pb-4">
                            Comprehensive coverage of {topic.toLowerCase()} with hands-on examples, 
                            exercises, and real-world applications. Includes video lectures, 
                            downloadable resources, and interactive assignments.
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
                
                <TabsContent value="projects" className="mt-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Hands-on Projects</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.projects.map((project, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3 mt-1">
                              <span className="text-white text-sm font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">{project}</h4>
                              <p className="text-sm text-gray-600">
                                Build a real-world project that demonstrates your mastery of the concepts learned in this course.
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Student Reviews</h3>
                    {testimonials.length > 0 ? (
                      <div className="space-y-4">
                        {testimonials.map((testimonial) => (
                          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No reviews yet for this course.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="text-4xl font-bold text-primary">
                        ₹{course.price.toLocaleString()}
                      </div>
                      {course.originalPrice && (
                        <div className="text-xl text-gray-500 line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                    {course.originalPrice && (
                      <div className="text-sm text-accent font-medium mb-2">
                        Save ₹{(course.originalPrice - course.price).toLocaleString()}
                      </div>
                    )}
                    <div className="text-gray-600">One-time payment</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{course.studentsEnrolled.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Format:</span>
                      <span className="font-medium">Live + Recorded</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Language:</span>
                      <span className="font-medium">English + Hindi</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Support:</span>
                      <span className="font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certificate:</span>
                      <span className="font-medium">✓ Included</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-primary text-white hover:shadow-lg transition-all duration-300 mb-4"
                    onClick={handleEnroll}
                    disabled={enrollMutation.isPending}
                  >
                    {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                  </Button>

                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white mb-4">
                    <Download className="w-4 h-4 mr-2" />
                    Download Curriculum
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Free Demo Class
                  </Button>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-2 text-accent" />
                      <span>Industry-recognized certificate</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-2 text-accent" />
                      <span>Job placement assistance</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-light to-indigo-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Special Offer</div>
                      <div className="text-lg font-bold text-primary">Limited Time Discount</div>
                      <div className="text-sm text-gray-600">Offer ends in 3 days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
