import './slider';
import modals from './modules/modal';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';

window.addEventListener('DOMContentLoaded', () => {         // DOMContentLoaded отвечаает за то что наши скрипты начинают  выполняться только тогда когда наша дом структура на странице готова.
    'use strict';

    let modalState = {};            // это состояние нашего модального окна

    changeModalState(modalState);   // во внутрь передаем текущий объект modalState
    modals();                                               // мы вызываем ту переменную которую импортировали
    tabs('.glazing_slider','.glazing_block', '.glazing_content', 'active');     // у active не ставим точку так как tab[i].classList.add(activeClass) и так знает что это класс
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms();
});        