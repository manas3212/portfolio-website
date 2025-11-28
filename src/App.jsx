import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Cloud,
  Brain,
  Zap,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  Briefcase
} from 'lucide-react';

// --- Components ---

const Section = ({ id, className, children }) => (
  <section id={id} className={`py-20 px-6 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const Badge = ({ children, className }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const Card = ({ children, className, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1' : ''} ${className}`}
  >
    {children}
  </div>
);

// --- FIXED TIMELINE COMPONENT ---
const TimelineItem = ({ role, company, date, description, type, isLatest, side }) => {
  // side = 'left' | 'right'
  const isRight = side === 'right';

  return (
    <div className={`relative flex flex-col md:flex-row w-full mb-12 md:mb-0 ${isRight ? 'md:justify-end' : 'md:justify-start'}`}>

      {/* Mobile Spine (Left aligned) - Only visible on small screens */}
      <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-slate-800 ml-4"></div>

      {/* Content Wrapper: 50% width on desktop to split the screen */}
      <div className={`w-full md:w-1/2 relative pl-12 md:pl-0 ${isRight ? 'md:pl-16' : 'md:pr-16'} pb-12 md:pb-16`}>

        {/* DESKTOP: Center Line Connector */}
        <div className={`hidden md:block absolute top-6 h-[2px] w-16 bg-slate-800 ${isRight ? 'left-0' : 'right-0'}`} />

        {/* DESKTOP: Center Dot */}
        <div className={`hidden md:block absolute top-6 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-slate-950 z-10
          ${isLatest ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]' : 'bg-slate-700'}
          ${isRight ? '-left-[8px]' : '-right-[8px]'}`}
        />

        {/* MOBILE: Left Dot */}
        <div className={`md:hidden absolute left-0 top-6 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-slate-950 z-10 ml-[10px]
          ${isLatest ? 'bg-blue-500' : 'bg-slate-700'}`}
        />

        {/* The Card Content */}
        <div className={`p-6 bg-slate-900/80 border border-slate-800 rounded-xl relative hover:border-blue-500/50 transition-colors shadow-lg
          ${isLatest ? 'shadow-blue-900/10 border-blue-900/30' : ''}`}>

          <div className="flex flex-col mb-2">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
              <h3 className="text-lg font-bold text-slate-100 leading-tight">{role}</h3>
              {isLatest && <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">Current</span>}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm mb-3">
              <span className="font-semibold text-blue-400">{company}</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="text-slate-500 font-mono text-xs">{date}</span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {description.map((item, index) => (
              <li key={index} className="text-slate-400 text-sm leading-relaxed flex items-start gap-2.5">
                <span className="mt-2 min-w-[4px] h-[4px] rounded-full bg-slate-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, tags, image, link, metrics }) => (
  <a href={link} target="_blank" rel="noreferrer" className="block h-full transform transition-all hover:-translate-y-2 duration-300">
    <Card className="h-full flex flex-col group p-0 border-slate-800 bg-slate-900/40 hover:shadow-2xl hover:shadow-blue-900/10">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20 bg-slate-950/50 backdrop-blur p-2 rounded-full border border-slate-700 text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
          <ExternalLink size={16} />
        </div>

        {/* Metrics Overlay */}
        {metrics && (
          <div className="absolute bottom-4 left-4 z-20 flex gap-2">
            <div className="py-1 px-3 bg-slate-950/80 backdrop-blur rounded-lg border border-slate-700/50 flex items-center gap-2">
              <Zap size={12} className="text-yellow-400" />
              <p className="text-xs text-slate-200 font-mono font-medium">{metrics}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-20">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm mb-5 flex-grow leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800/50">
          {tags.map((tag, i) => (
            <span key={i} className="text-[11px] font-medium text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-md border border-slate-700/50">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  </a>
);

const StatBlock = ({ value, label }) => (
  <div className="text-center p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50 hover:bg-slate-900/50 transition-colors hover:border-slate-700">
    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1 font-mono">
      {value}
    </div>
    <div className="text-xs sm:text-xs text-slate-500 font-bold uppercase tracking-widest">
      {label}
    </div>
  </div>
);

// --- Main App Component ---

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-sans">

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            <span className="text-white">MJ</span><span className="text-blue-500">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="mailto:manasjain1122@gmail.com"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-300 hover:text-white py-2 border-b border-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="mailto:manasjain1122@gmail.com"
              className="text-blue-400 font-medium pt-2"
            >
              Get in Touch
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-[95vh] flex items-center overflow-hidden" id="about">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/30 border border-blue-500/30 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold text-blue-300 tracking-wide uppercase">Open for Collaborations</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-purple-400">
                Manas Jain
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl text-slate-400 mb-8 font-light flex items-center gap-3">
              <Briefcase size={20} className="text-blue-500" />
              <span>Associate AI Engineer @ <span className="text-white font-medium">Techolution</span></span>
            </h2>

            <p className="text-slate-400 text-lg max-w-xl leading-relaxed mb-10 border-l-2 border-slate-800 pl-6">
              Transforming complex data into intelligent solutions. Specializing in
              <strong className="text-blue-300 font-normal"> Generative AI</strong>,
              <strong className="text-blue-300 font-normal"> LLM Fine-tuning</strong>, and
              <strong className="text-blue-300 font-normal"> Agentic Workflows</strong>.
              Bridging the gap between cutting-edge research and production-grade systems.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2 group">
                View Projects
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="mailto:manasjain1122@gmail.com" className="px-8 py-4 bg-transparent hover:bg-slate-900 text-white font-semibold rounded-lg border border-slate-700 transition-all">
                Contact Me
              </a>
            </div>

            <div className="flex gap-6 mt-12 pt-8 border-t border-slate-900 w-full">
              <a href="https://linkedin.com/in/manas-jain-185b5522a" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors transform hover:scale-110">
                <Linkedin size={26} />
              </a>
              <a href="https://github.com/manas3212" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors transform hover:scale-110">
                <Github size={26} />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative flex justify-center items-center">
            {/* Abstract Avatar Representation */}
            <div className="relative w-80 h-80 sm:w-[450px] sm:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full opacity-20 blur-[80px] animate-pulse"></div>

              {/* Main Circle Container */}
              <div className="relative w-full h-full rounded-full border border-slate-800/50 bg-slate-950/80 backdrop-blur-sm overflow-hidden shadow-2xl flex items-center justify-center group ring-1 ring-white/5">
                {/* Avatar Image */}
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  {/* Replace with your actual image URL */}
                  <img
                    src={`${import.meta.env.BASE_URL}profile_updated.jpg`}
                    alt="Manas Jain"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating Tech Badges - Moved outside to prevent clipping */}
              {/* Top Right: GenAI */}
              <div className="absolute top-12 -right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-200">GenAI</span>
                </div>
              </div>

              {/* Bottom Left: LLMs */}
              <div className="absolute bottom-20 -left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl shadow-xl animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-200">LLMs</span>
                </div>
              </div>

              {/* Bottom Right: RAG */}
              <div className="absolute bottom-20 -right-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl shadow-xl animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-200">RAG</span>
                </div>
              </div>

              {/* Top Left: Multi Agents Systems */}
              <div className="absolute top-12 -left-10 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl shadow-xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '5.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-200">Multi Agents</span>
                </div>
              </div>

              {/* Bottom Center: Research */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl shadow-xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-200">Research</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="border-y border-slate-900 bg-slate-950/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <StatBlock value="6+" label="IEEE Papers" />
            <StatBlock value="9.1" label="CGPA @ VIT" />
            <StatBlock value="3" label="Startups Accelerated" />
            <StatBlock value="$180K+" label="Revenue Impact" />
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <Section id="skills">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-purple-900/20 text-purple-300 border border-purple-800/50 mb-4">Technical Arsenal</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Mastering Modern AI</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">A comprehensive toolkit for building scalable, production-ready artificial intelligence solutions.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:border-blue-500/50 p-8 group">
            <div className="w-14 h-14 bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Brain size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Generative AI & ML</h3>
            <div className="flex flex-wrap gap-2">
              {['LLM Fine-tuning', 'RAG', 'Stable Diffusion', 'Flux', 'PyTorch', 'TensorFlow', 'Computer Vision', 'LangChain', 'Agentic Workflows'].map(skill => (
                <span key={skill} className="text-xs font-medium text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          <Card className="hover:border-green-500/50 p-8 group">
            <div className="w-14 h-14 bg-green-900/20 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
              <Cloud size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Infrastructure</h3>
            <div className="flex flex-wrap gap-2">
              {['GCP (Cloud Run, Vertex)', 'AWS (Bedrock, SageMaker)', 'Docker', 'FastAPI', 'CI/CD', 'Vector DBs', 'Pinecone', 'AlloyDB'].map(skill => (
                <span key={skill} className="text-xs font-medium text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          <Card className="hover:border-purple-500/50 p-8 group">
            <div className="w-14 h-14 bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Code size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Core Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Git', 'Streamlit', 'SQL', 'VLLM', 'Prompt Engineering', 'Multimodal Systems', 'Inpainting'].map(skill => (
                <span key={skill} className="text-xs font-medium text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="text-center mb-20 space-y-4">
          <Badge className="bg-blue-900/20 text-blue-300 border border-blue-800/50 mb-4">Experience</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Professional Journey</h2>
        </div>

        <div className="relative flex flex-col items-center max-w-5xl mx-auto">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-slate-800 via-slate-800 to-transparent"></div>

          <TimelineItem
            role="Associate AI Engineer"
            company="Techolution"
            type="Full-time"
            date="May 2025 - Present"
            isLatest={true}
            side="right"
            description={[
              "Spearheading client-facing GenAI projects, driving innovation in production-grade deployments.",
              "Architecting scalable Python backends for 500+ concurrent users, ensuring robust performance.",
              "Designing complex agentic workflows to automate high-value business processes."
            ]}
          />
          <TimelineItem
            role="Generative AI Intern"
            company="Techolution"
            type="Internship"
            date="June 2024 - May 2025"
            side="left"
            description={[
              "Spearheaded 3 client-facing production-grade GenAI projects, delivering 2 weeks ahead of schedule.",
              "Engineered custom inpainting workflow reducing processing time by 65% and improving quality by 42%.",
              "Automated 85% of routine tasks via Agentic workflows, saving 120+ labor hours monthly.",
              "Recognized with 3 'Wow Demo' awards generating $180K in new business opportunities."
            ]}
          />
          <TimelineItem
            role="Deep Learning Intern"
            company="HarshanAI"
            type="Internship"
            date="Jan 2024 - Jun 2024"
            side="right"
            description={[
              "Built a conversational AI app supporting 65+ languages with 5K active users in month 1.",
              "Reduced inference latency by 32% via quantization while maintaining 95% accuracy.",
              "Analyzed speech patterns to generate user fluency reports."
            ]}
          />
          <TimelineItem
            role="AI Intern"
            company="iNeuron"
            type="Internship"
            date="Oct 2023 - Jan 2024"
            side="left"
            description={[
              "Engineered document analysis systems enhancing comprehension by 30%.",
              "Built explainable AI components increasing stakeholder trust by 28%."
            ]}
          />
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge className="bg-green-900/20 text-green-300 border border-green-800/50 mb-4">Portfolio</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Featured Projects</h2>
          </div>
          <a href="https://github.com/manas3212" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-semibold group">
            View all on GitHub <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <ProjectCard
            title="TalentLens: AI Hiring Assistant"
            description="Production-grade video assessment platform processing 500+ concurrent evaluations. Features a VLLM-based inference pipeline and automated agentic workflow."
            tags={['GCP Cloud Run', 'Multimodal AI', 'VLLM', 'Agentic Workflow']}
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
            link="https://github.com/manas3212"
            metrics="75% Faster Eval • 12TB+ Data Processed"
          />
          <ProjectCard
            title="Intersection: Ad Gen Engine"
            description="End-to-end ad generation system transforming 2-week processes into 10-minute workflows. Includes conversational editing and custom inpainting, handling 300+ concurrent requests."
            tags={['Stable Diffusion', 'Inpainting', 'FastAPI', 'React', 'GCP']}
            image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000"
            link="https://github.com/manas3212"
            metrics="90% Workload Reduction • Sub-2s Response"
          />
        </div>
      </Section>

      {/* Research / Papers */}
      <Section id="research" className="bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Research Contributions</h2>
            <div className="inline-block px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
              <p className="text-slate-300 text-sm font-medium">First Author on 6 IEEE Scopus-indexed Conference Papers</p>
            </div>
          </div>

          <div className="space-y-6">
            <a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="block group">
              <div className="bg-slate-950/50 border border-slate-800 p-8 rounded-2xl group-hover:border-blue-500/50 transition-all flex items-start gap-6 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 duration-300">
                <div className="hidden sm:flex p-4 bg-blue-900/20 rounded-xl text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors shrink-0">
                  <BookOpen size={28} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Engage Learn: An AI-Based English Proficiency Improviser</h3>
                    <ExternalLink size={18} className="text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-blue-400 font-medium mb-3 mt-1">First Author • IEEE Xplore</p>
                  <p className="text-slate-400 leading-relaxed">Leveraging RAG and LLMs to create an interactive language learning platform with real-time feedback.</p>
                </div>
              </div>
            </a>

            <a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="block group">
              <div className="bg-slate-950/50 border border-slate-800 p-8 rounded-2xl group-hover:border-purple-500/50 transition-all flex items-start gap-6 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 duration-300">
                <div className="hidden sm:flex p-4 bg-purple-900/20 rounded-xl text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors shrink-0">
                  <BookOpen size={28} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-purple-400 transition-colors">Imagination Made Real: Stable Diffusion for High-Fidelity Tasks</h3>
                    <ExternalLink size={18} className="text-slate-600 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-purple-400 font-medium mb-3 mt-1">Co-Author • IEEE/ResearchGate</p>
                  <p className="text-slate-400 leading-relaxed">Exploring optimization techniques for diffusion models to enhance text-to-image synthesis quality.</p>
                </div>
              </div>
            </a>

            <a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="block group">
              <div className="bg-slate-950/50 border border-slate-800 p-8 rounded-2xl group-hover:border-green-500/50 transition-all flex items-start gap-6 hover:shadow-2xl hover:shadow-green-900/10 hover:-translate-y-1 duration-300">
                <div className="hidden sm:flex p-4 bg-green-900/20 rounded-xl text-green-400 group-hover:bg-green-500/20 group-hover:text-green-300 transition-colors shrink-0">
                  <BookOpen size={28} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-green-400 transition-colors">Next-Gen Security: YOLOv8 for Real-Time Weapon Detection</h3>
                    <ExternalLink size={18} className="text-slate-600 group-hover:text-green-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-green-400 font-medium mb-3 mt-1">Co-Author • IEEE</p>
                  <p className="text-slate-400 leading-relaxed">Implementing advanced object detection algorithms for real-time security surveillance systems.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-900 text-center bg-slate-950">
        <h2 className="text-3xl font-bold text-white mb-8">Let's Build the Future</h2>
        <div className="flex justify-center gap-6 mb-8">
          <a href="mailto:manasjain1122@gmail.com" className="p-4 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-slate-800 hover:border-blue-500 hover:scale-110">
            <Mail size={24} />
          </a>
          <a href="https://linkedin.com/in/manas-jain-185b5522a" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-blue-700 transition-all border border-slate-800 hover:border-blue-600 hover:scale-110">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/manas3212" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-800 hover:border-slate-500 hover:scale-110">
            <Github size={24} />
          </a>
        </div>
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Manas Jain. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}
