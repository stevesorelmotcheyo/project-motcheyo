

let heure = document.querySelector(".heure");
let minute = document.querySelector(".minute");
let seconde = document.querySelector(".seconde");
let restart = document.querySelector(".rest");

let start = document.querySelector(".start");
let stop = document.querySelector(".stop");
let clear = document.querySelector(".clear");

let sec = 0,min = 0,heu = 0;

let intervale ;

let aud = document.getElementById("music");


function demarrer(){

        intervale = setInterval(()=>{
        sec++;
        seconde.innerHTML = sec + " s ";
        if(sec=== 60 )
        {
            min = min + 1 ;
            minute.innerHTML = min + " m " ;
            sec = 0;
        }
        if(min == 60)
        {
            heu = heu + 1 ;
            heure.innerHTML = heu + " h " ;
            min = 0;
        }
        console.log(aud.currentTime);

    },1000);
}

aud.currentTime = 78.094024 ;
aud.play();

stop.disabled = true;
clear.disabled = true ;
restart.disabled = true;
start.onclick = ()=>
{
    start.disabled = true ;
    clear.disabled = false;
    stop.disabled = false;
    demarrer(0,0,0);
}
stop.onclick = ()=>
{
    clearInterval(intervale);
    stop.disabled = true;
    start.disabled = true;
    clear.disabled = false ;
    restart.disabled  = false ;
}

if(min == 2)
{
    aud.pause();
}


clear.onclick = () =>
{
    clearInterval(intervale);
    min = 0 ;
    sec = 0 ;
    heu = 0 ;
    seconde.innerHTML = sec + " s ";
  
    minute.innerHTML = min + " m " ;
  
    heure.innerHTML = heu + " h " ;

    clear.disabled = true;
    start.disabled = false ;
    stop.disabled = true;
    restart.disabled = true;

}

restart.onclick = () =>
{
    restart.disabled = true ; 
    stop.disabled = false ;

    demarrer();
     
}

