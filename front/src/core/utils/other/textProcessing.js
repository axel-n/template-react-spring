export const textProcessing = {
    printPhoneFormatted,
};

function printPhoneFormatted(phone) {

    if (phone) {

        let value = phone.toString();
        return value.substring(0, 3) + " " + value.substring(3, 6) + "-" + value.substring(6, 10)
    }
}