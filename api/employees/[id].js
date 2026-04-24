import supabase from "../_lib/supabase";
import { mapFromDb, mapToDb } from "../_lib/mappers";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    /////////////////////////////////////////////////////////// 📖 GET ONE
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return res.status(200).json(mapFromDb(data));
    }

    /////////////////////////////////////////////////////////// ✏️ UPDATE
    if (req.method === "PUT") {
      const payload = mapToDb(req.body);

      const { data, error } = await supabase
        .from("employees")
        .update(payload)
        .eq("id", id)
        .select();

      if (error) throw error;

      return res.status(200).json(mapFromDb(data[0]));
    }

    /////////////////////////////////////////////////////////// ❌ DELETE
    if (req.method === "DELETE") {
      const { data, error } = await supabase
        .from("employees")
        .delete()
        .eq("id", id)
        .select();

      if (error) throw error;

      return res.status(200).json(data[0].id);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
