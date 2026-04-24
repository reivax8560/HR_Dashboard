import supabase from "../_lib/supabase";
import { mapFromDb, mapToDb } from "../_lib/mappers";

export default async function handler(req, res) {
  try {
    /////////////////////////////////////////////////////////// 📖 GET ALL
    if (req.method === "GET") {
      const { data, error } = await supabase.from("employees").select("*");

      if (error) throw error;

      const formatted = data.map(mapFromDb);

      return res.status(200).json(formatted);
    }

    /////////////////////////////////////////////////////////// ➕ CREATE
    if (req.method === "POST") {
      const payload = mapToDb(req.body);

      const { data, error } = await supabase
        .from("employees")
        .insert([payload])
        .select();

      if (error) throw error;

      return res.status(201).json(mapFromDb(data[0]));
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
