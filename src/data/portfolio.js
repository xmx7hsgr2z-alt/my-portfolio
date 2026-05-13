import indiraHomeopathy from '../assets/freelance/indira-homeopathy.jpg'
import impulseClasses from '../assets/freelance/impulse-classes.jpg'
import ivoryDental from '../assets/freelance/ivory-dental.jpg'
import neettuMakeoverBridalBooking from '../assets/freelance/neettu-makeover-bridal-booking.jpg'
import neettuMakeoverStudioAcademy from '../assets/freelance/neettu-makeover-studio-academy.jpg'
import profilePhoto from '../assets/kumar-saurav-photo.jpeg'
import scholarsHub from '../assets/freelance/scholars-hub.jpg'
import sriRamMedical from '../assets/freelance/sri-ram-medical.jpg'
import visionInstitute from '../assets/freelance/vision-institute.jpg'

export const profile = {
  name: 'Kumar Saurav',
  initials: 'KS',
  role: 'Full-stack developer building React, PHP, Node.js, MySQL, and MongoDB web apps.',
  headline:
    'I build useful, scroll-stopping websites for clinics, coaching institutes, services, dashboards, and local businesses.',
  summary:
    'BCA student at Uttaranchal University with hands-on experience shipping end-to-end web applications across civic tech, smart local services, attendance automation, healthcare, e-commerce, and room-rental platforms.',
  location: 'Dehradun, India',
  university: 'Uttaranchal University',
  degree: 'Bachelor of Computer Applications',
  availability: 'Open for freelance websites, internships, and full-stack projects',
  focus: 'React fronts, PHP/Node backends, databases, and client-ready UI',
  email: 'sr7055446221@gmail.com',
  phone: '+91 9548374594',
  github: 'https://github.com/xmx7hsgr2z-alt',
  resume: `${import.meta.env.BASE_URL}Kumar_Saurav_Resume.pdf`,
  photo: profilePhoto,
}

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Freelance', href: '#freelance' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: '10+', label: 'Real-world projects' },
  { value: '5', label: 'Public GitHub repos' },
  { value: '8', label: 'Freelance demos' },
  { value: 'BCA', label: 'Full-stack student' },
]

export const services = [
  {
    type: 'Websites',
    title: 'Business websites',
    description:
      'Modern landing pages for clinics, coaching institutes, and service brands with fast contact flows.',
  },
  {
    type: 'Apps',
    title: 'Full-stack apps',
    description:
      'React, PHP, Node.js, REST APIs, MySQL, MariaDB, MongoDB Atlas, auth flows, dashboards, and admin panels.',
  },
  {
    type: 'Content',
    title: 'Creative delivery',
    description:
      'Figma wireframes, Photoshop graphics, video/content strategy, SEO basics, and responsive UI polish.',
  },
]

export const featuredProjects = [
  {
    title: 'Smart Local Service Finder',
    type: 'PHP + MySQL local service platform',
    description:
      'Role-based service discovery with customer, worker, and admin flows for booking, chat, notifications, reviews, profiles, and photo management.',
    stack: ['PHP 8+', 'MySQL', 'JavaScript', 'XAMPP'],
    link: 'https://github.com/xmx7hsgr2z-alt/smart-local-service-finder',
    accent: 'lime',
  },
  {
    title: 'Attendance App',
    type: 'Face-enabled attendance system',
    description:
      'Teacher/student login, registration, live attendance sessions, 6-character codes, history, metrics, CSV export, and face verification fallback.',
    stack: ['PHP', 'MySQL', 'face-api', 'JavaScript'],
    link: 'https://github.com/xmx7hsgr2z-alt/attendance-app',
    accent: 'pink',
  },
  {
    title: 'Hospital Management System',
    type: 'Clinic admin workflow',
    description:
      'Role-based admin, doctor, and staff dashboards for patient records, appointments, billing, medical history, invoices, and payment status.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'XAMPP'],
    link: 'https://github.com/xmx7hsgr2z-alt/hospital_management_system',
    accent: 'cyan',
  },
  {
    title: 'Smartlock DApp Final Project',
    type: 'JavaScript deployed project',
    description:
      'Public JavaScript project with a live Vercel deployment, showing comfort with modern frontend deployment workflows.',
    stack: ['JavaScript', 'Vercel', 'Web App'],
    link: 'https://github.com/xmx7hsgr2z-alt/smartlock-dapp-final-project',
    live: 'https://smartlock-dapp-final-project.vercel.app',
    accent: 'orange',
  },
]

