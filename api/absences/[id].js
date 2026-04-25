import supabase from "../_lib/_supabase.js";
import {
  formatAbsenceForFrontend,
  formatAbsenceForDb,
} from "../_lib/mappers.js";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    /////////////////////////////////////////////////////////// 📖 GET ONE
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("absences")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return res.status(200).json(formatAbsenceForFrontend(data));
    }

    /////////////////////////////////////////////////////////// ✏️ UPDATE
    if (req.method === "PUT") {
      const payload = formatAbsenceForDb(req.body);

      const { data, error } = await supabase
        .from("absences")
        .update(payload)
        .eq("id", id)
        .select();

      if (error) throw error;

      return res.status(200).json(formatAbsenceForFrontend(data[0]));
    }

    /////////////////////////////////////////////////////////// ❌ DELETE
    if (req.method === "DELETE") {
      const { data, error } = await supabase
        .from("absences")
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
