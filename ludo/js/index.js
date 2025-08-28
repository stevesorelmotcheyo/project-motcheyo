
class Pion
{
    constructor(couleur,IdPion)
    {
        this.couleur = couleur
        this.IdPion = IdPion
        this.position = -1
        this.element = document.getElementById(IdPion)
    }

    EstALaMaison()
    {
        return this.position === -1;
    }

    sortieDeLaMaison()
    {
        if(!this.EstALaMaison()){

            return false
        }

        this.position = 0;

        const CaseDepart = document.querySelector(`.${this.couleur}${this.position}`)

        if(CaseDepart)
        {
            CaseDepart.appendChild(this.element)

            return true
        }
        return false 
    }

    async deplacementPasApas(nbCases)
    {
        let nouvellePosition = this.position+nbCases;

        if(nouvellePosition>55)
        {
            console.log(`${this.IdPion} ne peut pas avancer , arrive depasser`)

            return false 
        }
        for(let i = 0 ; i<=nbCases ; i++)
        {
            await this.attendre(300);

            this.position++;

            const CaseCible = document.querySelector(`.${this.couleur}${this.position}`);

            if(CaseCible)
            {
                CaseCible.appendChild(this.element)
            }
        }


        return true;
    }

    attendre(ms)
    {
        return  new Promise(resolve => setTimeout(resolve,ms));
    }
     
}

class JeuLudo
{
    constructor()
    {
        this.pions = [];
        this.DeLance = 0 ; 
        this.deElement = document.getElementById("de");
        this.setupDe()
        this.deplacementEncours = false;
    }

    ajouterPion(pion)
    {
        this.pions.push(pion)
        pion.element.addEventListener('click',()=>{
            this.deplacerPion(pion,this.DeLance)
        })
    }

    setupDe()
    {
        this.deElement.addEventListener('click',()=>{
            if(this.deplacementEncours) return ;
            this.DeLance = Math.ceil(Math.random()*6)
            this.deElement.innerHTML = this.DeLance;
            this.deElement.classList.add('active')
            setTimeout(()=>{
                this.deElement.classList.remove('active')
            },500)
        })
    }

    async deplacerPion(pion,nbCases)
    {
        if(nbCases === 0)
        {
            console.log('Lancez le de avant de deplacer le piont ')
            return ;
        }

        if(this.deplacementEncours) return ;

        this.deplacementEncours = true;

        if(nbCases===6)
        {
            const sortie = pion.sortieDeLaMaison();
            if(sortie)
            {
                console.log(`${pion.IdPion} sort de la maison !`)
                this.resetDe();
            }else
            {
                console.log(`Il faut faire un 6 pour sortir un point de la maison .`)
            }
            
            this.deplacementEncours = false;
            return 
        }
        const ok = await pion.deplacementPasApas(nbCases)
        if(ok)
        {
            this.resetDe()
        }
        this.deplacementEncours = false 
    }
    resetDe()
    {
        this.DeLance = 0 ; 
        this.deElement.innerHTML = ""
    }
}

const Jeu = new JeuLudo();


["rouge1","rouge2","rouge3","rouge4"].forEach(id=>Jeu.ajouterPion(new Pion("rouge",id)));