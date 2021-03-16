const Switch = function ({ $target }) {
    this.state = {
        darkMode: false,
    };

    this.$Switch = document.createElement('div');
    this.$Switch.className = 'Switch';
    $target.appendChild(this.$Switch);

    // 다크모드 데이터가 로컬저장소에 이미 있다면 그 값을
    // 없다면 os프리퍼런스를 따른다
    if (!this.loadState()) {
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? true
            : false;
        this.setState({ darkMode });
    }

    this.render();
};
Switch.prototype.loadState = function () {
    const savedState = JSON.parse(localStorage.getItem('SwitchState'));
    if (savedState) {
        this.setState(savedState);
        return true;
    }
    return false;
};
Switch.prototype.saveState = function () {
    try {
        localStorage.setItem('SwitchState', JSON.stringify(this.state));
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};
Switch.prototype.setState = function (nextData) {
    for (const key of Object.keys(nextData)) {
        if (key in this.state) this.state[key] = nextData[key];
    }
    this.saveState();
    this.render();
};
Switch.prototype.render = function () {
    const { darkMode } = this.state;
    this.$Switch.innerHTML = ``;

    if (darkMode) {
        document.documentElement.setAttribute('color-mode', 'dark');
    } else {
        document.documentElement.setAttribute('color-mode', 'light');
    }

    this.$Switch.innerHTML = `
        <button id="btDarkMode">
            다크모드 ${darkMode ? 'OFF' : 'ON'}
        </button>
    `;
    const $btDarkMode = document.getElementById('btDarkMode');
    $btDarkMode.addEventListener('click', () => {
        console.info(`다크모드 ${darkMode ? 'OFF' : 'ON'}`);
        this.setState({ darkMode: darkMode ? false : true });
    });
};

export default Switch;
