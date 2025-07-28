import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Github, Linkedin, ExternalLink, Send, User, GraduationCap, Briefcase, Award, Code, FolderOpen, Lightbulb, Target, Eye, ArrowUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import ProfilePhoto from '../components/ProfilePhoto';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Animation on scroll
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get additional info for analytics
      const userAgent = navigator.userAgent;
      const timestamp = new Date();
      const browserInfo = {
        userAgent,
        language: navigator.language,
        platform: navigator.platform,
        timestamp: timestamp.toISOString()
      };

      // Save form data to Firebase Firestore first
      const docRef = await addDoc(collection(db, 'contact_submissions'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp,
        createdAt: timestamp.toISOString(),
        emailStatus: 'pending',
        browserInfo,
        source: 'portfolio_website'
      });

      // After successful Firebase storage, send emails
      try {
        // EmailJS Configuration
        const SERVICE_ID = 'service_6k19p2n';
        const ADMIN_TEMPLATE_ID = 'template_2vdsm0u';
        const USER_TEMPLATE_ID = 'template_49biefa';
        const PUBLIC_KEY = 'VwYC7Fqt0bUr885on';

        // Initialize EmailJS with the public key
        emailjs.init(PUBLIC_KEY);

        // Send admin notification email using sendForm
        await emailjs.sendForm(
          SERVICE_ID,
          ADMIN_TEMPLATE_ID,
          form,
          PUBLIC_KEY
        );

        // Send user confirmation email using send
        await emailjs.send(
          SERVICE_ID,
          USER_TEMPLATE_ID,
          {
            from_name: formData.name,
            to_email: formData.email,
          },
          PUBLIC_KEY
        );

        toast({
          title: "✅ Thank you! Your message has been sent.",
          description: `Thanks for reaching out, ${formData.name}! I'll get back to you as soon as possible. Check your email for confirmation.`,
          variant: "default",
        });

      } catch (emailError) {
        console.error('Email sending failed:', emailError);

        toast({
          title: "⚠️ Partial Success",
          description: "Your message was saved successfully! Email notifications had issues, but I'll still get back to you.",
          variant: "default",
        });
      }

      // Clear form
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "❌ Submission Failed",
        description: "Something went wrong. Please try again or email me directly at priyanka.vechalapu@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    'HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Python', 'Spring Boot',
    'SQL', 'SQLite', 'Oracle DB', 'PL/SQL', 'Java', 'Git', 'GitHub', 'Postman',
    'Streamlit', 'LangChain', 'Groq API', 'Pinecone', 'Google Gemini', 'R', 'NLP',
    'Responsive Web Design'
  ];

  const projects = [
    {
      title: "Electricity Price Forecasting",
      description: "ML-based prediction to optimize energy use in cloud computing (M.Tech Project)",
      type: "Academic",
      image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/Anjali-Priyanka/electricity-price-forecasting",
      isFullStack: false,
      demo: null
    },
    {
      title: "Text Mining on Jane Austen's Novels",
      description: "NLP and sentiment analysis using R (B.Tech Project)",
      type: "Academic",
      image: "https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/Anjali-Priyanka/text-mining-jane-austen",
      isFullStack: false,
      demo: null
    },
    {
      title: "AI Study Buddy",
      description: "Real-time Q&A app using LangChain, Groq API, Streamlit",
      type: "AI Project",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/Anjali-Priyanka/ai-study-buddy",
      isFullStack: false,
      demo: null
    },
    {
      title: "AI Agent",
      description: "Automated intelligent flows using n8n, APIs, and ChatGPT",
      type: "AI Project",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/Anjali-Priyanka/ai-agent",
      isFullStack: false,
      demo: null
    },
    {
      title: "Patient Appointment RAC App",
      description: "RAG-based AI app using Gemini, Pinecone, LangChain",
      type: "AI Project",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/Anjali-Priyanka/patient-appointment-rag",
      isFullStack: false,
      demo: null
    },
    {
      title: "Multimodal Media Generator",
      description: "No-code AI workflow using Suno AI and InVideo AI",
      type: "AI Project",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/Anjali-Priyanka/multimodal-media-generator",
      isFullStack: false,
      demo: null
    },
    {
      title: "FinGenAI",
      description: "ChatGPT-powered financial assistant built with Lovable",
      type: "AI Project",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/Anjali-Priyanka/fingenai",
      isFullStack: true,
      demo: "https://fingenai-demo.netlify.app" // You can update this with your actual demo URL
    },
    {
    title: "MediGem AI",
    description:
      "Your Personalized AI Healthcare Assistant. MediGem AI helps users book appointments, understand medical symptoms, and manage health data using advanced AI models.",
    type: "AI Project",
    image:
      "https://ik.imagekit.io/6crff56hu/Screenshot%202025-07-28%20135837.png?updatedAt=1753691634970",
    github: "https://github.com/Anjali-Priyanka/MediGem-AI",
    isFullStack: true,
    demo: "https://studio--medigem-ai-gkodu.us-central1.hosted.app/",
  },
  {
    title: "QuickBite AI",
    description:
      "AI-powered food recommendation system to find meals based on your taste, mood, and dietary preferences. Turn your ingredients into delicious meals instantly!",
    type: "AI Project",
    image:
      "https://ik.imagekit.io/6crff56hu/Screenshot%202025-07-28%20124453.png?updatedAt=1753693054155",
    github: "https://github.com/Anjali-Priyanka/QuickBite-AI",
    isFullStack: true,
    demo: "https://studio--quickbite-ai-rnk9n.us-central1.hosted.app/",
  },
    {
  title: "LyricAssist AI",
  description: "AI-powered songwriting assistant that helps generate lyrics based on mood, theme, or genre. Ideal for musicians, poets, and creators seeking inspiration.",
  type: "AI Project",
  image: "https://ik.imagekit.io/6crff56hu/image.png?updatedAt=1753693302172", // Uploaded image from your earlier screenshot
  github: "https://github.com/Anjali-Priyanka/lyric-artist",
  isFullStack: true,
  demo: "https://studio--lyric-assist-20167.us-central1.hosted.app/"
}

  ];

  const services = [
    "Fullstack Web Development (HTML, JS, Node.js, Python)",
    "Backend & API System Design (Spring Boot, SQL, Oracle)",
    "AI-Powered App Development (LangChain, Streamlit, Groq)",
    "No-Code AI Workflow Automation (n8n, Pinecone, Gemini)",
    "Technical Mentorship (Frontend, Backend, Git, Projects)"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <ProfilePhoto />
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Anjali Priyanka Vechalapu
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Software Developer & Tech Mentor
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a 
              href="mailto:priyanka.vechalapu@gmail.com" 
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover-lift"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-black">priyanka.vechalapu@gmail.com</span>
            </a>
            <a 
              href="tel:7729841493" 
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover-lift"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span className="text-black">7729841493</span>
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <a 
              href="https://github.com/Anjali-Priyanka" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 hover-lift"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://linkedin.com/in/anjali-priyanka-vechalapu-9a69ab1aa" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-all duration-300 hover-lift"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 space-y-20">
        
        {/* About Me */}
        <section id="about" className="animate-on-scroll">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-500 hover-lift bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground animate-bounce-in">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-8 h-8 text-primary" />
                </div>
                👤 About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed text-lg">
                I'm a passionate Software Developer and currently working as a Software Development Mentor at NxtWave, where I guide aspiring developers in Frontend and Backend technologies, real-time project development, and job readiness. I'm also pursuing my M.Tech in Computer Science, complementing my hands-on industry experience. Previously, I worked as a Software Engineer at Capgemini for 1 year, contributing to backend systems like a Broadband Billing System using Oracle 11G and PL/SQL, and a Payment Wallet Application built with Spring Boot and Postman. During my B.Tech, I explored NLP and data analysis through a Text Mining project on Jane Austen's novel using R. Currently, for my M.Tech final project, I'm working on 'Electricity Price Forecasting for Cloud Computing Using an Enhanced Machine Learning Model,' aimed at optimizing energy efficiency in cloud environments. I enjoy building scalable AI-powered applications using tools like LangChain, ChatGPT, Groq API, and Streamlit, and I'm driven by a passion for automation, system design, and mentoring future tech professionals.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Education */}
        <section id="education" className="animate-on-scroll-left">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-500 hover-lift bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground animate-scale-in">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-accent" />
                </div>
                🎓 Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg hover:bg-primary/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-foreground">M.Tech in Computer Science and Technology</h3>
                <p className="text-muted-foreground font-medium">Sanketika Vidya Parishad Engineering College</p>
                <p className="text-muted-foreground">2023–2025 | Grade: 85%</p>
              </div>
              <div className="border-l-4 border-accent pl-6 py-4 bg-accent/5 rounded-r-lg hover:bg-accent/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-foreground">B.Tech in Computer Science and Engineering</h3>
                <p className="text-muted-foreground font-medium">Sanketika Vidya Parishad Engineering College</p>
                <p className="text-muted-foreground">2017–2021 | Grade: 70%</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Experience */}
        <section id="experience" className="animate-on-scroll-right">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-500 hover-lift bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground animate-scale-in">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                💼 Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-accent pl-6 py-4 bg-accent/5 rounded-r-lg hover:bg-accent/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-foreground">Software Development Mentor</h3>
                <p className="text-primary font-medium">NxtWave</p>
                <p className="text-muted-foreground mb-2">Apr 2025 – Present</p>
                <p className="text-foreground">Guiding fullstack learners in HTML, CSS, JS, Node.js, Python, SQL. Conducting live sessions, technical reviews, and curriculum enhancements.</p>
              </div>
              <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg hover:bg-primary/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-foreground">Software Engineer</h3>
                <p className="text-primary font-medium">Capgemini</p>
                <p className="text-muted-foreground mb-2">Apr 2022 – May 2023</p>
                <p className="text-foreground">Backend developer on billing and wallet apps using Java, Spring Boot, PL/SQL, Oracle DB in Agile teams.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skills */}
        <section id="skills" className="animate-on-scroll">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-500 hover-lift bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground animate-bounce-in">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Code className="w-8 h-8 text-accent" />
                </div>
                🔧 Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="px-4 py-2 text-sm font-medium bg-primary/5 text-primary hover:bg-primary/10 transition-all duration-300 hover-lift cursor-pointer transform hover:scale-105"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Projects */}
        <section id="projects" className="animate-on-scroll">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-500 hover-lift bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground animate-scale-in">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FolderOpen className="w-8 h-8 text-primary" />
                </div>
                🚀 Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <Card key={index} className="project-card overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="text-xs text-primary border-primary/20 bg-background/80 backdrop-blur-sm">
                          {project.type}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground text-lg leading-tight mb-3">{project.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </Button>
                        {project.demo ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                            onClick={() => window.open(project.demo, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                            Demo
                          </Button>
                        ) : project.isFullStack ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <Eye className="w-4 h-4" />
                            Demo Soon
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

       
        {/* Certifications */}
        <section id="certifications" className="animate-on-scroll-right">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-500 hover-lift bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground animate-bounce-in">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                📜 Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4 bg-accent/5 hover:bg-accent/10 transition-all duration-300 hover-lift border border-accent/20">
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-foreground mb-2">Power BI Job Simulation</h4>
                    <p className="text-muted-foreground">Forage (Nov 2024)</p>
                  </CardContent>
                </Card>
                <Card className="p-4 bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover-lift border border-primary/20">
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-foreground mb-2">Python (Basic)</h4>
                    <p className="text-muted-foreground">Udemy</p>
                  </CardContent>
                </Card>
                <Card className="p-4 bg-accent/5 hover:bg-accent/10 transition-all duration-300 hover-lift border border-accent/20">
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-foreground mb-2">SQL (Basic)</h4>
                    <p className="text-muted-foreground">Udemy</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Form */}
        <section id="contact" className="animate-on-scroll">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-500 hover-lift bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground animate-scale-in">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Send className="w-8 h-8 text-accent" />
                </div>
                📬 Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full focus:ring-primary focus:border-primary"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full focus:ring-primary focus:border-primary"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full focus:ring-primary focus:border-primary"
                    placeholder="Enter your message"
                  />
                </div>
                <div className="text-center">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover-lift transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg backdrop-blur-sm">
                <div className="text-center space-y-2">
                  <p className="text-sm text-primary font-medium">
                    💬 Prefer direct contact?
                  </p>
                <p className="text-sm text-primary text-center">
                    Email me directly at{' '}
                  <a href="mailto:priyanka.vechalapu@gmail.com" className="font-semibold underline hover:text-accent transition-colors duration-300">
                    priyanka.vechalapu@gmail.com
                  </a>
                </p>
                  <p className="text-xs text-muted-foreground">
                    📱 Or call: <a href="tel:7729841493" className="font-medium hover:text-primary transition-colors">7729841493</a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 backdrop-blur-sm mt-20 py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a 
              href="mailto:priyanka.vechalapu@gmail.com" 
              className="text-primary hover:text-accent transition-all duration-300 transform hover:scale-110"
            >
              <Mail size={24} />
            </a>
            <a 
              href="https://github.com/Anjali-Priyanka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-all duration-300 transform hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/anjali-priyanka-vechalapu-9a69ab1aa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-all duration-300 transform hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-muted-foreground">
            © 2025 Anjali Priyanka Vechalapu. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover-lift transform hover:scale-110 ${
            showScrollTop ? 'animate-bounce-in' : ''
          }`}
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default Index;
