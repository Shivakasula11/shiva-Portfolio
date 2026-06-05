// ══════════════════════════════════════════════════════════════
//  Intents — keyword/response definitions
// ══════════════════════════════════════════════════════════════
//  Each intent contributes:
//    id           — unique identifier (also used by personalization.js)
//    label        — short emoji+text shown in "Did you mean…?" chips
//    exampleQuery — sample sentence sent when the chip is clicked
//    keywords     — list the matching engine scans for
//    response()   — produces the bot's reply text

import { P } from "../knowledgeBase";

// Time-of-day aware greeting — lives here because the `greeting`
// intent uses it directly and we want a single source of truth.
export function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)
    return "Good Morning! ☀️ Welcome to my portfolio. How can I help you today?";
  if (hour >= 12 && hour < 17)
    return "Good Afternoon! 🌤️ I'm here to answer your questions about my profile, skills, and projects.";
  if (hour >= 17 && hour < 22)
    return "Good Evening! 🌙 Feel free to explore my portfolio and ask me anything.";
  return "Hello! 👋 I'm Shiva's Portfolio Assistant. How may I assist you today?";
}

export const INTENTS = [
  {
    id: "greeting",
    label: "👋 Say Hi",
    exampleQuery: "Hi there",
    keywords: [
      "hello",
      "hi",
      "hey",
      "hlo",
      "hii",
      "hiii",
      "heya",
      "howdy",
      "sup",
      "yo",
      "good morning",
      "good afternoon",
      "good evening",
      "good night",
      "morning",
      "afternoon",
      "evening",
      "gm",
      "namaste",
      "namaskar",
      "about",
      "yourself",
      "who are you",
      "introduce yourself",
      "tell me about yourself",
      "introduce",
      "shiva",
      "about shiva",
      "overview",
      "summary",
      "bio",
      "describe yourself",
      "who is shiva",
    ],
    response: () =>
      `${getTimeGreeting()}\n\nHere's what I can tell you about:\n- **👤 About Me** — Who is Shiva?\n- **🛠️ Skills** — Technical & soft skills\n- **🚀 Projects** — ${P.projects.length} real-world projects\n- **💼 Experience** — Current role at Lanciere Technologies\n- **💪 Strengths** — What makes me stand out\n- **🎓 Education** — Academic background\n- **📞 Contact** — Get in touch`,
  },
  {
    id: "about",
    label: "👤 About Me",
    exampleQuery: "Tell me about yourself",
    keywords: [
      "about you",
      "about yourself",
      "who are you",
      "introduce yourself",
      "tell me about yourself",
      "about",
      "introduce",
      "yourself",
      "shiva",
      "about shiva",
      "tell me about",
      "overview",
      "summary",
      "bio",
      "profile",
      "describe yourself",
      "who is shiva",
    ],
    response: () =>
      `**${P.name}** — ${P.role} at ${P.currentCompany.name}\n\n${P.about}`,
  },
  {
    id: "current_company",
    label: "🏢 Current Company",
    exampleQuery: "Where do you currently work?",
    keywords: [
      "current company",
      "current job",
      "current role",
      "currently working",
      "where do you work",
      "which company",
      "company name",
      "employer",
      "lanciere",
      "lanciere technologies",
      "working at",
      "work at",
      "present company",
      "organization",
    ],
    response: () => {
      const c = P.currentCompany;
      const highlights = c.highlights.map((h) => `- ${h}`).join("\n");
      return `**🏢 Current Company**\n\n**${c.name}**\nRole: **${c.role}**\nStatus: ${c.period}\n\n${c.description}\n\n**Key Responsibilities:**\n${highlights}`;
    },
  },
  {
    id: "experience",
    label: "💼 Experience",
    exampleQuery: "Tell me about your experience",
    keywords: [
      "experience",
      "work experience",
      "internship",
      "intern",
      "career",
      "professional",
      "background",
      "work history",
      "years",
      "how long",
      "how many years",
      "fresher",
      "fresher or experienced",
      "job history",
      "employment",
    ],
    response: () => {
      const c = P.currentCompany;
      const highlights = c.highlights.map((h) => `- ${h}`).join("\n");
      return `**💼 Work Experience**\n\n**${c.role}** at **${c.name}** (${c.period})\n\n${c.description}\n\n**What I do:**\n${highlights}\n\nI also completed an **Internship in React JS at TechInfoTax Pvt. Ltd. (2025)**, which strengthened my React fundamentals before joining Lanciere.`;
    },
  },
  {
    id: "skills",
    label: "🛠️ Skills",
    exampleQuery: "What are your skills?",
    keywords: [
      "skill",
      "skills",
      "technical skills",
      "technologies",
      "tech stack",
      "tech",
      "technology",
      "stack",
      "tools",
      "languages",
      "programming",
      "framework",
      "frameworks",
      "what do you know",
      "specialize",
      "expertise",
      "what can you do",
      "proficient",
      "know",
    ],
    response: () => {
      const techList = P.technicalSkills.join(", ");
      const softList = P.softSkills.join(", ");
      return `**Technical Skills:**\n${techList}\n\n**Soft Skills:**\n${softList}`;
    },
  },
  {
    id: "strengths",
    label: "💪 Strengths",
    exampleQuery: "What are your strengths?",
    keywords: [
      "strength",
      "strengths",
      "strong",
      "why hire",
      "why should",
      "stand out",
      "unique",
      "special",
      "advantage",
      "best at",
      "good at",
      "what makes",
      "why you",
      "hire you",
      "different",
      "better",
      "qualities",
      "quality",
    ],
    response: () => {
      const list = P.strengths.map((s) => `- ${s}`).join("\n");
      return `**💪 My Key Strengths:**\n\n${list}\n\nI combine strong technical skills with attention to design detail, ensuring every application is both performant and user-friendly.`;
    },
  },
  {
    id: "projects",
    label: "🚀 Projects",
    exampleQuery: "What projects have you built?",
    keywords: [
      "project",
      "projects",
      "portfolio projects",
      "built",
      "build",
      "app",
      "application",
      "website",
      "show me",
      "what did you build",
      "what have you built",
      "developed",
      "created",
      "made",
      "how many projects",
      "all projects",
      "list projects",
    ],
    response: () => {
      const list = P.projects
        .map((p, i) => `**${i + 1}. ${p.name}** — ${p.description}`)
        .join("\n\n");
      return `I have worked on **${P.projects.length} projects:**\n\n${list}\n\nWant details on any specific project? Just ask by name!`;
    },
  },
  {
    id: "ems_portal",
    label: "🎯 EMS Portal",
    exampleQuery: "Tell me about the EMS Portal",
    keywords: [
      "ems",
      "ems portal",
      "ievalx",
      "job portal",
      "recruitment",
      "evaluation",
      "resume builder",
      "resumestudio",
      "job platform",
      "employee management",
    ],
    response: () => {
      const p = P.projects[0];
      const features = p.features.map((f) => `- ${f}`).join("\n");
      return `**${p.name}**\n\n${p.description}\n\n**Tech Stack:** ${p.tech.join(", ")}\n\n**Key Features:**\n${features}`;
    },
  },
  {
    id: "wattex",
    label: "☀️ Wattex Solar",
    exampleQuery: "Tell me about Wattex Solar Energy",
    keywords: [
      "wattex",
      "solar",
      "energy",
      "wattex energy",
      "wattex solar",
      "solar energy",
      "solar website",
    ],
    response: () => {
      const p = P.projects[1];
      const features = p.features.map((f) => `- ${f}`).join("\n");
      return `**${p.name}**\n\n${p.description}\n\n**Tech Stack:** ${p.tech.join(", ")}\n\n**Key Features:**\n${features}`;
    },
  },
  {
    id: "hm_clone",
    label: "🛍️ H&M Clone",
    exampleQuery: "Tell me about the H&M Clone",
    keywords: [
      "h&m",
      "hm",
      "hm clone",
      "h&m clone",
      "ecommerce",
      "e-commerce",
      "shopping cart",
      "product listing",
      "online store",
      "clone",
    ],
    response: () => {
      const p = P.projects[2];
      const features = p.features.map((f) => `- ${f}`).join("\n");
      return `**${p.name}**\n\n${p.description}\n\n**Tech Stack:** ${p.tech.join(", ")}\n\n**Key Features:**\n${features}`;
    },
  },
  {
    id: "box_cricket",
    label: "🏏 Box Cricket",
    exampleQuery: "Tell me about the Box Cricket project",
    keywords: [
      "box cricket",
      "cricket",
      "booking",
      "venue",
      "sports",
      "sports booking",
    ],
    response: () => {
      const p = P.projects[3];
      const features = p.features.map((f) => `- ${f}`).join("\n");
      return `**${p.name}**\n\n${p.description}\n\n**Tech Stack:** ${p.tech.join(", ")}\n\n**Key Features:**\n${features}`;
    },
  },
  {
    id: "coffee_website",
    label: "☕ Coffee Website",
    exampleQuery: "Tell me about the coffee website",
    keywords: ["coffee", "coffee website", "cafe", "coffee shop"],
    response: () => {
      const p = P.projects[4];
      const features = p.features.map((f) => `- ${f}`).join("\n");
      return `**${p.name}**\n\n${p.description}\n\n**Tech Stack:** ${p.tech.join(", ")}\n\n**Key Features:**\n${features}`;
    },
  },

  {
    id: "ai_mock_test",
    label: "🤖 AI Mock Test",
    exampleQuery: "Tell me about the AI Mock Test Platform",
    keywords: [
      "mock test",
      "ai mock test",
      "mock test platform",
      "proctoring",
      "proctored",
      "tensorflow",
      "test platform",
      "ai project",
      "exam platform",
      "online test",
    ],
    response: () => {
      const p = P.projects[5];
      const features = p.features.map((f) => `- ${f}`).join("\n");
      return `**${p.name}**\n\n${p.description}\n\n**Tech Stack:** ${p.tech.join(", ")}\n\n**Key Features:**\n${features}`;
    },
  },
  {
    id: "education",
    label: "🎓 Education",
    exampleQuery: "What's your educational background?",
    keywords: [
      "education",
      "degree",
      "college",
      "university",
      "study",
      "studied",
      "qualification",
      "academic",
      "school",
      "btech",
      "b.tech",
      "engineering",
      "narsimha",
      "graduate",
      "graduation",
      "passed out",
    ],
    response: () => {
      const e = P.education;
      return `**🎓 Educational Background**\n\n**${e.degree}** in ${e.branch}\n**${e.college}**\n📅 ${e.period}`;
    },
  },
  {
    id: "certifications",
    label: "🏆 Certifications",
    exampleQuery: "Any certifications or achievements?",
    keywords: [
      "certification",
      "certifications",
      "certificate",
      "achievement",
      "achievements",
      "awards",
      "award",
      "accomplishment",
      "techinfotax",
      "basketball",
      "certified",
    ],
    response: () => {
      const list = P.certifications.map((c) => `- ${c}`).join("\n");
      return `**🏆 Certifications & Achievements**\n\n${list}`;
    },
  },
  {
    id: "soft_skills",
    label: "🤝 Soft Skills",
    exampleQuery: "What are your soft skills?",
    keywords: [
      "soft skill",
      "soft skills",
      "communication",
      "leadership",
      "teamwork",
      "flexibility",
      "adaptability",
      "interpersonal",
      "team player",
      "collaborate",
    ],
    response: () => {
      const list = P.softSkills.join(", ");
      return `**Soft Skills:**\n\n${list}\n\nThese interpersonal skills help me collaborate effectively in team environments and communicate clearly with stakeholders.`;
    },
  },
  {
    id: "contact",
    label: "📞 Contact",
    exampleQuery: "How can I contact you?",
    keywords: [
      "contact",
      "email",
      "phone",
      "reach",
      "connect",
      "get in touch",
      "call",
      "message",
      "linkedin",
      "github",
      "mail",
      "number",
      "social",
      "social media",
      "contact details",
      "contact info",
      "contact information",
      "how can i contact",
      "how to contact",
      "how do i contact",
      "share your contact",
      "reach out",
      "reach you",
    ],
    response: () =>
      `You can reach me through:\n\n- **📧 Email:** ${P.email}\n- **📱 Phone:** ${P.phone}\n- **🔗 GitHub:** ${P.github}\n- **🔗 LinkedIn:** ${P.linkedin}\n\nYou can also use the **Contact** section on this website to send a message directly. I'd love to hear from you!`,
  },
  {
    id: "resume",
    label: "📄 Resume",
    exampleQuery: "How can I download your resume?",
    keywords: ["resume", "cv", "download resume", "download cv", "curriculum"],
    response: () =>
      `You can download my resume by clicking the **"Download Resume"** button in the **About** section of this portfolio.`,
  },
  {
    id: "availability",
    label: "✅ Availability",
    exampleQuery: "Are you open to opportunities?",
keywords: ['available', 'availability', 'open to', 'looking for', 'opportunities',
           'freelance', 'full-time', 'part-time', 'remote', 'hiring',
           'position', 'vacancy', 'openings', 'looking for opportunities',
           'job openings'],
    response: () =>
      `I am currently working at **${P.currentCompany.name}** but I'm always open to exploring exciting new opportunities.\n\n**Ideal roles:**\n- Frontend Developer (React)\n- Full-Stack Developer (React + Django)\n- UI Developer\n\nFeel free to reach out at **${P.email}** or through the Contact section!`,
  },
  {
    id: "react",
    label: "⚛️ React",
    exampleQuery: "Tell me about your React experience",
    keywords: ["react", "reactjs", "react js", "react developer"],
    response: () =>
      `React JS is my primary framework:\n\n- Building responsive, component-based UIs with **React 19**\n- State management with hooks and context\n- **MUI v9** and Tailwind CSS for polished styling\n- REST API integration and real-time data handling\n- Performance optimization and clean architecture\n- Currently using React daily at **${P.currentCompany.name}**\n\nAll my major projects including the EMS Portal are built with React.`,
  },
  {
    id: "location",
    label: "📍 Location",
    exampleQuery: "Where are you based?",
    keywords: [
      "location",
      "where based",
      "based in",
      "city",
      "country",
      "live in",
      "where do you live",
      "hometown",
      "relocate",
      "relocation",
      "where are you",
    ],
    response: () =>
      `I am based in **${P.location}** 📍\n\nCurrently working at **${P.currentCompany.name}** in Hyderabad.\n\nI am open to:\n- **On-site roles** in Hyderabad\n- **Remote opportunities** (anywhere)\n- **Relocation** for the right opportunity`,
  },
  {
    id: "languages",
    label: "🌐 Languages",
    exampleQuery: "What languages do you speak?",
    keywords: [
      "language",
      "languages",
      "speak",
      "spoken",
      "english",
      "hindi",
      "telugu",
      "mother tongue",
    ],
    response: () =>
      `**Languages I speak:**\n\n- **English** — Professional proficiency\n- **Hindi** — Fluent\n- **Telugu** — Native`,
  },
  {
    id: "hobbies",
    label: "🏀 Hobbies",
    exampleQuery: "What are your hobbies?",
    keywords: [
      "hobby",
      "hobbies",
      "interest",
      "interests",
      "free time",
      "besides coding",
      "outside work",
      "passion",
      "pastime",
      "what do you do for fun",
      "leisure",
    ],
    response: () => {
      const list = P.hobbies.map((h) => `- ${h}`).join("\n");
      return `**🎯 Hobbies & Interests:**\n\n${list}\n\nI believe staying curious outside of work keeps me creative and sharp as a developer!`;
    },
  },
  {
    id: "goals",
    label: "🎯 Goals",
    exampleQuery: "What are your career goals?",
    keywords: [
      "goal",
      "goals",
      "future plan",
      "future plans",
      "aspiration",
      "dream",
      "vision",
      "where do you see",
      "ambition",
      "aim",
      "career goal",
      "long term",
      "short term",
    ],
    response: () => {
      const list = P.goals.map((g) => `- ${g}`).join("\n");
      return `**🎯 Career Goals:**\n\n${list}\n\nI'm focused on continuous growth and building products that create real-world impact.`;
    },
  },
  {
    id: "this_website",
    label: "🌐 This Website",
    exampleQuery: "How was this website built?",
    keywords: [
      "this website",
      "this site",
      "this portfolio",
      "portfolio website",
      "how was this built",
      "how did you build this",
      "built with",
      "how is this made",
      "made this website",
      "made this site",
    ],
    response: () =>
      `This portfolio website is built with:\n\n- **React 19** + **Vite** for fast development\n- **Material UI (MUI v9)** for component styling\n- **Framer Motion** for smooth animations\n- **Lucide Icons** for clean iconography\n- **Responsive design** across all devices\n\nThe chatbot you're talking to right now works entirely offline — no API keys needed! 🚀`,
  },
  {
    id: "salary",
    label: "💰 Compensation",
    exampleQuery: "What are your salary expectations?",
    keywords: [
      "salary",
      "compensation",
      "ctc",
      "package",
      "expectation",
      "how much do you charge",
      "hourly rate",
    ],
    response: () =>
      `I appreciate the question! Compensation is something I prefer to discuss directly based on the role, responsibilities, and company.\n\nFeel free to reach out at **${P.email}** so we can have a detailed conversation. I'm flexible and open to discussion! 😊`,
  },
  {
    id: "name",
    label: "📛 My Name",
    exampleQuery: "What's your name?",
    keywords: [
      "your name",
      "whats your name",
      "what is your name",
      "name please",
    ],
    response: () =>
      `My name is **${P.name}**! I'm a ${P.role} currently working at **${P.currentCompany.name}**, based in ${P.location}. Nice to meet you! 😊`,
  },
  {
    id: "age",
    label: "📅 Age",
    exampleQuery: "How old are you?",
    keywords: [
      "age",
      "how old",
      "old are you",
      "born",
      "birthday",
      "dob",
      "date of birth",
    ],
    response: () =>
      `I graduated in 2024 with my B.Tech, so I'm in my early twenties! Rather than my age, I'd love to let my work speak for itself. Check out my **Projects** section! 🚀`,
  },
  {
    id: "thanks",
    label: "🙏 Thanks",
    exampleQuery: "Thank you",
    keywords: [
      "thank",
      "thanks",
      "thank you",
      "appreciate",
      "helpful",
      "great",
      "awesome",
      "cool",
      "good job",
      "well done",
      "amazing",
      "wonderful",
      "fantastic",
      "perfect",
    ],
    response: () =>
      `You're welcome! 😊 I'm glad I could help. If you have any more questions about my skills, projects, or availability, don't hesitate to ask. Have a great day!`,
  },


  {
    id: 'email',
    label: '📧 Email',
    exampleQuery: "What's your email?",
    keywords: ['email', 'email id', 'email address', 'your email',
               'mail id', 'gmail', 'email me', 'send email',
               'your mail', 'mail address', 'email address please'],
    response: () =>
      `📧 You can email me at **${P.email}**\n\nI usually respond within 24 hours — feel free to reach out!`,
  },
  {
    id: 'phone',
    label: '📱 Phone',
    exampleQuery: "What's your phone number?",
    keywords: ['phone', 'phone number', 'mobile', 'mobile number',
               'your phone', 'your mobile', 'contact number',
               'whatsapp', 'call you', 'cell number', 'cellphone'],
    response: () =>
      `📱 You can reach me on **${P.phone}**\n\nFeel free to call or send a WhatsApp message!`,
  },
  {
    id: 'linkedin',
    label: '🔗 LinkedIn',
    exampleQuery: "What's your LinkedIn?",
    keywords: ['linkedin', 'linked in', 'linkedin profile', 'linkedin id',
               'linkedin link', 'your linkedin', 'linkedin url',
               'connect on linkedin'],
    response: () =>
      `🔗 Here's my LinkedIn: **${P.linkedin}**\n\nFeel free to connect — I check it regularly!`,
  },
  {
    id: 'github',
    label: '💻 GitHub',
    exampleQuery: "What's your GitHub?",
    keywords: ['github', 'git hub', 'github profile', 'github link',
               'your github', 'github id', 'github url',
               'repositories', 'my repos', 'see your code'],
    response: () =>
      `💻 Here's my GitHub: **${P.github}**\n\nCheck out the source code for all my projects there!`,
  },
  {
    id: 'immediate_joiner',
    label: '⚡ Notice Period',
    exampleQuery: 'Are you an immediate joiner?',
    keywords: ['immediate joiner', 'immediately join', 'notice period',
               'serving notice', 'when can you join', 'how soon can you join',
               'available to join', 'start date', 'join immediately',
               'no notice period', 'can you join immediately', 'how soon'],
    response: () =>
      `**Yes, I am an immediate joiner!** ⚡\n\nI'm available to start right away for the right opportunity. Feel free to reach out at **${P.email}** to discuss further.`,
  },
  {
    id: "bye",
    label: "👋 Goodbye",
    exampleQuery: "Goodbye",
    keywords: [
      "bye",
      "goodbye",
      "see you",
      "take care",
      "later",
      "cya",
      "good bye",
      "gotta go",
      "leaving",
      "exit",
    ],
    response: () => {
      const hour = new Date().getHours();
      const timeMsg =
        hour >= 17
          ? "Have a wonderful evening!"
          : hour >= 12
            ? "Have a great rest of your day!"
            : "Have an amazing day ahead!";
      return `Thank you for visiting my portfolio! 🙏 ${timeMsg}\n\nFeel free to come back anytime. You can also reach me directly at **${P.email}**.`;
    },
  },
  {
    id: "funny",
    label: "😄 Tell a joke",
    exampleQuery: "Tell me a joke",
    keywords: [
      "joke",
      "funny",
      "make me laugh",
      "humor",
      "tell me a joke",
      "bored",
    ],
    response: () => {
      const jokes = [
        `Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛😄`,
        `A CSS joke:\n.life { display: none; }\n...just kidding, my life is definitely **display: flex** 😄`,
        `Why did the developer go broke?\nBecause he used up all his cache! 💰😄`,
        `How many programmers does it take to change a light bulb?\nNone — that's a hardware problem! 💡😄`,
      ];
      return (
        jokes[Math.floor(Math.random() * jokes.length)] +
        `\n\nWant to know something about my work? Just ask! 😊`
      );
    },
  },
];
