import { Laptop, Users, Briefcase, Clock } from "lucide-react";

const features = [
  {
    icon: Laptop,
    title: "Hands-on Projects",
    description: "Build real-world applications and create an impressive portfolio",
    gradient: "from-primary to-secondary"
  },
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Learn from industry professionals with years of experience",
    gradient: "from-accent to-emerald-600"
  },
  {
    icon: Briefcase,
    title: "Placement Assistance",
    description: "Guaranteed job placement support until you get hired",
    gradient: "from-secondary to-pink-500"
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Learn at your own pace with live and recorded sessions",
    gradient: "from-orange-500 to-red-500"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose Codagram?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive coding education with industry-focused curriculum and guaranteed placement support
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg`}>
                <feature.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
