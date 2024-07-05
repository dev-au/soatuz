export const API_DOMAIN = 'http://194.32.77.65:8006/'
export const Youtube = 'https://www.youtube.com/news_page'
export const Telegram = 'https://t.me/news_page'
export const X = 'https://x.com/news_page'
export const Instagram = 'https://instagram.com/news_page'
export const Facebook = 'https://facebook.com/news_page'


export function getCategories() {
    return fetch(API_DOMAIN + 'news/all-categories')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error("Failed to fetch categories:", error);
            return [];
        });
}


export function getLatestNews(count = 50, category = 'all') {
    return fetch(API_DOMAIN + 'news?count=' + count + '&category=' + category)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .catch(error => {
            console.error("Failed to fetch latest news:", error);
        })
}


export function getNewsDetail(news_id) {
    return fetch(API_DOMAIN + 'news/' + news_id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .catch(error => {
            console.error("Failed to fetch news detail:", error);
        })
}


export function getRecommendedNews(news_id) {
    return fetch(API_DOMAIN + 'news/rec/' + news_id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .catch(error => {
            console.error("Failed to fetch news detail:", error);
        })
}
