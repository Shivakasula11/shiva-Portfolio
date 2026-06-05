import Portal  from '../assets/Portal.png'; 
import Solar   from '../assets/Solar.png';
import Coffee from '../assets/Coffe.jpg';
import HM from '../assets/HM.jpg';
import Box from '../assets/Box-cric.jpg'
import Interview from '../assets/Interview.png';

export const developerProfile = {
  name:       'Kasula Shiva',
  title:      'Frontend Developer',
  email:      'kasulashiva21@gmail.com',
  githubUrl:  'https://github.com/Shivakasula11',
  linkedinUrl:'https://linkedin.com/in/shiva-kasula-628a58251',
cvUrl:      '/Kasula_Shiva_Resume.pdf',
  bioShort:   'Frontend Developer with hands-on experience in building and optimizing responsive web applications in a production environment.',
  bioFull:    'I am a highly driven Frontend Developer with hands-on experience in building and optimizing scalable, responsive web applications in production environments. I specialize in drafting real-time UI components, consuming RESTful APIs, integrating WebSocket-driven threads, and reducing client-side load times by up to 30%. Guided by robust component-based architectures, I deliver flawless user-centric platforms with optimal cross-device fidelity.',
  taglines: [
    'I build lightning-fast React web apps.',
    'I optimize complex UI web rendering.',
    'I integrate real-time WebSockets & APIs.',
  ],
  stats: [
    { label: 'Active Platform Users', value: '1K+'        },
    { label: 'Shipped Projects',      value: '5+'         },
    { label: 'Responsive Design',      value: '100%'        },
    { label: 'Core Tech Stack',       value: 'React / JS' },
  ],
};

export const skillGroups = [
  {
    category: 'Web Technologies',
    skills: [
      { name: 'HTML',       iconName: 'Globe'    },
      { name: 'CSS',        iconName: 'Palette'  },
      { name: 'JavaScript', iconName: 'FileCode' },
    ],
  },
  {
    category: 'Libraries & Frameworks',
    skills: [
      { name: 'React JS',          iconName: 'Atom'   },
      { name: 'Material UI (MUI)', iconName: 'Layers' },
      { name: 'Bootstrap',         iconName: 'Grid'   },
    ],
  },
  {
    category: 'Developer Tools & Databases',
    skills: [
      { name: 'Git & GitHub Workflow', iconName: 'GitBranch' },
      { name: 'SQL Database',          iconName: 'Database'  },
      { name: 'VS Code Editor',        iconName: 'Terminal'  },
    ],
  },
];

