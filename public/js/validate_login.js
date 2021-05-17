var email_login = document.getElementById('email_login');
var error_password = document.getElementById('error_password');
var password = document.getElementById('password');
var flag1_email = 0;
var flag1_password = 0;
var regexp=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/;

function emailcheck(){
    if(regexp.test(email_login.value)==true){
        // error_email_login.innerHTML = "Email ID is valid";
        // error_email_login.style.color = "blue";
        flag1_email=1;
    }
    else{
        // error_email_signup.innerHTML = "Enter valid Email ID";
        // error_email_signup.style.color = "red";
        flag_email1=0;
    }
}

function passwordcheck(){
    if(password.value.length>7){
        flag1_password = 1;
    }
    else{
        flag1_password = 0;
    }
}

function validate(){
    if((flag1_email==1)&&(flag1_password==1)){
        return alert("User Login is Successfull!");
    }
    else{
        
        error_password.innerHTML = "Email or Password is incorrect";
        error_password.style.color = "red";
        return false;
    }
}
