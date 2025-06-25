import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    name: "Basic",
    price: "₹29,999",
    period: "One-time payment",
    features: [
      "Access to course materials",
      "Live coding sessions",
      "Basic placement support",
      "Community access"
    ],
    buttonText: "Get Started"
  },
  {
    name: "Premium",
    price: "₹49,999",
    period: "One-time payment",
    features: [
      "Everything in Basic",
      "1-on-1 mentorship",
      "Priority placement support",
      "Mock interviews",
      "Portfolio building"
    ],
    isPopular: true,
    buttonText: "Get Started"
  },
  {
    name: "Enterprise",
    price: "₹69,999",
    period: "One-time payment",
    features: [
      "Everything in Premium",
      "Dedicated career coach",
      "Guaranteed job placement",
      "Salary negotiation support",
      "Lifetime alumni network"
    ],
    buttonText: "Get Started"
  }
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-light to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible payment options with guaranteed job placement
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 transition-all duration-300 ${
                plan.isPopular 
                  ? "bg-gradient-primary text-white shadow-xl transform scale-105" 
                  : "bg-white hover:shadow-xl"
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                <div className={`mb-6 ${plan.isPopular ? "text-gray-200" : "text-gray-600"}`}>
                  {plan.period}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="text-accent mr-3 w-5 h-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.isPopular 
                      ? "bg-white text-primary hover:bg-gray-100" 
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All plans include 30-day money-back guarantee</p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
              <span>EMI Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
              <span>Job Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
