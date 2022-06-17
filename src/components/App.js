import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <>
      <div class="root">
        <Header />
        <Main />
        <Footer />
        <div class="popup popup_type_profile">
          <form name="edit-profile-form" class="popup__container popup__container_type_form" novalidate>
            <button type="button" class="popup__close-button"></button>
            <h2 class="popup__title">Редактировать профиль</h2>
            <input id="name" class="popup__text-input popup__text-input_order_first popup__text-input_type_author" type="text" minlength="2" maxlength="40" required />
            <span class="popup__error popup__error_type_name popup__error_order_first"></span>
            <input id="about" class="popup__text-input popup__text-input_order_next popup__text-input_type_description" type="text" minlength="2" maxlength="200" required />
            <span class="popup__error popup__error_type_about popup__error_order_second"></span>
            <button type="submit" class="popup__submit-button">Сохранить</button>
          </form>
        </div>
        <div class="popup popup_type_card">
          <form name="add-card-form" class="popup__container popup__container_type_form" novalidate>
            <button type="button" class="popup__close-button"></button>
            <h2 class="popup__title">Новое место</h2>
            <input id="title" class="popup__text-input popup__text-input_order_first popup__text-input_type_picture-name" type="text" placeholder="Название" minlength="2" maxlength="30" required />
            <span class="popup__error popup__error_type_title popup__error_order_first"></span>
            <input id="link" class="popup__text-input popup__text-input_order_next popup__text-input_type_picture-path" type="url" placeholder="Ссылка на картинку" required />
            <span class="popup__error popup__error_type_link popup__error_order_second"></span>
            <button type="submit" class="popup__submit-button">Добавить</button>
          </form>
        </div>
        <div class="popup popup_type_image">
          <div class="popup__container popup__container_type_image">
            <button type="button" class="popup__close-button"></button>
            <img class="popup__image" src="/" alt="Картинка карточки" />
            <p class="popup__description">Test</p>
          </div>
        </div>
      </div>
      <div class="popup popup_type_confirm">
        <form name="confirm-form" class="popup__container popup__container_type_form">
          <button type="button" class="popup__close-button"></button>
          <h2 class="popup__title">Вы уверены?</h2>
          <button type="submit" class="popup__submit-button popup__submit-button_type_confirm">Да</button>
        </form>
      </div>
      <div class="popup popup_type_avatar">
        <form name="avatar-form" class="popup__container popup__container_type_form" novalidate>
          <button type="button" class="popup__close-button"></button>
          <h2 class="popup__title">Обновить аватар</h2>
          <input id="url" class="popup__text-input popup__text-input_order_first" type="url" placeholder="Ссылка на аватар" required />
          <span class="popup__error popup__error_type_url popup__error_order_first"></span>
          <button type="submit" class="popup__submit-button">Сохранить</button>
        </form>
      </div>
      <template id="card-template">
        <li class="elements__item">
          <img class="elements__image" src="/" alt="Картинка карточки" />
          <div class="elements__description">
            <p class="elements__title"></p>
            <div>
              <button type="button" class="elements__like"></button>
              <p class="elements__like-counter">7</p>
            </div>
          </div>
          <button type="button" class="elements__delete-button elements__delete-button_hidden"></button>
        </li>
      </template>
    </>
  );
}

export default App;
