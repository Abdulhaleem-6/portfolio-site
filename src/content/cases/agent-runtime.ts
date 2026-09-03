import type { CaseStudy } from "../types";

export const agentRuntime: CaseStudy = {
  slug: "agent-runtime",
  index: 1,
  title: "Helping an AI agent confirm its work",
  hook: "I helped an AI agent check that a webpage actually changed before telling the user it had finished.",
  summary:
    "I helped an AI agent verify its work instead of assuming every click succeeded. It now waits for the page to finish updating, checks the result, and gives users a more accurate answer.",

  role: "Agent runtime and browser automation · one of several contributors",
  period: "Oct 2025 – present",
  status: "In production · source private",
  stack: [
    "TypeScript",
    "Mastra",
    "MCP",
    "Preact",
    "Socket.io",
    "AWS CDK",
    "Vitest",
  ],
  cardMetric: "135 commits · +23,355 / −11,172",

  context: [
    "Worknet AI helps users complete tasks in an admin console. The agent reads the page, clicks controls, enters information, and reports what changed.",
    "The agent sometimes treated a completed click as proof that the task succeeded. Modern webpages often keep updating after a click, so users could receive a success message even when the page rejected or missed the change.",
    "As one of several contributors, I worked across the parts of the product that read the page, coordinate agents, and manage the information sent to the AI model.",
  ],

  constraints: [
    {
      title: "We do not control the page",
      body: "The agent uses the same admin app as a person. The page decides when forms, dialogs, and third-party tools finish updating, so we cannot assume that a click takes effect immediately.",
    },
    {
      title: "Users need an honest result",
      body: "The agent can recover from a clear failure. A false success misleads the user and gives the agent incorrect information for its next step.",
    },
    {
      title: "Every page check uses limited memory",
      body: "The agent must inspect the page again after each action. Those page records can fill its working memory during a task with dozens of steps.",
    },
    {
      title: "Specialist agents need clear boundaries",
      body: "A specialist agent needs only the tools required for its task. Giving it every available tool makes its work harder to control and review.",
    },
  ],

  diagram: "agent-loop",
  diagramCaption:
    "For each action, the agent keeps track of the right control, waits for the page to settle, checks the result, and removes old page data it no longer needs.",

  hardPart: {
    title: "Making success match what users see",
    paragraphs: [
      "The agent needed a dependable way to know when an action had finished. I addressed three related problems: following the same control as the page refreshed, waiting for updates to stop, and keeping enough recent information to check the result.",
      "**Keep track of the right control.** A webpage can replace a button or field while it updates. I gave each control a stable identifier so the agent can find the same one again after the page refreshes.",
      "**Wait for the page.** I built a check that waits until the page has stayed still for 120 milliseconds. It stops after 1,200 milliseconds so an animation or live dashboard cannot hold up the task forever. If the page stays busy, the agent records that fact and continues carefully.",
      "Closing a dialog can trigger another page update. I added a second wait after the dialog closes so the agent does not report an old view as the final result.",
      "**Protect the agent's working memory.** Checking the page after every action created a large amount of data. I kept the latest useful page view, removed older copies, and shortened results larger than 1,500 tokens. This gives the agent room to finish longer tasks.",
      "Images created a hidden cost because the model could reload the same file on every step, even when its text record looked small. I treated any result with an attachment as large so the system could remove stale copies.",
    ],
    callouts: [
      {
        title: "From assumed success to verified results",
        before:
          "The agent treated a completed click as proof that the requested change had worked.",
        after:
          "It waits for the page to finish updating, checks the visible result, and reports what actually happened.",
        impact:
          "Users receive an answer based on the page's final state instead of the agent's intention.",
        metric: "120 ms settle · 1,200 ms maximum",
        afterParagraph: 3,
      },
      {
        title: "Keep useful context for longer tasks",
        before:
          "Repeated page views and attached images filled the agent's working memory as a task continued.",
        after:
          "The system keeps the newest useful evidence and removes older or oversized results.",
        impact:
          "The agent has more room to complete longer tasks without losing the latest page state.",
        metric: "3-turn stale limit · 1,500-token size limit",
        afterParagraph: 5,
      },
    ],
  },

  decisions: [
    {
      chose: "Check the page after each action",
      over: "Trusting a completed click",
      because:
        "A completed click does not prove that the page accepted the change. I made the agent report what the page shows after the action.",
    },
    {
      chose: "Wait for visible page activity to stop",
      over: "Waiting for a fixed amount of time",
      because:
        "A fixed delay wastes time on fast pages and still fails on slow ones. I watch the page itself and cap the wait so the task can keep moving.",
    },
    {
      chose: "Keep the newest useful result from each tool",
      over: "Dropping everything after a fixed number of messages",
      because:
        "A fixed window can remove the latest page view while keeping less useful data. My cleanup rules keep recent evidence and remove older or costly results.",
    },
    {
      chose: "Create specialist agents only when a task needs them",
      over: "Preparing every specialist agent in advance",
      because:
        "Most requests do not need another agent. I prepare a specialist only when the main agent delegates work, which avoids unnecessary setup and keeps its tools focused.",
    },
  ],

  outcomes: [
    {
      value: "135",
      label: "commits I authored in the Worknet AI codebase",
      basis: "git log --author, aggregated across author identities",
    },
    {
      value: "+23,355 / −11,172",
      label: "lines I added / removed",
      basis: "git log --author --shortstat, summed",
    },
    {
      value: "120 ms / 1,200 ms",
      label: "page-settle window and maximum wait",
      basis: "measured from the production page-wait settings",
    },
    {
      value: "3 turns / 1,500 tokens",
      label: "limits for old and oversized results",
      basis: "measured from the production context-cleanup settings",
    },
  ],

  changes: [
    "The page-settle check watches the whole page. A live dashboard may never become quiet, so the agent waits the full 1,200 milliseconds. I would watch only the part of the page involved in the action.",
    "The system estimates how much model memory it saves. That estimate helps tune the cleanup rules, but I would compare it with the provider's actual usage data before using it for product decisions.",
    "The final check catches navigation and dialogs, but it can miss a field that changes in place. I would compare the selected field's value before and after the action.",
  ],
};
