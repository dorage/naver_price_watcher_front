// crawl된 list를 패치하여 40개씩 보여줍니다.
// 마지막에 다달으면 새로운 40개를 패치합니다.
// 각 상품에 정보를 입력합니다.
const Result = function ({ $target }) {
    this.props = arguments[0];

    this.$Result = document.createElement('div');
    this.$Result.className = 'Result';
    $target.appendChild(this.$Result);

    this.render();
};

Result.prototype.updateProps = function(nextData){

    for (const key of Object.keys(this.props)) {
        if (key in nextData) this.props[key] = nextData[key];
    }
    this.render();
};
Result.prototype.render = function(){
    const { data } = this.props;

    if(!data) {
        this.$Result.innerHTML = `
            로딩중...
        `;
        return;
    }
    console.log(data);
    this.$Result.innerHTML = `
        ${data.map(({
            title,
            mall,
            mall_url : mallUrl,
            memo,
            onTracking,
            prices,
            product_id : productId,
            img_url : imgUrl
        })=>`
            <div class="price_result">
                <div class="price_thumb">
                    <img src=${imgUrl}>
                </div>
                <div class="price_info">
                    <div class="price_title">
                        ${title}
                    </div>
                    <div class="price_price">
                        ${prices} 원
                    </div>
                </div>
                <div class="price_mall">
                    <a target="_" href="${mallUrl}">
                        <div>
                            쇼핑몰로 이동
                        </div>
                    </a>
                </div>
            </div>
        `).join('')}
    `;
};

export default Result;
