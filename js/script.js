/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

document.querySelectorAll('.promo__adv img').forEach(item => item.remove());
document.querySelector('.promo__genre').textContent = 'Драма';
document.querySelector('.promo__bg').style.background = "url('img/bg.jpg')";

const movieList = document.querySelector('.promo__interactive-list');

function createMovieList() {
    movieList.innerHTML = '';
    movieDB.movies.sort();

    movieDB.movies.forEach((item, i) => {
        if (item.length > 21) {
            item = item.slice(0, 21) +'...';
        }

        movieList.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${item}
                <div class="delete"></div>
            </li>
        `;
    });
    movieList.querySelectorAll('.delete').forEach((item,i) => {
        item.addEventListener('click', () => {
            item.parentElement.remove();
            movieDB.movies.splice(i, 1);
            createMovieList();
        });
    });
}
createMovieList();

const formInput = document.querySelector('form.add');

formInput.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    while (formInput.querySelector('.adding__input').value != ''){
        movieDB.movies.push(formInput.querySelector('.adding__input').value);
        formInput.querySelector('.adding__input').value = '';
        if (formInput.querySelector('.yes').previousElementSibling.checked) {
            alert('Добавляем любимый фильм');
            formInput.querySelector('.yes').previousElementSibling.checked = false;
        }
        createMovieList();
    }
});



