import supabase from "../_lib/_supabase.js";

export default async function handler(req, res) {
  try {
    /////////////////////////////////////////////////////////// 📖 GET ALL
    if (req.method === "GET") {
      const { data, error } = await supabase.from("services").select("*");

      if (error) throw error;

      return res.status(200).json(data);
    }

    /////////////////////////////////////////////////////////// ➕ CREATE
    if (req.method === "POST") {
      const { data, error } = await supabase
        .from("services")
        .insert([req.body])
        .select();

      if (error) throw error;

      return res.status(201).json(data[0]);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
