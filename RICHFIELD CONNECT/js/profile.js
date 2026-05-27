$(document).ready(function () {

    // GET USER DATA

    let user = JSON.parse(localStorage.getItem("currentUser"));

    // CHECK IF USER EXISTS

    if(user){

        //SLIDE DOWN EFFECT ON PROFILE CARD
        $(".preview-card").hide().slideDown(600);

        // DISPLAY USER DETAILS

        $("#profileName").text(user.name);

        $("#profileStudentNumber").text(user.student);

        $("#profileCampus").text(user.campus);

        $("#profileEmail").text(user.email);

        $("#profileBio").text(user.bio);

        // DISPLAY INTERESTS

       let interests = user.interests ? user.interests.split(",") : [];
        interests = interests.filter(item => item.trim() !== "");

        interests.forEach(function(item){
            $("#profileInterests").append(
                `<span class="tag">${item.trim()}</span>`
            );
        });

        //DELETE PROFILE PART
       $("#deleteBtn").on("click", function(){

            let confirmDelete = window.confirm("Are you sure you want to delete your profile? This cannot be undone.");

            if(confirmDelete){
                // REMOVE CURRENT USER FROM LOCALSTORAGE
                localStorage.removeItem("currentUser"); 

                // REDIRECT TO SIGNUP
                window.location.href = "signup.html";
            }
        });

    }

    else{

        $(".preview-card").html(

            `
            <h2>No Profile Found</h2>

            <p>
                Please sign up first before viewing your profile.
            </p>
            `
        );
    }

});