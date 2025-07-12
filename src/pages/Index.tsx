
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Github, Linkedin, ExternalLink, Send, User, GraduationCap, Briefcase, Award, Code, FolderOpen } from 'lucide-react';

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
    'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Python', 'Spring Boot',
    'SQL', 'PL/SQL', 'Oracle Database', 'SQLite', 'Git', 'GitHub', 'Streamlit',
    'LangChain', 'Groq API', 'n8n', 'Pinecone', 'Google Gemini'
  ];

  const projects = [
    {
      title: "Electricity Price Forecasting for Cloud Computing",
      description: "M.Tech Final Project - Enhanced Machine Learning Model for optimizing energy efficiency in cloud environments",
      type: "Academic Project"
    },
    {
      title: "Text Mining on Jane Austen's Novels Using R",
      description: "B.Tech Final Project - NLP and data analysis project exploring literary text patterns",
      type: "Academic Project"
    },
    {
      title: "Patient Appointment RAC Application",
      description: "RAG-based AI workflow using n8n, Gemini, Pinecone, LangChain for healthcare automation",
      type: "AI Project"
    },
    {
      title: "AI Agent",
      description: "Intelligent automation system with n8n, APIs, webhooks, and ChatGPT integration",
      type: "AI Project"
    },
    {
      title: "AI Study Buddy",
      description: "Real-time academic tutor built with LangChain, Groq API, and Streamlit",
      type: "AI Project"
    },
    {
      title: "Multimodal Media Generator",
      description: "No-code AI workflow combining Suno AI and InVideo AI for content generation",
      type: "AI Project"
    },
    {
      title: "FinGenAI",
      description: "ChatGPT-powered financial planning assistant for personalized financial advice",
      type: "AI Project"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            {/* Profile Photo Placeholder */}
            <div className="mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mb-8 flex items-center justify-center shadow-2xl">
              <User className="w-20 h-20 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Anjali Priyanka Vechalapu</h1>
            <p className="text-2xl text-gray-600 mb-8">Software Developer & Tech Mentor</p>
            
            {/* Contact Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="mailto:priyanka.vechalapu@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">priyanka.vechalapu@gmail.com</span>
              </a>
              <a href="tel:7729841493" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Phone className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">7729841493</span>
              </a>
              <a href="https://github.com/Anjali-Priyanka" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Github className="w-4 h-4 text-gray-800" />
                <span className="text-gray-700">GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://linkedin.com/in/anjali-priyanka-vechalapu-9a69ab1aa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Linkedin className="w-4 h-4 text-blue-700" />
                <span className="text-gray-700">LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* About Me */}
        <section>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-gray-800">
                <User className="w-8 h-8 text-blue-600" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">
                I'm a passionate Software Developer and currently working as a Software Development Mentor at NxtWave, where I guide aspiring developers in Frontend and Backend technologies, real-time project development, and job readiness. I'm also pursuing my M.Tech in Computer Science, complementing my hands-on industry experience. Previously, I worked as a Software Engineer at Capgemini for 1 year, contributing to backend systems like a Broadband Billing System using Oracle 11G and PL/SQL, and a Payment Wallet Application built with Spring Boot and Postman. During my B.Tech, I explored NLP and data analysis through a Text Mining project on Jane Austen's novel using R. Currently, for my M.Tech final project, I'm working on 'Electricity Price Forecasting for Cloud Computing Using an Enhanced Machine Learning Model,' aimed at optimizing energy efficiency in cloud environments. I enjoy building scalable AI-powered applications using tools like LangChain, ChatGPT, Groq API, and Streamlit, and I'm driven by a passion for automation, system design, and mentoring future tech professionals.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Education */}
        <section>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-gray-800">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800">M.Tech in Computer Science and Technology</h3>
                <p className="text-gray-600">Sanketika Vidya Parishad Engineering College</p>
                <p className="text-gray-500">2023–2025 | Grade: 85%</p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800">B.Tech in Computer Science and Engineering</h3>
                <p className="text-gray-600">Sanketika Vidya Parishad Engineering College</p>
                <p className="text-gray-500">2017–2021 | Grade: 70%</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Experience */}
        <section>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-gray-800">
                <Briefcase className="w-8 h-8 text-blue-600" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800">Software Development Mentor</h3>
                <p className="text-gray-600 font-medium">NxtWave</p>
                <p className="text-gray-500 mb-2">2025–Present</p>
                <p className="text-gray-700">Mentoring fullstack development with HTML, CSS, JavaScript, Python, Node.js, SQL. Conducting live sessions, code reviews, and API integrations.</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800">Software Engineer</h3>
                <p className="text-gray-600 font-medium">Capgemini</p>
                <p className="text-gray-500 mb-2">2022–2023</p>
                <p className="text-gray-700">Backend development using Java, SQL, PL/SQL, Spring Boot. Worked on broadband billing and payment wallet systems.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Certifications */}
        <section>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-gray-800">
                <Award className="w-8 h-8 text-blue-600" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Power BI Job Simulation</h4>
                  <p className="text-gray-600">Forage (Nov 2024)</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Python (Basic)</h4>
                  <p className="text-gray-600">Udemy</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">SQL (Basic)</h4>
                  <p className="text-gray-600">Udemy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skills */}
        <section>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-gray-800">
                <Code className="w-8 h-8 text-blue-600" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 hover:from-blue-200 hover:to-purple-200 transition-all duration-300 hover:scale-105"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Projects */}
        <section>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-gray-800">
                <FolderOpen className="w-8 h-8 text-blue-600" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-800 text-lg leading-tight">{project.title}</h4>
                      <Badge variant="outline" className="text-xs">{project.type}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Form */}
        <section>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl text-gray-800">
                <Send className="w-8 h-8 text-blue-600" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full"
                    placeholder="Enter your message"
                  />
                </div>
                <div className="text-center">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
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
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Anjali Priyanka Vechalapu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
