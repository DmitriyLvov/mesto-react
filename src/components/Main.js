import avatar from '../images/avatar.jpg'

function Main() {
    return (<main>
        <section>
            <div class="profile">
                <div class="avatar">
                    <img class="avatar__image" src={avatar} alt="Аватар" />
                    <div class="avatar__layout"></div>
                </div>
                <div class="profile__info">
                    <div class="profile__author-panel">
                        <h1 class="profile__text-field profile__text-field_type_author">Жак-Ив Кусто</h1>
                        <button type="button" class="profile__edit-button"></button>
                    </div>
                    <p class="profile__text-field profile__text-field_type_description">Исследователь океана</p>
                </div>
                <button type="button" class="profile__add-button"></button>
            </div>
            <ul class="elements">
            </ul>
        </section>
    </main>)
}

export default Main;