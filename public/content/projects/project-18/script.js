const container = document.getElementById('content');
const loader = document.getElementById('loader');

let page = 1;

// Fake API call simulation
function getPosts() {
    return new Promise(resolve => {
        setTimeout(() => {
            const posts = [];
            for (let i = 0; i < 9; i++) {
                posts.push({
                    title: `Post #${(page - 1) * 9 + i + 1}`,
                    body: "This is some dummy content for the infinite scroll demo."
                });
            }
            resolve(posts);
        }, 1000);
    });
}

async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        container.appendChild(postEl);
    });
}

// Initial Load
showPosts();

// Scroll Event
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Agar hum bottom ke paas hain
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

function showLoading() {
    loader.classList.add('show');

    setTimeout(() => {
        page++;
        showPosts();
        loader.classList.remove('show');
    }, 1000);
}
