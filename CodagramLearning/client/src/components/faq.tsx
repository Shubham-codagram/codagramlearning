import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the placement guarantee?",
    answer: "We guarantee that you'll get placed within 12 months of course completion. If not, we'll refund your entire fee or continue supporting you until you get placed."
  },
  {
    question: "Do I need prior coding experience?",
    answer: "No! Our courses are designed for complete beginners. We start from the basics and gradually progress to advanced topics with hands-on practice."
  },
  {
    question: "What is the duration of the courses?",
    answer: "Course duration varies from 4-7 months depending on the program. You can learn at your own pace with flexible timing options."
  },
  {
    question: "Are the classes live or recorded?",
    answer: "We offer both live interactive sessions and recorded lectures. You can attend live classes for real-time doubt clearing and access recordings for revision."
  },
  {
    question: "What kind of support do I get after course completion?",
    answer: "You get lifetime placement support, resume reviews, mock interviews, referrals to our partner companies, and access to our alumni network."
  }
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Got questions? We've got answers.</p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gradient-to-r from-light to-indigo-50 rounded-2xl px-6 border-none"
            >
              <AccordionTrigger className="text-xl font-semibold py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
