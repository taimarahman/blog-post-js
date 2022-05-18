const searchBtn = document.getElementById('search-btn');
const searchEl = document.getElementById('search');
const navigationEl = document.querySelector('.navigation');
const postContainer = document.querySelector('.post-container');

// console.log(navigationEl.querySelector('.active'));

Array.from(navigationEl.children).forEach(el => {
    // console.log(el);
    el.setAttribute('onclick', 'displayPost(this)');
});

async function getPosts() {
    const res = await fetch('./blog.json');
    const data = await res.json();

    return data;
}

async function showPosts() {
    const blogs = await getPosts();

    blogs.forEach(blog => {
        // console.log(blog);
        const blogPostEl = document.createElement('div');
        blogPostEl.classList.add('post');
        blogPostEl.setAttribute('id', `post${blog.id}`);
        blogPostEl.innerHTML = `
        <p><span class="date">${formateDate(blog.date)}</span><span class="dot"></span>Blog</p>
        <h1 class="post-title">${blog.title}</h1>
        <div class="post-image"><img src="images/${blog.image}"></div>
        `;

        postContainer.appendChild(blogPostEl);
    });

    postContainer.firstElementChild.classList.add('active');
}

showPosts();

function formateDate(dateStr) {
    let date = new Date(dateStr);
    let formatedDate = date.toLocaleDateString('en-US', { day: 'numeric'})
                + ' '+ date.toLocaleDateString('en-US', {month: 'long'}) 
                +' '+ date.toLocaleDateString('en-US', {year: 'numeric'});

    return formatedDate;
}
formateDate('2022-03-05');

function getSelectorPost(selector, all=false) {
    if(all) {
        return postContainer.querySelectorAll(selector);
    } else {
        return postContainer.querySelector(selector);
    }
}

function displayPost(el, postID='') {
    navigationEl.querySelector('.active').classList.remove('active');
    el.classList.add('active');

    if(postID == '') {
        postID = `post${el.getAttribute('value')}`; 
        console.log(postID);
    }
    
    let currentActivePost = getSelectorPost('.active');
    console.log(currentActivePost);
    currentActivePost.classList.remove('active');
    document.getElementById(postID).classList.add('active');
};

function getBlogDetails(el) {
    postID = el.parentNode.getAttribute('id');
    console.log(postID);
    navID = postID.slice(-1);
    console.log(navID);

    Array.from(navigationEl.children).every(child => {
        if(child.getAttribute('value') == navID) {
            let navEl = child;
            displayPost(navEl, postID);
            return false;
        }
        else return true;
    })
     
}

function searchPost() {
    console.log(searchEl.value);
    let keyWord = searchEl.value;

    if(keyWord.trim()){
        
        console.log('he he');

        postsTitle = getSelectorPost('.post-title', true);
        console.log(postsTitle);

        Array.from(postsTitle).every(title => {
            if(title.innerText.toLowerCase().includes(keyWord.toLowerCase())) {
                getBlogDetails(title);
                return false;
            } else 
                console.log('sc')
                return true;
        })
    }

}


searchBtn.addEventListener('click', () => {
    searchEl.classList.add('search-input');
});

searchEl.addEventListener('keydown', event => {
    if(event.key == 'Enter')
        searchPost();
})







// let date = new Date();
let date = new Date('2022-03-05');
console.log(date);
console.log(date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }));

// window.addEventListener('keydown', event => {
//     console.log(event.key);
// });


