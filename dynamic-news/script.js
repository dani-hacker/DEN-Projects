// API is from Gnews 
const API_KEY = 'abb91af1e4757e2919a478404051f945';


const API_URL = `https://gnews.io/api/v4/top-headlines?topic=world&token=${API_KEY}`;

const newsContainer = document.getElementById('news-container');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');


async function fetchNews() {
    try {
        
        loader.style.display = 'block';
        errorMessage.textContent = '';
        
        // This makes API request
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === "error") {
            throw new Error(`API Error: ${data.message}`);
        }
        
        const articles = data.articles;
        
        loader.style.display = 'none';
        
        renderArticles(articles);

    } catch (error) {
        console.error('Failed to fetch news:', error);
        loader.style.display = 'none'; 
        errorMessage.textContent = 'Failed to load news. Please try again later. It is possible your API key has expired or is incorrect.';
    }
}

function renderArticles(articles) {
    newsContainer.innerHTML = '';
    
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = '<p>No articles found. Please try another topic or refresh.</p>';
        return;
    }

    articles.forEach(article => {
        const articleCard = document.createElement('a');
        articleCard.href = article.url;
        articleCard.target = "_blank";
        articleCard.classList.add('news-article');
        
        if (!article.title || !article.description || !article.url) {
            return;
        }

        const title = article.title;
        const description = article.description;
        const imageUrl = article.image; 
        const sourceName = article.source.name;
        
        articleCard.innerHTML = `
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="article-image" onerror="this.onerror=null;this.src='https://placehold.co/600x400/3d5a80/ffffff?text=Image+Unavailable';">` : ''}
            <div class="article-content">
                <h2>${title}</h2>
                <p class="article-source">Source: ${sourceName}</p>
                <p>${description}</p>
            </div>
        `;
        
        newsContainer.appendChild(articleCard);
    });
}

document.addEventListener('DOMContentLoaded', fetchNews);
