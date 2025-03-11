export async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works"); 
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des projets");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur API :", error);
        return [];
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories");
        return await response.json();

        
    } catch (error) {
        console.error("Erreur API :", error);
        return [];
    }
}
// Supprimer un projet
export async function deleteWork(workId) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression du projet");
        }
        return true; // Suppression réussie
    } catch (error) {
        console.error("Erreur API :", error);
        return false; // Suppression échouée
    }
}

// Ajouter un nouveau projet

export async function addWork(formData) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du projet");
        }
        return await response.json(); // Retourne le projet ajouté
    } catch (error) {
        console.error("Erreur API :", error);
        return null; // Ajout échoué
    }
}
