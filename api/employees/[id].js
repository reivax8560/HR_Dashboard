import supabase from "../_lib/_supabase.js";
import {
  formatEmployeeForFrontend,
  formatEmployeeForDb,
} from "../_lib/mappers.js";
import {
  getEmployeeErrorStatus,
  validateEmployeePayload,
} from "../_lib/employeeValidation.js";
import classifySupabaseError from "../_lib/classifySupabaseError.js";

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    /////////////////////////////////////////////////////////// 📖 GET ONE
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id)
        .eq("deleted", false)
        .maybeSingle();

      if (error) {
        // Classifier et logger l'erreur
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans fetchEmployeesApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      // Vérifier si les données sont valides
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        const invalidData = new Error(
          "Données invalides reçues de la base de données.",
        );
        invalidData.statusCode = 500;
        throw invalidData;
      }

      return res.status(200).json(formatEmployeeForFrontend(data));
    }

    /////////////////////////////////////////////////////////// ✏️ UPDATE
    if (req.method === "PUT") {
      const payload = formatEmployeeForDb(validateEmployeePayload(req.body));

      const { data, error } = await supabase
        .from("employees")
        .update(payload)
        .eq("id", id)
        .eq("deleted", false)
        .select();

      if (error) {
        // Classifier et logger l'erreur
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans fetchEmployeesApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!data || data.length === 0) {
        const notFound = new Error("Employé introuvable.");
        notFound.statusCode = 404;
        throw notFound;
      }

      return res.status(200).json(formatEmployeeForFrontend(data[0]));
    }

    /////////////////////////////////////////////////////////// ❌ DELETE
    if (req.method === "DELETE") {
      const { data, error } = await supabase
        .from("employees")
        .update({ deleted: true })
        .eq("id", id)
        .eq("deleted", false)
        .select();

      if (error) {
        // Classifier et logger l'erreur
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans fetchEmployeesApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!data || data.length === 0) {
        const notFound = new Error("Employee not found or already deleted");
        notFound.statusCode = 404;
        throw notFound;
      }

      return res.status(200).json(formatEmployeeForFrontend(data[0]));
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    /////////////////////////////////////////////////////////////// ERROR
    console.error("Erreur :", error);
    const status = getEmployeeErrorStatus(error);
    const message =
      error.userMessage ||
      (status < 500
        ? error.message
        : "Une erreur inattendue s'est produite. Réessayez plus tard.");

    return res.status(status).json({ error: message });
  }
}
