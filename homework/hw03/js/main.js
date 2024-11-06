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
                        <button><i class="far fa-heart"></i></button>
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        <button><i class="far fa-bookmark"></i></button>
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
                <p class="text-sm mb-3">
                    <strong>lizzie</strong>
                    Here is a comment text text text text text text text text.
                </p>
                <p class="text-sm mb-3">
                    <strong>vanek97</strong>
                    Here is another comment text text text.
                </p>

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

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();



// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
