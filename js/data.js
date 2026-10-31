/* ==========================================================================
   EDIT ME — All of the website's content lives in this one file.
   Change the text below and refresh the page. No other file needs touching.
   ========================================================================== */

window.PORTFOLIO = {
  name: "Namratha Ethamukkala",
  firstName: "Namratha",
  role: "UI/UX Designer",
  kicker: "Portfolio — 2026",
  heroLine: "UI/UX Designer  ·  Co-Founder, Avora Brands",

  /* ----------------------------- Intro ----------------------------- */
  photo: "images/namratha.jpg",
  photoCaption: "Co-Founder · Creative Director · UI/UX Designer",
  // Each word lights up as you scroll past it.
  statement:
    "I’m Namratha Ethamukkala, a UI/UX Designer driven by curiosity, thoughtful problem-solving, and the belief that great design goes beyond how things look — it’s about how they work and the value they create.",
  statementMore: "", // optional smaller paragraph under the statement

  roles: [
    {
      title: "UI/UX Designer",
      org: "SpaceWire Tech",
      text: "Designing intuitive mobile apps and websites, from concept to developer-ready designs.",
    },
    {
      title: "Co-Founder & Creative Director",
      org: "Avora Brands",
      text: "Shaping brand identities and designing digital experiences through creative direction.",
    },
    {
      title: "UI/UX Content Creator",
      org: "Instagram · LinkedIn",
      text: "Breaking down UX patterns and sharing practical design insights.",
    },
  ],

  // visual: "apps" (mini icons from the apps list) | "companies" (name chips) | "agency" | "since" (timeline)
  stats: [
    {
      value: "6",
      label: "apps shipped & live",
      note: "Designed end to end at SpaceWire Tech — now in real people's pockets.",
      visual: "apps",
    },
    {
      value: "4",
      label: "companies I've worked with",
      note: "Two internships, a part-time role, and a full-time position. Each one elevated my design skills and perspective.",
      visual: "companies",
      items: ["CODTECH IT Solutions", "Blackhardstone", "Pass 11 Plus Grammar", "SpaceWire Tech"],
    },
    {
      value: "1",
      label: "agency co-founded",
      note: "From a shared creative vision to our first client — a milestone that made Avora Brands real.",
      visual: "agency",
      items: ["Branding", "Digital design", "Print services"],
    },
    {
      value: "2025",
      label: "the year I started designing",
      note: "One year into design, still driven by curiosity and the craft of making things better.",
      visual: "since",
    },
  ],

  /* ----------------------------- Journey ----------------------------- */
  journeyTitle: 'From curiosity to Co‑Founder.',
  journey: [
    {
      year: "2025",
      when: "Early 2025",
      title: "It started with questions",
      text: "Not tools — questions. I began dissecting apps and websites, spotting friction and asking how each one could feel effortless.",
    },
    {
      year: "2025",
      when: "June 2025",
      org: "Frontlines EduTech (FLM)",
      title: "Learning UI/UX",
      text: "A UI/UX course turned instinct into process: research, wireframes, prototypes, testing. HostelHub and WorkloadIQ were born here.",
    },
    {
      year: "2025",
      when: "2025 · 2 months",
      org: "CODTECH IT Solutions",
      title: "My first real brief",
      text: "My first experience designing for real users, turning feedback into better decisions and stronger design skills.",
    },
    {
      year: "2026",
      when: "2026 · 3 months",
      org: "Blackhardstone",
      title: "Sharpening the craft",
      text: "A second internship, a faster pace. Tighter flows, cleaner systems and the confidence to defend a design decision.",
    },
    {
      year: "2026",
      when: "Mar – Apr 2026",
      org: "Pass 11 Plus Grammar",
      title: "Designing for learners",
      text: "My first paid design role, part-time — designing exam question papers for students across different grades.",
    },
    {
      year: "2026",
      when: "May 2026",
      org: "SpaceWire Tech",
      title: "Stepping Up",
      text: "Joined as a full-time UI/UX Designer. Designed 10 mobile apps in under six months, with six already live on the app stores — and more in progress.",
    },
    {
      year: "2026",
      when: "2026",
      org: "Avora Brands",
      title: "The First Milestone",
      text: "A shared vision became Avora Brands — our own branding and digital design agency, brought to its first milestone with Vydehi Institute as our first client.",
    },
    {
      year: "Now",
      when: "Today",
      title: "Just the Beginning",
      text: "Growing through meaningful design work, building Avora Brands, and sharing design insights along the way. There’s still so much more to create.",
      now: true,
    },
  ],

  /* ----------------------------- Shipped apps ----------------------------- */
  // Launched apps only. Add the logo file in images/apps/ and put its path in `icon`.
  // `link` = Play Store / App Store URL (optional).
  appsNote: "Product screens stay under NDA — but all six are live. Explore them.",
  apps: [
    { name: "Bhaktilok", category: "Devotion", text: "A digital home for devotional content and spiritual experiences.", icon: "images/apps/bhaktilok.png", link: "https://play.google.com/store/apps/details?id=com.spacewire.bhaktilok" },
    { name: "CashAlert", category: "Fintech", text: "Instant payment alerts and collection tools for UPI transactions.", icon: "images/apps/cashalert.png", link: "https://play.google.com/store/apps/details?id=com.spacewire.cashalert" },
    { name: "Astrolok", category: "AI · Astrology", text: "AI-powered astrology with insights made personal.", icon: "images/apps/astrolok.png", link: "https://play.google.com/store/apps/details?id=com.spacewire.astrolok" },
    { name: "Circle 360", category: "Safety", text: "Location sharing and connection with the people you trust most.", icon: "images/apps/circle360.png", link: "https://play.google.com/store/apps/details?id=com.spacewire.circle360" },
    { name: "HeyBuddy", category: "Utility · Voice", text: "Voice lock, find-my-phone and a voice assistant — in one app.", icon: "images/apps/heybuddy.png", link: "https://play.google.com/store/apps/details?id=com.spacewire.heybuddy" },
    { name: "Meratune", category: "Audio", text: "Personalised name ringtones and audio experiences.", icon: "images/apps/meratune.png", link: "https://play.google.com/store/apps/details?id=com.spacewire.meratune" },
  ],

  /* ----------------------------- Case studies ----------------------------- */
  // mock: "browser" | "dashboard" | "audit" | "brand"   (used when there's no image)
  projects: [
    {
      title: "HostelHub",
      type: "Website Design",
      year: "2025",
      tagline: "Hostel life, simplified.",
      description: "A website designed to take the everyday chaos out of hostel life — so students can spend less time sorting things out and more time focusing on what matters.",
      tags: ["User research", "Information architecture", "UI design", "Prototyping"],
      mock: "browser",
      image: "images/projects/hostelhub.webp",
      link: "https://www.behance.net/gallery/235409041/HostelHub-Simplifying-Hostel-Life-for-Students",
    },
    {
      title: "WorkloadIQ",
      type: "Decision dashboard",
      year: "2025",
      tagline: "See burnout before it happens.",
      description: "A decision dashboard that surfaces workload risk early — turning scattered signals into one clear view a manager can act on.",
      tags: ["Data visualisation", "Dashboard", "Responsive design"],
      mock: "dashboard",
      image: "images/projects/workloadiq.webp",
      link: "https://www.behance.net/gallery/244768825/WorkloadIQ-Decision-Focused-Dashboard-UX-Case-Study",
    },
    {
      title: "LIC Website",
      type: "Heuristic evaluation",
      year: "2025",
      tagline: "Auditing a website millions rely on.",
      description: "A heuristic evaluation of LIC's website — finding where users stumble, rating each issue by severity and proposing practical fixes.",
      tags: ["Usability heuristics", "UX audit", "Recommendations"],
      mock: "audit",
      image: "images/projects/lic-audit.webp",
      link: "https://www.behance.net/gallery/235410515/LIC-Website-Heuristic-Evaluation",
    },
    {
      title: "Personal Brand",
      type: "Personal Branding",
      year: "2026",
      tagline: "A name, made into a mark.",
      description: "A monogram built from the letter N, defined by a geometric arch and a single, intentional stroke. Minimal in form, confident in contrast, and designed to represent me.",
      tags: ["Logo design", "Identity", "Typography"],
      mock: "brand",
      link: "https://www.behance.net/gallery/236191025/N-Monogram-Personal-Branding-Identity",
    },
  ],

  /* ----------------------------- Avora Brands ----------------------------- */
  avora: {
    name: "Avora Brands",
    role: "Co-Founder & Creative Director",
    text: "A branding and digital design agency I co-founded, where I design distinctive brand identities, engaging digital experiences, and creative assets for businesses across industries.",
    link: "https://www.avorabrands.in/",
    milestone: {
      label: "Milestone",
      kicker: "Our first client",
      client: "Vydehi Institute",
      stat: "30+",
      statLabel: "course brochures",
      text: "One design system, carried across every course — Pharmacy, Nursing, Optometry, Cardiac Care and many more.",
    },
  },

  /* ----------------------------- Contact ----------------------------- */
  contactTitle: "Have a project in mind?",
  contactSub: "Whether it's an app, a website or a brand, I'd love to hear about it. Let's discuss your idea, and I'll shape the design around what you need.",
  contact: {
    email: "namrathaethamukkala@gmail.com",
    phone: "+91 91828 73346", // shown as written; dialled without spaces
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/namrathae199" },
      { label: "Instagram", url: "https://www.instagram.com/designinsights.ux/" },
      { label: "Behance", url: "https://www.behance.net/namrathadesigns" },
    ],
  },
};
