import supabase from "../_lib/_supabase.js";
import {
  formatEmployeeForFrontend,
  formatEmployeeForDb,
} from "../_lib/mappers.js";

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

      return res.status(200).json(formatEmployeeForFrontend(data));
    }

    /////////////////////////////////////////////////////////// ✏️ UPDATE
    if (req.method === "PUT") {
      const payload = formatEmployeeForDb(req.body);

      const { data, error } = await supabase
        .from("employees")
        .update(payload)
        .eq("id", id)
        .select();

      if (error) throw error;

      return res.status(200).json(formatEmployeeForFrontend(data[0]));
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
