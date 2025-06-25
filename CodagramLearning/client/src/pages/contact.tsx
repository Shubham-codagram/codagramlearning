import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your coding journey? Contact us today!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <ContactForm />
            
            <div className="space-y-8">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                  alt="Customer service team working in modern tech office"
                  className="rounded-2xl shadow-lg w-full" 
                />
              </div>
              
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="text-primary text-xl mr-4" />
                      <div>
                        <div className="font-semibold">Address</div>
                        <div className="text-gray-600">123 Tech Street, Bangalore, Karnataka 560001</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-primary text-xl mr-4" />
                      <div>
                        <div className="font-semibold">Phone</div>
                        <div className="text-gray-600">+91 98765 43210</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="text-primary text-xl mr-4" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-gray-600">hello@codagram.com</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-primary text-xl mr-4" />
                      <div>
                        <div className="font-semibold">Hours</div>
                        <div className="text-gray-600">Mon-Fri: 9AM-6PM IST</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-gradient-primary rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                <p className="mb-6">Book a free demo session and speak with our experts</p>
                <Button className="bg-white text-primary hover:bg-gray-100 transition-all duration-300">
                  Book Free Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