export const freelanceProjects = [
  {
    title: 'Neettu Makeover Studio & Academy',
    category: 'Beauty studio website',
    description:
      'A premium bridal makeup and academy website with services, gallery, trust markers, and WhatsApp-led booking.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: neettuMakeoverStudioAcademy,
    result: 'Dark bridal booking experience',
    live: `${import.meta.env.BASE_URL}projects/neettu-makeover-studio-academy/`,
  },
  {
    title: 'Neettu Makeover Bridal Booking',
    category: 'Salon booking concept',
    description:
      'An editorial landing page for bridal glam, salon care, academy training, ratings, gallery, and direct inquiry flow.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: neettuMakeoverBridalBooking,
    result: 'Editorial salon booking flow',
    live: `${import.meta.env.BASE_URL}projects/neettu-makeover-bridal-booking/`,
  },
  {
    title: 'Impulse Classes',
    category: 'Education landing page',
    description:
      'A parent-friendly coaching website for home tuition, school support, exam preparation, testimonials, and lead capture.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: impulseClasses,
    result: 'Conversion-focused coaching site',
  },
  {
    title: 'Scholars Hub Defence Institute',
    category: 'Defence institute demo',
    description:
      'A polished institute website with aspirational messaging, course sections, gallery, FAQ, and inquiry flow.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: scholarsHub,
    result: 'Academic brand preview',
  },
  {
    title: 'Indira Homeopathy Clinic',
    category: 'Healthcare portfolio',
    description:
      'A single-page clinic website for doctor profile, services, patient trust, gallery, contact, and appointment intent.',
    stack: ['HTML', 'CSS', 'UX Spec'],
    image: indiraHomeopathy,
    result: 'Clinic trust builder',
  },
  {
    title: 'Ivory 32 Dental Clinic',
    category: 'Dental clinic website',
    description:
      'A modern dental clinic page with service highlights, doctor section, gallery, appointment CTA, and local map links.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: ivoryDental,
    result: 'Premium healthcare UI',
  },
  {
    title: 'Sri Ram Medical Centre',
    category: 'Medical centre demo',
    description:
      'A high-trust clinic concept for services, clinic snapshot, appointment request, hours, and patient-ready FAQ.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: sriRamMedical,
    result: 'Clean appointment funnel',
  },
  {
    title: 'Vision Institute',
    category: 'Spoken English institute',
    description:
      'A sharp coaching site for spoken English, personality development, leadership training, gallery, and joining CTA.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: visionInstitute,
    result: 'Skill-growth landing page',
  },
]

export const skills = [
  {
    title: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['PHP 8+', 'Node.js', 'Express.js', 'REST API design'],
  },
  {
    title: 'Databases',
    items: ['MySQL', 'MariaDB', 'MongoDB', 'MongoDB Atlas', 'SQL'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'XAMPP', 'phpMyAdmin'],
  },
  {
    title: 'Creative',
    items: ['Figma', 'Adobe Photoshop', 'Filmora', 'Premiere Pro', 'SEO basics'],
  },
  {
    title: 'Languages',
    items: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'PHP'],
  },
]

export const timeline = [
  {
    year: '2026',
    title: 'Public GitHub launch',
    description:
      'Published 5 public repositories including Smart Local Service Finder, Attendance App, Hospital Management System, Smartlock DApp, and a Python trading bot.',
  },
  {
    year: '2025',
    title: 'BCA at Uttaranchal University',
    description:
      'Focused on full-stack web development, databases, REST APIs, Java, Python, PHP, React, and software engineering fundamentals.',
  },
  {
    year: '2025',
    title: 'Full-stack project sprint',
    description:
      'Built civic tech, smart local services, attendance automation, healthcare dashboards, and database-backed admin workflows.',
  },
  {
    year: '2023-2024',
    title: 'Media Executive, NGO',
    description:
      'Handled social media growth, content calendars, video/graphic production, campaign posting, data entry, and reporting.',
  },
]

export const certifications = [
  'Introduction to Cybersecurity - Cisco Networking Academy',
  'Prompt Engineering in Generative AI',
]

export const strengths = [
  'Problem solving',
  'Team collaboration',
  'Time management',
  'Creative content strategy',
  'Rapid learning',
]
