export default function classifySupabaseError(error, operation = "generic") {
  if (!error) return null;

  // Erreurs réseau ou de connexion
  if (
    error.message.includes("Failed to fetch") ||
    error.message.includes("NetworkError")
  ) {
    return {
      type: "network",
      message: "Erreur de connexion réseau. Vérifiez votre connexion internet.",
    };
  }

  // Erreurs de permissions ou d'authentification
  if (error.code === "PGRST116" || error.message.includes("permission")) {
    return {
      type: "permission",
      message: "Accès refusé. Vérifiez vos permissions.",
    };
  }

  // Erreurs de contrainte d'unicité (ex. : email déjà existant)
  // Code PostgreSQL 23505 = unique constraint violation
  if (error.code === "23505") {
    if (operation === "create") {
      if (error.message.includes("email")) {
        return {
          type: "constraint",
          message: "Cet email existe déjà. Utilisez un email unique.",
        };
      }
      return {
        type: "constraint",
        message: "Cette donnée existe déjà dans la base de données.",
      };
    }
  }

  // Erreurs de clé étrangère (ex. : service inexistant)
  // Code PostgreSQL 23503 = foreign key constraint violation
  if (error.code === "23503") {
    return {
      type: "constraint",
      message:
        "Référence invalide (ex. : service inexistant). Vérifiez les données.",
    };
  }

  // Erreurs de données (ex. : table inexistante, colonnes manquantes)
  if (
    error.code === "42P01" ||
    error.message.includes("relation") ||
    error.message.includes("column")
  ) {
    return {
      type: "data",
      message: "Erreur de données dans la base. Contactez l'administrateur.",
    };
  }

  // Erreurs de validité des données (ex. : type incorrect)
  // Code PostgreSQL 22P02 = invalid text representation
  if (error.code === "22P02") {
    return {
      type: "validation",
      message:
        "Format de données invalide. Vérifiez les types (ex. : date, email).",
    };
  }

  // Autres erreurs (génériques)
  return {
    type: "unknown",
    message: "Une erreur inattendue s'est produite. Réessayez plus tard.",
  };
}
