export default function classifySupabaseError(error, operation = "generic") {
  if (!error) return null;

  const errorMessage = typeof error.message === "string" ? error.message : "";

  // Erreurs réseau ou de connexion
  if (
    errorMessage.includes("Failed to fetch") ||
    errorMessage.includes("NetworkError")
  ) {
    return {
      type: "network",
      statusCode: 503,
      message: "Erreur de connexion réseau. Vérifiez votre connexion internet.",
    };
  }

  // Erreurs de permissions ou d'authentification
  if (error.code === "42501" || errorMessage.includes("permission")) {
    return {
      type: "permission",
      statusCode: 403,
      message: "Accès refusé. Vérifiez vos permissions.",
    };
  }

  // Résultat non compatible avec une réponse objet unique
  if (error.code === "PGRST116") {
    return {
      type: "conflict",
      statusCode: 409,
      message: "La base de données contient plusieurs employés correspondants.",
    };
  }

  // Erreurs de contrainte d'unicité (ex. : email déjà existant)
  // Code PostgreSQL 23505 = unique constraint violation
  if (error.code === "23505") {
    if (operation === "create") {
      if (error.message.includes("email")) {
        return {
          type: "constraint",
          statusCode: 409,
          message: "Cet email existe déjà. Utilisez un email unique.",
        };
      }
      return {
        type: "constraint",
        statusCode: 409,
        message: "Cette donnée existe déjà dans la base de données.",
      };
    }
  }

  // Erreurs de clé étrangère (ex. : service inexistant)
  // Code PostgreSQL 23503 = foreign key constraint violation
  if (error.code === "23503") {
    return {
      type: "constraint",
      statusCode: 400,
      message:
        "Référence invalide (ex. : service inexistant). Vérifiez les données.",
    };
  }

  // Erreurs de données (ex. : table inexistante, colonnes manquantes)
  if (
    error.code === "42P01" ||
    errorMessage.includes("relation") ||
    errorMessage.includes("column")
  ) {
    return {
      type: "data",
      statusCode: 500,
      message: "Erreur de données dans la base. Contactez l'administrateur.",
    };
  }

  // Erreurs de validité des données (ex. : type incorrect)
  // Code PostgreSQL 22P02 = invalid text representation
  if (error.code === "22P02") {
    return {
      type: "validation",
      statusCode: 400,
      message:
        "Format de données invalide. Vérifiez les types (ex. : date, email).",
    };
  }

  // Autres erreurs (génériques)
  return {
    type: "unknown",
    statusCode: 500,
    message: "Une erreur inattendue s'est produite. Réessayez plus tard.",
  };
}
