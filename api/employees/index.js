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
  try {
    /////////////////////////////////////////////////////////// 📖 GET ALL
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("deleted", false);

      if (error) {
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans fetchEmployeesApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!data || !Array.isArray(data)) {
        throw new Error("Données invalides reçues de la base de données.");
      }

      const formatted = data.map(formatEmployeeForFrontend);

      return res.status(200).json(formatted);
    }

    /////////////////////////////////////////////////////////// ➕ CREATE
    if (req.method === "POST") {
      const payload = {
        ...formatEmployeeForDb(validateEmployeePayload(req.body)),
        deleted: false,
      };

      const { data, error } = await supabase
        .from("employees")
        .insert([payload])
        .select();

      if (error) {
        const classifiedError = classifySupabaseError(error, "create");
        console.error("Erreur Supabase dans createEmployeeApi:", {
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

      return res.status(201).json(formatEmployeeForFrontend(data[0]));
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    //////////////////////////////////////////////////////////////// ERROR
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
