import type { CaseStudy } from "../types";

export const debtTracker: CaseStudy = {
  slug: "debt-tracker",
  index: 4,
  title: "Keeping group debts consistent",
  hook: "I built a backend that records every person's share of a group bill together, so no one sees an incomplete or incorrect balance.",
  summary:
    "I built the backend for a shared-expense app, including 44 endpoints across 12 modules. It records every person's share of a group bill together, so a failed update cannot leave the group with incorrect balances.",

  role: "I built the backend end to end",
  period: "2025",
  status: "Public repository",
  repoUrl: "https://github.com/AbdurrahmanSogbesan/debt-tracker-api",
  stack: [
    "NestJS",
    "Prisma",
    "PostgreSQL (Neon)",
    "Passport + Supabase JWT",
    "Expo Push",
    "Postmark",
    "Handlebars",
    "Render",
  ],
  cardMetric: "106 commits · 44 endpoints · public source",

  context: [
    "Debt Tracker helps groups manage shared expenses. When one person pays a bill, the app records what each member owes and keeps everyone updated.",
    "I built the backend from start to finish, including the data model, API, sign-in, notifications, and deployment. The repository is public, so anyone can review the implementation behind these claims.",
    "The finished backend contains 12 modules, 44 endpoints, eight data models, and about 5,100 lines of code.",
  ],

  constraints: [
    {
      title: "A group split must finish completely",
      body: "If the backend records four of five shares, the totals look believable but remain wrong. It must save every member's share together or save none of them.",
    },
    {
      title: "Each person reads notifications independently",
      body: "One update can go to many group members, but each person opens it at a different time. The backend needs to track who has read the message without storing several copies of the same text.",
    },
    {
      title: "People choose how they receive updates",
      body: "Each user can turn push and email on or off for 12 kinds of events. The feature that creates an update should not need separate logic for every delivery choice.",
    },
    {
      title: "The database has practical connection limits",
      body: "The hosted database limits long transactions and repeated queries. The app host can also pause during quiet periods, so the backend must handle slow starts without leaving partial financial records.",
    },
  ],

  diagram: "debt-splits",
  diagramCaption:
    "The backend stores the group total and every member's share as related debts. It creates all of them in one database transaction, so the group never sees a partial split.",

  hardPart: {
    title: "Keeping every split all or nothing",
    paragraphs: [
      "I first considered separate records for the group total and each person's share. That would duplicate the same repayment, overdue, transaction, and notification rules in two places.",
      "Instead, I used one loan model for both. One record holds the group total, and related records hold each member's share. This keeps all debt behavior in one place.",
      "I create the total and every share in one database transaction. If the fifth share fails, the database removes the first four as well. Users either see the complete split or no split at all.",
      "I send notifications only after the database confirms the split. The database can undo a failed save, but it cannot pull back a push notification that already reached someone's phone.",
      "**Sending one update to many people.** I store the message once, then link each recipient to it with their own read status. This supports 12 event types through push and email without copying the full message for every person.",
    ],
    callouts: [
      {
        title: "Save the whole group split or save nothing",
        before:
          "A failure halfway through could leave some members with a debt and others with no record.",
        after:
          "The backend saves the group total and every member's share as one all-or-nothing operation.",
        impact:
          "Everyone sees a complete, trustworthy balance even when part of the save fails.",
        metric: "0 partial splits",
        afterParagraph: 2,
      },
      {
        title: "Send one update without copying it",
        before:
          "Storing a separate message for every group member would duplicate data and make updates harder.",
        after:
          "The backend stores the message once and tracks read status separately for each recipient.",
        impact:
          "Each person can manage their own notifications while the system keeps one source of truth.",
        metric: "12 event types · 2 channels",
        afterParagraph: 4,
      },
    ],
  },

  decisions: [
    {
      chose: "Use one debt model for totals and member shares",
      over: "Maintain separate group-debt and member-share models",
      because:
        "Each member's share behaves like any other debt. One model keeps repayments, overdue status, transactions, and notifications consistent.",
    },
    {
      chose: "Send notifications after saving the full split",
      over: "Send notifications while the database is still working",
      because:
        "The database can undo a failed split, but it cannot retract a message from someone's phone. Waiting prevents false alerts.",
    },
    {
      chose: "Store one message with a read status for each recipient",
      over: "Copy the full message for every person",
      because:
        "Group members read the same update at different times. This approach tracks each person without duplicating the message.",
    },
    {
      chose: "Keep deleted debts in the history",
      over: "Permanently erase them",
      because:
        "A debt records an agreement between people. One person should not be able to erase history that another person may need during a dispute.",
    },
  ],

  outcomes: [
    {
      value: "44",
      label: "API endpoints across 12 modules",
      basis: "counted across the public API controllers",
    },
    {
      value: "12",
      label: "notification types delivered through push and email",
      basis: "counted from the public notification definitions",
    },
    {
      value: "106",
      label: "commits I authored, the majority of the repository",
      basis: "git shortlog -sne across all author identities",
    },
    {
      value: "8",
      label: "data models in 231 lines of schema",
      basis: "counted from the public database schema",
    },
  ],

  changes: [
    "After saving a split, the notification step searches for each member's debt again. That adds extra database work and can pick the wrong debt when two records look similar. I would return the newly created shares directly from the transaction.",
    "A five-person split currently makes five separate database requests for first names. I would fetch all member names in one request before writing the notifications.",
    "The split flow does not have an automated test. I would force one member's save to fail and confirm that the database leaves no part of the group debt behind.",
  ],
};
