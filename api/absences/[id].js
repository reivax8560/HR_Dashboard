import supabase from "../_lib/_supabase.js";
import {
  formatAbsenceForFrontend,
  formatAbsenceForDb,
} from "../_lib/mappers.js";
import {
  getAbsenceErrorStatus,
  validateAbsencePayload,
} from "../_lib/absenceValidation.js";
import classifySupabaseError from "../_lib/classifySupabaseError.js";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    /////////////////////////////////////////////////////////// 📖 GET ONE
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("absences")
        .select("*")
        .eq("id", id)
        .eq("deleted", false)
        .maybeSingle();

      if (error) {
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans getAbsenceApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!data) {
        const notFound = new Error("Absence introuvable.");
        notFound.statusCode = 404;
        throw notFound;
      }

      return res.status(200).json(formatAbsenceForFrontend(data));
    }

    /////////////////////////////////////////////////////////// ✏️ UPDATE
    if (req.method === "PUT") {
      const absence = validateAbsencePayload(req.body);

      const { data: overlaps, error: overlapError } = await supabase
        .from("absences")
        .select("id")
        .eq("employee_id", absence.employeeId)
        .eq("deleted", false)
        .neq("id", id)
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

      const payload = formatAbsenceForDb({ ...absence, id });

      const { data, error } = await supabase
        .from("absences")
        .update(payload)
        .eq("id", id)
        .eq("deleted", false)
        .select();

      if (error) {
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans updateAbsenceApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!data || data.length === 0) {
        const notFound = new Error("Absence introuvable.");
        notFound.statusCode = 404;
        throw notFound;
      }

      return res.status(200).json(formatAbsenceForFrontend(data[0]));
    }

    /////////////////////////////////////////////////////////// ❌ DELETE
    if (req.method === "DELETE") {
      const { data, error } = await supabase
        .from("absences")
        .update({ deleted: true })
        .eq("id", id)
        .eq("deleted", false)
        .select();

      if (error) {
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans deleteAbsenceApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!data || data.length === 0) {
        const notFound = new Error("Absence introuvable ou déjà supprimée.");
        notFound.statusCode = 404;
        throw notFound;
      }

      return res.status(200).json(formatAbsenceForFrontend(data[0]));
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
