import {
  users,
  courses,
  testimonials,
  contacts,
  enrollments,
  type User,
  type UpsertUser,
  type InsertUser,
  type Course,
  type InsertCourse,
  type Testimonial,
  type InsertTestimonial,
  type Contact,
  type InsertContact,
  type Enrollment,
  type InsertEnrollment,
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations for authentication
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  
  // Course operations
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByCourse(courseId: number): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Enrollment operations
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getUserEnrollments(userId: string): Promise<Enrollment[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<number, Course>;
  private testimonials: Map<number, Testimonial>;
  private contacts: Map<number, Contact>;
  private enrollments: Map<number, Enrollment>;
  private currentCourseId: number;
  private currentTestimonialId: number;
  private currentContactId: number;
  private currentEnrollmentId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.testimonials = new Map();
    this.contacts = new Map();
    this.enrollments = new Map();
    this.currentCourseId = 1;
    this.currentTestimonialId = 1;
    this.currentContactId = 1;
    this.currentEnrollmentId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed courses based on Tutedude.com actual courses
    const coursesData: InsertCourse[] = [
      {
        title: "Complete Web Development Bootcamp",
        description: "Become a Full Stack Web Developer from scratch. Learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB & much more!",
        category: "Web Development",
        price: 13500,
        originalPrice: 29999,
        duration: "60 hours",
        level: "Beginner to Advanced",
        features: [
          "HTML5 & CSS3 Mastery",
          "JavaScript ES6+ Advanced Concepts",
          "React.js with Hooks & Context API",
          "Node.js & Express.js Backend",
          "MongoDB Database Design",
          "REST APIs & Authentication",
          "Deployment on AWS/Heroku",
          "Live Project Building",
          "Career Guidance & Interview Prep",
          "Lifetime Access & Updates"
        ],
        syllabus: [
          "HTML5 Fundamentals & Semantic Structure",
          "CSS3 Advanced Styling & Flexbox/Grid",
          "JavaScript Fundamentals & DOM Manipulation",
          "ES6+ Features: Arrow Functions, Destructuring, Modules",
          "Asynchronous JavaScript: Promises, Async/Await",
          "React.js Components & State Management",
          "React Router & Context API",
          "Node.js & NPM Ecosystem",
          "Express.js Server & Middleware",
          "MongoDB & Mongoose ODM",
          "Authentication & Authorization (JWT)",
          "REST API Design & Best Practices",
          "Testing with Jest & React Testing Library",
          "Deployment & DevOps Basics",
          "Version Control with Git & GitHub"
        ],
        projects: [
          "Personal Portfolio Website",
          "Todo App with Local Storage",
          "Weather App using API",
          "E-commerce Shopping Cart",
          "Social Media Dashboard",
          "Real-time Chat Application",
          "Blog Platform with CMS",
          "Task Management System"
        ],
        outcomes: [
          "Build modern, responsive web applications",
          "Master full-stack development workflow",
          "Create RESTful APIs and databases",
          "Deploy applications to production",
          "Land a job as a web developer",
          "Freelance and build custom projects"
        ],
        requirements: [
          "Basic computer knowledge",
          "Internet connection",
          "Dedication to learn 2-3 hours daily",
          "No prior programming experience required"
        ],
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
        instructor: "Rohit Kumar",
        instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        rating: 5,
        studentsEnrolled: 15420,
        isPopular: true,
        isBestseller: true
      },
      {
        title: "Python Programming & Data Science Masterclass",
        description: "Master Python programming, data analysis, machine learning, and AI. From basics to advanced data science projects.",
        category: "Data Science",
        price: 13500,
        originalPrice: 27999,
        duration: "50 hours",
        level: "Beginner to Advanced",
        features: [
          "Python Programming Fundamentals",
          "Data Analysis with Pandas & NumPy",
          "Data Visualization with Matplotlib & Seaborn",
          "Machine Learning with Scikit-learn",
          "Deep Learning with TensorFlow",
          "SQL for Data Science",
          "Web Scraping & APIs",
          "Real-world Data Science Projects",
          "Job Interview Preparation",
          "Industry Mentorship"
        ],
        syllabus: [
          "Python Basics: Variables, Data Types, Control Structures",
          "Object-Oriented Programming in Python",
          "File Handling & Exception Management",
          "NumPy for Numerical Computing",
          "Pandas for Data Manipulation",
          "Matplotlib & Seaborn for Visualization",
          "Statistical Analysis & Hypothesis Testing",
          "Machine Learning Algorithms",
          "Supervised Learning: Regression & Classification",
          "Unsupervised Learning: Clustering & PCA",
          "Deep Learning & Neural Networks",
          "Natural Language Processing",
          "Computer Vision Basics",
          "Web Scraping with BeautifulSoup",
          "SQL & Database Integration"
        ],
        projects: [
          "Sales Data Analysis Dashboard",
          "Stock Price Prediction Model",
          "Customer Segmentation Analysis",
          "Sentiment Analysis Tool",
          "Recommendation System",
          "Image Classification Model",
          "Web Scraping Automation",
          "Real Estate Price Predictor"
        ],
        outcomes: [
          "Master Python programming language",
          "Analyze and visualize complex datasets",
          "Build machine learning models",
          "Create data-driven solutions",
          "Get hired as a data scientist",
          "Start freelancing in data analysis"
        ],
        requirements: [
          "Basic mathematics knowledge",
          "Computer with 4GB+ RAM",
          "Willingness to learn statistics",
          "No programming experience needed"
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
        instructor: "Dr. Priya Sharma",
        instructorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        rating: 5,
        studentsEnrolled: 12850,
        isPopular: true,
        isBestseller: false
      },
      {
        title: "Complete Mobile App Development Course",
        description: "Build native iOS & Android apps using React Native, Flutter & Swift/Kotlin. Deploy to App Store & Google Play.",
        category: "Mobile Development",
        price: 13500,
        originalPrice: 24999,
        duration: "45 hours",
        level: "Beginner to Advanced",
        features: [
          "React Native Cross-platform Development",
          "Flutter & Dart Programming",
          "Native iOS Development (Swift)",
          "Native Android Development (Kotlin)",
          "Firebase Backend Integration",
          "Push Notifications & Analytics",
          "App Store & Play Store Publishing",
          "UI/UX Design for Mobile",
          "Performance Optimization",
          "Monetization Strategies"
        ],
        syllabus: [
          "Mobile Development Fundamentals",
          "React Native Setup & Environment",
          "Navigation & State Management",
          "UI Components & Styling",
          "API Integration & Data Fetching",
          "Local Storage & AsyncStorage",
          "Camera & Gallery Integration",
          "Push Notifications with Firebase",
          "Flutter Introduction & Dart Language",
          "Widget System & Material Design",
          "Native iOS Development with Swift",
          "Native Android with Kotlin",
          "App Store Optimization (ASO)",
          "Testing & Debugging Techniques",
          "App Deployment & Distribution"
        ],
        projects: [
          "Todo List Mobile App",
          "Weather Forecast App",
          "Social Media Clone",
          "E-commerce Shopping App",
          "Chat Messaging Application",
          "Food Delivery App",
          "Fitness Tracker App",
          "News Reader Application"
        ],
        outcomes: [
          "Build cross-platform mobile applications",
          "Publish apps to App Store & Google Play",
          "Master React Native & Flutter",
          "Create native iOS & Android apps",
          "Start mobile app development career",
          "Build and sell mobile applications"
        ],
        requirements: [
          "Basic programming knowledge helpful",
          "Mac for iOS development (optional)",
          "Android Studio & Xcode access",
          "Smartphone for testing apps"
        ],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        videoUrl: "https://www.youtube.com/embed/0-S5a0eXPoc",
        instructor: "Arjun Mehta",
        instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        rating: 5,
        studentsEnrolled: 9650,
        isPopular: false,
        isBestseller: false
      },
      {
        title: "Java Backend Development & System Design",
        description: "Master Java, Spring Boot, microservices architecture, and system design. Build scalable enterprise applications.",
        category: "Backend Development",
        price: 13500,
        originalPrice: 32999,
        duration: "55 hours",
        level: "Intermediate to Advanced",
        features: [
          "Core Java & Advanced Concepts",
          "Spring Framework & Spring Boot",
          "RESTful Web Services & APIs",
          "Microservices Architecture",
          "Database Design & JPA/Hibernate",
          "System Design & Scalability",
          "Docker & Containerization",
          "AWS Cloud Deployment",
          "Testing & Security Best Practices",
          "Interview Preparation"
        ],
        syllabus: [
          "Java Fundamentals & OOP Concepts",
          "Collections Framework & Generics",
          "Exception Handling & File I/O",
          "Multithreading & Concurrency",
          "Spring Core & Dependency Injection",
          "Spring MVC & Web Development",
          "Spring Boot Auto-configuration",
          "Spring Data JPA & Hibernate",
          "REST API Design & Documentation",
          "Microservices with Spring Cloud",
          "Database Design & Optimization",
          "System Design Principles",
          "Load Balancing & Caching",
          "Docker & Kubernetes Basics",
          "AWS Services & Cloud Deployment"
        ],
        projects: [
          "Library Management System",
          "Employee Management API",
          "E-commerce Backend Service",
          "Blog Management Platform",
          "Banking System Simulation",
          "Microservices Application",
          "Real-time Chat Backend",
          "File Upload & Management System"
        ],
        outcomes: [
          "Master Java backend development",
          "Build scalable web applications",
          "Design system architecture",
          "Work with microservices",
          "Get hired as backend developer",
          "Architect enterprise solutions"
        ],
        requirements: [
          "Basic programming knowledge",
          "Understanding of databases",
          "Computer with 8GB+ RAM",
          "Willingness to learn complex concepts"
        ],
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        videoUrl: "https://www.youtube.com/embed/msXL2oDexqw",
        instructor: "Vikash Singh",
        instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        rating: 5,
        studentsEnrolled: 8930,
        isPopular: false,
        isBestseller: false
      },
      {
        title: "DevOps & Cloud Engineering Masterclass",
        description: "Master AWS, Docker, Kubernetes, CI/CD pipelines, and infrastructure automation. Become a certified cloud engineer.",
        category: "DevOps",
        price: 13500,
        originalPrice: 38999,
        duration: "65 hours",
        level: "Intermediate to Advanced",
        features: [
          "AWS Cloud Services & Architecture",
          "Docker Containerization",
          "Kubernetes Orchestration",
          "CI/CD Pipeline Automation",
          "Infrastructure as Code (Terraform)",
          "Linux System Administration",
          "Monitoring & Logging (ELK Stack)",
          "Security & Compliance",
          "AWS Certification Preparation",
          "Real-world Project Implementation"
        ],
        syllabus: [
          "Linux Fundamentals & Command Line",
          "AWS Core Services: EC2, S3, VPC",
          "Docker Fundamentals & Best Practices",
          "Container Registry & Image Management",
          "Kubernetes Architecture & Components",
          "Pod, Service & Deployment Management",
          "Helm Charts & Package Management",
          "Jenkins CI/CD Pipeline Setup",
          "GitLab CI & GitHub Actions",
          "Infrastructure as Code with Terraform",
          "AWS CloudFormation Templates",
          "Monitoring with Prometheus & Grafana",
          "Log Management with ELK Stack",
          "Security Scanning & Compliance",
          "AWS Well-Architected Framework"
        ],
        projects: [
          "Automated Deployment Pipeline",
          "Microservices on Kubernetes",
          "Infrastructure Automation",
          "Multi-environment Setup",
          "Monitoring Dashboard Creation",
          "Auto-scaling Web Application",
          "Disaster Recovery Implementation",
          "Security Hardening Project"
        ],
        outcomes: [
          "Master cloud infrastructure management",
          "Automate deployment processes",
          "Design scalable architectures",
          "Pass AWS certification exams",
          "Get hired as DevOps engineer",
          "Optimize infrastructure costs"
        ],
        requirements: [
          "Basic understanding of web development",
          "Linux command line knowledge helpful",
          "AWS free tier account",
          "Commitment to hands-on learning"
        ],
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        videoUrl: "https://www.youtube.com/embed/3c-iBn73dDE",
        instructor: "Rajesh Khanna",
        instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        rating: 5,
        studentsEnrolled: 7240,
        isPopular: false,
        isBestseller: false
      },
      {
        title: "Data Structures & Algorithms + Interview Prep",
        description: "Master DSA concepts, solve 500+ coding problems, and crack technical interviews at top tech companies like Google, Amazon, Microsoft.",
        category: "Programming",
        price: 13500,
        originalPrice: 21999,
        duration: "40 hours",
        level: "Beginner to Advanced",
        features: [
          "Complete DSA Foundation",
          "500+ Coding Problems",
          "System Design Basics",
          "Mock Interview Sessions",
          "Company-specific Preparation",
          "Resume Building Guidance",
          "Salary Negotiation Tips",
          "Placement Assistance",
          "LeetCode Problem Solving",
          "Live Coding Sessions"
        ],
        syllabus: [
          "Time & Space Complexity Analysis",
          "Arrays & String Manipulation",
          "Linked Lists & Implementation",
          "Stacks & Queues Applications",
          "Binary Trees & Tree Traversals",
          "Binary Search Trees & Heaps",
          "Hashing & Hash Tables",
          "Graphs & Graph Algorithms",
          "Dynamic Programming Patterns",
          "Greedy Algorithms & Backtracking",
          "Sorting & Searching Algorithms",
          "Bit Manipulation Techniques",
          "System Design Fundamentals",
          "Object-Oriented Design",
          "Behavioral Interview Preparation"
        ],
        projects: [
          "Custom Data Structure Implementation",
          "Algorithm Visualization Tool",
          "Problem Solving Tracker",
          "Interview Preparation Dashboard",
          "Coding Contest Platform",
          "System Design Case Study",
          "Resume Portfolio Website",
          "Mock Interview Simulator"
        ],
        outcomes: [
          "Master all DSA concepts",
          "Solve complex coding problems",
          "Crack technical interviews",
          "Get offers from top companies",
          "Negotiate better salaries",
          "Build problem-solving skills"
        ],
        requirements: [
          "Basic programming knowledge (any language)",
          "Understanding of basic mathematics",
          "Dedication to daily practice",
          "Computer with internet connection"
        ],
        image: "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        videoUrl: "https://www.youtube.com/embed/8hly31xKli0",
        instructor: "Ankit Singla",
        instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        rating: 5,
        studentsEnrolled: 18750,
        isPopular: true,
        isBestseller: false
      },
      {
        title: "Complete Digital Marketing Course",
        description: "Master SEO, SEM, Social Media Marketing, Email Marketing, and Analytics. Become a certified digital marketing expert.",
        category: "Digital Marketing",
        price: 13500,
        originalPrice: 19999,
        duration: "35 hours",
        level: "Beginner to Advanced",
        features: [
          "SEO & Content Marketing",
          "Google Ads & PPC Campaigns",
          "Social Media Marketing Strategy",
          "Email Marketing Automation",
          "Google Analytics & Data Analysis",
          "Facebook & Instagram Advertising",
          "Influencer Marketing",
          "Marketing Funnel Optimization",
          "Brand Building & Strategy",
          "Certification Preparation"
        ],
        syllabus: [
          "Digital Marketing Fundamentals",
          "Website Optimization & SEO",
          "Keyword Research & Content Strategy",
          "Google Ads Campaign Management",
          "Facebook & Instagram Marketing",
          "LinkedIn Marketing for B2B",
          "Email Marketing Best Practices",
          "Marketing Automation Tools",
          "Google Analytics Setup & Reporting",
          "Conversion Rate Optimization",
          "Affiliate Marketing Strategies",
          "Influencer Collaboration",
          "Marketing Budget Planning",
          "ROI Measurement & KPIs",
          "Marketing Project Management"
        ],
        projects: [
          "Complete SEO Audit & Strategy",
          "Google Ads Campaign Setup",
          "Social Media Marketing Plan",
          "Email Marketing Campaign",
          "Analytics Dashboard Creation",
          "Content Marketing Strategy",
          "Influencer Outreach Campaign",
          "Marketing Funnel Design"
        ],
        outcomes: [
          "Launch successful marketing campaigns",
          "Master all digital marketing channels",
          "Get certified in Google & Facebook Ads",
          "Start digital marketing career",
          "Grow business through marketing",
          "Become a marketing consultant"
        ],
        requirements: [
          "Basic computer and internet skills",
          "Interest in marketing and business",
          "Access to social media platforms",
          "Willingness to learn analytics"
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        videoUrl: "https://www.youtube.com/embed/bixR-KIJKYM",
        instructor: "Sneha Agarwal",
        instructorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        rating: 5,
        studentsEnrolled: 11200,
        isPopular: false,
        isBestseller: false
      },
      {
        title: "UI/UX Design Complete Course",
        description: "Master user interface and user experience design. Learn Figma, Adobe XD, design thinking, and create stunning digital products.",
        category: "Design",
        price: 13500,
        originalPrice: 22999,
        duration: "42 hours",
        level: "Beginner to Advanced",
        features: [
          "Design Thinking & User Research",
          "Figma & Adobe XD Mastery",
          "Wireframing & Prototyping",
          "Visual Design Principles",
          "Mobile App Design",
          "Web Design Best Practices",
          "Usability Testing",
          "Design System Creation",
          "Portfolio Development",
          "Client Communication"
        ],
        syllabus: [
          "Introduction to UI/UX Design",
          "Design Thinking Process",
          "User Research & Personas",
          "Information Architecture",
          "Wireframing Techniques",
          "Visual Design Principles",
          "Color Theory & Typography",
          "Figma Tool Mastery",
          "Adobe XD Advanced Features",
          "Prototyping & Interaction Design",
          "Mobile-first Design Approach",
          "Responsive Web Design",
          "Usability Testing Methods",
          "Design System Development",
          "Portfolio Creation & Presentation"
        ],
        projects: [
          "Mobile App Design Project",
          "E-commerce Website Redesign",
          "Dashboard Interface Design",
          "Landing Page Optimization",
          "Design System Creation",
          "User Research Case Study",
          "Prototype Development",
          "Professional Portfolio Website"
        ],
        outcomes: [
          "Master UI/UX design tools",
          "Create stunning digital designs",
          "Build professional portfolio",
          "Get hired as UI/UX designer",
          "Start freelance design business",
          "Design user-centered products"
        ],
        requirements: [
          "Creative mindset and attention to detail",
          "Computer with design software access",
          "Interest in user psychology",
          "No prior design experience needed"
        ],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        videoUrl: "https://www.youtube.com/embed/YiLUYf4HDh4",
        instructor: "Ravi Sharma",
        instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        rating: 5,
        studentsEnrolled: 6830,
        isPopular: false,
        isBestseller: false
      }
    ];

    coursesData.forEach(course => this.createCourse(course));

    // Seed testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        name: "Amit Sharma",
        role: "Full Stack Developer",
        company: "Google",
        content: "Codagram's comprehensive curriculum and hands-on approach helped me land my dream job at Google. The placement assistance was exceptional, and the instructors were incredibly supportive throughout my journey.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
        courseId: 1
      },
      {
        name: "Priya Singh",
        role: "Data Scientist",
        company: "Microsoft",
        content: "The Python and Data Science course at Codagram completely transformed my career. From a commerce background to working as a Data Scientist at Microsoft - this journey has been incredible!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
        courseId: 2
      },
      {
        name: "Rohit Verma",
        role: "Mobile App Developer",
        company: "Amazon",
        content: "Codagram's mobile development course gave me the skills to build apps that users love. Now I'm working at Amazon and have also launched my own successful apps on the App Store.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
        courseId: 3
      },
      {
        name: "Sneha Agarwal",
        role: "Backend Developer",
        company: "Flipkart",
        content: "The Java Backend course helped me master system design and microservices. The instructors provided excellent mentorship, and now I'm building scalable systems at Flipkart.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
        courseId: 4
      },
      {
        name: "Vikash Kumar",
        role: "DevOps Engineer",
        company: "Netflix",
        content: "Codagram's DevOps course is simply outstanding. The practical approach to AWS, Docker, and Kubernetes helped me transition from development to DevOps seamlessly.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
        courseId: 5
      },
      {
        name: "Ankit Jain",
        role: "Software Engineer",
        company: "Meta",
        content: "The DSA and Interview Prep course at Codagram was a game-changer. Solved 500+ problems and cracked interviews at multiple companies. Finally joined Meta with a fantastic package!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
        courseId: 6
      },
      {
        name: "Pooja Mehta",
        role: "Digital Marketing Manager",
        company: "Swiggy",
        content: "Codagram's Digital Marketing course covered everything from SEO to paid advertising. The practical projects and real campaigns helped me land a senior role at Swiggy.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
        courseId: 7
      },
      {
        name: "Ravi Teja",
        role: "UI/UX Designer",
        company: "Zomato",
        content: "The UI/UX Design course at Codagram taught me everything about user-centered design. From Figma basics to advanced prototyping, I'm now designing products that millions use at Zomato.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
        courseId: 8
      }
    ];

    testimonialsData.forEach(testimonial => this.createTestimonial(testimonial));
  }

  // User operations for authentication
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id!);
    if (existingUser) {
      const updatedUser: User = {
        ...existingUser,
        ...userData,
        updatedAt: new Date(),
      };
      this.users.set(userData.id!, updatedUser);
      return updatedUser;
    } else {
      const newUser: User = {
        ...userData,
        id: userData.id!,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.set(userData.id!, newUser);
      return newUser;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  // Course operations
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { 
      ...insertCourse, 
      id,
      isPopular: insertCourse.isPopular ?? false,
      isBestseller: insertCourse.isBestseller ?? false,
      createdAt: new Date()
    };
    this.courses.set(id, course);
    return course;
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.category === category);
  }

  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialsByCourse(courseId: number): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.courseId === courseId);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id,
      course: insertContact.course ?? null,
      isProcessed: false,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Enrollment operations
  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = this.currentEnrollmentId++;
    const enrollment: Enrollment = {
      ...insertEnrollment,
      id,
      enrolledAt: new Date(),
      isCompleted: false
    };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(e => e.userId === userId);
  }
}

export const storage = new MemStorage();
