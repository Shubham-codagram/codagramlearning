export default function PlacementStats() {
  const stats = [
    { value: "95%", label: "Placement Rate" },
    { value: "12 LPA", label: "Average Package" },
    { value: "500+", label: "Hiring Partners" },
    { value: "60 Days", label: "Average Placement Time" }
  ];

  const companies = [
    "Google", "Microsoft", "Amazon", "Netflix", "Meta", "Apple", "Uber", "Airbnb"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Placement Success</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our students have been placed in top companies worldwide
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Professional job interview in modern office setting"
              className="rounded-2xl shadow-xl" 
            />
          </div>
          
          <div>
            <div className="grid grid-cols-2 gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    index === 0 ? "text-primary" :
                    index === 1 ? "text-accent" :
                    index === 2 ? "text-secondary" :
                    "text-orange-500"
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-light to-indigo-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Our Placement Process</h3>
              <div className="space-y-3">
                {[
                  "Resume Building & Portfolio Review",
                  "Mock Interviews & Technical Preparation",
                  "Direct Company Referrals",
                  "Salary Negotiation Support"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Logos */}
        <div className="mt-16">
          <h3 className="text-center text-xl font-semibold mb-8 text-gray-700">Our Students Work At</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-2xl font-bold text-gray-500">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
