"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, CheckCircle2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      const sections = document.querySelectorAll("[data-animate]")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.75) {
          setVisibleSections((prev) => new Set(prev).add(section.id))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Process", id: "process" },
    { label: "Work", id: "work" },
    { label: "About", id: "about" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <div className="bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">SearchLynk</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              SEO-Driven Websites & Analytics for European Businesses
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              I help small businesses improve visibility, speed, and conversions through clean websites, SEO, and clear
              monthly reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Request Free Website Audit
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("services")}
                className="border-2 border-primary text-primary hover:bg-primary/5"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Website Design & Rebuilds",
                description: "Fast, mobile-first and SEO-ready websites that convert visitors into customers.",
                icon: "🚀",
              },
              {
                title: "SEO & Search Optimisation",
                description: "Keyword research, on-page improvements, and technical fixes to boost your rankings.",
                icon: "📈",
              },
              {
                title: "Monthly Analytics & Reporting",
                description: "GA4 & Search Console reports explained in simple language you can act on.",
                icon: "📊",
              },
              {
                title: "Website Care & Performance",
                description: "Speed optimisation, security updates, and monthly maintenance for peak performance.",
                icon: "⚙️",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-muted p-8 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-lg">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        data-animate
        className="py-20 bg-gradient-to-b from-background via-primary/5 to-background relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0s" }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven 4-step approach to delivering results
            </p>
          </div>

          <div className="relative">
            {/* Animated line connector */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery Call",
                  description: "Understand your business goals and current challenges",
                  icon: "🎯",
                },
                {
                  step: "02",
                  title: "Audit & Proposal",
                  description: "Analyze your site and provide a detailed action plan",
                  icon: "📊",
                },
                {
                  step: "03",
                  title: "Implementation",
                  description: "Execute the strategy with precision and care",
                  icon: "⚡",
                },
                {
                  step: "04",
                  title: "Monthly Growth",
                  description: "Track results and optimize for continuous improvement",
                  icon: "📈",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative opacity-0 animate-slide-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="bg-white rounded-lg p-8 border-2 border-primary/20 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* Results Section */}
<section id="work" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Results & Client Work</h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        A showcase of real projects I’ve delivered for international clients
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Amplifyd */}
      <div className="rounded-lg border border-border p-6 bg-muted hover:shadow-lg transition-all">
        <h3 className="text-xl font-bold mb-3">Amplifyd — Software Engineering</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Working as a software engineer on a large-scale platform. Focused on
          building high-performance features, API integrations, dynamic UI components,
          and system-level enhancements to support business scaling.
        </p>
      </div>

      {/* Ansely (UK) */}
      <div className="rounded-lg border border-border p-6 bg-muted hover:shadow-lg transition-all">
        <h3 className="text-xl font-bold mb-3">Ansely (UK Client) — Web Application</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Developed complete web application setup including UI/UX, modular components,
          backend logic, and deployment. Improved performance and conversions for
          UK-based service operations.
        </p>
      </div>

      {/* Amapali */}
      <div className="rounded-lg border border-border p-6 bg-muted hover:shadow-lg transition-all">
        <h3 className="text-xl font-bold mb-3">Amplifyd — SEO, Analytics & Ads</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Managed SEO strategy, Google Analytics (GA4) tracking, Google Ads campaigns,
          performance dashboards, and real-time reporting automation. Delivered measurable growth in
          visibility and user acquisition.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" data-animate className="py-20 bg-gradient-to-r from-background via-primary/3 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Profile Image */}
            <div className="md:col-span-2 opacity-0 animate-fade-in" style={{ animationDelay: "0s" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-2xl opacity-20 rounded-full" />
                <img
                  src="/dp.png"
                  alt="Dirushan - Founder"
                  className="relative w-full rounded-2xl object-cover border-4 border-primary shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">About Dirushan</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I'm Dirushan, a Software Engineering graduate from the University of Kelaniya (GPA 3.23). I specialise
                  in building fast SEO-friendly websites, improving search rankings, and providing clear monthly
                  analytics reports for small European businesses.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With a technical background, I focus on clean, data-driven solutions and reliable personal support. My
                  mission is to help European businesses grow their online presence with websites they can trust.
                </p>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {["Technical Degree", "SEO + Analytics Expertise", "Fast Communication", "EU-Friendly Time Zones"].map(
                  (badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-md opacity-0 animate-slide-up"
                      style={{ animationDelay: `${300 + idx * 100}ms` }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="font-semibold text-foreground">{badge}</span>
                    </div>
                  ),
                )}
              </div>

              {/* Info Cards */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex items-start gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-lg">Sri Lanka (EU Hours)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
                  <span className="text-2xl">🎓</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Education</p>
                    <p className="font-semibold text-lg">BSc (Hons) Software Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fixed pricing with no surprises. Let's talk about what's right for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Starter SEO & Analytics",
                price: "€300",
                period: "/month",
                features: [
                  "On-page SEO fixes",
                  "Keyword insights & recommendations",
                  "Monthly GA4 report",
                  "Email support",
                ],
              },
              {
                title: "Website + SEO Setup",
                price: "€700",
                period: "one-time",
                features: [
                  "5–6 page website",
                  "SEO structure & technical setup",
                  "Speed optimisation",
                  "GA4 & Search Console connected",
                ],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg border-2 p-8 ${idx === 1 ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">Get Started</Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-6 bg-muted rounded-lg">
            <p className="text-lg font-semibold">
              Pricing is transparent and fixed after a free audit. Let's discuss your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How long does a website project take?",
                a: "Typically 3-4 weeks from kickoff to launch, depending on complexity and revisions.",
              },
              {
                q: "Do you work with European clients?",
                a: "Yes! I specialise in serving European small businesses. I'm in Sri Lanka but work EU-friendly hours.",
              },
              {
                q: "What is included in SEO?",
                a: "Keyword research, on-page optimisation, technical SEO fixes, internal linking, and performance monitoring.",
              },
              {
                q: "How often do I get reports?",
                a: "Monthly reports delivered via email with clear insights and recommendations you can act on.",
              },
              {
                q: "Do you require long contracts?",
                a: "No contracts. Starter plans are month-to-month. Website builds are one-time projects with fixed pricing.",
              },
              {
                q: "Can you work on my existing website?",
                a: "Absolutely. I can audit, optimise, and rebuild any existing site for better performance and SEO.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-lg border border-border p-6 cursor-pointer hover:border-primary/50 transition-all"
              >
                <summary className="flex items-center justify-between font-semibold text-lg">
                  {item.q}
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-animate className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground">Ready to grow your business? Get in touch today.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Quick Contact Cards */}
            {[
              {
                icon: "📱",
                title: "Phone / WhatsApp",
                value: "076 632 4336",
                link: "tel:+94766324336",
                delay: "0ms",
              },
              {
                icon: "✉️",
                title: "Email Response",
                value: "Within 24 hours",
                link: "#",
                delay: "100ms",
              },
              {
                icon: "⏰",
                title: "Working Hours",
                value: "EU Friendly Times",
                link: "#",
                delay: "200ms",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-8 border border-border hover:border-primary/50 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0 animate-slide-up"
                style={{ animationDelay: card.delay }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-semibold text-muted-foreground text-sm mb-2">{card.title}</h3>
                <p className="text-2xl font-bold text-primary mb-4">{card.value}</p>
                {card.link !== "#" && (
                  <a href={card.link} className="inline-block text-primary hover:underline font-semibold">
                    Get in touch →
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <form
              className="space-y-6 bg-white p-8 rounded-lg border border-border shadow-md opacity-0 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Website URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://yoursite.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-semibold">
                Send Message
              </Button>
            </form>

            {/* Direct Contact */}
            <div className="space-y-6">
              <div
                className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-lg shadow-lg opacity-0 animate-fade-in"
                style={{ animationDelay: "400ms" }}
              >
                <h3 className="text-3xl font-bold mb-8">Direct Contact</h3>

                <div className="space-y-6">
                  <div className="pb-6 border-b border-white/20">
                    <p className="text-white/80 text-sm mb-2">Immediate Response</p>
                    <a href="tel:+94766324336" className="text-3xl font-bold hover:opacity-80 transition-opacity">
                      076 632 4336
                    </a>
                  </div>

                  <a
                    href="https://wa.me/94766324336"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 w-full bg-white text-primary hover:bg-primary/10 px-6 py-4 rounded-lg font-bold transition-all duration-300 border-2 border-white hover:border-transparent"
                  >
                    <MessageCircle size={24} />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div
                className="bg-white border-2 border-primary/20 p-8 rounded-lg opacity-0 animate-fade-in"
                style={{ animationDelay: "500ms" }}
              >
                <h4 className="font-bold text-lg mb-4">Response Time</h4>
                <p className="text-muted-foreground mb-3">Typically respond within 24 hours during EU working hours.</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Available for consultation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/10 border-t border-primary/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0ms" }}>
              <h3 className="text-3xl font-bold mb-3 text-primary">SearchLynk</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                SEO & web design for European small businesses. Premium results, personal service.
              </p>
            </div>

            {/* Services */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Website Design
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    SEO Optimisation
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Analytics & Reports
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Website Maintenance
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-primary transition-colors">
                    Process
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <p className="text-muted-foreground text-sm mb-3">
                <a href="tel:+94766324336" className="hover:text-primary transition-colors font-semibold">
                  076 632 4336
                </a>
              </p>
              <p className="text-muted-foreground text-sm">Colombo, Sri Lanka</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary/20 my-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
            <p>&copy; 2025 SearchLynk Digital. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
