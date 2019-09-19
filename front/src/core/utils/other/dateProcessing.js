export const dateProcessing = {
    getFormattedDateTime,
    convertDateTime,
    isValidDates,
    convertTimestampToDate,
    buildDateOnly
};

function getFormattedDateTime(timestamp) {
    if (timestamp) return new Date(timestamp).toLocaleString();
}

function convertTimestampToDate(timestamp) {

    let dateObj = new Date(timestamp);

    return dateObj.getFullYear() + "-" +
        convertSingleCharacterToDouble(dateObj.getMonth() + 1) + "-" +
        convertSingleCharacterToDouble(dateObj.getDate());
}

function convertDateTime(date) {
    // от клиента
    // 2019-03-18

    // нужно получить
    // 18.03.2019 00:00:00

    let parts = date.split('-');

    return parts[2] + "." + parts[1] + "." + parts[0] + " 00:00:00";
}

// проверяем, что дата окончания >= даты начала (если они обе заполнены)
function isValidDates(dateStartStr, dateFinishStr) {

    let dateStart, dateFinish;
    if (dateStartStr) dateStart = Date.parse(dateStartStr);
    if (dateFinishStr) dateFinish = Date.parse(dateFinishStr);

    if (dateStartStr && dateFinishStr && dateFinish >= dateStart) return true;
    else if (dateStartStr && !dateFinishStr) return true;
    else if (!dateStartStr && dateFinishStr) return true;

    return false;
}

function convertSingleCharacterToDouble(n) {
    return n<10 ? '0'+n : n;
}

//building date only (yyyy-MM-dd) out of date object
function buildDateOnly (date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate();
}