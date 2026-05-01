import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Certifications', 'Contact']

const TERMINAL_CMDS = [
  { cmd: 'Connect-MgGraph -Scopes "User.Read.All"', out: '[✓] Connected to Microsoft Graph API', ok: true },
  { cmd: 'Get-MgUser -All | Measure-Object', out: '  Count : 100  ·  Licensed : 94  ·  Active : 91', ok: false },
  { cmd: 'az ad conditional-access policy list', out: '[✓] 12 policies active  ·  0 violations', ok: true },
  { cmd: 'Get-AzVM -Status | Select Name,PowerState', out: '  All instances running  ·  SLA 99.9%', ok: false },
]

const SKILLS = [
  {
    category: 'Cloud & Identity',
    items: ['Microsoft Entra ID', 'Azure AD', 'M365 Admin Center', 'Intune', 'Autopilot', 'Conditional Access', 'MFA', 'SSO'],
  },
  {
    category: 'Directory & Access',
    items: ['Active Directory', 'Group Policy', 'RBAC', 'PowerShell', 'User Lifecycle', 'License Management'],
  },
  {
    category: 'ITSM & Ticketing',
    items: ['ServiceNow', 'Jira', 'Zendesk', 'Cherwell', 'HEAT', 'ITIL Framework'],
  },
  {
    category: 'Security & Auth',
    items: ['FortiClient VPN', 'Cisco AnyConnect', 'Imprivata SSO', 'Entrust Identity', 'FortiToken', 'Microsoft Authenticator'],
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
      'Administer Microsoft 365 environment for 100+ users including Entra ID, Exchange Online, Teams, and SharePoint.',
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
  { name: 'Microsoft Azure Administrator Associate', code: 'AZ-104', issuer: 'Microsoft', accent: '#3b82f6' },
  { name: 'Microsoft Certified Professional', code: 'MCP', issuer: 'Microsoft', accent: '#60a5fa' },
  { name: 'LPIC-1 Linux Administrator', code: 'LPIC-1', issuer: 'Linux Professional Institute', accent: '#f97316' },
  { name: 'LPIC-2 Linux Administrator', code: 'LPIC-2', issuer: 'Linux Professional Institute', accent: '#ea580c' },
  { name: 'VMware Data Center Virtualization', code: 'VCP-DCV', issuer: 'VMware', accent: '#94a3b8' },
  { name: 'Citrix Certified Associate', code: 'CCA', issuer: 'Citrix', accent: '#14b8a6' },
]

// ─── HOOK ────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ─── ICONS ───────────────────────────────────────────────────────────────────

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

function IconDownload() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

// ─── SECTION HEADING ─────────────────────────────────────────────────────────

function SectionHeading({ label, title }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-cyan-500 text-xs uppercase tracking-widest mb-2">{label}</p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">{title}</h2>
    </div>
  )
}

// ─── TERMINAL ────────────────────────────────────────────────────────────────

