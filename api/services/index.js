import supabase from "../_lib/_supabase.js";
import classifySupabaseError from "../_lib/classifySupabaseError.js";

export default async function handler(req, res) {
  try {
    /////////////////////////////////////////////////////////// 📖 GET ALL
    if (req.method === "GET") {
      const idsOnly = req.query.idsOnly === "true";
      let query = supabase.from("services").select(idsOnly ? "id" : "*");

      if (!idsOnly) {
        query = query.eq("deleted", false);
      }

      const { data, error } = await query;

      if (error) {
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans getServicesApi:", {
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

      if (idsOnly) {
        return res.status(200).json(data.map((service) => service.id));
      }

      return res.status(200).json(
        data.map((service) => ({
          ...service,
          deleted: service.deleted ?? false,
        })),
      );
    }

    /////////////////////////////////////////////////////////// ➕ CREATE
    if (req.method === "POST") {
      const payload = {
        ...req.body,
        deleted: false,
      };

      const { data, error } = await supabase
        .from("services")
        .insert([payload])
        .select();

      if (error) {
        const classifiedError = classifySupabaseError(error, "create");
        console.error("Erreur Supabase dans createServiceApi:", {
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

      return res.status(201).json({
        ...data[0],
        deleted: data[0].deleted ?? false,
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    //////////////////////////////////////////////////////////////// ERROR
    console.error("Erreur dans l'API services:", error);
    const status = error.statusCode || 500;
    const message =
      error.userMessage ||
      (status < 500
        ? error.message
        : "Une erreur inattendue s'est produite. Réessayez plus tard.");

    return res.status(status).json({ error: message });
  }
}
