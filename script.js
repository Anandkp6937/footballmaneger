const ul=document.querySelector('.ul');

const playerName=document.querySelector('#pname');
const rupees=document.querySelector('#rupi');
const modeOfPayment=document.querySelectorAll('.radi');
const submit=document.querySelector('#sub');
const showList=document.querySelector('#showList');

let radiovalue;
let modal=document.querySelector('.modal');
let playerDetails=JSON.parse(localStorage.getItem('playerData')) || [];
let close=document.querySelector('.close');
let update=document.querySelector('#update');
let offM=document.querySelector('.offM');
let nPlayers=document.querySelector('.no');
let delI=document.querySelectorAll('.delI');
let noOfPlayers=0;
let totalMoney=0;
let upiMoney=0;

let tot=document.querySelector('.tot');
let upiM=document.querySelector('.upiM');

document.addEventListener('DOMContentLoaded',()=>{
makePlayerCard();
});
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
        console.log('no players added');
        ul.innerHTML =''
        tot.innerText=0;
        upiM.innerText=0;
        offM.innerText=0;
        nPlayers.innerText=0;
    }
}
makePlayerCard();
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    getUserData();
    clearAll();
    makePlayerCard();

   
})

function getUserData(){
    acuireRadioData();
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
function acuireRadioData(){
    modeOfPayment.forEach((check,i)=>{
        if(check.checked){
            radiovalue=check.value
        }
    })
}

function clearAll(){
playerName.value=''
  rupees.value=''
radiovalue=''
}

showList.addEventListener('click',()=>{
    modal.style.transform='translateX(0%)';

})
close.addEventListener('click',()=>{
   modal.style.transform='translateX(-100%)';
})
update.addEventListener('click',()=>{
    // console.log('feature wil be luancehd soon');
    alert('feature will be launched soon')
})
function setMoneyDetails(){
let offlineMoney=(totalMoney)-(upiMoney);
tot.innerText=totalMoney;
upiM.innerText=upiMoney;
offM.innerText=offlineMoney;
noOfPlayers=playerDetails.length;
nPlayers.innerText=noOfPlayers;
}

function deleteIt(index){
    console.log('deleted:',index);
    console.log(playerDetails.splice(index,1));
    localStorage.setItem('playerData',JSON.stringify(playerDetails));
    makePlayerCard();
}