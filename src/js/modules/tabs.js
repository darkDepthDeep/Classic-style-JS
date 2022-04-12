const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    function hideTabContent() {                   // функция по скрытию всех табов
        content.forEach(item => {
            item.style.display = 'none';            // мы перебираем content и скрываем абсолютно весь контент
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);     // будет скрывать класс активности у ненужных табов
        });
    }

    function showTabContent(i = 0) {                  // функция по показу определенного таба табов. Аргумент i будет следить на какой по счету таб нажал пользователь. Мы нолик передаем в функцию showTabContent вместо i и content и tab под индексом ноль станут активными по умолчанию если в вызове функции не указан параметр
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {       // мы навешиваем обработчик события на область header где находятся все табы
        const target = e.target;                // e.target это тот элемент на котором произошло событие, то есть то куда кликнул пользователь.
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, '')) ||                          // здесь мы проверяем пользователь кликнул на tabSelector? и при помощи регулярного выражения tabSelector убрали точку так как в tabSelector мы будем передавать класс с точкой а в ClassList мы передаем класс уже без точки так как он уже знает что это класс, и вторым аргументом мы заменили её на пустую строку() то есть ничего.
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {            // здесь мы проверяем при помощи parentNode что у tabSelector его родителя мы кликнули        
                tab.forEach((item, i) => {                  // мы перебираем tab и передаем в item и после этого передаем туда второй аргумент i а это уже номер элемента который мы перебираем
                    if (target == item || target.parentNode == item) {              // если пользователь кликнул на перебираемый item или кликнул на его родителя то,
                        hideTabContent();
                        showTabContent(i);          
                    }
                });
        }
    });
};

export default tabs;