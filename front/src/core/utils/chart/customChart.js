import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import {getStyle, hexToRgba} from "@coreui/coreui/dist/js/coreui-utilities";

const brandInfo = getStyle('--info');

export const customChart = {
    getOptions,
    getData,
    generateLabelsDays,
    generateLabelsMonth,
    generateLabelsHour,
    generateLabelsMinute,

};

function getOptions(maxValue) {

    return {
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
                labelColor: function (tooltipItem, chart) {
                    return {backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor}
                }
            }
        },
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawOnChartArea: false,
                    },
                }],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(maxValue / 5),
                        max: maxValue,
                    },
                }],
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            },
        },
    };
}

function getData(labelsCommon, label1, data1) {

    return {
        labels: labelsCommon,
        datasets: [
            {
                label: label1,
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: data1
            },
        ],
    };
}

function generateLabelsDays(countLabels) {

    let labels = [];

    let start = new Date();
    start.setDate(start.getDate() - countLabels);

    for (let i = 0; i < countLabels; i++) {
        labels.push(Math.abs(start.getDate()));
        start.setDate(start.getDate() + 1);
    }

    return labels;
}

function generateLabelsMonth(countMonth) {

    let labels = [];
    let start = new Date();
    let month;
    start.setMonth(start.getMonth() - countMonth + 1);

    for (let i = 0; i < countMonth; i++) {
        month = start.getMonth();
        // in js december return 0 for december
        if (month === 0) month = 12;

        labels.push(Math.abs(month));
        start.setMonth(start.getMonth() + 1);
    }

    return labels;
}

function generateLabelsHour() {

    let labels = [];
    let start = new Date();

    start.setMinutes(start.getMinutes() - 60);

    for (let i = 0; i < 60; i++) {
        labels.push(start.getMinutes());
        start.setMinutes(start.getMinutes() + 1);
    }

    return labels;
}


function generateLabelsMinute() {

    let labels = [];
    let start = new Date();
    start.setSeconds(start.getSeconds() - 60);

    for (let i = 0; i < 60; i++) {
        labels.push(Math.abs(start.getSeconds()));
        start.setSeconds(start.getSeconds() + 1);
    }

    return labels;
}


