import { fetchWorks } from "./api.js";


export async function displayProjects(categoryId = "all") {
    const gallery = document.querySelector(".gallery");

    // Vérifier si la galerie existe
    if (!gallery) {
        console.warn("La galerie n'existe pas dans cette page.");
        return;
    }

    gallery.innerHTML = ""; // Nettoyer la galerie

    const projects = await fetchWorks();

    // Filtrer les projets si une catégorie est sélectionnée
    const filteredProjects = categoryId === "all"
        ? projects
        : projects.filter(project => project.categoryId == categoryId);

    filteredProjects.forEach(project => {
        const projectElement = document.createElement("figure");
        projectElement.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}">
            <figcaption>${project.title}</figcaption>
        `;
        gallery.appendChild(projectElement);
    });
}






export function displayWorks(works) {
    const gallery = document.querySelector(".gallery");
    if (!gallery) {
        console.error(" Aucun élément .gallery trouvé !");
        return;
    }

    gallery.innerHTML = works.map(work => `
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
    `).join("");
}