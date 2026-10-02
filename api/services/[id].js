import supabase from "../_lib/_supabase.js";
import classifySupabaseError from "../_lib/classifySupabaseError.js";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    /////////////////////////////////////////////////////////// 📖 GET ONE
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .eq("deleted", false)
        .maybeSingle();

      if (error) {
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans getServiceApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        const notFound = new Error("Service introuvable.");
        notFound.statusCode = 404;
        throw notFound;
      }

      return res.status(200).json({
        ...data,
        deleted: data.deleted ?? false,
      });
    }

    // if (req.method === "PUT") {
    //   const { data, error } = await supabase
    //     .from("services")
    //     .update(req.body)
    //     .eq("id", id)
    //     .eq("deleted", false)
    //     .select();

    //   if (error) {
    //     const classifiedError = classifySupabaseError(error);
    //     console.error("Erreur Supabase dans updateServiceApi:", {
    //       originalError: error,
    //       classified: classifiedError,
    //     });
    //     error.statusCode = classifiedError.statusCode;
    //     error.userMessage = classifiedError.message;
    //     throw error;
    //   }

    //   if (!data || data.length === 0) {
    //     const notFound = new Error("Service introuvable.");
    //     notFound.statusCode = 404;
    //     throw notFound;
    //   }

    //   return res.status(200).json({
    //     ...data[0],
    //     deleted: data[0].deleted ?? false,
    //   });
    // }

    /////////////////////////////////////////////////////////// ❌ DELETE
    if (req.method === "DELETE") {
      const { data, error } = await supabase
        .from("services")
        .update({ deleted: true })
        .eq("id", id)
        .eq("deleted", false)
        .select();

      if (error) {
        const classifiedError = classifySupabaseError(error);
        console.error("Erreur Supabase dans deleteServiceApi:", {
          originalError: error,
          classified: classifiedError,
        });
        error.statusCode = classifiedError.statusCode;
        error.userMessage = classifiedError.message;
        throw error;
      }

      if (!data || data.length === 0) {
        const notFound = new Error("Service introuvable ou déjà supprimé.");
        notFound.statusCode = 404;
        throw notFound;
      }

      return res.status(200).json(data[0]);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
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
