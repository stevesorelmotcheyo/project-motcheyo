 const form = document.getElementById('form');
    const tacheInput = document.getElementById('tache');
    const data = document.getElementById('data');

    // Récupère les tâches sauvegardées
    function getTaches() {
        let taches = localStorage.getItem('taches');
        if (taches) {
            return JSON.parse(taches);
        } else {
            return [];
        }
    }

    // Sauvegarde les tâches dans localStorage
    function saveTaches(taches) {
        localStorage.setItem('taches', JSON.stringify(taches));
    }

    // Affiche les tâches
    function afficherTaches() {
        data.innerHTML = '';
        const taches = getTaches();
        if (taches.length > 0) {
            data.style.display = 'block';
            taches.forEach((tache, index) => {
                const p = document.createElement('p');
                p.textContent = tache;

                // Gestion du clic simple pour appliquer le style barré et rouge
                p.addEventListener('click', () => {
                   p.classList.toggle('active')
                });

                // Gestion du double-clic pour supprimer la tâche
                p.addEventListener('dblclick', () => {
                    supprimerTache(index);
                });

                data.appendChild(p);
            });
        } else {
            data.style.display = 'none';
        }
    }

    // Supprime la tâche à l'index donné
    function supprimerTache(index) {
        let taches = getTaches();
        taches.splice(index, 1);
        saveTaches(taches);
        afficherTaches();
    }

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nouvelleTache = tacheInput.value.trim();
        if (!nouvelleTache) {
            alert('Entrez une tâche');
        } else {
            const taches = getTaches();
            taches.push(nouvelleTache);
            saveTaches(taches);
            afficherTaches();
            tacheInput.value = '';
        }
    });

    // Afficher les tâches au chargement
    afficherTaches();