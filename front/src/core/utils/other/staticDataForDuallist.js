export const staticDataForDuallist = {
    availableTypes
};

function availableTypes() {
    return [
        {label: 'Agent authorization', value: 'AGENT_AUTHORIZATION'},
        {label: 'Purchase', value: 'PURCHASE'},
        {label: 'Purchase cash back', value: 'PURCHASE_CASH_BACK'},
        {label: 'Authorization', value: 'AUTHORIZATION'},
        {label: 'Authorization confirmation', value: 'AUTHORIZATION_CONFIRMATION'},
        {label: 'Withdrawal', value: 'WITHDRAWAL'},
        {label: 'Accrual', value: 'ACCRUAL'},
        {label: 'Transfer', value: 'TRANSFER'},
        {label: 'Balance', value: 'BALANCE'},
        {label: 'Statement', value: 'STATEMENT'},
        {label: 'Bank transfer', value: 'BANK_TRANSFER'},
        {label: 'Customer validation', value: 'CUSTOMER_VALIDATION'},
        {label: 'Close shift', value: 'CLOSE_SHIFT'},
        {label: 'Close shift no upload', value: 'CLOSE_SHIFT_NO_UPLOAD'},
        {label: 'Batch upload', value: 'BATCH_UPLOAD'},
        {label: 'Batch upload finish', value: 'BATCH_UPLOAD_FINISH'},
        {label: 'Close shift finish', value: 'CLOSE_SHIFT_FINISH'},
        {label: 'Stop card', value: 'STOP_CARD'},
        {label: 'Get limit', value: 'GET_LIMIT'},
        {label: 'Set limit', value: 'SET_LIMIT'},
        {label: 'Pin change', value: 'PIN_CHANGE'},
        {label: 'P2p', value: 'P2P'},
        {label: 'Generate cash code', value: 'GENERATE_CASH_CODE'},
        {label: 'Cash in', value: 'CASH_IN'},
        {label: 'Cash out', value: 'CASH_OUT'},
        {label: 'Cash out by code', value: 'CASH_OUT_BY_CODE'},
        {label: 'Refund', value: 'REFUND'},
        {label: 'Pin wk change', value: 'PIN_WK_CHANGE'},
        {label: 'Mac wk change', value: 'MAC_WK_CHANGE'},
        {label: 'Generate token', value: 'GENERATE_TOKEN'},
        {label: 'Stop token', value: 'STOP_TOKEN'},
        {label: 'Renew token', value: 'RENEW_TOKEN'},
        {label: 'Fee calculation', value: 'FEE_CALCULATION'},
        {label: 'Services', value: 'SERVICES'},
        {label: 'Payment', value: 'PAYMENT'},
        {label: 'Reversal', value: 'REVERSAL'},
        {label: 'Status', value: 'STATUS'},
        {label: 'Custom', value: 'CUSTOM'},
        {label: 'Account info', value: 'ACCOUNT_INFO'}
    ];
}