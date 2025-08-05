
let buton = document.getElementById('bouton')

let liste = document.querySelector('.liste')

buton.addEventListener('click',()=>
    {
        liste.classList.toggle('active')
    })

const a = document.getElementsByTagName('a')

for(let i = 0 ; i<=a.length ; i++)
{
    a[i].addEventListener('click',()=>{
      liste.classList.remove('active')  
    })
}