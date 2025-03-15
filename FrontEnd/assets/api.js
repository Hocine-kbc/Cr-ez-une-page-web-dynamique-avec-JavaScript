// fonction pour recuperer tout les projets depuis l'API

export async function fetchWorks() {
    try {
        // Envoi d'une requête GET à l'API pour obtenir les projets
        const response = await fetch("http://localhost:5678/api/works"); 
         // Vérifier si la réponse est valide (statut HTTP entre 200 et 299)
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des projets");
        }
          // Conversion de la réponse en JSON et retour des données
        return await response.json();
    } catch (error) {
        // En cas d'erreur, afficher un message dans la console et retourner un tableau vide
        console.error("Erreur API :", error);
        return [];
    }
}

// Fonction pour récupérer toutes les catégories depuis l'API
export async function fetchCategories() {
    try {
        // Envoi d'une requête GET à l'API pour obtenir les catégories
        const response = await fetch("http://localhost:5678/api/categories");

        // Vérifier si la réponse est valide
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories");

        // Retourner les catégories en format JSON
        return await response.json();

        
    } catch (error) {
         // En cas d'erreur, afficher un message dans la console et retourner un tableau vide
        console.error("Erreur API :", error);
        return [];
    }
}

// Fonction pour supprimer un projet en fonction de son ID
export async function deleteWork(workId) {
    try {
         // Récupérer le token d'authentification depuis le localStorage
        const token = localStorage.getItem("token"); // Ajouter le token dans l'en-tête pour l'authentification

         // Envoi d'une requête DELETE à l'API avec l'ID du projet à supprimer
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE", // Spécifier la méthode DELETE
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        
        // Vérifier si la suppression a réussi
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression du projet");
        }
        return true; // Suppression réussie
    } catch (error) {
        console.error("Erreur API :", error);
        return false; // Suppression échouée
    }
}

