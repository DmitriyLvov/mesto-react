import logo from '../images/logo.svg';
function Header() {
    return (
        <header class="header">
            <img class="header__logo" src={logo} alt="Логотип" />
        </header>)
}

export default Header;