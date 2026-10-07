import { describe, it, expect } from "vitest";
import { cosineSim, scoreFromSimilarity } from "./ai";
import { CURATED_JOBS_CATALOG, validateDemoJob, VALIDATED_DEMO_JOBS } from "./jobs-catalog";

describe("cosineSim", () => {
  it("is 1 for identical vectors", () => {
    expect(cosineSim([1, 2, 3], [1, 2, 3])).toBeCloseTo(1);
  });
  it("is 0 for orthogonal vectors", () => {
    expect(cosineSim([1, 0], [0, 1])).toBe(0);
  });
  it("is 0 for a zero vector (no divide-by-zero)", () => {
    expect(cosineSim([0, 0], [1, 1])).toBe(0);
  });
});

describe("scoreFromSimilarity", () => {
  it("clamps into the 5–99 range", () => {
    expect(scoreFromSimilarity(-1)).toBe(5);
    expect(scoreFromSimilarity(2)).toBe(99);
  });
  it("is monotonic — more similar means a higher score", () => {
    expect(scoreFromSimilarity(0.8)).toBeGreaterThan(scoreFromSimilarity(0.4));
  });
});

describe("Tailored Cover Letter Generator", () => {
  it("builds an authentic 8-10 line first-person cover letter for specific job and company", async () => {
    const { generateCoverLetter, buildTailoredCoverLetter } = await import("./ai");
    const letter = await generateCoverLetter(
      "Alex Carter",
      "Stripe",
      "Senior Full Stack Engineer",
      "Building global payments infrastructure and high-throughput APIs",
      "TypeScript, React, Node.js, C#",
    );

    expect(letter).toContain(
      "Hi, I'm Alex Carter applying for the Senior Full Stack Engineer position at Stripe.",
    );
    expect(letter).toContain("interested in joining Stripe");
    expect(letter).toContain("Sincerely,\nAlex Carter");
    expect(letter).not.toContain("Resume Optimization Tip");
    expect(letter).not.toContain("Action Verb + Context");
  });
});

describe("demo job catalog", () => {
  it("includes only official jobs with HTTPS career and apply links", () => {
    expect(VALIDATED_DEMO_JOBS.length).toBeGreaterThan(1);
    expect(VALIDATED_DEMO_JOBS.some((job) => job.company === "Airbnb")).toBe(true);
    expect(VALIDATED_DEMO_JOBS.some((job) => job.company === "Stripe")).toBe(true);

    for (const job of VALIDATED_DEMO_JOBS) {
      expect(job.sourceType).toBe("official");
      expect(job.isActive).toBe(true);
      expect(job.jobUrl).toMatch(/^https:\/\//);
      expect(job.externalApplyUrl).toMatch(/^https:\/\//);
    }

    const sources = new Set(VALIDATED_DEMO_JOBS.map((job) => job.source));
    for (const source of ["Greenhouse", "Ashby", "Workday", "Other"]) {
      expect(sources.has(source as (typeof VALIDATED_DEMO_JOBS)[number]["source"])).toBe(true);
    }

    expect(
      validateDemoJob({
        id: "sample-role",
        company: "Example",
        role: "Sample Role",
        sourceType: "unverified",
        isActive: true,
      }),
    ).toBe(false);

    const result = validateDemoJob({
      id: "google-swe",
      company: "Google",
      role: "Software Engineer",
      source: "Workday",
      sourceType: "official",
      isActive: true,
      jobUrl: "https://careers.google.com/jobs/results/12345/",
      externalApplyUrl: "https://careers.google.com/jobs/results/12345/",
    });

    expect(result).toBe(true);
  });

  it("uses the requested official role titles and job links", () => {
    const requestedRoles = [
      {
        company: "Coinbase",
        role: "Senior Software Engineer - Frontend - Coinbase Card team",
        url: "https://www.coinbase.com/en-in/careers/positions/8088201",
      },
      {
        company: "Airbnb",
        role: "Senior Analyst, Advanced Analytics",
        url: "https://careers.airbnb.com/positions/8225785/",
      },
      {
        company: "Google",
        role: "Technical Program Manager I, Infrastructure, Google Cloud",
        url: "https://www.google.com/about/careers/applications/jobs/results/98673233158382278-technical-program-manager-i-infrastructure-google-cloud?_escaped_fragment_=t%3Djo%26jid%3D127025001%26&location=Addison%2C%20TX%2C%20USA",
      },
      {
        company: "Meta",
        role: "Production Engineer",
        url: "https://www.metacareers.com/profile/job_details/1512065736047495/",
      },
    ];

    for (const requested of requestedRoles) {
      const job = CURATED_JOBS_CATALOG.find((item) => item.company === requested.company);
      expect(job?.role).toBe(requested.role);
      expect(job?.jobUrl).toBe(requested.url);
      expect(job?.externalApplyUrl).toBe(requested.url);
    }
  });
});
