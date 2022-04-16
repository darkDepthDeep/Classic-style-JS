import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
        const windowForm = document.querySelectorAll('.balcon_icons_img'),
              windowWidth = document.querySelectorAll('#width'),        // мы берем querySelectorAll для того чтобы создался массив и отработал правильно метод forEach
              windowHeight = document.querySelectorAll('#height'),
              windowType = document.querySelectorAll('#view_type'),
              windowProfile = document.querySelectorAll('.checkbox');

        // ниже мы валидируем наши input чтобы вводились только цифры 

        checkNumInputs('#width');
        checkNumInputs('#height');

        function bindActionToElems (event, elem, prop) {
            elem.forEach((item, i) => {
                item.addEventListener(event, () => {
                    switch(item.nodeName) {              // мы передаем строку которая точно будет знать какая сейчас нода. Имя нашей ноды. Когда мы используем nodeName  у нас названия приходят в верхнем регистре
                        case 'SPAN' :                   // если case у нас будет SPAN, то после двоеточия будем выполнять команду
                            state[prop] = i;            // здесь мы в prop записываем номер этого изображения
                            break;                      // обязательная директива break для того чтобы дальше не шёл код
                        case 'INPUT' :                   // так как у нас есть два input это checkbox и поле ввода то мы запишем условие
                            if (item.getAttribute('type') === 'checkbox') {
                                i === 0 ? state[prop] = 'Холодное' : state[prop] = 'теплое';          // У нас всего два чекбокса если мы кликнули в первый то есть i === 0, то будет в при помощи тернарного оператора записывать в prop = "холодное" а если нет то мы в prop будем записывать теплое
                                elem.forEach((box, j) => {          // метод перебора для того чтобы установить только одну галочку на чекбокс
                                    box.checked = false;            // мы удаляем все галочки
                                    if (i == j) {                   // если мы кликнули на первый чекбокс i то он будет равен порядковому номеру j то
                                        box.checked = true;         // мы устанавливаем checked true
                                    }
                                }); 
                            } else {
                                state[prop] = item.value;           // здесь мы работаем с инпутами, поэто мы берем их value и записываем в prop
                            }
                            break;
                        case 'SELECT' :
                            state[prop] = item.value;               // мы работаем с селектом а там есть value поэтому этот value и записываем в prop
                            break;
                    }

                    console.log(state);
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