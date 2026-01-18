export const questions = [
  {
    id: 1,
    title: "The Problem",
    prompt:
      "What specific frustration does this solve? Describe the last time someone experienced this problem.",
    placeholder:
      "Example: Freelancers lose 3 hours/week chasing client feedback scattered across email, Slack, and voice notes. Last week, a designer missed a deadline because they couldn't find the client's approval buried in a thread.",
    badExample: "❌ People need better productivity",
    goodExample:
      "✓ Freelancers lose 3 hours/week chasing client feedback in email threads",
    minLength: 50,
  },
  {
    id: 2,
    title: "Your ICP (Who-Where Pair)",
    prompt:
      "Who has this problem MOST? Where do they currently hang out or complain about it?",
    placeholder:
      "Example: Solo graphic designers with 5+ active clients who use Instagram DMs for client communication and complain about it in design subreddits.",
    badExample: "❌ Busy professionals",
    goodExample: "✓ Solo designers with 5+ clients who use Instagram DMs",
    minLength: 50,
  },
  {
    id: 3,
    title: "Core Feature",
    prompt:
      "What's the ONE action your MVP must let them do? Describe the before/after moment.",
    placeholder:
      "Example: Turn scattered client feedback (emails, voice notes, screenshots) into one organized view with approval status. Before: searching 6 places. After: one dashboard.",
    badExample: "❌ Manage projects better",
    goodExample:
      "✓ Turn client feedback voice notes into organized tasks with one click",
    minLength: 50,
  },
  {
    id: 4,
    title: "Non-Features (What You Won't Build)",
    prompt:
      "List 5 things you WON'T build in v1. What's tempting but not essential?",
    placeholder:
      "Example:\n1. Analytics dashboard\n2. Team collaboration features\n3. Integrations with other tools\n4. Mobile app\n5. Custom branding options",
    badExample: "❌ We'll add everything later",
    goodExample:
      "✓ No analytics, no team features, no integrations, no mobile app, no custom branding",
    minLength: 30,
  },
  {
    id: 5,
    title: "7-Day Build Scope",
    prompt:
      "Break your core feature into 3 buildable pieces you can finish in 7 days. What's Day 1, Day 3, Day 7?",
    placeholder:
      "Example:\nDay 1: Upload voice note or text\nDay 3: Parse and display as text\nDay 7: Show organized list with status tags",
    badExample: "❌ Build the full platform",
    goodExample: "✓ Day 1: Upload. Day 3: Parse. Day 7: Display organized.",
    minLength: 50,
  },
];
