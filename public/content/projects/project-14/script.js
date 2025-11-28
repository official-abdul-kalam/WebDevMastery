async function searchMovie() {
    const query = document.getElementById('movieInput').value;
    const container = document.getElementById('movieContainer');

    if (!query) return;

    container.innerHTML = '<p>Searching...</p>';

    try {
        // TVMaze API (Free, No Key)
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const data = await response.json();

        container.innerHTML = ""; // Clear loading text

        if (data.length === 0) {
            container.innerHTML = '<p>No movies found!</p>';
            return;
        }

        data.forEach(item => {
            const show = item.show;
            // Agar image nahi hai to placeholder lagao
            const image = show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image';

            const html = `
                <div class="movie-card">
                    <img src="${image}" alt="${show.name}">
                    <div class="movie-info">
                        <h3>${show.name}</h3>
                        <span class="rating">⭐ ${show.rating.average || 'N/A'}</span>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Something went wrong!</p>';
    }
}
