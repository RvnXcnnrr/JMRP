export type Project = {
  title: string
  description: string
  stack: string[]
  imageSrc?: string
  imageAlt?: string
  links: {
    demo?: string
    github?: string
  }
}

export type ExperienceItem = {
  title: string
  org: string
  period: string
  highlights: string[]
}

export type CertificationItem = {
  title: string
  issuer: string
  notes?: string
  imageSrc?: string
  imageAlt?: string
  isSensitive?: boolean
}

export const skillGroups = [
  {
    title: 'IoT Programming',
    items: ['ESP32/Arduino', 'Sensors', 'MQTT', 'Device Telemetry', 'Edge-to-Cloud', 'Home Automation'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'Auth (JWT)', 'PostgreSQL/MySQL', 'MongoDB', 'API Security (basics)'],
  },
  {
    title: 'System Administration',
    items: ['Windows Admin (basics)', 'Linux (basics)', 'Networking (LAN/WAN basics)', 'Troubleshooting', 'Hardware/Software Support', 'Backups & documentation'],
  },
  {
    title: 'Tools & Technologies',
    items: ['Git/GitHub', 'Cisco NetAcad', 'Packet Tracer', 'Postman', 'Docker (basics)', 'Figma (minimal UI)'],
  },
  {
    title: 'Minimal Frontend',
    items: ['HTML5', 'CSS3', 'Tailwind CSS', 'React (UI integration)', 'Responsive layout'],
  },
] as const

export const projects: Project[] = [
  {
    title: 'SmartSims',
    description:
      'Teams need a simple way to record transactions without messy manual tracking. I helped build SmartSims, a web-based POS demo focused on a straightforward flow and clear transaction summaries.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    imageSrc: '/assets/projects/smartsims.jpg',
    imageAlt: 'SmartSims POS preview',
    links: {
      demo: 'https://smartsims.netlify.app/',
    },
  },
  {
    title: 'SmarTanom — Hydroponics Monitoring (Capstone)',
    description:
      'Hydroponics growers need stable water conditions, but manual checks are inconsistent and easy to miss. I built an IoT monitoring system that tracks pH, TDS, EC, water level, water temperature, and turbidity, with threshold-based alerts when readings go below or above plant limits.',
    stack: ['IoT', 'Sensors', 'Threshold Alerts', 'Hydroponics'],
    imageSrc: '/assets/projects/smartanom.jpg',
    imageAlt: 'SmarTanom hydroponics monitoring dashboard preview',
    links: {
      demo: 'https://smartanom.me/',
      github: 'https://github.com/SmarTanom/SmarTanom',
    },
  },
]

export const experience: ExperienceItem[] = [
  {
    title: 'Computer Technician (Hardware & Software)',
    org: 'Hube Computer — Corrales Ave, Cagayan de Oro City',
    period: 'February 3, 2022 — April 1, 2022',
    highlights: [
      'Diagnosed and repaired common hardware and software issues for PCs and laptops.',
      'Performed OS installation, driver setup, and basic preventive maintenance.',
      'Provided practical customer support and clear technical explanations.',
    ],
  },
  {
    title: 'Undergraduate (Seeking OJT / Internship)',
    org: 'BSIT 4th Year Student',
    period: 'Present',
    highlights: [
      'Actively looking for a company placement for OJT / internship.',
      'Seeking roles in IoT development, backend development, and system administration.',
      'Comfortable learning new tools quickly and working with a team.',
    ],
  },
]

export const certifications: CertificationItem[] = [
  {
    title: 'OJT Certificate — Hube Computer',
    issuer: 'Hube Computer',
    imageSrc: '/assets/certificates/hube-ojt.jpg',
    imageAlt: 'OJT certificate from Hube Computer',
  },
  {
    title: 'NC II — Computer System Servicing (CSS)',
    issuer: 'TESDA (Technical Education and Skills Development Authority)',
    notes:
      'Graduated as a TESDA CSS student at Crossroads Training Institute Inc., Kolambog, Lapasan, Cagayan de Oro City, Philippines, 9000.',
    imageSrc: '/assets/certificates/ncii-css.jpg',
    imageAlt: 'TESDA NC II Computer System Servicing certificate',
  },
  {
    title: 'Cisco NetAcad — CyberOps Associate',
    issuer: 'University of Science and Technology of Southern Philippines (USTP) via Cisco Networking Academy',
    imageSrc: '/assets/certificates/cyberops-associate.png',
    imageAlt: 'Cisco Networking Academy CyberOps Associate certificate',
  },
  {
    title: 'CCNA — Enterprise Networking, Security, and Automation',
    issuer: 'University of Science and Technology of Southern Philippines (USTP) via Cisco Networking Academy',
    imageSrc: '/assets/certificates/ccna-ensa.png',
    imageAlt: 'CCNA Enterprise Networking, Security, and Automation certificate',
  },
]
