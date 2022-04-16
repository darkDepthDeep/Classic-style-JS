import './slider';
import modals from './modules/modal';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', () => {         // DOMContentLoaded отвечаает за то что наши скрипты начинают  выполняться только тогда когда наша дом структура на странице готова.
    'use strict';

    let modalState = {};            // это состояние нашего модального окна где пользователь что то выбирает
    let deadline = '2022-04-15';

    changeModalState(modalState);   // во внутрь передаем текущий объект modalState, то есть мы сможем модифицировать этот объект
    modals(modalState);                                               // мы вызываем ту переменную которую импортировали
    tabs('.glazing_slider','.glazing_block', '.glazing_content', 'active');     // у active не ставим точку так как tab[i].classList.add(activeClass) и так знает что это класс
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms(modalState);     // modalState помещаем в формы для того чтобы отправить объект - это тот объект который мы получили от пользователя при заполнении расчета в модальном окне
    timer('.container1', deadline);
    images();
});        