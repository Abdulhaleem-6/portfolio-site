import type { CaseStudy } from "../types";

export const vascan: CaseStudy = {
  slug: "vascan",
  index: 3,
  title: "Keeping marketplace payments accurate under load",
  hook: "I helped Vascan pay several galleries from one checkout while protecting the system from duplicate payment messages and traffic spikes.",
  summary:
    "As one of two main backend contributors, I helped Vascan split one customer payment across several galleries. I also reduced a traffic spike from 500 repeated database queries to one query per app instance.",

  role: "Backend co-owner · one of two main contributors",
  period: "Apr 2022 – present",
  status: "In production at vascan.io · source private",
  stack: [
    "Node.js",
    "Express",
    "TypeScript",
    "MongoDB",
    "Redis",
    "Bull",
    "Paystack",
    "Pulumi",
    "Docker",
    "Sentry",
    "Jest + Dockest",
  ],
  cardMetric: "541 commits · 34k LOC · 443 files",

  context: [
    "Vascan sells original art from independent galleries. A customer can buy from several galleries in one cart, but each gallery needs the correct payment in its own bank account.",
    "The customer makes one card payment, and Vascan divides it among the galleries after deducting the right fees. Payment messages can arrive more than once, so the backend must never record or pay the same transaction twice.",
    "I have helped build and maintain this backend since April 2022. I authored 541 commits across a production codebase with 443 TypeScript files and roughly 34,000 lines.",
  ],

  constraints: [
    {
      title: "Payment messages can arrive more than once",
      body: "Paystack retries a message when it does not receive a quick response, and a network timeout can hide a successful attempt. We must process all ten event types without creating a duplicate payment or update.",
    },
    {
      title: "One checkout can pay several galleries",
      body: "The backend must group every item by gallery, add shipping, deduct the correct platform fee, and send the exact amount to each account. A calculation mistake can pay the wrong gallery.",
    },
    {
      title: "Popular listings create expensive traffic spikes",
      body: "An artwork listing combines product, gallery, category, and shipping data. When saved data expired, roughly 500 requests could ask the database for the same information at once.",
    },
    {
      title: "Every app instance needs current data",
      body: "Vascan runs more than one copy of the app. When one copy updates saved data, the others must remove their older local copies before serving them to customers.",
    },
  ],

  diagram: "vascan-settlement",
  diagramCaption:
    "At checkout, Vascan groups items by gallery, deducts the correct platform fee, and sends one payment request that pays every gallery its share.",

  hardPart: {
    title: "Turning 500 repeated requests into one",
    paragraphs: [
      "We saved the results of expensive listing queries, but a busy listing still caused an outage when that saved data expired. Every request tried to rebuild the same result at once. I wanted to stop the duplicate work without adding a new locking system to every request.",
      "I made requests for the same missing data share the first request's work. If 500 requests arrive together, one request queries the database while the other 499 wait for its answer. Each running copy of the app performs at most one query for that item.",
      "The app checks its fastest local storage first, then shared storage, and finally the database. When one app copy changes saved data, it tells every other copy to update or remove its local version.",
      "For results larger than 512 KB, the update message sends only a reference instead of the full data. Other app copies retrieve the result only when they need it, which avoids broadcasting a large payload across the system.",
      "**Paying each gallery correctly.** I group the order items by gallery, add shipping, calculate the platform fee, and combine multiple works from the same gallery into one payment line. I also reuse account details within the checkout instead of looking them up for every item.",
      "Paystack splits the customer's payment and sends each gallery its share directly. Vascan deducts its fee during the payment and does not hold gallery funds for a later payout.",
    ],
    callouts: [
      {
        title: "Share the work during a traffic spike",
        before:
          "Five hundred requests for the same expired listing could trigger five hundred identical database queries.",
        after:
          "The first request refreshes the listing while the others wait for and reuse its result.",
        impact:
          "A popular listing no longer overwhelms the database when saved data expires.",
        metric: "500 requests · 1 query per app",
        afterParagraph: 1,
      },
      {
        title: "Keep every running app up to date",
        before:
          "One app copy could update saved data while another continued showing an older local version.",
        after:
          "Each update tells the other app copies to refresh or remove their local data.",
        impact:
          "Customers see current listings without adding a network request to every page view.",
        afterParagraph: 3,
      },
      {
        title: "Pay each gallery from one checkout",
        before:
          "A cart with several galleries required careful manual grouping and created a risk of incorrect payouts.",
        after:
          "The checkout groups items by gallery, deducts the right fee, and pays every gallery directly.",
        impact:
          "Sellers receive the correct share while Vascan avoids holding their funds for a later payout.",
        metric: "1 charge · several galleries",
        afterParagraph: 5,
      },
    ],
  },

  decisions: [
    {
      chose: "Share one database request per app instance",
      over: "Add a distributed lock for every cache miss",
      because:
        "A distributed lock would add network calls and more failure cases. Sharing the first request reduced 500 identical queries to at most one query from each running app instance.",
    },
    {
      chose: "Notify every app copy when saved data changes",
      over: "Read from shared storage on every request",
      because:
        "Local data makes popular listings faster. A small update message keeps that speed while stopping other app copies from serving old information.",
    },
    {
      chose: "Split the payment through Paystack",
      over: "Collect gallery funds and pay them out later",
      because:
        "Direct splits pay each gallery immediately and keep Vascan from taking custody of money that belongs to its sellers.",
    },
    {
      chose: "Acknowledge payment messages, then process them in a queue",
      over: "Finish all the work before replying to Paystack",
      because:
        "A quick reply reduces unnecessary retries. The queue then controls the work and safely tries again when processing fails.",
    },
  ],

  outcomes: [
    {
      value: "541",
      label: "commits I authored since April 2022",
      basis: "git shortlog -sne, summed across three author identities",
    },
    {
      value: "443 files / ~34k",
      label: "TypeScript files and lines in the backend",
      basis: "counted across the backend source files, excluding build output",
    },
    {
      value: "10",
      label: "Paystack event types protected from duplicate processing",
      basis: "counted from the supported Paystack payment events",
    },
    {
      value: "6",
      label: "work queues for orders, subscriptions, reminders, and other jobs",
      basis: "counted from the production background-job setup",
    },
  ],

  changes: [
    "The current cleanup rebuilds the full list of active requests after each one finishes. I would delete only the completed entry, which does less work and makes the intent clearer.",
    "The system shares work inside each app instance, so several instances can still send one query each. If traffic grows, I would add a short-lived shared lock once per instance and item.",
    "A database rule currently stops duplicate settlements by payment reference. I would also create a clear processing record for every payment message so the protection is easier to inspect and maintain.",
  ],
};
