// ══════════════════════════════════════════════════════════════
//  Portfolio knowledge base — pure data
// ══════════════════════════════════════════════════════════════
//  Update this object whenever Shiva's profile, projects, or
//  experience change. Intents in `intents.js` reference fields
//  from here, so adding a new field is enough for the chatbot
//  to start answering about it.

export const P = {
  name: 'Shiva Kasula',
  role: 'Frontend Developer',
  email: 'kasulashiva21@gmail.com',
  phone: '+91 6301993194',
  github: 'https://github.com/Shivakasula11',
  linkedin: 'https://www.linkedin.com/in/shivakasula/',
  location: 'Hyderabad, India',
  languages: ['English', 'Hindi', 'Telugu'],

  currentCompany: {
    name: 'Lanciere Technologies Pvt Ltd',
    role: 'Frontend Developer',
    period: 'Present',
    description: 'Currently working as a Frontend Developer at Lanciere Technologies Pvt Ltd, building and optimizing production-grade web applications using React, MUI, Django, and AWS. Responsible for developing responsive UI components, REST API integration, real-time features, and performance optimization.',
    highlights: [
      'Building scalable, responsive web applications in production',
      'Developing with React 19, MUI v9, Vite, and Django 5.2',
      'REST API integration and real-time WebSocket components',
      'Working with AWS S3, MySQL, and MongoDB for storage and data',
      'Performance optimization — lazy loading, code splitting, and bundle optimization',
      'Collaborative development using Git & GitHub workflows',
    ],
  },

  about: `I am Shiva Kasula, a Frontend Developer experienced in creating responsive, user-friendly web applications using HTML, CSS, JavaScript, React JS, and modern frontend tools. I hold a B.Tech in Electronics and Communication Engineering and have worked on multiple real-world projects involving UI development, API integration, and responsive design. I'm passionate about crafting intuitive digital experiences and always eager to learn new technologies.`,

  technicalSkills: [
    'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React JS',
    'Bootstrap', 'Material UI', 'Tailwind CSS',
    'Firebase', 'Git & GitHub', 'REST APIs',
    'Responsive Web Design', 'SQL',
  ],

  softSkills: ['Communication', 'Leadership', 'Teamwork', 'Flexibility', 'Adaptability'],

  strengths: [
    'Quick learner who adapts to new technologies fast',
    'Good communication and team collaboration skills',
  ],

  projects: [
    {
      name: 'EMS Portal (iEvalx)',
      description: 'A full-stack job recruitment and evaluation platform with three user roles: Jobseeker, Employer, and Company Admin. Features include jobseeker profile management, employer job postings, AI Resume Builder (ResumeStudio), and interview/evaluation workflows.',
      tech: ['React 19', 'Vite', 'MUI v9', 'Django 5.2', 'MySQL', 'MongoDB', 'AWS S3'],
      features: ['Role-based authentication (Jobseeker, Employer, Admin)', 'AI Resume Builder with DOCX manipulation', 'Employer dashboard for job management', 'Interview rounds and candidate evaluation', 'Profile photo upload and management'],
    },
    {
      name: 'Wattex Solar Energy Website',
      description: `Developed a full-scale solar solutions website for Wattex Energy using React JS and Vite, featuring 10+ service-specific pages including Residential, Commercial, On-Grid, Off-Grid, Utility Scale, and Housing Society solar. The application leverages React Router DOM for seamless multi-page navigation and includes an interactive Solar Calculator that helps users estimate potential savings and system requirements based on their consumption patterns.

To enhance user engagement and streamline lead generation, the platform integrates an AI-powered ChatBot built with the Groq API, capable of handling real-time user queries and capturing prospective customer information. The interface is built around a library of reusable UI components — including a Hero Carousel, Parallax Sections, and FAQ Accordions — ensuring a consistent and engaging user experience across every page.

The site was optimized for discoverability through SEO best practices, including Open Graph and Twitter Card meta tags along with geo-targeting for improved local search visibility. The production build was deployed to a live domain with optimized assets, delivering fast load times and reliable cross-browser compatibility.`,
      tech: ['React JS', 'Vite', 'React Router DOM', 'Groq API', 'JavaScript', 'CSS'],
      features: [
        '10+ service-specific solar solution pages',
        'Interactive Solar Calculator for savings estimation',
        'AI-powered ChatBot using Groq API',
        'Reusable UI components (Hero Carousel, Parallax, FAQ)',
        'SEO optimized with Open Graph and Twitter Card meta tags',
        'Responsive design with cross-browser compatibility',
      ],
    },
    {
      name: 'H&M Clone',
      description: 'A modern e-commerce site inspired by H&M with responsive product listings, shopping cart functionality, and a clean interface.',
      tech: ['HTML', 'CSS', 'JavaScript', 'React JS'],
      features: ['Responsive product grid', 'Shopping cart with add/remove', 'Clean, modern UI design', 'Category filtering'],
    },
    {
      name: 'Box Cricket Platform',
      description: 'A web app for discovering, booking, and managing box cricket venues with real-time availability and booking management.',
      tech: ['HTML', 'CSS', 'JavaScript', 'React JS'],
      features: ['Venue discovery with search', 'Real-time availability checks', 'Booking management system', 'User-friendly interface'],
    },
    {
      name: 'Modern Coffee Website',
      description: 'A visually appealing coffee shop website with an engaging design and smooth user experience.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      features: ['Engaging visual design', 'Smooth scroll animations', 'Responsive across devices', 'Menu showcase section'],
    },
  ],

  certifications: [
    'Internship Completion Certificate in React JS from TechInfoTax Pvt. Ltd. (2025)',
    'First-class certificate in a basketball competition, highlighting exceptional skills, teamwork, and athleticism',
  ],

  education: {
    degree: 'Bachelor of Technology (B.Tech)',
    branch: 'Electronics and Communication Engineering',
    college: 'Narsimha Reddy Engineering College, Hyderabad',
    period: '2020–2024',
  },

  hobbies: ['Playing basketball', 'Exploring new technologies', 'Building side projects', 'Learning UI/UX design trends'],

  goals: [
    'Become a senior frontend developer at a product-based company',
    'Master full-stack development with React and Node.js/Django',
    
  ],
};