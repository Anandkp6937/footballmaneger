const ul=document.querySelector('.ul');
const playerName=document.querySelector('#pname');
const rupees=document.querySelector('#rupi');
const modeOfPayment=document.querySelectorAll('.radi');
const submit=document.querySelector('#sub');
const showList=document.querySelector('#showList');
let modal=document.querySelector('.modal');
let playerDetails=JSON.parse(localStorage.getItem('playerData')) || [];
// local storage is used to store the data without any other database
let close=document.querySelector('.close');
let update=document.querySelector('#update');
let offM=document.querySelector('.offM');
let nPlayers=document.querySelector('.no');
let delI=document.querySelectorAll('.delI');
let tot=document.querySelector('.tot');
let upiM=document.querySelector('.upiM');
let noOfPlayers=0;
let totalMoney=0;
let upiMoney=0;
let radiovalue;

// check for service worker ,register service worker (progressive web app part)
function checkServiceWorker(){
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register('sworker.js')
        .catch(err=>console.log(err))
     }
     else{
         alert('no navigator in service worker of chrome')
     }
}
//on dom load 
document.addEventListener('DOMContentLoaded',()=>{
    checkServiceWorker()
    makePlayerCard();
});
//function to make player card
function makePlayerCard(){
    if(playerDetails.length !=0){
        ul.innerHTML='';
        totalMoney=0;
        upiMoney=0;
        noOfPlayers=0;
        playerDetails.forEach((play,i)=>{
            ul.innerHTML +=`<li class="list">
                        <div class="makewidth">
                        <p class="listM nameOfM">${play.name}</p>
                        <p class="listM rupOfM">${play.rup}</p>
                        <p class="listM payOfM">${play.mode}</p>
                        </div>
                       <i class="fa-solid delI fa-trash"  onclick="deleteIt(${i})"></i>
                        </li>`
                        totalMoney=totalMoney+Number(play.rup);
                        if(play.mode==='upi'){
                          upiMoney=upiMoney+Number(play.rup);
                        }
                      
        })
        setMoneyDetails();
  
    }
    else{
        clearAll(true);
    }
}

//on submit proceess
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    getUserData();//get all user data from localstorage
    clearAll();//clear all feilds
    makePlayerCard();//make player card from data
})

// acessing user data and making makePlayerCard call from data recived
function getUserData(){
    acuireRadioData(); //getting radio button data
    if(playerName.value==='' || rupees.value==='' ){
        alert('please fill feilds')
    }
    else{
        let data={
            name:playerName.value,
            rup:rupees.value,
            mode:radiovalue
        }
    playerDetails.push(data);
    localStorage.setItem('playerData',JSON.stringify(playerDetails));
    makePlayerCard();
    setMoneyDetails();
    }
   
}
//function to accuire radio button data
function acuireRadioData(){
    modeOfPayment.forEach((check,i)=>{
        if(check.checked){
            radiovalue=check.value //stores the data
        }
    })
}
//function to clear data
function clearAll(signal){
    if(signal===true){
        ul.innerHTML =''
        tot.innerText=0;
        upiM.innerText=0;
        offM.innerText=0;
        nPlayers.innerText=0;
    }
    else{
        playerName.value=''
        rupees.value=''
      radiovalue=''
    }
}
//modal action when clicking button
showList.addEventListener('click',()=>{
    modal.style.transform='translateX(0%)';
})
//modal action to close 
close.addEventListener('click',()=>{
   modal.style.transform='translateX(-100%)';
})
//future updates 
update.addEventListener('click',()=>{
    // console.log('feature wil be luancehd soon');
    alert('feature will be launched soon')
})
// to set money details in UI
function setMoneyDetails(){
let offlineMoney=(totalMoney)-(upiMoney);
tot.innerText=totalMoney;
upiM.innerText=upiMoney;
offM.innerText=offlineMoney;
noOfPlayers=playerDetails.length;
nPlayers.innerText=noOfPlayers;
}
//function to delete player
function deleteIt(index){
   playerDetails.splice(index,1)
    localStorage.setItem('playerData',JSON.stringify(playerDetails));
    makePlayerCard();
}