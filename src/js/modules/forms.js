import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          modal = document.querySelector('.popup_calc_end');

    // ниже у нас валидация input чтобы были введены только числа.

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
    };

    // функция postData которая отвечает за отправку этого запроса =============================================================

    const postData = async (url, data) => {           // для запуска fetch нам понадобиться url адрес куда мы будем отправлять этот запрос, а также понадобятся данные data которые будут уходить на сервер. А так же мы говорим что внутри этой функции есть асинхронные операции
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {                  // в фигурных скобках мы будем настраивать запрос, что будет происходить при этом fetch. В переменную result будет записываться промис который нам вернется от сервера. А так же при помощи await он знает что нашему скрипту необходимо дождаться окончания этого запроса
            method: 'POST',
            body: data                          // это отправка определенных данных
        });

        return await res.text();                // теперь return ждет окончания выполнения операции res.text() и возвращает какой то конечный результат
    };

    // функция по очищениею всех input которые у нас есть

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';        // мы берем каждый item и его value ставим в пустое значение, то есть очищаем поле
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');         // Создаем новый блок div и помещаем его в переменную statusMessage
            statusMessage.classList.add('status');                     // мы добавили нашему новому блоку div класс status
            item.appendChild(statusMessage);                           // мы помещаем наш новый блок в конец нашей формы

            const formData = new FormData(item);                       // мы помещаем новый конструктор new FormData и во внутрь мы помещаем ту форму из которой мы хотим вытащить все данные
            if (item.getAttribute('data-calc') === 'end') {            // если наш дата атрибут будет равен энд, то
                for (let key in state) {
                    formData.append(key, state[key]);                   // append принимает два аргумента, первый это значение key а после этого ключ state[key]
                }
            }

            postData('assets/server.php', formData)                    // первым передаем файл сервера, а вторым наши данные
                .then(res => {                              // так как здесь возвращается промис мы прописываем цепочку, то есть говорим then, нам в этом then попадает какой-то результат который прислал нам сервер причем уже в текстовом формате из за return await res.text(). Говорим что возвращается какой то res
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)      // таким образом мы обрабатываем ошибку при помощи .catch
                .finally(() => {
                    clearInputs(); 
                    setTimeout(() => {
                        statusMessage.remove();                         // мы удаляем statusMessage со страницы
                    }, 5000);
                });

            setTimeout(() => {
                modal.style.display = 'none';
            }, 2000);
            
            for (let key in state) {
                delete state[key];
            }
        });
    });
};

export default forms;