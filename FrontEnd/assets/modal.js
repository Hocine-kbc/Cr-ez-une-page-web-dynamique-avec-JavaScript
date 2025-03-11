import { fetchWorks, deleteWork, addWork, fetchCategories } from './api.js';
import { displayWorks } from './gallery.js';



// Gestion de la modale
export function setupModal() {
    const editButton = document.getElementById('edit-projects-button');
    console.log("Bouton 'Modifier' trouvé :", editButton); // Debug

    editButton?.addEventListener('click', () => {
        console.log("Bouton 'Modifier' cliqué"); // Debug
        document.getElementById('edit-modal').style.display = 'flex';
        displayModalGallery();
    });

    // Fermer la modale d'édition
    document.querySelector('.close-modal')?.addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'none';
    });

    // Fermer la modale en cliquant en dehors
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('edit-modal')) {
            document.getElementById('edit-modal').style.display = 'none';
        }
    });

    // Ouvrir la modale d'ajout
    document.getElementById('open-add-project-modal')?.addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'none';
        document.getElementById('add-project-modal').style.display = 'flex';
    });

    // Fermer la modale d'ajout
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('add-project-modal').style.display = 'none';
        });
    });

    // Gérer l'ajout d'un nouveau projet
    document.getElementById('add-project-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newWork = await addWork(formData);
        if (newWork) {
            displayModalGallery(); // Rafraîchir la modale
            displayWorks(await fetchWorks()); // Rafraîchir la galerie principale
            document.getElementById('add-project-modal').style.display = 'none';
            document.getElementById('edit-modal').style.display = 'flex';
        } else {
            alert('Erreur lors de l\'ajout du projet');
        }
    });
}
async function populateCategoryDropdown() {
    const categorySelect = document.getElementById("category");
    
    if (!categorySelect) {
        console.error("Le menu déroulant des catégories est introuvable !");
        return;
    }

    const categories = await fetchCategories();

    // Vérifier si des catégories sont bien récupérées
    if (categories.length === 0) {
        console.warn("Aucune catégorie récupérée !");
        return;
    }

    // Nettoyer le select avant d'ajouter les options
    categorySelect.innerHTML = `<option value="">Sélectionner une catégorie</option>`;

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });

    console.log("Catégories ajoutées au menu déroulant !");
}

// Appel de la fonction quand la modale s'ouvre
document.getElementById("open-add-project-modal")?.addEventListener("click", () => {
    populateCategoryDropdown();
});

// Afficher les projets dans la modale
async function displayModalGallery() {
    const works = await fetchWorks();
    const modalGallery = document.getElementById('modal-gallery');
    modalGallery.innerHTML = works.map(work => `
        <div class="work-item">
            <img src="${work.imageUrl}" alt="${work.title}">
            <div class="delete-work-button" data-id="${work.id}">
                <img src="assets/icons/trash-icon.svg" alt="Supprimer" class="trash-icon">
            </div>
        </div>`).join('');

    // Gérer la suppression des projets
    document.querySelectorAll('.delete-work-button').forEach(button => {
        button.addEventListener('click', async () => {
            const isDeleted = await deleteWork(button.dataset.id);
            if (isDeleted) {
                displayModalGallery(); // Rafraîchir après suppression
                displayWorks(await fetchWorks()); // Rafraîchir la galerie principale
            }
        });
    });
}