import type { SuggestedJob } from "./types";

export const CURATED_JOBS_CATALOG: SuggestedJob[] = [
  {
    id: "airbnb-8225785",
    company: "Airbnb",
    role: "Senior Analyst, Advanced Analytics",
    location: "India",
    salaryRange: "See official posting",
    source: "Other",
    applicationSource: "Other",
    sourceLabel: "Airbnb Careers",
    sourceType: "official",
    isVerified: true,
    isActive: true,
    jobUrl: "https://careers.airbnb.com/positions/8225785/",
    externalApplyUrl: "https://careers.airbnb.com/positions/8225785/",
    description:
      "Partner with Airbnb's India Analytics Centre of Excellence and Fraud & Safety Delivery team to build analytical solutions, metrics, dashboards, and actionable business insights.",
    requiredSkills: [
      "SQL/NoSQL",
      "Python",
      "R or SAS",
      "Statistics",
      "Machine Learning",
      "Tableau or BI",
      "Data Modeling",
      "A/B Testing",
    ],
    experienceLevel: "See official posting",
  },
  {
    id: "stripe-abuse-research-engineer-8172503",
    company: "Stripe",
    role: "Abuse Research Engineer",
    location: "See official posting",
    salaryRange: "See official posting",
    source: "Greenhouse",
    applicationSource: "Greenhouse",
    sourceLabel: "Stripe Careers",
    sourceType: "official",
    isVerified: true,
    isActive: true,
    jobUrl: "https://stripe.com/careers/listing/abuse-research-engineer/8172503",
    externalApplyUrl: "https://stripe.com/careers/listing/abuse-research-engineer/8172503",
    description:
      "Research and engineer solutions that help Stripe detect and mitigate abuse across its financial infrastructure.",
    requiredSkills: ["Security", "Python", "Data Analysis", "Fraud Detection", "Engineering"],
    experienceLevel: "See official posting",
  },
  {
    id: "google-tpm-infrastructure-cloud-98673233158382278",
    company: "Google",
    role: "Technical Program Manager I, Infrastructure, Google Cloud",
    location: "Addison, TX, USA",
    salaryRange: "See official posting",
    source: "Workday",
    applicationSource: "Workday",
    sourceLabel: "Google Careers",
    sourceType: "official",
    isVerified: true,
    isActive: true,
    jobUrl:
      "https://www.google.com/about/careers/applications/jobs/results/98673233158382278-technical-program-manager-i-infrastructure-google-cloud?_escaped_fragment_=t%3Djo%26jid%3D127025001%26&location=Addison%2C%20TX%2C%20USA",
    externalApplyUrl:
      "https://www.google.com/about/careers/applications/jobs/results/98673233158382278-technical-program-manager-i-infrastructure-google-cloud?_escaped_fragment_=t%3Djo%26jid%3D127025001%26&location=Addison%2C%20TX%2C%20USA",
    description:
      "Coordinate infrastructure programs for Google Cloud, working across engineering and partner teams to deliver technical initiatives.",
    requiredSkills: ["Program Management", "Infrastructure", "Google Cloud", "Communication"],
    experienceLevel: "See official posting",
  },
  {
    id: "meta-production-engineer-1512065736047495",
    company: "Meta",
    role: "Production Engineer",
    location: "See official posting",
    salaryRange: "See official posting",
    source: "Other",
    applicationSource: "Other",
    sourceLabel: "Meta Careers",
    sourceType: "official",
    isVerified: true,
    isActive: true,
    jobUrl: "https://www.metacareers.com/profile/job_details/1512065736047495/",
    externalApplyUrl: "https://www.metacareers.com/profile/job_details/1512065736047495/",
    description:
      "Help keep Meta's production systems reliable and scalable by applying software engineering and systems expertise.",
    requiredSkills: ["Software Engineering", "Systems", "Reliability", "Infrastructure"],
    experienceLevel: "See official posting",
  },
  {
    id: "vercel-design-engineer-6129441004",
    company: "Vercel",
    role: "Design Engineer",
    location: "See official posting",
    salaryRange: "See official posting",
    source: "Greenhouse",
    applicationSource: "Greenhouse",
    sourceLabel: "Vercel Careers",
    sourceType: "official",
    isVerified: true,
    isActive: true,
    jobUrl: "https://job-boards.greenhouse.io/vercel/jobs/6129441004",
    externalApplyUrl: "https://job-boards.greenhouse.io/vercel/jobs/6129441004",
    description:
      "Build the AI Gateway developer experience across Vercel's dashboard, model catalog, CLI, APIs, and code.",
    requiredSkills: ["Frontend Engineering", "Product Design", "React", "Developer Experience"],
    experienceLevel: "See official posting",
  },
  {
    id: "notion-software-engineer-developer-platform",
    company: "Notion",
    role: "Software Engineer, Developer Platform",
    location: "San Francisco, CA / New York, NY",
    salaryRange: "See official posting",
    source: "Ashby",
    applicationSource: "Ashby",
    sourceLabel: "Notion Careers",
    sourceType: "official",
    isVerified: true,
    isActive: true,
    jobUrl: "https://jobs.ashbyhq.com/notion/1fc309c8-da20-4ff2-84c7-8b863ece2b0a",
    externalApplyUrl: "https://jobs.ashbyhq.com/notion/1fc309c8-da20-4ff2-84c7-8b863ece2b0a",
    description:
      "Build APIs, MCP tools, integrations, and platform experiences that connect Notion to customers' apps, data, and workflows.",
    requiredSkills: ["TypeScript", "Backend", "Frontend", "APIs", "Developer Tools"],
    experienceLevel: "7+ years",
  },
  {
    id: "coinbase-senior-software-engineer-frontend-card-8088201",
    company: "Coinbase",
    role: "Senior Software Engineer - Frontend - Coinbase Card team",
    location: "India",
    salaryRange: "See official posting",
    source: "Other",
    applicationSource: "Other",
    sourceLabel: "Coinbase Careers",
    sourceType: "official",
    isVerified: true,
    isActive: true,
    jobUrl: "https://www.coinbase.com/en-in/careers/positions/8088201",
    externalApplyUrl: "https://www.coinbase.com/en-in/careers/positions/8088201",
    description:
      "Build frontend experiences for Coinbase Card as part of Coinbase's mission to increase economic freedom.",
    requiredSkills: ["Frontend Engineering", "React", "TypeScript", "Web Applications"],
    experienceLevel: "See official posting",
  },
];

export function validateDemoJob(job: Partial<SuggestedJob>): boolean {
  if (!job.company?.trim() || !job.role?.trim() || !job.id?.trim()) return false;
  if (job.sourceType !== "official" || job.isActive !== true) return false;
  if (!job.source || !job.jobUrl || !job.externalApplyUrl) return false;

  try {
    const jobUrl = new URL(job.jobUrl);
    const applyUrl = new URL(job.externalApplyUrl);
    return jobUrl.protocol === "https:" && applyUrl.protocol === "https:";
  } catch {
    return false;
  }
}

export const VALIDATED_DEMO_JOBS = CURATED_JOBS_CATALOG.filter(validateDemoJob);
