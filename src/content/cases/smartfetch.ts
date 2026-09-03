import type { CaseStudy } from "../types";

export const smartfetch: CaseStudy = {
  slug: "smartfetch",
  index: 2,
  title: "Collecting invoices from 57 utility portals",
  hook: "I led much of the backend and infrastructure work for a service that collects utility invoices automatically, even when a portal asks for a code sent by email.",
  summary:
    "I led a large share of the backend and infrastructure work behind invoice collection from 57 utility portals. The service handles emailed login codes and delivers documents to accounting systems with strict access rules.",

  role: "Led backend and infrastructure delivery · core contributor on a fourteen-person team",
  period: "Oct 2025 – present",
  status: "In production · source private",
  stack: [
    "AWS CDK",
    "Lambda",
    "Batch",
    "EventBridge Scheduler",
    "DynamoDB",
    "S3",
    "SES",
    "Cognito",
    "KMS",
    "Playwright",
    "Zod",
    "React 19",
  ],
  cardMetric: "232 commits · 57 provider adapters",

  context: [
    "Businesses receive invoices from electricity, water, waste, and telecom providers. Most providers do not offer an API, so staff must sign in to many separate websites and move each invoice into an accounting system.",
    "SmartFetch handles that routine work on a schedule. It signs in, finds new documents, stores them, and sends them to the customer's chosen destination. The service can retry failed steps without downloading or filing the same invoice twice.",
    "I joined early and led a large share of the backend and infrastructure delivery on a fourteen-person team. Across 232 commits, I took ownership of secure document delivery, releases and deployments, customer account access, and credential protection.",
  ],

  constraints: [
    {
      title: "Every provider works differently",
      body: "Each of the 57 portals has its own login and invoice flow, and any provider can redesign its website without notice. We needed to add or repair one provider without disrupting the rest of the service.",
    },
    {
      title: "Login codes arrive by email",
      body: "Many portals send a short-lived code during login. A scheduled invoice run at 3am cannot depend on a person reading and forwarding that message.",
    },
    {
      title: "Some customers restrict where files come from",
      body: "Some enterprise accounting systems accept files only from approved internet addresses. Our cloud jobs needed a predictable address before those systems would allow a connection.",
    },
    {
      title: "The service handles sensitive credentials",
      body: "Customers trust the service with usernames and passwords for utility accounts. We needed to keep each customer's data separate and protect stored credentials.",
    },
  ],

  diagram: "smartfetch",
  diagramCaption:
    "SmartFetch collects and stores each invoice before sending it to the customer's accounting system. When a portal emails a login code, the waiting job receives the code through a unique address and continues automatically.",

  hardPart: {
    title: "Handling login codes without waking someone up",
    paragraphs: [
      "A scheduled browser job cannot open a customer's inbox when a utility portal asks for a login code. Requiring someone to forward the code at 3am would defeat the purpose of automation.",
      "I gave each invoice task its own email address. The customer registers that address with the utility. When the code arrives, the service identifies the right task and passes the code to the waiting browser job.",
      "Email aliases and forwarding rules can change the visible recipient. I check the message's delivery record first, then use the visible address as a fallback. This helps the service route each code to the right task.",
      "The result removes the manual step from the login flow and lets scheduled invoice runs finish at any hour.",
      "**Delivering from an approved address.** Some customer systems accept files only from known internet addresses. I first created a separate network path for those deliveries so every connection came from one fixed address.",
      "I later found that our existing network already provided stable addresses customers could approve. The separate setup added cost and maintenance without improving security, so I removed it in two commits and reused the shared network.",
      "Retries can also collect the same invoice twice. I gave every document a content fingerprint so the service can recognise and reject an exact repeat.",
    ],
    callouts: [
      {
        title: "Route every login code to the right task",
        before:
          "A scheduled invoice run depended on someone finding and forwarding a short-lived email code.",
        after:
          "Each task receives its own email address, so the service can match the code and continue automatically.",
        impact:
          "Invoice collection can run overnight without a person monitoring an inbox.",
        metric: "0 manual handoffs",
        afterParagraph: 3,
      },
      {
        title: "Remove infrastructure we did not need",
        before:
          "File delivery used a separate network path solely to provide an approved internet address.",
        after:
          "I confirmed the shared network already met the requirement and removed the duplicate setup.",
        impact:
          "The team kept reliable delivery while reducing cost and maintenance.",
        metric: "2 commits to simplify",
        afterParagraph: 5,
      },
      {
        title: "Prevent duplicate invoices",
        before:
          "A retry could download and store a document the service had already collected.",
        after:
          "The service gives each file a content fingerprint and rejects an exact repeat.",
        impact:
          "Customers do not receive duplicate invoices when a scheduled job runs again.",
        metric: "57 portals protected",
        afterParagraph: 6,
      },
    ],
  },

  decisions: [
    {
      chose: "Keep each provider's workflow separate",
      over: "Force every portal into one generic setup",
      because:
        "Portals differ in how they handle accounts, dates, and downloads. Separate workflows let us add or repair one provider without changing the platform used by all 57.",
    },
    {
      chose: "Give every task its own login-code address",
      over: "Search a shared inbox for a matching message",
      because:
        "Two tasks can receive nearly identical emails at the same time. A unique address tells the service exactly which task needs each code.",
    },
    {
      chose: "Read the email's delivery records first",
      over: "Rely only on the visible recipient fields",
      because:
        "Aliases and forwarding rules can change the visible recipient. The delivery records preserve the address that received the message and worked more reliably in customer setups.",
    },
    {
      chose: "Reuse the existing network's stable addresses",
      over: "Maintain a separate network for file delivery",
      because:
        "The shared network already met the customer's access rules. I removed the extra network because it added cost and maintenance without adding a useful benefit.",
    },
  ],

  outcomes: [
    {
      value: "57",
      label: "utility portals supported in production",
      basis:
        "count of production provider integrations, excluding test and generic entries",
    },
    {
      value: "232",
      label: "commits I authored as an early core contributor",
      basis: "git shortlog -sne across all branches",
    },
    {
      value: "0",
      label: "people needed to forward login codes",
      basis:
        "verified from the automated email-code flow, which has no manual step",
    },
    {
      value: "4",
      label: "deployment stages the team can create on demand",
      basis:
        "verified from the documented production, staging, development, and private environments",
    },
  ],

  changes: [
    "The service encrypts each credential field separately, which adds a network request for every field and limits its size. As configurations grow, I would encrypt the full set locally and protect one key through KMS.",
    "Each provider currently decides how long to wait for a page. That can repeat the same timing problems across portals. I would give every provider one shared page-settle helper.",
    "We currently learn about a redesigned portal when a customer run fails. I would run a weekly check against a saved example for each of the 57 providers.",
  ],
};