function Terminal() {
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [stage, setStage] = useState('typing')
  const [log, setLog] = useState([])

  useEffect(() => {
    const current = TERMINAL_CMDS[idx]

    if (stage === 'typing') {
      if (typed.length === current.cmd.length) {
        const t = setTimeout(() => setStage('output'), 300)
        return () => clearTimeout(t)
      }
      const delay = typed.length === 0 ? 700 : 32 + Math.random() * 28
      const t = setTimeout(() => setTyped(current.cmd.slice(0, typed.length + 1)), delay)
      return () => clearTimeout(t)
    }

    if (stage === 'output') {
      const t = setTimeout(() => setStage('waiting'), 2400)
      return () => clearTimeout(t)
    }

    if (stage === 'waiting') {
      const t = setTimeout(() => {
        setLog(prev => [...prev, TERMINAL_CMDS[idx]].slice(-3))
        setIdx(i => (i + 1) % TERMINAL_CMDS.length)
        setTyped('')
        setStage('typing')
      }, 400)
      return () => clearTimeout(t)
    }
  }, [stage, typed, idx])

  const current = TERMINAL_CMDS[idx]

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-950/50">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto font-mono text-slate-500 text-xs">powershell — Administrator</span>
      </div>
      <div className="bg-[#0d1117] p-5 font-mono text-sm min-h-[240px] space-y-3">
        {log.map((entry, i) => (
          <div key={i} className="opacity-25 space-y-0.5">
            <p>
              <span className="text-blue-400">PS</span>
              <span className="text-slate-600"> ~</span>
              <span className="text-slate-500"> › </span>
              <span className="text-slate-300">{entry.cmd}</span>
            </p>
            <p className={`pl-4 ${entry.ok ? 'text-emerald-500' : 'text-cyan-500'}`}>{entry.out}</p>
          </div>
        ))}
        <div className="space-y-0.5">
          <p>
            <span className="text-blue-400">PS</span>
            <span className="text-slate-600"> ~</span>
            <span className="text-slate-500"> › </span>
            <span className="text-slate-100">{typed}</span>
            <span className="text-cyan-400 animate-pulse">▋</span>
          </p>
          {stage !== 'typing' && (
            <p className={`pl-4 ${current.ok ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {current.out}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#080d1a]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <span className="font-display font-bold text-white text-base tracking-tight">
            <span className="text-gradient">M.</span> Arif Khan
          </span>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative text-slate-400 hover:text-white text-sm font-medium transition-colors duration-150 group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-200" />
              </button>
            ))}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/60 transition-all duration-150"
            >
              <IconDownload />
              Resume
            </a>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0d1628]/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-5 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="block w-full text-left text-slate-300 hover:text-white py-3 text-sm font-medium border-b border-white/5 last:border-0 transition-colors"
              >
                {link}
              </button>
            ))}
            <a
              href="/resume.pdf"
              download
              className="block text-blue-400 hover:text-blue-300 pt-3 text-sm font-medium transition-colors"
            >
              Download Resume →
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center bg-[#080d1a] dot-grid overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 65%)', filter: 'blur(70px)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)', filter: 'blur(80px)' }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr,460px] gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400 text-xs tracking-wide">Available for opportunities</span>
            </div>

            <p className="font-mono text-cyan-500 text-sm mb-4 tracking-wide">
              // IT Professional · Toronto, ON
            </p>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-[4.25rem] text-white mb-5 leading-[1.08] tracking-tight">
              Mohammad{' '}
              <span className="text-gradient">Arif Khan</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl mb-8 max-w-lg leading-relaxed">
              IT Support Analyst &amp; M365 Administrator — specializing in Azure AD, Intune, and enterprise identity at scale.
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-4 mb-10 py-6 border-t border-b border-white/5">
              {[
                { val: '6+', label: 'Years Experience' },
                { val: '3', label: 'Industry Sectors' },
                { val: '1K+', label: 'Users Supported' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl font-bold text-white">{val}</p>
                  <p className="font-mono text-slate-500 text-xs mt-0.5 uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-150 shadow-lg shadow-blue-600/20"
              >
                <IconDownload />
                Download Resume
              </a>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-slate-300 hover:text-white font-medium px-6 py-3 rounded-lg transition-all duration-150"
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" className="py-24 bg-[#0c1220]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-[1fr,300px] gap-16 items-start reveal ${visible ? 'visible' : ''}`}
        >
          <div>
            <SectionHeading label="// about" title="Who I Am" />
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Microsoft Azure Administrator{' '}
              <span className="text-white font-medium">(AZ-104)</span> certified IT professional with{' '}
              <span className="text-white font-medium">6+ years</span> supporting enterprise environments
              across healthcare, finance, and education. Experienced across the full IT support stack —
              user administration, M365 and Azure AD management, device provisioning, ITSM operations,
              and end-user troubleshooting. Proven track record delivering reliable, SLA-compliant support
              in regulated, high-uptime environments. Comfortable as a generalist IT admin or dedicated
              cloud/identity support specialist.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { val: '6+', label: 'Years in Enterprise IT', accent: '#3b82f6' },
              { val: '3', label: 'Regulated Sectors', accent: '#06b6d4' },
              { val: '1,000+', label: 'End Users Supported', accent: '#8b5cf6' },
              { val: 'AZ-104', label: 'Azure Certified', accent: '#f59e0b' },
            ].map(({ val, label, accent }) => (
              <div
                key={label}
                className="flex items-center gap-4 bg-[#0d1628] border border-white/5 rounded-xl p-4"
                style={{ borderLeftColor: accent, borderLeftWidth: '3px' }}
              >
                <p className="font-display font-bold text-xl text-white w-20 flex-shrink-0">{val}</p>
                <p className="font-mono text-slate-400 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function SkillCard({ group, index }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} bg-[#0d1628] border border-white/[0.06] rounded-xl p-6 hover:border-blue-500/30 hover:shadow-[0_0_28px_rgba(59,130,246,0.07)] transition-all duration-300 cursor-default`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <p className="font-mono text-cyan-500 text-xs uppercase tracking-widest mb-4">{group.category}</p>
      <div className="flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <span
            key={skill}
            className="bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium px-2.5 py-1 rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function Skills() {
  const [ref, visible] = useReveal()
  return (
    <section id="skills" className="py-24 bg-[#080d1a]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <SectionHeading label="// skills" title="Core Technologies" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function ExperienceCard({ role, index }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} relative pl-8`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-px ${
          role.current
            ? 'bg-gradient-to-b from-blue-500 via-blue-400 to-cyan-400'
            : 'bg-white/10'
        }`}
      />
      <div
        className={`absolute left-[-5px] top-5 w-2.5 h-2.5 rounded-full border-2 bg-[#0c1220] ${
          role.current ? 'border-cyan-400' : 'border-slate-600'
        }`}
      >
        {role.current && (
          <span className="absolute inset-[-4px] rounded-full border border-cyan-400/30 animate-ping" />
        )}
      </div>

      <div className="bg-[#0d1628] border border-white/[0.06] rounded-xl p-5 sm:p-6 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="font-display font-semibold text-white text-base leading-snug">{role.title}</h3>
            <p className="text-sm mt-1.5">
              <span className="text-gradient font-medium">{role.company}</span>
              {role.detail && <span className="text-slate-500"> — {role.detail}</span>}
            </p>
          </div>
          <span
            className={`self-start font-mono text-xs px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 ${
              role.current
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                : 'bg-white/[0.04] text-slate-500 border border-white/[0.08]'
            }`}
          >
            {role.period}
          </span>
        </div>
        <ul className="space-y-2.5">
          {role.bullets.map((bullet, j) => (
            <li key={j} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
              <span className="text-cyan-500 mt-0.5 flex-shrink-0">›</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Experience() {
  const [ref, visible] = useReveal()
  return (
    <section id="experience" className="py-24 bg-[#0c1220]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <SectionHeading label="// experience" title="Work History" />
        </div>
        <div>
          {EXPERIENCE.map((role, i) => (
            <ExperienceCard key={i} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CERTIFICATIONS ──────────────────────────────────────────────────────────

function CertCard({ cert, index }) {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} relative overflow-hidden bg-[#0d1628] border border-white/[0.06] rounded-xl p-6 cursor-default transition-all duration-300`}
      style={{
        transitionDelay: `${index * 70}ms`,
        borderLeftColor: hovered ? cert.accent : 'rgba(255,255,255,0.06)',
        borderLeftWidth: '3px',
        boxShadow: hovered ? `0 0 30px ${cert.accent}18` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(135deg, transparent 30%, ${cert.accent}0a 70%, transparent)`,
        }}
      />
      <p className="font-mono font-bold text-3xl mb-4" style={{ color: cert.accent }}>
        {cert.code}
      </p>
      <p className="text-white text-sm font-medium leading-snug mb-1.5">{cert.name}</p>
      <p className="font-mono text-slate-500 text-xs">{cert.issuer}</p>
    </div>
  )
}

function Certifications() {
  const [ref, visible] = useReveal()
  return (
    <section id="certifications" className="py-24 bg-[#080d1a]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <SectionHeading label="// certifications" title="Credentials" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.code} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

function Contact() {
  const [ref, visible] = useReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-[#080d1a] border border-white/[0.08] focus:border-blue-500/60 focus:outline-none rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm transition-colors duration-150'

  return (
    <section id="contact" className="py-24 bg-[#0c1220]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''} text-center mb-12`}>
          <p className="font-mono text-cyan-500 text-xs uppercase tracking-widest mb-2">// contact</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-slate-400 text-base max-w-md mx-auto">
            Open to opportunities in IT support, cloud administration, and M365 management.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left — contact links */}
          <div className="space-y-3">
            <p className="font-mono text-slate-500 text-xs uppercase tracking-widest mb-5">Direct contact</p>
            {[
              {
                icon: <IconEmail />,
                label: 'mohammad.arifkhan10@outlook.com',
                href: 'mailto:mohammad.arifkhan10@outlook.com',
              },
              {
                icon: <IconPhone />,
                label: '416-939-5525',
                href: 'tel:4169395525',
              },
              {
                icon: <IconLinkedIn />,
                label: 'linkedin.com/in/mohammad-khan1',
                href: 'https://linkedin.com/in/mohammad-khan1',
                external: true,
              },
            ].map(({ icon, label, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 bg-[#0d1628] border border-white/[0.06] hover:border-blue-500/30 rounded-xl px-6 py-4 transition-all duration-200 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)]"
              >
                <span className="text-blue-400 group-hover:text-cyan-400 transition-colors">{icon}</span>
                <span className="text-slate-300 group-hover:text-white text-sm transition-colors">{label}</span>
              </a>
            ))}
          </div>

          {/* Right — contact form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#0d1628] border border-white/[0.06] rounded-xl p-6 space-y-4"
          >
            <p className="font-mono text-slate-500 text-xs uppercase tracking-widest mb-5">Send a message</p>

            <div>
              <label className="block font-mono text-slate-400 text-xs mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block font-mono text-slate-400 text-xs mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block font-mono text-slate-400 text-xs mb-1.5">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'success' && (
              <p className="font-mono text-emerald-400 text-xs">// Message sent — I'll be in touch soon.</p>
            )}
            {status === 'error' && (
              <p className="font-mono text-red-400 text-xs">// Something went wrong. Try again or email directly.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-all duration-150 shadow-lg shadow-blue-600/20"
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#050810] border-t border-white/5 py-6 text-center">
      <p className="font-mono text-slate-600 text-xs">
        &copy; {new Date().getFullYear()} Mohammad Arif Khan &mdash; Toronto, ON
      </p>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────

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
