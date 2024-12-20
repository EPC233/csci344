import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "webdev";
let password = "password";

async function initializeScreen() {
    token = await getToken();
    showNav();
    getPosts();
}

async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:

async function getPosts() {
    //  get HTTP response header
    const endpoint = "https://photo-app-secured.herokuapp.com/api/posts/?limit=10";
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    //  get HTTP body (in a JSON)
    const posts = await response.json();

    //  print data to console
    console.log(posts);

    //  invoke to actually draw posts to screen
    showPosts(posts);
}

function showPosts(posts) {
    //  get reference to HTML tag where we want to insert posts
    const mainEl = document.querySelector("main");

    //  loop through each post and append HTML representation of post to the DOM
    posts.forEach(post => {
        const template = `
        <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>

            <!--    picture -->
            <img src="${post.image_url}" alt="${post.alt_text}" width="300" height="300"
                class="w-full bg-cover">

            <div class="p-4">
                <!--    buttons -->
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${getLikeButton(post)}
                    </div>
                    <div>
                        ${getBookmarkButton(post)}
                    </div>
                </div>

                <!--    likes   -->
                <p class="font-bold mb-3">${post.likes.length} like(s)</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                        ${post.caption} <button class="button">more</button>
                    </p>
                </div>

                <!--    comments   -->
                ${showComments(post.comments)}

                <!--    post time   -->
                <p class="uppercase text-gray-500 text-xs">${post.display_time}</p>
            </div>

            <!--    interactions    >
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>`;
        mainEl.insertAdjacentHTML("beforeend", template);
    });
}

//  input comments
//  output html representation of comments array
function showComments(comments) {
    if (comments.length > 1) {
        const lastComment = comments[comments.length-1];
        return `
            <button class="text-sm mb-3"> View All ${comments.length} Comments</button>
            <p class="text-sm mb-3">
                <strong> ${lastComment.user.username} </strong>
                ${lastComment.text}
            </p>
        `;
    }

    if (comments.length === 1) {
        return `<p class="text-sm mb-3"> <strong> ${comments[0].user.username} </strong> ${comments[0].text}</p>`;
    }

    return ``;
}

function getLikeButton(post) {
    if (post.current_user_like_id) {
        return `
        <button onclick="deleteLike(${post.current_user_like_id})">
            <i class="fa-solid text-red-700 fa-heart"></i>
        </button>`;
    }
    else {
        return `
        <button onclick="createLike(${post.id})">
            <i class="far fa-heart"></i>
        </button>`;
    }
}

window.createLike = async function(postID) {
    const postData = {
        post_id: postID,
    };

    const response = await fetch("https://photo-app-secured.herokuapp.com/api/likes/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`    
        },
        body: JSON.stringify(postData)
    });

    const data = await response.json();
    console.log(data);
}

window.deleteLike = async function(likeID) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/likes/${likeID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token} `
        }
    });

    const data = await response.json();
    console.log(data);
}

function getBookmarkButton(post) {
    if (post.current_user_bookmark_id) {
        return `
        <button onclick="deleteBookmark(${post.current_user_bookmark_id})">
            <i class="fa-solid fa-bookmark"></i>
        </button>`;
    }
    else {
        return `
        <button onclick="createBookmark(${post.id})">
            <i class="far fa-bookmark"></i>
        </button>`;
    }
}

window.createBookmark = async function(postID) {
    const postData = {
        post_id: postID,
    };
    
    const response = await fetch(
        "https://photo-app-secured.herokuapp.com/api/bookmarks/", 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postData),
        }
    );

    const data = await response.json();
    console.log(data);
}

window.deleteBookmark = async function (bookmarkId) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token} `
        }
    });
    const data = await response.json();
    console.log(data);
}

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();