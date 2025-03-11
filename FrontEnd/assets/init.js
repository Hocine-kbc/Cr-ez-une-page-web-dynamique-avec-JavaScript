import { displayProjects } from "./gallery.js";
import { displayFilters } from "./filters.js";
import { setupModal } from "./modal.js"; // Import correct de setupModal

document.addEventListener("DOMContentLoaded", () => {
    console.log("Page chargée :", window.location.pathname);

    // Vérifier si la galerie existe
    if (document.querySelector(".gallery")) {
        console.log("Affichage des projets...");
        displayProjects();
    }

    // Vérifier si le conteneur de filtres existe
    if (document.querySelector(".filters")) {
        console.log("Affichage des filtres...");
        displayFilters();
    }

    // Vérifier si la modale d'édition existe avant d'initialiser
    if (document.getElementById("edit-modal")) {
        console.log("Initialisation de la modale...");
        setupModal();
    }
});
