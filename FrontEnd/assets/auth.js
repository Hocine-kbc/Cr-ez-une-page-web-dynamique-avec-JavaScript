// Gérer la connexion
document.getElementById("login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token); // Stocker le token
            console.log("Connexion réussie. Redirection vers index.html...");
            window.location.href = "index.html"; // Rediriger vers la page d'accueil
        } else {
            document.getElementById("error-message").style.display = "block"; // Afficher un message d'erreur
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        document.getElementById("error-message").style.display = "block";
    }
});

// Gérer la déconnexion
function logout() {
    localStorage.removeItem("token"); // Supprimer le token
    console.log("Déconnexion réussie. Redirection vers index.html...");
    window.location.href = "index.html"; // Rediriger vers la page d'accueil
}

///////////////////////////////////////////// CHECK LOGIN /////////////////////////////////////////////


// Vérifier si l'utilisateur est connecté
function checkLogin() {
    const token = localStorage.getItem("token");
    console.log("Token trouvé :", token);

    const authButton = document.getElementById("login-button"); // Utiliser le même bouton pour Login/Logout
    const editBanner = document.getElementById("edit-banner");
    const editButton = document.getElementById("edit-projects-button");
    const filtersContainer = document.querySelector(".filters"); // Conteneur des boutons de filtre

    if (token) {
        console.log("Utilisateur connecté. Transformation du bouton en Logout.");
        authButton.textContent = "Logout"; // Changer le texte en "Logout"
        authButton.onclick = logout; // Ajouter le gestionnaire de déconnexion
        authButton.href = "#"; // Désactiver le lien par défaut

        // Afficher les éléments en mode édition
        if (filtersContainer) filtersContainer.style.display = "none";
        if (editBanner) editBanner.style.display = "block";
        if (editButton) editButton.style.display = "block";
    } else {

        // Masquer les éléments en mode édition
        if (editBanner) editBanner.style.display = "none";
        if (editButton) editButton.style.display = "none";
        
    }
}

// Appeler la fonction au chargement de la page
window.addEventListener("load", checkLogin);