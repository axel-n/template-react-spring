export const numberProcessing = {
    formatNumber
};

// преобразование больших чисел в число, раздленное по запятыми по составу
// например, число 123456 => 123, 456
function formatNumber(num) {
    if (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1'`)
    }
}