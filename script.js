const newsContainer = document.getElementById('newsContainer');
const newsSearch = document.querySelector('.news-search');

let searchAny = 'ahmedabad';
newsSearch.addEventListener('submit',(event) => {
    event.preventDefault();
    let newsName = document.querySelector('.news_name');
    searchAny = newsName.value;
    dispalayArticles();
    searchAny.value = '';
})

const dispalayArticles = async () => { 
    const newsUrl = `https://gnews.io/api/v4/search?q=${searchAny}&lang=en&country=india&max=9&apikey=5a5eadf10bf5f8f542dd6e56f0d6de3f`;
    newsContainer.innerHTML = '';
    try {
        const res = await fetch(newsUrl);
        const data = await res.json();
        const article = data.articles;
        
        
        if (article.length === 0) {
            newsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        article.forEach(ele => {
            const item = document.createElement('div');
            item.classList.add('news-item');

            const image = document.createElement('img');
            image.src = ele.image;
            item.appendChild(image);


            const content = document.createElement('div');
            content.classList.add('news-content');

            const title = document.createElement('h2');
            title.textContent = ele.title;

            const des = document.createElement('p');
            const fullDes = des.textContent = ele.description || 'No Description Available';
            des.textContent = fullDes.length > 80 ? fullDes.substring(0,80) + '...' : fullDes;
            
            const btn = document.createElement('button');
            btn.classList.add('read-more');
            btn.textContent = 'Read-more..';
            btn.onclick = () => {
                window.location.href = ele.url;
            }

            content.appendChild(title);
            content.appendChild(des);
            content.appendChild(btn);
            item.appendChild(content);
            newsContainer.appendChild(item);
        });
    } catch (error) {
        newsContainer.innerHTML = "<p>❌ Failed to load news.</p>";
    };
}

dispalayArticles();