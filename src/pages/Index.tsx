
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Github, Linkedin, ExternalLink, Send, User, GraduationCap, Briefcase, Award, Code, FolderOpen, Lightbulb, Target } from 'lucide-react';
import Navigation from '../components/Navigation';
import ProfilePhoto from '../components/ProfilePhoto';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xdkobvpq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
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
      type: "Academic"
    },
    {
      title: "Text Mining on Jane Austen's Novels",
      description: "NLP and sentiment analysis using R (B.Tech Project)",
      type: "Academic"
    },
    {
      title: "AI Study Buddy",
      description: "Real-time Q&A app using LangChain, Groq API, Streamlit",
      type: "AI Project"
    },
    {
      title: "AI Agent",
      description: "Automated intelligent flows using n8n, APIs, and ChatGPT",
      type: "AI Project"
    },
    {
      title: "Patient Appointment RAC App",
      description: "RAG-based AI app using Gemini, Pinecone, LangChain",
      type: "AI Project"
    },
    {
      title: "Multimodal Media Generator",
      description: "No-code AI workflow using Suno AI and InVideo AI",
      type: "AI Project"
    },
    {
      title: "FinGenAI",
      description: "ChatGPT-powered financial assistant built with Lovable",
      type: "AI Project"
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
      <section id="hero" className="pt-24 pb-16 px-6">
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
              <span className="text-foreground">priyanka.vechalapu@gmail.com</span>
            </a>
            <a 
              href="tel:7729841493" 
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover-lift"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span className="text-foreground">7729841493</span>
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
        <section id="about" className="animate-slide-up">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground">
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
        <section id="education" className="animate-slide-up">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-accent" />
                </div>
                🎓 Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-xl font-semibold text-foreground">M.Tech in Computer Science and Technology</h3>
                <p className="text-muted-foreground font-medium">Sanketika Vidya Parishad Engineering College</p>
                <p className="text-muted-foreground">2023–2025 | Grade: 85%</p>
              </div>
              <div className="border-l-4 border-accent pl-6 py-2">
                <h3 className="text-xl font-semibold text-foreground">B.Tech in Computer Science and Engineering</h3>
                <p className="text-muted-foreground font-medium">Sanketika Vidya Parishad Engineering College</p>
                <p className="text-muted-foreground">2017–2021 | Grade: 70%</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Experience */}
        <section id="experience" className="animate-slide-up">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                💼 Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-accent pl-6 py-2">
                <h3 className="text-xl font-semibold text-foreground">Software Development Mentor</h3>
                <p className="text-primary font-medium">NxtWave</p>
                <p className="text-muted-foreground mb-2">Apr 2025 – Present</p>
                <p className="text-foreground">Guiding fullstack learners in HTML, CSS, JS, Node.js, Python, SQL. Conducting live sessions, technical reviews, and curriculum enhancements.</p>
              </div>
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-xl font-semibold text-foreground">Software Engineer</h3>
                <p className="text-primary font-medium">Capgemini</p>
                <p className="text-muted-foreground mb-2">Apr 2022 – May 2023</p>
                <p className="text-foreground">Backend developer on billing and wallet apps using Java, Spring Boot, PL/SQL, Oracle DB in Agile teams.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skills */}
        <section id="skills" className="animate-slide-up">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground">
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
                    className="px-4 py-2 text-sm font-medium bg-primary/5 text-primary hover:bg-primary/10 transition-all duration-300 hover-lift cursor-pointer"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Projects */}
        <section id="projects" className="animate-slide-up">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FolderOpen className="w-8 h-8 text-primary" />
                </div>
                🚀 Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="p-6 bg-white rounded-lg border border-border hover:shadow-md transition-all duration-300 hover-lift">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground text-lg leading-tight">{project.title}</h4>
                      <Badge variant="outline" className="text-xs text-primary border-primary/20">{project.type}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Services */}
        <section id="services" className="animate-slide-up">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                🎯 Services Offered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-foreground font-medium">{service}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Certifications */}
        <section id="certifications" className="animate-slide-up">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                📜 Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-accent/5 rounded-lg hover:bg-accent/10 transition-all duration-300">
                  <h4 className="font-semibold text-foreground">Power BI Job Simulation</h4>
                  <p className="text-muted-foreground">Forage (Nov 2024)</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all duration-300">
                  <h4 className="font-semibold text-foreground">Python (Basic)</h4>
                  <p className="text-muted-foreground">Udemy</p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg hover:bg-accent/10 transition-all duration-300">
                  <h4 className="font-semibold text-foreground">SQL (Basic)</h4>
                  <p className="text-muted-foreground">Udemy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Form */}
        <section id="contact" className="animate-slide-up">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-foreground">
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
                    className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover-lift"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
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
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a 
              href="mailto:priyanka.vechalapu@gmail.com" 
              className="text-primary hover:text-accent transition-colors"
            >
              <Mail size={24} />
            </a>
            <a 
              href="https://github.com/Anjali-Priyanka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/anjali-priyanka-vechalapu-9a69ab1aa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-muted-foreground">
            © 2025 Anjali Priyanka Vechalapu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
