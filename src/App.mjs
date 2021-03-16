import Api from './api.mjs';
import Header from './components/Header.mjs';
import Results from './components/Results.mjs';
import Switch from './components/Switch.mjs';
import Terms from './components/Terms.mjs';

// TODO; Result 무한 스크롤링 구현
// TODO; 크롤링 요청 버튼 구현하기
const App = function (props) {
    if (!new.target) return new App(props);
    // 싱글턴
    if (document.APP) return document.APP;
    document.APP = this;

    this.state = {
        data: null,
        loading: true,
        error: false,
    };
    this.$App = document.getElementById('App');

    this.Switch = new Switch({ $target: this.$App });

    this.Header = new Header({ $target: this.$App });

    this.Terms = new Terms({
        $target: this.$App,
        onLoadCrawlData: (term, page = 1)=>{
            Api.getCrawl(term, page).then((res)=>{
                this.setState({ data: res });
            });
        },
    });

    this.Result = new Results({
        $target: this.$App,
        data : null,
    });

    this.loadState();
};
App.prototype.saveState = function(){
    localStorage.setItem('appstate', JSON.stringify(this.state));
}
App.prototype.loadState = function(){
    const savedState = JSON.parse(localStorage.getItem('appstate'));
    if(savedState){
        this.setState(savedState);
        return true;   
    }
    return false;
}
App.prototype.setState = function (nextData) {
    for (const key of Object.keys(nextData)) {
        if (key in this.state) this.state[key] = nextData[key];
    }
    this.saveState();
    this.render();
};
App.prototype.render = function(){
    const { data } = this.state;
    this.Result.updateProps({ data });
};

export default App;
