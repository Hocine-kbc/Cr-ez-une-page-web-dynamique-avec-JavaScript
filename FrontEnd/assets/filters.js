import { fetchCategories } from "./api.js";
import { displayProjects } from "./gallery.js";

async function displayFilters() {
    const filtersContainer = document.querySelector(".filters");

    // Vérifier si le conteneur de filtres existe
    if (!filtersContainer) {
        console.warn("Le conteneur de filtres n'existe pas dans cette page.");
        return;
    }

    filtersContainer.innerHTML = ""; // Nettoyer les filtres

    const categories = await fetchCategories();
    
    // Ajouter un filtre "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.dataset.id = "all";
    allButton.classList.add("active"); // Par défaut actif
    filtersContainer.appendChild(allButton);

    // Ajouter les autres catégories
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.dataset.id = category.id;
        filtersContainer.appendChild(button);
    });

    // Gestion du clic sur les filtres
    filtersContainer.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
           // Ajouter la classe "active" au bouton cliqué
            e.target.classList.add("active");
            displayProjects(e.target.dataset.id); // Filtrer la galerie
        }

    });
}

export { displayFilters };