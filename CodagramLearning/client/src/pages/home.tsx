import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Features from "@/components/features";
import CourseCard from "@/components/course-card";
import TestimonialCard from "@/components/testimonial-card";
import PlacementStats from "@/components/placement-stats";
import PricingSection from "@/components/pricing-card";
import FAQ from "@/components/faq";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Course, Testimonial } from "@shared/schema";

export default function Home() {
  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  // Show only first 3 courses on home page
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Courses Section */}
      <section className="py-20 bg-gradient-to-br from-light to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Popular Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master in-demand programming skills with our comprehensive courses
            </p>
          </div>
          
          {coursesLoading ? (
            <div className="text-center">Loading courses...</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link href="/courses">
                  <Button className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300">
                    View All Courses
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <PlacementStats />

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-light to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Student Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our students who landed their dream jobs
            </p>
          </div>
          
          {testimonialsLoading ? (
            <div className="text-center">Loading testimonials...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">About Codagram</h2>
              <p className="text-xl text-gray-600 mb-6">
                We are India's leading coding bootcamp with a mission to bridge the gap between education and employment. Our industry-focused curriculum and guaranteed placement assistance have helped thousands of students launch successful tech careers.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Industry-designed curriculum",
                  "Expert mentors from top companies", 
                  "Hands-on project-based learning",
                  "100% placement assistance guarantee"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <Button className="bg-gradient-primary text-white hover:shadow-lg transition-all duration-300">
                  Learn More About Us
                </Button>
              </Link>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Modern tech startup office with open workspace and collaboration areas"
                className="rounded-2xl shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>

      <PricingSection />
      <FAQ />
      <Footer />
    </div>
  );
}
