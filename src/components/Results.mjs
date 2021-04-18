// crawl된 list를 패치하여 40개씩 보여줍니다.
// 마지막에 다달으면 새로운 40개를 패치합니다.
// 각 상품에 정보를 입력합니다.

const getNewResults = (targetElement, state) => {
    const {
        data: { results },
    } = state;
    const fragment = document.createDocumentFragment();
    for (const result of results) {
        const { title, price, lastPrice, priceHistory, imgUrl, url } = result;
        const element = targetElement.cloneNode(true);
        element.querySelector('.price_title').textContent = title;
        element.querySelector('.price_thumb > img').src = imgUrl;
        element.querySelector(
            '.price_last_price',
        ).textContent = `${lastPrice} 원`;
        element.querySelector(
            '.price_current_price',
        ).textContent = `${price} 원`;

        fragment.appendChild(element);
    }
    return fragment;
};

const Results = (targetElement, state) => {
    const element = targetElement.cloneNode(true);

    const resultElement = element.querySelector('.price_result');
    element.innerHTML = '';
    element.appendChild(getNewResults(resultElement, state));

    return element;
};

export default Results;
