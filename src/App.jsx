import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Certifications', 'Contact']

const SKILLS = [
  {
    category: 'Cloud & Identity',
    items: [
      'Microsoft Entra ID', 'Azure AD', 'M365 Admin Center',
      'Intune', 'Autopilot', 'Conditional Access', 'MFA', 'SSO',
    ],
  },
  {
    category: 'Directory & Support',
    items: [
      'Active Directory', 'Group Policy', 'RBAC',
      'PowerShell', 'User Lifecycle Management', 'License Management',
    ],
  },
  {
    category: 'ITSM & Ticketing',
    items: ['ServiceNow', 'Jira', 'Zendesk', 'Cherwell', 'HEAT', 'ITIL Framework'],
  },
  {
    category: 'Security & Auth',
    items: [
      'FortiClient VPN', 'Cisco AnyConnect', 'Imprivata SSO',
      'Entrust Identity', 'FortiToken', 'Microsoft Authenticator',
    ],
  },
  {
    category: 'Infrastructure',
    items: ['Windows Server', 'VMware', 'Azure', 'Linux (LPIC-1/2)', 'Citrix'],
  },
]

const EXPERIENCE = [
  {
    title: 'IT Support Analyst & M365 Administrator',
    company: 'Amani Systems',
    detail: 'IT Consulting',
    period: 'Jan 2025 – Present',
    current: true,
    bullets: [
      'Administer Microsoft 365 environment for 100+ users including Entra ID, Exchange Online, Teams, and SharePoint provisioning.',
      'Manage full user lifecycle — onboarding, role changes, and offboarding — across Azure AD and on-prem Active Directory.',
      'Configure and maintain Conditional Access policies and MFA enforcement, reducing authentication-related incidents.',
      'Resolve IT support tickets via ServiceNow and Jira, consistently meeting SLA targets with full audit documentation.',
      'Support VPN authentication (Cisco AnyConnect, FortiClient), diagnosing identity and token-related connectivity failures.',
    ],
  },
  {
    title: 'IT Support & Cloud Administrator',
    company: 'Canadian Scholarship Trust',
    detail: 'Financial Services',
    period: 'Mar 2024 – Nov 2024',
    current: false,
    bullets: [
      'Supported 350+ enterprise users across onboarding, role transitions, and terminations in a regulated financial environment.',
      'Administered Azure AD groups, licensing, and entitlement mapping, ensuring accurate access during org changes.',
      'Enforced MFA using Microsoft Authenticator and FortiToken across remote and on-site workforce.',
      'Automated repetitive account management tasks with PowerShell, reducing turnaround time on access requests.',
      'Executed access remediation following terminations, eliminating orphaned accounts and unauthorized access.',
    ],
  },
  {
    title: 'IT Support Analyst',
    company: 'Trillium Health Partners / ISG',
    detail: 'Healthcare',
    period: 'Jul 2023 – Jan 2024',
    current: false,
    bullets: [
      'Provided IT support in a regulated healthcare environment (PHIPA), adhering to strict security, privacy, and audit requirements.',
      'Managed Active Directory and Azure AD accounts — creation, modification, access changes, and deactivation.',
      'Administered Entrust Identity tokens for secure VPN access, resolving authentication and synchronization issues.',
      'Supported Imprivata SSO across clinical systems, troubleshooting login failures for front-line healthcare staff.',
    ],
  },
  {
    title: 'IT Support Specialist',
    company: 'ABC Technologies',
    detail: '',
    period: 'Dec 2022 – Jun 2023',
    current: false,
    bullets: [
      'Executed user onboarding and offboarding workflows, provisioning and revoking access across enterprise applications.',
      'Supported Microsoft Intune and Autopilot device enrollment, tying device provisioning directly to user identities.',
      'Ensured complete and compliant access removal during terminations, including account disablement and device wipes.',
    ],
  },
  {
    title: 'IT Support Analyst',
    company: 'Kids Help Phone',
    detail: 'Non-Profit',
    period: 'Feb 2022 – Nov 2022',
    current: false,
    bullets: [
      'Supported 1,000+ users with identity, authentication, and technical issues in a 24/7 production environment.',
      'Managed Active Directory and Azure AD accounts — group memberships, access permissions, and password resets.',
      'Enforced MFA policies and resolved login, SSO, and authentication failures via Zendesk ticketing.',
    ],
  },
  {
    title: 'IT Support Analyst',
    company: 'Durham College / Ontario Tech University',
    detail: 'Education',
    period: 'Jan 2021 – Feb 2022',
    current: false,
    bullets: [
      'Provided IT support to students, faculty, and staff — account creation, access changes, and hardware/software troubleshooting.',
      'Managed identity onboarding and offboarding aligned with academic term cycles.',
      'Tracked and resolved requests in Cherwell, maintaining accurate records for audit and reporting purposes.',
    ],
  },
]

const CERTIFICATIONS = [
  {
    name: 'Microsoft Azure Administrator Associate',
    code: 'AZ-104',
    issuer: 'Microsoft',
    borderClass: 'border-blue-500',
    codeClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
  },
  {
    name: 'Microsoft Certified Professional',
    code: 'MCP',
    issuer: 'Microsoft',
    borderClass: 'border-blue-400',
    codeClass: 'text-blue-500',
    bgClass: 'bg-blue-50',
  },
  {
    name: 'LPIC-1 Linux Administrator',
    code: 'LPIC-1',
    issuer: 'Linux Professional Institute',
    borderClass: 'border-orange-500',
    codeClass: 'text-orange-600',
    bgClass: 'bg-orange-50',
  },
  {
    name: 'LPIC-2 Linux Administrator',
    code: 'LPIC-2',
    issuer: 'Linux Professional Institute',
    borderClass: 'border-orange-600',
    codeClass: 'text-orange-700',
    bgClass: 'bg-orange-50',
  },
  {
    name: 'VMware Data Center Virtualization Associate',
    code: 'VCP-DCV',
    issuer: 'VMware',
    borderClass: 'border-slate-500',
    codeClass: 'text-slate-600',
    bgClass: 'bg-slate-50',
  },
  {
    name: 'Citrix Certified Associate',
    code: 'CCA',
    issuer: 'Citrix',
    borderClass: 'border-teal-500',
    codeClass: 'text-teal-600',
    bgClass: 'bg-teal-50',
  },
]

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────

