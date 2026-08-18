import M1 from "./images/project_EEB/M.jpg";
import M2 from "./images/project_Hotel/M2.jpg";
import M3 from "./images/project_Chat/M3.jpg";

export const profile = {
  name: "Nguyen Tien Phat",
  role: "Full-stack Developer",
  location: "Ho Chi Minh City, Vietnam",
  email: "phatnguyen03022001@gmail.com",
  github: "https://github.com/phatnguyen03022001",
  linkedin: "https://www.linkedin.com/in/nguyentienphat/",
  intro:
    "I build useful, reliable web applications with React, Node.js and modern web technologies.",
  currentFocus:
    "Web applications that are simple to use and easy to maintain.",
};

export const experience = [
  {
    title: "Software Engineering Intern",
    company: "MiuTech Company",
    period: "04 — 06 / 2024",
    description:
      "Worked on real-world web development tasks and applied full-stack skills in a team environment.",
  },
];

export const education = [
  {
    title: "Software Engineering",
    school: "Ton Duc Thang University",
    period: "2019 — 2024",
    description:
      "Built a foundation in software engineering through coursework and practical software projects.",
  },
];

export const principles = [
  {
    title: "Understand first",
    description: "Start with the problem and the people using the product.",
  },
  {
    title: "Keep it clear",
    description:
      "Prefer small, understandable solutions over unnecessary complexity.",
  },
  {
    title: "Keep improving",
    description:
      "Review, test and improve the work instead of treating the first version as final.",
  },
];

export const projects = [
  {
    title: "English Exam Bank",
    slug: "english-exam-bank",
    year: "2024",
    role: "Full-stack Developer",
    tag: "Graduation Project",
    summary:
      "An exam management platform for students, teachers and education managers.",
    problem:
      "The project focused on giving teachers a simple way to create exams, manage questions and review student results.",
    solution:
      "I built the main frontend and backend flows for exam creation, question management, user roles and result tracking.",
    decisions: [
      "React for a clear and reusable user interface.",
      "Node.js and Express for the API layer.",
      "MongoDB for flexible question and exam data.",
    ],
    evidence: ["Source code", "Live demo", "Project screenshots"],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    image: M1,
    github: "https://github.com/phatnguyen03022001/ExamBankEnglish",
    demo: "https://englishexambank.vercel.app/",
  },
  {
    title: "Hotel Management",
    slug: "hotel-management",
    year: "2023",
    role: "Full-stack Developer",
    tag: "Final Project",
    summary:
      "A hotel management system designed for administrators and guests.",
    problem:
      "The project focused on connecting hotel operations with a simple guest booking experience.",
    solution:
      "I worked on the web application, including guest flows, management screens and database integration.",
    decisions: [
      "Express and Node.js for the application server.",
      "MySQL for structured hotel and booking data.",
      "Server-rendered views for a simple and focused application.",
    ],
    evidence: ["Source code", "Live demo", "Project screenshots"],
    stack: ["Node.js", "Express", "EJS", "MySQL"],
    image: M2,
    github: "https://github.com/phatnguyen03022001/hotel",
    demo: "https://hotel-management-system-fytd.onrender.com/",
  },
  {
    title: "RealChat",
    slug: "real-chat",
    year: "2024",
    role: "Solo Developer",
    tag: "Realtime Project",
    summary: "A small real-time chat application built with Socket.io.",
    problem:
      "The goal was to understand how real-time messages move between users without refreshing the page.",
    solution:
      "I built a focused chat application around a Node.js server and Socket.io events.",
    decisions: [
      "Socket.io for real-time communication.",
      "Node.js and Express for the server.",
      "A small scope to keep the real-time flow easy to understand.",
    ],
    evidence: ["Source code", "Live demo", "Project screenshots"],
    stack: ["Node.js", "Express", "Socket.io"],
    image: M3,
    github: "https://github.com/phatnguyen03022001/ChatAppSocket",
    demo: "https://chatappsocket-y9ya.onrender.com/",
  },
];

export const skills = [
  "React",
  "Node.js",
  "Express",
  "JavaScript",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
  "Docker",
];
