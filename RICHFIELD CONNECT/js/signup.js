// LIVE PREVIEW 
document.getElementById("name").addEventListener("keyup", function () {
    document.getElementById("previewName").textContent = this.value;
});

document.getElementById("bio").addEventListener("keyup", function () {
    document.getElementById("previewBio").textContent = this.value;
});

document.getElementById("interests").addEventListener("keyup", function () {
    let interests = this.value.split(",");
    let output = "";
    interests.forEach(function (item) {
        if(item.trim() !== ""){
            output += `<span class="tag">${item.trim()}</span>`;
        }
    });
    document.getElementById("previewInterests").innerHTML = output;
});

// SUBMIT HANDLER
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    //GET FORM VALUES 
    let name = document.getElementById("name").value;
    let student = document.getElementById("studentNumber").value;
    let campus = document.getElementById("campus").value; //  Fix 1
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;
    let bio = document.getElementById("bio").value;
    let interests = document.getElementById("interests").value;

    // CLEAR ERRORS
    document.getElementById("nameError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("studentNumberError").textContent = "";

    let valid = true;
    //NAME VALIDATION
    if (name === "") {
        document.getElementById("nameError").textContent = "Required";
        valid = false;
    }
    //STUDENT NUMBER VALIDATION
    if (isNaN(student) || student === "") {
        document.getElementById("studentNumberError").textContent = "Student number must be numeric";
        valid = false;
    }
    //EMAIL
    if (!email.includes("@")) {
        document.getElementById("emailError").textContent = "Enter a valid email";
        valid = false;
    }
    //PASSWORD
    if (password.length < 8) {
        document.getElementById("passwordError").textContent = "Minimum 8 characters";
        valid = false;
    }
    //CONFIRM PASSWORD
    if (password !== confirm) { //  Fix 2 & 3 — moved up, quoted ID
        document.getElementById("confirmPasswordError").textContent = "Passwords must match";
        valid = false;
    }
    //SAVE THE IF VALID
    if (valid) { 
        let newUser = { name, 
            student, 
            campus, 
            email, 
            bio, 
            interests
        };
        //lOCALSTORAGE FOR GETTING EXISTING USERS  OR EVEN EMPTY ARRAY
        let users = JSON.parse(localStorage.getItem("users")) || [];
        //CHECKS I THE STUDENT NUMBER IS REGISTRERED
        let exists = users.find(u => u.student === student);
        if(exists){
            document.getElementById("studentNumberError").textContent = "This student number is already registered";
            return;
        }
        // FOR ADDING NEW USERS TO THE ARRAY
        users.push(newUser);
        //SAVES ALL USERES
         localStorage.setItem("user", JSON.stringify(users));
        //SAVES THE USERS AFTER THEY ARE LOGGED
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        //REDIRECT THEM TO PROFILE
        window.location.href = "Profile.html";
    }
});