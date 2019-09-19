export const inputProcessing = {
    getClearInputValue
};

// удаляем пробелы и тире
function getClearInputValue(value) {

    let step1 = value.replace(/-/g, "");
    let step2 = step1.replace(/ /g, "");
    return step2.replace(/_/g, "");
}


