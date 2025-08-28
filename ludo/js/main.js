let audio = document.getElementById("audio")
class Pion {
  constructor(couleur, idPion) {
    this.couleur = couleur;
    this.idPion = idPion;
    this.position = -1; // -1 = maison
    this.element = document.getElementById(idPion);
  }

  estALaMaison() {
    return this.position === -1;
  }

  sortirDeLaMaison() {
    if (!this.estALaMaison()) return false;
    this.position = 0;
    const caseDepart = document.querySelector(`.${this.couleur}${this.position}`);
    if (caseDepart) {
      caseDepart.appendChild(this.element);
      return true;
    }
    return false;
  }

  async deplacerPasAPas(nbCases) {
    let nouvellePos = this.position + nbCases;

    if (nouvellePos > 55) {
      console.log(`${this.idPion} ne peut pas avancer, arrivée dépassée.`);
      return false;
    }

    for (let i = 1; i <= nbCases; i++) {
      await this.attendre(150);
      this.position++;
      const caseCible = document.querySelector(`.${this.couleur}${this.position}`);
      if (caseCible) {
        caseCible.appendChild(this.element);
      }
    }
    return true;
  }

  attendre(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
class JeuLudo {
  constructor() {
    this.pions = [];
    this.deLance = 0;
    this.deElement = document.getElementById("de");
    this.joueurs = ["rouge", "vert", "jaune", "bleu"];
    this.joueurIndex = 0;
    this.joueurCourant = this.joueurs[this.joueurIndex];
    this.deplacementEnCours = false;
    this.dejaLance = false;

    // mapping couleur → maison
    this.maisons = {
      "vert": document.getElementById("position1"),
      "jaune": document.getElementById("position2"),
      "rouge": document.getElementById("position3"),
      "bleu": document.getElementById("position4"),
    };

    this.setupDe();
    this.mettreAJourMaisons(); // ✅ visuel du premier joueur
    console.log("Début de la partie, joueur : " + this.joueurCourant);
  }

  ajouterPion(pion) {
    this.pions.push(pion);
    pion.element.addEventListener("click", () => this.deplacerPion(pion, this.deLance));
  }

  setupDe() {
    this.deElement.addEventListener("click", () => {
      if (this.deplacementEnCours) return;
      if (this.dejaLance) {
        console.log("Vous devez jouer le dé avant de relancer.");
        return;
      }
       
      let de = Math.ceil(Math.random() * 6);
      this.deLance = de;
      this.dejaLance = true;

      // Affiche le résultat
      this.deElement.innerHTML = this.deLance;

      // Animation visuelle du dé
      this.deElement.classList.add("active");
      setTimeout(() => {
        this.deElement.classList.remove("active");
      }, 500);

      console.log(`${this.joueurCourant} lance et obtient ${de}`);

      // Vérifier si le joueur peut jouer ce dé
      if (!this.peutJouer(this.joueurCourant, de)) {
        console.log("Aucun mouvement possible, tour perdu.");
        this.resetDe(false); // faux = ne rejoue pas
      }
    });
  }

  peutJouer(couleur, de) {
    let pionsJoueur = this.pions.filter(p => p.couleur === couleur);
    // Peut sortir un pion si dé = 6 et maison non vide
    if (de === 6 && pionsJoueur.some(p => p.estALaMaison())) return true;
    // Peut avancer un pion déjà en jeu
    if (pionsJoueur.some(p => !p.estALaMaison())) return true;
    return false;
  }

  async deplacerPion(pion, nbCases) {
    if (this.deplacementEnCours) return;
    if (this.deLance === 0) {
      console.log("Lancez le dé avant de déplacer un pion.");
      return;
    }
    if (pion.couleur !== this.joueurCourant) {
      console.log("Ce n'est pas le tour de " + pion.couleur);
      return;
    }

    this.deplacementEnCours = true;

    if (pion.estALaMaison()) {
      if (nbCases === 6) {
        const sorti = pion.sortirDeLaMaison();
        if (sorti) {
          console.log(`${pion.idPion} sort de la maison !`);
          this.resetDe(true);
        }
      } else {
        console.log("Il faut un 6 pour sortir un pion de la maison.");
      }
      this.deplacementEnCours = false;
      return;
    }

    const ok = await pion.deplacerPasAPas(nbCases);
    if (ok) {
      this.resetDe(nbCases === 6); // rejoue si 6
    }

    this.deplacementEnCours = false;
  }

  resetDe(rejoue) {
    this.deLance = 0;
    this.dejaLance = false;

    if (!rejoue) {
      this.passerTour();
    } else {
      console.log(`${this.joueurCourant} rejoue car il a fait 6 !`);
    }
  }

  passerTour() {
    this.joueurIndex = (this.joueurIndex + 1) % this.joueurs.length;
    this.joueurCourant = this.joueurs[this.joueurIndex];
    console.log("Tour terminé, au joueur : " + this.joueurCourant);

    this.mettreAJourMaisons(); // ✅ maj visuel
  }

  mettreAJourMaisons() {
    // retirer la classe de toutes les maisons
    Object.values(this.maisons).forEach(m => m.classList.remove("active-turn"));
    // ajouter la classe à la maison du joueur courant
    const maisonActive = this.maisons[this.joueurCourant];
    if (maisonActive) {
      maisonActive.classList.add("active-turn");
    }
  }
}


// Initialisation du jeu
const jeu = new JeuLudo();

["rouge1","rouge2","rouge3","rouge4"].forEach(id => jeu.ajouterPion(new Pion("rouge", id)));
["vert1","vert2","vert3","vert4"].forEach(id => jeu.ajouterPion(new Pion("vert", id)));
["jaune1","jaune2","jaune3","jaune4"].forEach(id => jeu.ajouterPion(new Pion("jaune", id)));
["bleu1","bleu2","bleu3","bleu4"].forEach(id => jeu.ajouterPion(new Pion("bleu", id)));
