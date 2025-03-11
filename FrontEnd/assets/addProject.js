import { fetchWorks } from './api.js';
import { displayWorks } from './gallery.js';

// ----------------- Récupérer les catégories depuis l'API -----------------
export async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) throw new Error('Erreur lors du chargement des catégories');

        const categories = await response.json();
        const categorySelect = document.getElementById('category');

        // Vider les options existantes
        categorySelect.innerHTML = '';

        // Ajouter les options des catégories
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        alert('Impossible de charger les catégories.');
    }
}

// ----------------- Gérer l'envoi du formulaire -----------------
export async function submitForm(event) {
    event.preventDefault();

    const fileInput = document.getElementById('image');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');

    // Validation du formulaire
    if (!fileInput.files.length) {
        alert("Veuillez sélectionner une image.");
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('category', categorySelect.value);

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être connecté pour ajouter un projet.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) throw new Error('Erreur lors de l\'ajout du projet');

        alert("Projet ajouté avec succès !");
        document.getElementById('add-project-form').reset();

        // Rafraîchir la galerie après l'ajout
        const works = await fetchWorks();
        displayWorks(works);
    } catch (error) {
        console.error(error);
        alert("Erreur lors de l'envoi du projet.");
    }
}

// ----------------- Gestion de la modale d'ajout -----------------
export function setupAddProjectModal() {
    const modal = document.getElementById('add-project-modal');
    const openModalBtn = document.getElementById('open-add-project-modal');
    const closeModalBtn = document.querySelector('.modal .close');

    // Ouvrir la modale en cliquant sur le bouton
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        fetchCategories(); // Charger les catégories à chaque ouverture
    });

    // Fermer la modale en cliquant sur le bouton "X"
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fermer la modale en cliquant en dehors du formulaire
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Gérer la soumission du formulaire
    document.getElementById('add-project-form').addEventListener('submit', submitForm);
}
