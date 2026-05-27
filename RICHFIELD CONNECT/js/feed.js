$(document).ready(function(){
    //LOADS POSTS WHEN PAGE OPEN
    loadPosts();
    //CREATE POSTS
    $("#postButton").click(function () {

        let postText = $("#postInput").val();

        let user = JSON.parse(localStorage.getItem("currentUser"));

        // VALIDATION

        if(postText === ""){

            return;
        }

        // CREATE POSTS ARRAY

        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        // CREATE NEW POST OBJECT

        let post = {

            name: user.name,

            content: postText,

            likes: 0,

            date: new Date().toLocaleString()
        };

        // ADD POST TO ARRAY

        posts.push(post);

        // SAVE POSTS

        localStorage.setItem("posts", JSON.stringify(posts));

        // CLEAR TEXTAREA

        $("#postInput").val("");

        // RELOAD POSTS

        loadPosts();

    });

    // FUNCTION TO LOAD POSTS

    function loadPosts(){

        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        // CLEAR CONTAINER

       posts.forEach(function(post, index){

            let likedClass = post.liked ? "liked" : "";

            // ✅ BUILD AS STRING SO .hide().fadeIn() WORKS
            let postString =
                '<div class="post">' +
                    '<h3>' + post.name + '</h3>' +
                    '<small>' + post.date + '</small>' +
                    '<p>' + post.content + '</p>' +
                    '<br>' +
                    '<button class="likeBtn ' + likedClass + '" data-index="' + index + '">' +
                        '👍 Like (' + post.likes + ')' +
                    '</button>' +
                    '<button class="deleteBtn" data-index="' + index + '">' +
                        '❌ Delete' +
                    '</button>' +
                '</div>';

                let postHTML = $(postString);

                postHTML.hide().fadeIn(500);

                $("#feedContainer").prepend(postHTML);

             //JQUERY FADE IN ON EACH POST MY FINAL UI ENHANCEMENT REQUIURED
            postHTML.hide().fadeIn(500);

            // ADD NEW POSTS ON TOP

            $("#feedContainer").prepend(postHTML);

        });  
    }

    // LIKE BUTTON

    $(document).on("click", ".likeBtn", function(){

        let index = $(this).data("index");

        let posts = JSON.parse(localStorage.getItem("posts"));

        // TOGGLE LIKED STATE
        posts[index].liked = !posts[index].liked;

        // INCREMENT OR DECREMENT
        if(posts[index].liked){
            posts[index].likes++;
        } else {
            posts[index].likes--;
        }

        localStorage.setItem("posts", JSON.stringify(posts));

        //JQUERY
        $(this).toggleClass("liked");
        $(this).text(`👍 Like (${posts[index].likes})`);
    });

  

    // DELETE BUTTON

    $(document).on("click", ".deleteBtn", function(){
          //CONFIRMATION PROMPT BEFORE DELETING
        let confirmDelete = window.confirm("Are you sure you want to delete this post?");

        if(confirmDelete){
            let index = $(this).data("index");
            let posts = JSON.parse(localStorage.getItem("posts"));

            posts.splice(index, 1);

            localStorage.setItem("posts", JSON.stringify(posts));
            loadPosts();
        }
    });
});
