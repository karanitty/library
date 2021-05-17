var email_signup = document.getElementById('email_signup');
var error_email_signup = document.getElementById('error_email_signup')
var password1 = document.getElementById('password1');
var error_password1 = document.getElementById('error_password1');
var password2 = document.getElementById('password2');
var error_password2 = document.getElementById('error_password2');
var phone = document.getElementById('phone');
var error_phone = document.getElementById('error_phone');
var regexp=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/;
var passexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
var mobexp = /^\d{10}$/;
var flag_email = 0;
var flag_password1 = 0;
var flag_password2 = 0;
var flag_mobile = 0;

function email_signup_check(){
    if(regexp.test(email_signup.value)==true){
        error_email_signup.innerHTML = "Email ID is valid";
        error_email_signup.style.color = "blue";
        flag_email=1;
    }
    else{
        error_email_signup.innerHTML = "Enter valid Email ID";
        error_email_signup.style.color = "red";
        flag_email=0;
    }
}

function password1check(){
    if(password1.value.length==0){
        error_password1.innerHTML = "Please contain minimum 8 characters with atleast one uppercase, one lowercase and one number";
        error_password1.style.color = "black";
        flag_password1 = 0
    }
    else if(password1.value.length<=3){
        error_password1.innerHTML = "Password is too weak";
        error_password1.style.color = "red";
        flag_password1 = 0;
    }
    else if(password1.value.length<=7){
        error_password1.innerHTML = "Password is weak";
        error_password1.style.color = "orange";
        flag_password1 = 0;
    }
    else if(passexp.test(password1.value)){
        error_password1.innerHTML = "Password is strong";
        error_password1.style.color = "blue";
        flag_password1 = 1;
    }
    else{
        error_password1.innerHTML = "Please contain minimum 8 characters with atleast one uppercase, one lowercase and one number";
        error_password1.style.color = "black";
        flag_password1 = 0;
    }
}

function password2check(){
    if(password1.value!=password2.value){
        error_password2.innerHTML = "The passwords are different";
        error_password2.style.color = "red";
        flag_password2=0;
    }
    else{
        error_password2.innerHTML = "The passwords are matching";
        error_password2.style.color = "blue";
        flag_password2=1;
    }
}

function mobile(){
    if(mobexp.test(phone.value)){
        error_phone.innerHTML = "Valid Mobile Number";
        error_phone.style.color = "blue";
        flag_mobile = 1;
    }
    else{
        error_phone.innerHTML = "Invalid Mobile Number";
        error_phone.style.color = "red";
        flag_mobile = 0;
    }
}

function validation(){
    if ((flag_email==1)&&(flag_mobile==1)&&(flag_password1==1)&&(flag_password2==1)){
        // alert("User Successfully Registered!");
        return true;
    }
    else{
        return false;
    }

}

