import api from '../api.mjs';
// Term을 받아와서 뿌려줍니다.
// Term을 추가하는 버튼이 있고 클릭하면 비밀번호와 새로운 term을 입력할 수 있는 인풋이 있습니다.
// term이 입력된 후 다시 불러옵니다.
const Terms = function ({ $target }) {
    this.props = arguments[0];
    this.state = {
        selected: '',
        data: null,
        loading: true,
        error: false,
    };

    this.$Terms = document.createElement('div');
    this.$Terms.className = 'Terms';
    this.$Terms.textContent = 'Terms';
    $target.appendChild(this.$Terms);

    this.onLoadTerms();
    this.render();
};
Terms.prototype.onLoadTerms = function () {
    this.setState({ loading: true });
    api.getTerm().then((res) =>
        this.setState({ data: res.terms, loading: false }),
    );
};
Terms.prototype.setState = function (nextData) {
    for (const key of Object.keys(nextData)) {
        if (key in this.state) this.state[key] = nextData[key];
    }
    this.render();
};
Terms.prototype.render = function () {
    const { onLoadCrawlData } = this.props;
    const { selected, data, loading } = this.state;
    this.$Terms.innerHTML = '';

    if (loading) {
        this.$Terms.innerHTML = `
            로딩중...
        `;
        return;
    }

    const $fragment = document.createDocumentFragment();
    for (const term of data) {
        const $term = document.createElement('div');
        // 클릭하면 크롤링 불러오는 펑션 호출
        $term.className = 'term';
        $term.textContent = `#${term}`;
        $term.addEventListener('click', () => {
            if (term === selected) return;
            this.setState({ selected: term });
            onLoadCrawlData(term);
        });
        if (term === selected) {
            $term.style.color = 'red';
        }
        $fragment.appendChild($term);
    }
    this.$Terms.appendChild($fragment);
};

export default Terms;
