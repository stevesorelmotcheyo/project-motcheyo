

let car = document.querySelector('.car');
let nombre = 0;
let interval = null ;
let audio = document.getElementById("audio");
let para = document.querySelector("#para")
let premiere = document.querySelector(".premiere");
let interval2 = null
let interval3 = null 
let cars = document.querySelector('.cars');
let interval4 = null
let position = 1000;

let backgroundX = 0;
function avance() {
  backgroundX -= 15; 
  document.querySelector('.premiere').style.backgroundPosition = `${backgroundX}px 0`;
} 
 function reculer() {
    backgroundX += 15; 
    document.querySelector('.premiere').style.backgroundPosition = `${backgroundX}px 0`;
} 
 document.addEventListener('keydown',async(event)=>{

    switch(event.key)
    {
        case"ArrowRight":
        clearInterval(interval2);
        clearInterval(interval);
        clearInterval(interval3);
        interval2 = setInterval(avance, 15);
        interval = setInterval(()=>
            {
                if(nombre>((window.innerWidth/2)-200))
                {
                    clearInterval(interval);
                    return
                }
                nombre+=2;
                car.style.left  = nombre + "px";
                audio.play();
            },2)     
        break;
        case"ArrowLeft":
        clearInterval(interval3)
        clearInterval(interval);
        clearInterval(interval2)
         interval3 = setInterval(reculer, 30);
  
           interval = setInterval(()=>
            {
                if(nombre===0)
                {
                    clearInterval(interval);
                    return
                }
                nombre-=2;
                car.style.left  = nombre + "px";
                audio.play();

            },4)
        break;
        case"ArrowUp":
                car.style.top = 600 + "px";
        break;
        case"ArrowDown":
            
            car.style.top = 700 + "px";
      
        break;
    }
})


// let nombrers = 0

// if(nombre===0)
// {
//     document.body.innerHTML = 
    
// }



document.addEventListener('keyup',(event)=>
{
    clearInterval(interval)
})


