import supabase from "../_lib/supabase";
import { formatAbsenceForDb, formatAbsenceForFrontend } from "../_lib/mappers";

export default async function handler(req, res) {
  try {
    /////////////////////////////////////////////////////////// 📖 GET ALL
    if (req.method === "GET") {
      const { data, error } = await supabase.from("absences").select("*");

      if (error) throw error;

      const formatted = data.map(formatAbsenceForFrontend);

      return res.status(200).json(formatted);
    }

    /////////////////////////////////////////////////////////// ➕ CREATE
    if (req.method === "POST") {
      const payload = formatAbsenceForDb(req.body);

      const { data, error } = await supabase
        .from("absences")
        .insert([payload])
        .select();

      if (error) throw error;

      return res.status(201).json(formatAbsenceForFrontend(data[0]));
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
