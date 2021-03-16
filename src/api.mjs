const request = async (url, option = {}) => {
    try {
        const res = await fetch(url, option);
        return res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

const baseUrl = 'http://localhost:4000/api';

const Api = {
    getTerm: () => request(`${baseUrl}/term`),
    postTerm: () => {},
    getCrawl: (term, page) => request(`${baseUrl}/crawl?term=${term}&page=${page}`),
    postCrawl: (term) => request(`${baseUrl}/crawl`, { method: 'POST' }),
    getMemo: (id) => request(`${baseUrl}/${id}/memo`),
    postMemo: (id) => request(`${baseUrl}/${id}/crawl`),
};

export default Api;
