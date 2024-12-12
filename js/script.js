var  regs_Data = [];
var Name = document.querySelector("#Name");
var email_regs = document.querySelector("#Email");
var pass = document.querySelector("#Pass");
var btn = document.querySelector(".mybtn");
var alert_Fail = document.querySelector("#alert-fail")
var alert_Success = document.querySelector("#alert-success")
var alert_empty = document.querySelector("#alert-empty") 
var btn_Success = document.querySelector(".success-mess")
 

// Retrieve and parse data from localStorage
var storage = JSON.parse(localStorage.getItem("Data"));

if (storage !== null) {
    regs_Data = storage; // Initialize regs_Data with stored data
}

function add_Data() {
    if(!Validation()){
        if (!check_Email()) { // Only add data if the email is not a duplicate
            var user_data = {
                name: Name.value.toLowerCase().trim(),
                email: email_regs.value.toLowerCase().trim(),
                pass: pass.value.toLowerCase().trim(),
            };

            regs_Data.push(user_data);
            localStorage.setItem("Data", JSON.stringify(regs_Data)); // Save updated array to localStorage
            return true
        }
    }
}

btn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    if(add_Data()){
        // setTimeout(function () {
        //     window.location.href = "signin.html"; 
        // }, 3000);
        btn_Success.classList.replace("d-none", "d-block")

    } 
    console.log("Current Data:", regs_Data);

});

function check_Email() {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (regex.test(email_regs.value)) {

       return  check_Signup()
    }
    //when email is not valid
    alert_Success.classList.replace("d-block","d-none")
    alert_Fail.classList.replace("d-none", "d-block")
    alert_Fail.innerHTML = "This Email Is Not Valid"
    return true


}


function Validation(){
    var allInput = document.querySelectorAll("input");
    for(var i= 0; i< allInput.length; i++){
        if(allInput[i].value == ""){
            alert_Fail.classList.replace("d-block","d-none")
            alert_Success.classList.replace("d-block","d-none")
            alert_empty.classList.replace("d-none","d-block")
            return true
        } 
    }
    alert_empty.classList.replace("d-block","d-none")
    return false
}

function check_Signup(){
    for (var i = 0; i < regs_Data.length; i++) {
        if (regs_Data[i].email === email_regs.value.toLowerCase().trim()) {
            alert_Success.classList.replace("d-block","d-none")
            alert_Fail.classList.replace("d-none", "d-block")
            alert_Fail.innerHTML = "You signed up before with this email"
            return true; // Duplicate email found  
        }
    }
    // when a valid email and email is first time
    alert_Fail.classList.replace("d-block", "d-none")
    alert_Success.classList.replace("d-none","d-block")
    return false; // No duplicates found

}

// ######################



