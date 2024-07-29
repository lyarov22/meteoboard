function updateTime() {
    const now = new Date();

    // Опции для форматирования даты
    const dateOptions = {
        weekday: 'short', // сокращенное название дня недели (пн, вт и т.д.)
        day: 'numeric', // число месяца
        month: 'long' // полное название месяца
    };
    const formattedDate = now.toLocaleString('ru-RU', dateOptions);

    // Опции для форматирования времени
    const timeOptions = {
        hour: '2-digit', // часы в двузначном формате
        minute: '2-digit', // минуты в двузначном формате
        second: '2-digit' // секунды в двузначном формате
    };
    const formattedTime = now.toLocaleTimeString('ru-RU', timeOptions);

    // Соединяем дату и время
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;

    // Обновляем элемент с id 'time'
    document.getElementById('time').textContent = formattedDateTime;
}

setInterval(updateTime, 1000);

