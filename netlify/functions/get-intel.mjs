import { getStore } from "@netlify/blobs";

export default async function handler(req, context) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const store = getStore("tap-intel");
    const data = await store.get("latest", { type: "json" });
    if (!data) {
      return new Response(
        JSON.stringify({ error: "No data yet" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const config = {
  path: "/api/intel",
};
