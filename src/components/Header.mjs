const Header = function ({ $target }) {
    this.$Header = document.createElement('div');
    this.$Header.className = 'Header';
    this.$Header.innerHTML = '가격 꽉 잡아!';
    $target.appendChild(this.$Header);
};

export default Header;
