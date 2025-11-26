let users=[
    {
        "user":"car123",
        "name":"Carmen" ,
        "password":"12345678" 
    },
    {
        "user":"pedro123",
        "name":"Pedro" ,
        "password":"12345678" 
    },
    {
        "user":"maria123",
        "name":"maria" ,
        "password":"12345678" 
    },
]
let verifyAccount=(user,password)=>{
    let exist=false;
    
    for (let i = 0; i < users.length; i++) {
        if(user===users[i].user && password===users[i].password){
            exist=true;
            
            break;
        }else{
            console.error("rror")
        }
    }
    return exist;
    
}

let btnLog=document.querySelector('.submit_button');

btnLog.addEventListener("click", (e)=>{
    e.preventDefault()
    let userData=document.getElementById('user').value;
    let userPass=document.getElementById('pass').value
       
    if(verifyAccount(userData,userPass)){
        window.location.href='clients/registClient.html';
    }else{
        alert("usuario invalido")
    }
   
})