export const projects = [
  {
    id:          'p1',
    name:        'H&M Clone',
    description: 'Developed a responsive and interactive H&M Clone E-commerce Website using HTML, CSS, and JavaScript, replicating the core functionality and user experience of the H&M online fashion platform. Designed and implemented product listing pages, category-based navigation, product detail views, and shopping cart functionality to provide a seamless shopping experience.',
    techStack:   [  'HTML', 'CSS',' JS', ],
    githubUrl:   'https://github.com/Shivakasula11/H-M.git',
    demoUrl:     '#',
    category:    'E-commerce', 
    featured:    true,
       imageUrl: HM,

  },
  {
    id:          'p2',
    name:        'Box-Cricket Booking Platform',
    description: 'Developed a responsive and interactive Box Cricket Venue Booking Platform using React JS, enabling users to discover, explore, and book nearby box cricket venues with ease. Implemented features such as venue listings, detailed venue information, availability checking, online booking functionality, and dynamic search capabilities to enhance the user experience. Leveraged React’s component-based architecture to build reusable and scalable UI components, ensuring maintainability and efficient performance..',
    techStack:   [ 'HTML', 'CSS', 'JavaScript', 'React JS',    ],
    githubUrl:   'https://github.com/Shivakasula11/BoxCricketApp.git',
    demoUrl:     '#',
    category:    'Sports & Recreation',
   imagePosition: 'center',
    featured:    true,
    imageUrl: Box,
  },
  {
    id:          'p3',
    name:        'A Modern Coffee Shop Website',
    description: 'Developed a modern and responsive Coffee Shop Website using HTML, CSS, JavaScript, and React JS, designed to provide customers with an engaging and seamless online experience. Created visually appealing pages showcasing coffee products, featured beverages, menu categories, special offers, and customer testimonials. Implemented intuitive navigation, interactive UI elements, and responsive layouts to ensure optimal performance across desktop, tablet, and mobile devices..',
    techStack:   ['React JS',  'Material UI' ],
    githubUrl:   'https://github.com/Shivakasula11',
    imagePosition: 'center',  
    demoUrl:     '#',
    category:    'Food & Beverage',
    featured:    true,
    imageUrl:    Coffee,
  },
  {
    id:          'p4',
    name:        'Ems-Hub - Employee Management System',
    description: 'Developed a comprehensive Employee Management System (EMS) Portal using React JS, designed to streamline employee-related operations and improve organizational efficiency. Implemented features such as employee registration, profile management, attendance tracking, leave management, department-wise employee records, and role-based access control. Built dynamic and responsive user interfaces using reusable React components, ensuring a seamless experience across desktop and mobile devices. Integrated REST APIs for efficient data management and real-time updates, enabling administrators to monitor and manage employee information effectively..',
    techStack:   ['React JS', 'REST APIs', 'JWT Tokens', 'Material UI', 'Custom Hooks'],
    githubUrl:   'https://github.com/Shivakasula11',
    demoUrl:     '#',
    category:    'Employee Management',
    featured:    true,
    imageUrl:    Portal,
  },

   {
    id:          'p5',
    name:        'Wattex-energy  - Solar Solutions Website',
    description: 'Developed a full-scale Wattex Solar Solutions Website using React JS and Vite, designed to showcase a wide range of solar energy services and solutions. Built and maintained multiple service-specific pages, including Residential Solar, Commercial Solar, On-Grid Systems, Off-Grid Systems, Utility-Scale Projects, and Housing Society Solar Solutions. Implemented React Router DOM for seamless navigation across the application and developed an interactive Solar Calculator to help users estimate energy consumption, potential savings, and solar system requirements. Created responsive and user-friendly interfaces with a strong focus on performance, accessibility, and cross-device compatibility..',
    techStack:   ['React JS', 'REST APIs', 'Material UI'],
    githubUrl:   'https://github.com/Shivakasula11',
    demoUrl:     '#',
    category:    'Energy & Sustainability',
    featured:    true,
    imageUrl:    Solar,
  },

  
   {
  id:          'p6',
  name:        'AI-Powered Mock Test Platform',
  description: `Built the frontend for a proctored mock test platform with Developer and Non-Developer tracks, featuring course-specific question generation across Aptitude, MCQ, and Coding sections.
- Integrated real-time AI proctoring using TensorFlow.js (BlazeFace + COCO-SSD) in Web Workers for face detection, gaze tracking, and auto-termination on violations.
- Implemented full browser lockdown — fullscreen enforcement, tab-switch detection, history flooding, 18+ blocked shortcuts, and copy-paste prevention.
- Developed session auto-save with crash recovery using sendBeacon for seamless test resume after browser crashes or accidental closures.
- Built a split-pane code editor with live execution for the Coding section.`,
  techStack:   ['React JS', 'TensorFlow.js', 'Web Workers', 'REST APIs', 'Material UI'],
  githubUrl:   'https://github.com/Shivakasula11',
  demoUrl:     '#',
  category:    'AI / Web App',
  featured:    true,
   imageUrl:    Interview, 
},




];

export const experiences = [
  {
    id:        'e1',
    role:      'Frontend Developer',
    company:   'LANCIERE TECHNOLOGIES PVT LTD',
    dateRange: 'July 2025 - Present',
    achievements: [
      'Developing responsive user interfaces using ReactJS and modern CSS frameworks.',
      'Collaborating with senior developers to implement state management solutions.',
      'Optimizing web components for maximum performance across multiple devices.',
      'Participating in code reviews and agile sprint meetings.',
    ],
    type: 'work',
  },
  {
    id:        'e2',
    role:      'Frontend Development Intern',
    company:   'Techfinotax',
    dateRange: 'Previous',
    achievements: [
      'Assisted in building and maintaining client-facing web applications.',
      'Implemented design mockups using HTML, CSS, and Bootstrap.',
      'Gained hands-on experience with cross-browser compatibility.',
    ],
    type: 'work',
  },
  {
    id:        'e3',
    role:      'B.Tech in Electronics and Communication Engineering',
    company:   'Narsimha Reddy Engineering College, Hyderabad',
    dateRange: '2020 - 2024',
    achievements: [],
    type:      'education',
    grade:     'GRADE: A GRADE',
  },
];