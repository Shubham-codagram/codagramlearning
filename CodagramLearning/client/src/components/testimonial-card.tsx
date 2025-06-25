import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className="text-yellow-500 text-lg flex">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
        </div>
        <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
        <div className="flex items-center">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4" 
          />
          <div>
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-sm text-gray-500">{testimonial.role} @ {testimonial.company}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
