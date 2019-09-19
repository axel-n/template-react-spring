export const parseDataToEnum = {
    getRegionCode,
};

function getRegionCode(regionString) {

    let partsString = regionString.split(" ");

    // берем самое длинное значение (название города или области)
    let value = partsString
        .sort((currentItem, nextItem) => nextItem.length - currentItem.length)
        .shift();

    return Object.entries(mapRegion)
        .filter(pair => pair[1].includes(value))
        .map(pair => pair[0])[0];
}

// пока не работает из-за того, что приходит разный формат данных от dadata
// например
/*
"data": {
    "country": "Россия",
    "house": null,
    "block": null,
    "flat": null,
    "postal_code": "452045",
    "region_with_type": "респ Башкортостан",
    "area_with_type": "Бижбулякский р-н",
    "city_with_type": null,
    "city_district_with_type": null,
    "street_with_type": null
},
"unrestricted_value": "респ Башкортостан, Бижбулякский р-н, село Менеуз-Москва"
 */

/*
"data": {
    "country": "Россия",
    "house": "25",
    "block": null,
    "flat": null,
    "postal_code": "108828",
    "region_with_type": "г Москва",
    "area_with_type": "поселение Краснопахорское",
    "city_with_type": "г Москва",
    "city_district_with_type": null,
    "street_with_type": "ул Ленина"
},
"unrestricted_value": "г Москва, поселение Краснопахорское, село Красная Пахра, ул Ленина, д 25"
 */

// function getTypeSettlement(regionString) {
//
//     console.log(regionString);
//
//     let isContainsCommas = regionString.match(",");
//     let partsLastElement = [];
//     if (isContainsCommas) {
//
//         let partsString = regionString.split(",");
//         console.log(partsString);
//
//         let lastString = partsString[partsString - 1];
//         console.log(lastString);
//         partsLastElement = lastString.split(" ");
//     } else {
//         partsLastElement = regionString.split(" ");
//     }
//
//     // берем самое меньшее значение (название города или области)
//     let value = partsLastElement
//         .sort((currentItem, nextItem) =: " currentItem.length - nextItem.length)
//         .shift();
//
//     return mapTypeSettlement[value];
// }


// const mapTypeSettlement = {
//     "г": "CITY",
//     "пл": "POCELOK",
//     "с": "SETTLEMENT",
//     "д": "WORKING VILLAGE",
//     "ст": "STANICA",
//     "село": "SELO",
// };


const mapRegion = {
    "MOSCOW": "Москва (Город)",
    "ST_PET": "Санкт-Петербург (Город)",
    "ADIGEA": "Адыгея (Республика)",
    "ALTAI": "Алтай (Республика)",
    "ALTA": "Алтайский (Край)",
    "AMYRSK": "Амурская (Область)",
    "ARHANG": "Архангельская (Область)",
    "ASTRAX": "Астраханская (Область)",
    "BAI": "Байконур (Город)",
    "BASHKOR": "Башкортостан (Республика)",
    "BELGOROD": "Белгородская (Область)",
    "BRANSK": "Брянская (Область)",
    "BYRAT": "Бурятия (Республика)",
    "VLADIM": "Владимирская (Область)",
    "VOLGOGR": "Волгоградская (Область)",
    "VOLOGODSK": "Вологодская (Область)",
    "VORON": "Воронежская (Область)",
    "DAGESTAN": "Дагестан (Республика)",
    "EVR": "Еврейская (Автономная область)",
    "ZABAIKAL": "Забайкальский (Край)",
    "IVAN": "Ивановская (Область)",
    "INGUSHET": "Ингушетия (Республика)",
    "IRKYTSK": "Иркутская (Область)",
    "KABARDINO": "Кабардино-Балкарская (Республика)",
    "KALININGR": "Калининградская (Область)",
    "KALMIK": "Калмыкия (Республика)",
    "KALY": "Калужская (Область)",
    "KAMCHATSK": "Камчатский (Край)",
    "KARACHAEV": "Карачаево-Черкесская (Республика)",
    "KARELIA": "Карелия (Республика)",
    "KEMEROV": "Кемеровская (Область)",
    "KIROV": "Кировская (Область)",
    "KOMI": "Коми (Республика)",
    "COSTR": "Костромская (Область)",
    "KRASHODAR": "Краснодарский (Край)",
    "KRASNOYAR": "Красноярский (Край)",
    "KRIM": "Крым (Республика)",
    "KYRGAN": "Курганская (Область)",
    "KYRSK": "Курская (Область)",
    "LENIN": "Ленинградская (Область)",
    "LIPET": "Липецкая (Область)",
    "MAGAD": "Магаданская (Область)",
    "MARI": "Марий Эл (Республика)",
    "MORDOVIA": "Мордовия (Республика)",
    "MO": "Московская (Область)",
    "MYRMAN": "Мурманская (Область)",
    "NEN": "Ненецкий (Автономный округ)",
    "NIJEGOROD": "Нижегородская (Область)",
    "NOVGOROD": "Новгородская (Область)",
    "NOVOSIB": "Новосибирская (Область)",
    "OMSK": "Омская (Область)",
    "ORENB": "Оренбургская (Область)",
    "ORL": "Орловская (Область)",
    "PENZENSK": "Пензенская (Область)",
    "PERM": "Пермский (Край)",
    "PRIMORSK": "Приморский",
    "PSKOVSK": "Псковская (Область)",
    "ROSTOV": "Ростовская (Область)",
    "RAZAN": "Рязанская (Область)",
    "SAMAR": "Самарская (Область)",
    "SARATOV": "Саратовская (Область)",
    "SAXA": "Саха/Якутия (Республика)",
    "SAHALINSK": "Сахалинская (Область)",
    "SEVASTOP": "Севастополь (Город)",
    "SVERDLOVSK": "Свердловская (Область)",
    "SEV_OS": "Северная Осетия-Алания (Республика)",
    "SMOLENSK": "Смоленская (Область)",
    "STAVR": "Ставропольский (Край)",
    "TAMBOV": "Тамбовская (Область)",
    "TATAR": "Татарстан (Республика)",
    "TVERSK": "Тверская (Область)",
    "TOMSK": "Томская (Область)",
    "TYLSK": "Тульская (Область)",
    "TIVA": "Тыва (Республика)",
    "TYMEN": "Тюменская (Область)",
    "YDMYR": "Удмуртская (Республика)",
    "YLANOV": "Ульяновская (Область)",
    "XABAROV": "Хабаровский (Край)",
    "XAKASIA": "Хакасия (Республика)",
    "XAN": "Ханты-Мансийский Автономный округ-Югра (Автономный округ)",
    "CHELAB": "Челябинская (Область)",
    "CHECHEN": "Чеченская (Республика)",
    "CHYKOT": "Чукотский (Автономный округ)",
    "CHYVA": "Чувашская Республика (Республика)",
    "YAM_NEN": "Ямало-Ненецкий (Автономный округ)",
    "YAROSLAV": "Ярославская (Область)",
};

