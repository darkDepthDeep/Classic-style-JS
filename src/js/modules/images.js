const images = () => {
    const imgPopup = document.createElement('div'),             // мы создаем новый блок div
          workSection = document.querySelector('.works'),       // мы получаем обертку наших img
          bigImage = document.createElement('img');             // создаем изображение img

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';        // установили none потому что скрыто изображение, дальше в обработчике событий после кликак мы поставим display: flex

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;              // мы устанавливаем e.target потому что мы вешае обработчик события на общую секцию где находится много изображений

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');      // мы обращаемся к таргету это тот элемент на котором произошло событие, далее мне надо обратиться к его родителю parentNode и получаем аттрибут href
            bigImage.setAttribute('src', path);                       // мы в bigImage добавляем имя аттрибута 'src' и его значение path
            document.body.style.overflow = 'hidden';
            bigImage.style.width = '500px';
        }

        if (target && target.matches('div.popup')) {            // простым языком сказано если мы кликнули на подложку то мы скрываем наш imgpopup
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
};

export default images;