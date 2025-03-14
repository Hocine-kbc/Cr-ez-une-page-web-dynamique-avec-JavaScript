import { fetchWorks, addWork } from './api.js';
import { displayWorks } from './gallery.js';

// Récupérer les catégories depuis l'API
export async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) throw new Error('Erreur lors du chargement des catégories');

        const categories = await response.json();
        const categorySelect = document.getElementById('category');

        // Réinitialiser les options existantes
        categorySelect.innerHTML = '<option value="" disabled selected>Choisir une catégorie</option>';

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

// Gérer l'envoi du formulaire
export async function submitForm(event) {
    event.preventDefault();

    const fileInput = document.getElementById('image');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');

    // Vérifier que tous les champs sont remplis
    if (!fileInput.files.length) {
        alert("Veuillez sélectionner une image.");
        return;
    }
    if (titleInput.value.trim() === "") {
        alert("Veuillez entrer un titre valide.");
        return;
    }
    if (categorySelect.value === "") {
        alert("Veuillez sélectionner une catégorie.");
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('title', titleInput.value.trim());
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

        if (!response.ok) throw new Error("Erreur lors de l'ajout du projet");

        const newWork = await response.json(); // Récupérer l'image ajoutée depuis la réponse API

        alert("Projet ajouté avec succès !");

        // Rediriger vers la page d'accueil
        window.location.href = "index.html"; // Rafraîchir la page et retourner à l'accueil

    } catch (error) {
        console.error(error);
        alert("Erreur lors de l'envoi du projet : " + error.message);
    }
}

// Gestion des interactions du DOM
document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("image");
    const previewImage = document.getElementById("preview-image");
    const uploadContent = document.querySelector(".upload-content");
    const form = document.getElementById("add-project-form");
    const uploadButton = document.getElementById("upload-button");

    // Gestion de l'upload d'image
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Afficher l'aperçu de l'image
                previewImage.src = e.target.result;
                previewImage.style.display = "block";

                // Masquer l'interface d'upload
                uploadContent.style.display = "none";
                uploadButton.style.display = "none"; // Masquer le bouton d'upload
            };

            reader.readAsDataURL(file);
        }
    });

    // Déclencher le sélecteur de fichiers
    uploadButton.addEventListener("click", function () {
        imageInput.click();
    });

    // Gestion du bouton "Retour"
    const backToGallery = document.getElementById("back-to-gallery");
    if (backToGallery) {
        backToGallery.addEventListener("click", function () {
            document.getElementById("add-project-modal").style.display = "none";
            document.getElementById("edit-modal").style.display = "flex"; // Réafficher la modale d'édition
        });
    }

    // Masquer les modales au chargement de la page
    document.getElementById("edit-modal").style.display = "none";
    document.getElementById("add-project-modal").style.display = "none";
});