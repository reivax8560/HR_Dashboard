import supabase from "../_supabase.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    console.log("Connecting to Supabase...");
    const { data, error } = await supabase.from("services").select("*");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("Data fetched:", data);
    res.status(200).json(data);
  } catch (err) {
    console.error("Function error:", err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
}