function IconEmail() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconLocation() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 bg-slate-900 ${
        scrolled ? 'shadow-xl' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <span className="text-white font-semibold text-base tracking-wide select-none">
            Mohammad Arif Khan
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-150"
              >
                {link}
              </button>
            ))}
            <a
              href="/resume.pdf"
              download
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors duration-150"
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="block w-full text-left text-gray-300 hover:text-white py-2.5 text-sm font-medium border-b border-slate-700 last:border-0"
              >
                {link}
              </button>
            ))}
            <a
              href="/resume.pdf"
              download
              className="block text-blue-400 hover:text-blue-300 pt-3 text-sm font-medium"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen bg-slate-900 flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-5">
          IT Professional · Toronto, ON
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
          Mohammad Arif Khan
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 font-light mb-5">
          IT Support Analyst &amp; M365 Administrator
        </p>
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-10">
          <IconLocation />
          <span className="text-sm">Toronto, ON, Canada</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium px-8 py-3 rounded transition-colors duration-150"
          >
            Get In Touch
          </button>
        </div>

        {/* Divider */}
        <div className="mt-20 flex justify-center">
          <div className="w-px h-12 bg-slate-700"></div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3 uppercase tracking-wider">About</h2>
        <div className="w-10 h-0.5 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-gray-600 text-lg leading-relaxed">
          IT professional with <span className="text-slate-900 font-medium">6+ years</span> supporting enterprise environments across
          healthcare, finance, and education sectors. Microsoft Azure Administrator{' '}
          <span className="text-slate-900 font-medium">(AZ-104)</span> certified, with deep expertise in Microsoft 365,
          Azure AD, Active Directory, Intune, and ITSM platforms including ServiceNow and Jira.
          Proven ability to manage complex identity and access environments, enforce security
          policies, and deliver reliable, SLA-compliant support in regulated, high-uptime settings.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3 uppercase tracking-wider">Core Skills</h2>
        <div className="w-10 h-0.5 bg-blue-600 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((group) => (
            <div
              key={group.category}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-150"
            >
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3 uppercase tracking-wider">Experience</h2>
        <div className="w-10 h-0.5 bg-blue-600 mx-auto mb-12"></div>

        <div className="relative">
          {/* Vertical timeline line — desktop only */}
          <div className="hidden md:block absolute left-3.5 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true"></div>

          <div className="space-y-8">
            {EXPERIENCE.map((role, i) => (
              <div key={i} className="md:pl-14 relative">
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-1.5 w-7 h-7 rounded-full border-2 border-blue-600 bg-white items-center justify-center">
                  {role.current && (
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block"></span>
                  )}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug">{role.title}</h3>
                      <p className="text-blue-600 text-sm font-medium mt-1">
                        {role.company}
                        {role.detail && (
                          <span className="text-gray-400 font-normal"> &mdash; {role.detail}</span>
                        )}
                      </p>
                    </div>
                    <span
                      className={`self-start text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                        role.current
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {role.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {role.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-gray-600">
                        <span className="text-blue-400 mt-1 flex-shrink-0 leading-none">&bull;</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────

function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3 uppercase tracking-wider">
          Certifications
        </h2>
        <div className="w-10 h-0.5 bg-blue-600 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.code}
              className={`bg-white rounded-lg border border-gray-200 border-l-4 ${cert.borderClass} p-5 flex items-start gap-4`}
            >
              <div className={`${cert.codeClass} ${cert.bgClass} text-sm font-bold px-2.5 py-1.5 rounded flex-shrink-0`}>
                {cert.code}
              </div>
              <div>
                <p className="text-slate-800 text-sm font-medium leading-snug">{cert.name}</p>
                <p className="text-gray-400 text-xs mt-1">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider">Get In Touch</h2>
        <div className="w-10 h-0.5 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-gray-400 text-base mb-12 max-w-md mx-auto">
          Open to opportunities in IT support, cloud administration, and M365 management.
          Feel free to reach out.
        </p>

        <div className="flex flex-col items-center gap-5">
          <a
            href="mailto:mohammad.arifkhan10@outlook.com"
            className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-150 group"
          >
            <span className="text-blue-400 group-hover:text-blue-300">
              <IconEmail />
            </span>
            <span className="text-sm">mohammad.arifkhan10@outlook.com</span>
          </a>

          <a
            href="tel:4169395525"
            className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-150 group"
          >
            <span className="text-blue-400 group-hover:text-blue-300">
              <IconPhone />
            </span>
            <span className="text-sm">416-939-5525</span>
          </a>

          <a
            href="https://linkedin.com/in/mohammad-khan1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-150 group"
          >
            <span className="text-blue-400 group-hover:text-blue-300">
              <IconLinkedIn />
            </span>
            <span className="text-sm">linkedin.com/in/mohammad-khan1</span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-slate-950 py-5 text-center">
      <p className="text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} Mohammad Arif Khan &mdash; Toronto, ON
      </p>
    </footer>
  )
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  )
}
