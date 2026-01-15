import { useMemo } from 'react'
import { Footer } from './components/Footer'
import { AboutSection } from './components/AboutSection'
import { CredentialsSection } from './components/CredentialsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Hero } from './components/Hero'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ContactSection } from './components/ContactSection'
import { Navbar } from './components/Navbar'
import { profile } from './data/profile'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  useScrollReveal()

  const links = useMemo(
    () => [
      { href: '#home', label: 'Home' },
      { href: '#about', label: 'About' },
      { href: '#skills', label: 'Skills' },
      { href: '#projects', label: 'Projects' },
      { href: '#testimonials', label: 'Testimonials' },
      { href: '#certifications', label: 'Certifications' },
      { href: '#experience', label: 'Experience' },
      { href: '#contact', label: 'Contact' },
    ],
    [],
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-[#e5e5e5]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl dark:from-cyan-500/10 dark:via-blue-500/7" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl dark:from-blue-500/8" />
      </div>

      <Navbar
        links={links}
        onToggleTheme={toggleTheme}
        themeLabel={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        theme={theme}
      />

      <main id="main" tabIndex={-1} className="w-full">
        <Hero />

        <AboutSection />
        <SkillsSection />

        <ProjectsSection />
        <TestimonialsSection />
        <CredentialsSection />

        <ExperienceSection />

        <ContactSection />
      </main>

      <Footer
        quickLinks={links}
        socialLinks={[
          { href: profile.socials.github, label: 'GitHub' },
          { href: profile.socials.linkedin, label: 'LinkedIn' },
          { href: profile.socials.facebook, label: 'Facebook' },
          { href: `mailto:${profile.email}`, label: 'Email' },
        ]}
      />
    </div>
  )
}

export default App
