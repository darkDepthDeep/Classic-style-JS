const timer = (id, deadline) => {           // id- ргумент это мы говорим в какую область, в какой элемент мы будем рендерить наш таймер, deadline это до какого времени у нас будет идти таймер

    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endtime) => {         // endTime - это конечное время. Эта функция по подсчету времени и возвращение его
        const t = Date.parse(endtime) - Date.parse(new Date()),     // мы от установленного нашего времени endTime отнимаем наше время сейчас все это в миллисекундах
              seconds = Math.floor((t/1000) % 60),    // таким образом мы посчитаем количество минут которое будет внутри нашего времени t и у нас отсюда вернется хвостик и это тот хвостик который будет уменьшатся на одну секунду каждый промежуток времени. Таким образом мы получили количество секунд которое нам необходимо показать в таймере
              minutes = Math.floor((t/1000/60) % 60),
              hours = Math.floor((t/(1000 * 60 * 60)) % 24),            // такми образом мы получаем часы
              days = Math.floor((t/(1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),      // мы ищем в timer уникальный идентификатор days
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);    // через каждую одну секунду будет обновляться время

        updateClock();      // это для того чтобы при перезагрузке страницы у нас не показывалось время которое было в верстке

        function updateClock() {            // Эта функция нужна для того чтобы каждую секунду устанавливать новое время
            const t = getTimeRemaining(endtime);   // getTimeRemaining служит для того чтобы узнать а сколько времени у нас осталось до конца

            days.textContent = addZero(t.days);      // это мы уже выводим на экран наши дни и так далее
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = '00';      // это мы уже выводим на экран наши дни и так далее
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval);    // это для того чтобы остановить наше время
            }

        }
    };
    setClock(id, deadline);
};

export default timer;