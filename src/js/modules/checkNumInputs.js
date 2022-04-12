const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');                  // регулярное выражение /\D/ говорит что мы ищем все не цифры и если такое находит то заменяет на пустую строку
        });
    });
};

export default checkNumInputs;