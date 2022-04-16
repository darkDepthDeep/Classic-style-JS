const modals = (state) => {

    // modal 
    
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {          // эта функция будет отвечать за показ и скрытие модальных окон при нажатии на определенную ссылку. closeClickOverlay = true - если мы в closeClickOverlay не будем передавать аргумент то у нас по умолчанию модальное окно будет закрываться при клике на подложку, как только я сюда передам false это поведение должно поменяться
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        trigger.forEach(item => {                           // метод перебора forEach берем потому что мы получаем массив в const trigger = document.querySelectorAll(triggerSelector)
            item.addEventListener('click', (e) => {       // так как мы можем нажать на ссылку и чтобы она не открывалась в новом окне нам надо отменить стандартное поведение поэтому аргументом будет e(even)
                if (e.target) {                              // если у нас будет таргет на ссылке то мы отменяем стандартное поведение браузера
                    e.preventDefault();
                }

                if (modal.classList.contains('popup_calc_profile')) {
					if (!state.form || !state.width || !state.height) {
						item.removeEventListener();
					}
				}

				if (modal.classList.contains('popup_calc_end')) {
					if (!state.type || !state.profile) {
						item.removeEventListener();
					}
				}

                windows.forEach(item => {                   // здесь будут закрываться все модальные окна
                    item.style.display = 'none';
                });
    
                modal.style.display = 'block';                // так мы показываем модальное окно на странице
                document.body.style.overflow = 'hidden';      // мы скрываем прокрутку окна браузера когда у нас открыто модальное окно
                document.body.style.marginRight = `${scroll}px`;    // так мы нашему body marginRight устанавливаем равной ширине прокрутки
                // document.body.classList.add('modal-open');          // при подключенной библиотеке бутсрап href="assets/css/bootstrap.css мы можем заменить строку выше на открытие и закрытие модальных окон при помощи классов вот таким способом
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {                   // здесь будут закрываться все модальные окна
                item.style.display = 'none';
            });
            modal.style.display = 'none';                // так мы скрываем модальное окно на странице
            document.body.style.overflow = '';           // мы теперь показываем прокрутку окна браузера когда у нас закрыто модальное окно
            document.body.style.marginRight = `0px`;
            // document.body.classList.remove('modal-open');           // при подключенной библиотеке бутсрап href="assets/css/bootstrap.css мы можем заменить строку выше на открытие и закрытие модальных окон при помощи классов вот таким способом
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {                     // если e.target то есть тот элемент куда я кликнул будет строго равен тому элементу собственно на подложку модального окна и параметр если параметр который мы передаем будет true то в таком случае у нас выполниться функционал который находится ниже. А если у нас одно из условий не выполниться то и ниже функционал то же не будет выполняться
                modal.style.display = 'none';                // так мы скрываем модальное окно на странице
                document.body.style.overflow = '';           // мы теперь показываем прокрутку окна браузера когда у нас закрыто модальное окно
                document.body.style.marginRight = `0px`;
                // document.body.classList.remove('modal-open');           // при подключенной библиотеке бутсрап href="assets/css/bootstrap.css мы можем заменить строку выше на открытие и закрытие модальных окон при помощи классов вот таким способом
            }
        });
    }

    function showModalByTime(selector, time) {        // это функция которая будет показывать модальное окно после определенного времени нахождения на странице
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';    // мы по через определенное время нашему селектору задаем display = 'block'
            document.body.style.overflow = 'hidden';
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);     // помещаем наш вновь созданный блок в body

        let scrollWidth = div.offsetWidth - div.clientWidth;           // div.offsetWidth это полная ширина вместе с бордерами, div.clientWidth - это включает в себя только паддинги и самый главный контент который есть внутри (и главное что сюда не включается прокрутка)
        div.remove();           // после того как мы узнали ширину нашей прокрутки мы можем удалить этот блок, он нам уже не нужен

        return scrollWidth;     // мы будем возвращать полученное значение scrollWidth
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);    // false говорит о том что при клике на подложку у нас не будет закрываться модальное окно
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false); 
    // showModalByTime('.popup', 60000);
};

export default modals;