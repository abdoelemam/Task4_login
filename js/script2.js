var regs_Data = []
var users_login = []
var emailLog = document.querySelector("#Email-login")
var passLog = document.querySelector("#Pass-login")
var btnLog = document.querySelector(".btn-log")
var check = document.querySelector("#Check")
var conUser = document.querySelector(".con-user") 
var con_logout = document.querySelector(".con-logout")

var storage = JSON.parse(localStorage.getItem("Data"));
var storage_Login = JSON.parse(sessionStorage.getItem("loginUsers"));

if (storage !== null){
    regs_Data = storage ;
}

if(storage_Login !== null){
    users_login = storage_Login
}



function signinn(){
    check.classList.replace("d-none","d-block") ;

    if(isEmpty(emailLog.value, passLog.value)){
        check.innerHTML = "all inputs required"   
    }
    else if(!(valid_Email(emailLog))){
        check.innerHTML = "email is not valid"
    }
    else if(!(isExist(emailLog) && checkPass(passLog))){
        if(isExist(emailLog)){
            check.innerHTML = "Wrong Password"
            console.log("the password is not true")
        }
        else{
            check.innerHTML = "this email is not Exist"
        }
    }
    else{
        check.innerHTML =  `<span class=" text-success"> signed successfuly</span>` ;
        var username = add_get_username(emailLog)
        sessionStorage.setItem("loginUsers",JSON.stringify(users_login) ) ;

        window.location.pathname = "Task4_login/pages/home.html" ;
        
    }

}



if (window.location.pathname == "Task4_login/pages/home.html") {
    function display() {
        // Check if there is a logged-in user
        if (users_login.length > 0) {
            conUser.innerHTML = `<span class="text-white fs-4 text-center">welcome ${users_login[users_login.length - 1]}</span>`;
            con_logout.innerHTML = `<a href="#" onclick="logout()" class="btn btn-log text-white btn-outline-warning">Log Out</a>`;
        } else {
            // No logged-in user
            conUser.innerHTML = `<span class="text-white fs-4 text-center">Please log in.</span>`;
            con_logout.innerHTML = ``;
        }
    }

    display();
}

function logout(username) {
    // Remove the last logged-in user
    users_login.pop();
    sessionStorage.setItem("loginUsers", JSON.stringify(users_login));

    // Update the DOM after logout
    conUser.innerHTML = `<span class="text-white fs-4 text-center">Please log in.</span>`;
    con_logout.innerHTML = ``;

    
    window.location.pathname = "Task4_login/pages/signin.html";
}




if(window.location.pathname == "Task4_login/pages/signin.html"){
    btnLog.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent form submission
    
        signinn()
    });
}

function isEmpty(...args){
    for(var value of args){
        if(value.toLowerCase().trim() == ""){
            return true
        }
    }
    return false
}

function valid_Email(email){
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(regex.test(email.value)){
        return true
    }
    return false
}

function isExist(emailLog){
    for(var data of regs_Data){
        if(data.email == emailLog.value.toLowerCase().trim()){
            return true
        }
    }

    return false
}

function checkPass(passLog){
    for(var data of regs_Data){
        if(data.pass == passLog.value.toLowerCase().trim()){
            return true
        }
    }

    return false 
}


function add_get_username(emailLog){
    for(var user of regs_Data){
        if(user.email == emailLog.value){
            users_login.push(user.name) ;
            return user.name
        }
    }
}

// function display(){
   
   
//     con_logout.innerHTML = `<a href="./pages/signin.html" onclick="logout()" class="btn btn-log text-white btn-outline-warning">log out</a>`
// }





