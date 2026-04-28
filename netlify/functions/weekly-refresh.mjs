import { getStore } from "@netlify/blobs";

export const config = {
  schedule: "0 7 * * 1",
};

export default async function handler() {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    console.error("Missing ANTHROPIC_API_KEY");
    return;
  }

  const prompt = `You are a competitive intelligence analyst for TAP (ThinkSmart Automation Platform), a workflow automation tool that serves mid-market and enterprise organizations across HR, legal, procurement, and finance. Produce a weekly JSON competitive brief on Checkbox, ServiceNow, and Tonkean.

Return ONLY valid JSON, no markdown fences, no commentary. Use this exact structure:

{
  "generatedAt": "<ISO 8601 timestamp for today>",
  "soWhat": "<ONE sentence. The single most urgent competitive development TAP sales reps need to act on THIS week. Be specific and direct — name the competitor, name the threat, name the response.>",
  "alerts": [
    {
      "severity": "critical",
      "headline": "<10 words max>",
      "impact": "<One sentence: what does this mean for TAP deals specifically?>",
      "detail": "<2–3 sentences of evidence and context. Cite sources where possible.>",
      "action": "<One sentence: what should TAP reps do THIS week?>"
    }
  ],
  "winLoss": [
    {
      "outcome": "win",
      "competitor": "checkbox",
      "context": "<Deal context: segment, approximate size, use case>",
      "reason": "<Why TAP won or lost — one sentence, specific>"
    }
  ],
  "competitors": [
    {
      "id": "checkbox",
      "name": "Checkbox",
      "tagline": "<short descriptor>",
      "threat": "medium",
      "threatDelta": "up",
      "pillars": ["k1", "k2", "k3"],
      "strengths": [
        {"title": "4-6 word title", "detail": "2-3 sentences with specific evidence.", "source": "source name and URL or publication"},
        {"title": "t", "detail": "d", "source": "s"},
        {"title": "t", "detail": "d", "source": "s"},
        {"title": "t", "detail": "d", "source": "s"}
      ],
      "weaknesses": [
        {"title": "4-6 word title", "detail": "2-3 sentences on business impact.", "source": "s"},
        {"title": "t", "detail": "d", "source": "s"},
        {"title": "t", "detail": "d", "source": "s"}
      ],
      "silverBullet": "<The single most devastating question or proof point a TAP rep can use in a live competitive situation. Make it quotable and specific — something a rep can say verbatim.>",
      "landmineQuestions": [
        "<Question TAP reps ask the PROSPECT that exposes this competitor's weakness — not a question the competitor asks>",
        "<Question 2>",
        "<Question 3>"
      ],
      "counterNarratives": [
        {
          "claim": "<Exact objection or claim the prospect will hear from this competitor — use their actual language>",
          "rebuttal": "<TAP's sharp, direct response in 1–2 sentences. Be specific, not generic.>"
        },
        {"claim": "c2", "rebuttal": "r2"},
        {"claim": "c3", "rebuttal": "r3"}
      ],
      "tapAngle": "2-3 sentences on what TAP does better in this matchup.",
      "watchSignal": "2-3 sentences on the most important development to monitor.",
      "roadmap": {
        "recentReleases": [
          {"title": "name", "tag": "shipped", "detail": "2-3 sentences.", "source": "s"},
          {"title": "name", "tag": "shipped", "detail": "2-3 sentences.", "source": "s"}
        ],
        "upcomingItems": [
          {"title": "name", "tag": "soon", "detail": "2-3 sentences.", "source": "s"},
          {"title": "name", "tag": "planned", "detail": "2-3 sentences.", "source": "s"},
          {"title": "name", "tag": "rumoured", "detail": "2-3 sentences.", "source": "s"}
        ],
        "aiFeatures": [
          {"title": "name", "tag": "ai", "detail": "2-3 sentences.", "source": "s"},
          {"title": "name", "tag": "ai", "detail": "2-3 sentences.", "source": "s"},
          {"title": "name", "tag": "ai", "detail": "2-3 sentences.", "source": "s"}
        ]
      },
      "scores": {"easeOfUse": 9, "aiCapability": 7, "breadth": 4, "enterpriseScale": 6, "timeToValue": 9, "priceCompetitiveness": 7}
    },
    {
      "id": "servicenow",
      "name": "ServiceNow",
      "tagline": "short descriptor",
      "threat": "high",
      "threatDelta": "stable",
      "pillars": ["k1", "k2", "k3"],
      "strengths": [{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"}],
      "weaknesses": [{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"}],
      "silverBullet": "quotable one-sentence killer question or proof point",
      "landmineQuestions": ["q1", "q2", "q3"],
      "counterNarratives": [{"claim":"c","rebuttal":"r"},{"claim":"c","rebuttal":"r"},{"claim":"c","rebuttal":"r"}],
      "tapAngle": "2-3 sentences.",
      "watchSignal": "2-3 sentences.",
      "roadmap": {
        "recentReleases": [{"title":"t","tag":"shipped","detail":"d","source":"s"},{"title":"t","tag":"shipped","detail":"d","source":"s"}],
        "upcomingItems": [{"title":"t","tag":"soon","detail":"d","source":"s"},{"title":"t","tag":"planned","detail":"d","source":"s"},{"title":"t","tag":"rumoured","detail":"d","source":"s"}],
        "aiFeatures": [{"title":"t","tag":"ai","detail":"d","source":"s"},{"title":"t","tag":"ai","detail":"d","source":"s"},{"title":"t","tag":"ai","detail":"d","source":"s"}]
      },
      "scores": {"easeOfUse": 5, "aiCapability": 9, "breadth": 10, "enterpriseScale": 10, "timeToValue": 2, "priceCompetitiveness": 2}
    },
    {
      "id": "tonkean",
      "name": "Tonkean",
      "tagline": "short descriptor",
      "threat": "low",
      "threatDelta": "stable",
      "pillars": ["k1", "k2", "k3"],
      "strengths": [{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"}],
      "weaknesses": [{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"},{"title":"t","detail":"d","source":"s"}],
      "silverBullet": "quotable one-sentence killer question or proof point",
      "landmineQuestions": ["q1", "q2", "q3"],
      "counterNarratives": [{"claim":"c","rebuttal":"r"},{"claim":"c","rebuttal":"r"},{"claim":"c","rebuttal":"r"}],
      "tapAngle": "2-3 sentences.",
      "watchSignal": "2-3 sentences.",
      "roadmap": {
        "recentReleases": [{"title":"t","tag":"shipped","detail":"d","source":"s"},{"title":"t","tag":"shipped","detail":"d","source":"s"}],
        "upcomingItems": [{"title":"t","tag":"soon","detail":"d","source":"s"},{"title":"t","tag":"planned","detail":"d","source":"s"},{"title":"t","tag":"rumoured","detail":"d","source":"s"}],
        "aiFeatures": [{"title":"t","tag":"ai","detail":"d","source":"s"},{"title":"t","tag":"ai","detail":"d","source":"s"},{"title":"t","tag":"ai","detail":"d","source":"s"}]
      },
      "scores": {"easeOfUse": 6, "aiCapability": 8, "breadth": 6, "enterpriseScale": 8, "timeToValue": 5, "priceCompetitiveness": 3}
    }
  ]
}

Rules:
- alerts: 1–4 items. Only include developments with direct bearing on TAP sales motion. Severity: "critical" = immediate threat to TAP differentiation, "warning" = emerging risk to watch, "info" = useful context.
- winLoss: 2–5 items. Synthesize from deal signals, analyst commentary, community intelligence, and market patterns. These are illustrative deal signals, not confirmed CRM data.
- threatDelta: "up" if competitor's position vs TAP has materially strengthened in the past 7 days, "down" if weakened, "stable" if unchanged.
- landmineQuestions: exactly 3 per competitor. Questions TAP reps ask the PROSPECT to expose the competitor's weakness — not leading questions, genuine discovery.
- counterNarratives: exactly 3 per competitor. Use the actual language prospects hear from competitors, then counter it with specific TAP proof points.
- silverBullet: one sentence only. Something a rep can say verbatim in a call. Specific > generic.
- scores: update if a meaningful capability change occurred; otherwise keep stable. Do NOT include tapScores — those are hardcoded in the application.
- soWhat: must name a specific competitor, a specific threat, and a specific TAP response action. Not vague.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 8000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(`Claude API ${response.status}: ${err?.error?.message}`);
    }

    const json = await response.json();
    const raw = json.content[0].text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(raw);

    if (!data.competitors || data.competitors.length !== 3) {
      throw new Error("Invalid response structure");
    }

    const store = getStore("tap-intel");
    await store.setJSON("latest", {
      ...data,
      generatedAt: new Date().toISOString(),
    });

    console.log("Intel refreshed at", new Date().toISOString());
  } catch (err) {
    console.error("Refresh failed:", err.message);
  }
}
