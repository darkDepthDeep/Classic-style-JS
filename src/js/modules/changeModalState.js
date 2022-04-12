import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
        const windowForm = document.querySelectorAll('.balcon_icons_img'),
              windowWidth = document.querySelectorAll('#width'),        // мы берем querySelectorAll для того чтобы создался массив и отработал правильно метод forEach
              windowHeight = document.querySelectorAll('#height'),
              windowType = document.querySelectorAll('.view_type'),
              windowProfile = document.querySelectorAll('.checkbox');

        // ниже мы валидируем наши input чтобы вводились только цифры 

        checkNumInputs('#width');
        checkNumInputs('#height');

        function bindActionToElems (event, elem, prop) {
            elem.forEach((item, i) => {
                item.addEventListener(event, () => {
                    switch(item.nodeName) {              // мы передаем строку которая точно будет знать какая сейчас нода. Имя нашей ноды. Когда мы используем nodeName  у нас названия приходят в верхнем регистре
                        case 'SPAN' :                   // если case у нас будет SPAN, то после двоеточия будем выполнять команду
                            console.log('span');
                            break;                      // обязательная директива break для того чтобы дальше не шёл код
                        case 'INPUT' :                   // так как у нас есть два input это checkbox и поле ввода то мы запишем условие
                            if (item.getAttribute('type') === 'checkbox') {
                                console.log('checkbox');
                            } else {
                                console.log('input');
                            }
                            break;
                        case 'SELECT' :
                            console.log('select');
                            break;
                    }
                });
            });
        }

        bindActionToElems('click', windowForm, 'form');
        bindActionToElems('input', windowHeight, 'height');
        bindActionToElems('input', windowWidth, 'width');
        bindActionToElems('change', windowType, 'type');        // событие change поддерживается как в select так и в cgeckbox
        bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;