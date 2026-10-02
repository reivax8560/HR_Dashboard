import supabase from "../_lib/_supabase.js";
import {
  formatAbsenceForDb,
  formatAbsenceForFrontend,
} from "../_lib/mappers.js";
import {
  getAbsenceErrorStatus,
  validateAbsencePayload,
} from "../_lib/absenceValidation.js";
import classifySupabaseError from "../_lib/classifySupabaseError.js";

export default async function handler(req, res) {
  try {
    /////////////////////////////////////////////////////////// 📖 GET ALL
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("absences")
        .select("*")
        .eq("deleted", false);

      if (error) {
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans getAbsencesApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!Array.isArray(data)) {
        throw new Error("Données invalides reçues de la base de données.");
      }

      const formatted = data.map(formatAbsenceForFrontend);

      return res.status(200).json(formatted);
    }

    /////////////////////////////////////////////////////////// ➕ CREATE
    if (req.method === "POST") {
      const absence = validateAbsencePayload(req.body);

      const { data: overlaps, error: overlapError } = await supabase
        .from("absences")
        .select("id")
        .eq("employee_id", absence.employeeId)
        .eq("deleted", false)
        .lte("start_date", absence.endDate)
        .gte("end_date", absence.startDate);

      if (overlapError) {
        const classifiedError = classifySupabaseError(overlapError);
        overlapError.statusCode = classifiedError.statusCode;
        overlapError.userMessage = classifiedError.message;
        throw overlapError;
      }

      if (overlaps?.length > 0) {
        const conflict = new Error(
          "Cette absence chevauche une absence existante.",
        );
        conflict.statusCode = 409;
        throw conflict;
      }

      const payload = {
        ...formatAbsenceForDb(absence),
        deleted: false,
      };

      const { data, error } = await supabase
        .from("absences")
        .insert([payload])
        .select();

      if (error) {
        const classifiedError = classifySupabaseError(error, "create");
        console.error("Erreur Supabase dans createAbsenceApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error("Aucune donnée retournée après la création.");
      }

      return res.status(201).json(formatAbsenceForFrontend(data[0]));
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Erreur dans l'API absences:", error);
    const status = getAbsenceErrorStatus(error);
    const message =
      error.userMessage ||
      (status < 500
        ? error.message
        : "Une erreur inattendue s'est produite. Réessayez plus tard.");

    return res.status(status).json({ error: message });
  }
}
