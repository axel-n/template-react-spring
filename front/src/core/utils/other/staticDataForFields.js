import React from 'react';
import {t} from "ttag";

export const staticDataForFields = {
    availableRegion,
    availableCityType,
    availableStreetType,
    availableBFROOcode
};

function availableRegion() {

    return (
        <>
            <optgroup label={t`Popular`}>
                <option value="MOSCOW">Москва (Город)</option>
                <option value="ST_PET">Санкт-Петербург (Город)</option>
            </optgroup>

            <optgroup label={t`Other`}>
                <option value="ADIGEA">Адыгея (Республика)</option>
                <option value="ALTAI">Алтай (Республика)</option>
                <option value="ALTA">Алтайский (Край)</option>
                <option value="AMYRSK">Амурская (Область)</option>
                <option value="ARHANG">Архангельская (Область)</option>
                <option value="ASTRAX">Астраханская (Область)</option>
                <option value="BAI">Байконур (Город)</option>
                <option value="BASHKOR">Башкортостан (Республика)</option>
                <option value="BELGOROD">Белгородская (Область)</option>
                <option value="BRANSK">Брянская (Область)</option>
                <option value="BYRAT">Бурятия (Республика)</option>
                <option value="VLADIM">Владимирская (Область)</option>
                <option value="VOLGOGR">Волгоградская (Область)</option>
                <option value="VOLOGODSK">Вологодская (Область)</option>
                <option value="VORON">Воронежская (Область)</option>
                <option value="DAGESTAN">Дагестан (Республика)</option>
                <option value="EVR">Еврейская (Автономная область)</option>
                <option value="ZABAIKAL">Забайкальский (Край)</option>
                <option value="IVAN">Ивановская (Область)</option>
                <option value="INGUSHET">Ингушетия (Республика)</option>
                <option value="IRKYTSK">Иркутская (Область)</option>
                <option value="KABARDINO">Кабардино-Балкарская (Республика)</option>
                <option value="KALININGR">Калининградская (Область)</option>
                <option value="KALMIK">Калмыкия (Республика)</option>
                <option value="KALY">Калужская (Область)</option>
                <option value="KAMCHATSK">Камчатский (Край)</option>
                <option value="KARACHAEV">Карачаево-Черкесская (Республика)</option>
                <option value="KARELIA">Карелия (Республика)</option>
                <option value="KEMEROV">Кемеровская (Область)</option>
                <option value="KIROV">Кировская (Область)</option>
                <option value="KOMI">Коми (Республика)</option>
                <option value="COSTR">Костромская (Область)</option>
                <option value="KRASHODAR">Краснодарский (Край)</option>
                <option value="KRASNOYAR">Красноярский (Край)</option>
                <option value="KRIM">Крым (Республика)</option>
                <option value="KYRGAN">Курганская (Область)</option>
                <option value="KYRSK">Курская (Область)</option>
                <option value="LENIN">Ленинградская (Область)</option>
                <option value="LIPET">Липецкая (Область)</option>
                <option value="MAGAD">Магаданская (Область)</option>
                <option value="MARI">Марий Эл (Республика)</option>
                <option value="MORDOVIA">Мордовия (Республика)</option>
                <option value="MO">Московская (Область)</option>
                <option value="MYRMAN">Мурманская (Область)</option>
                <option value="NEN">Ненецкий (Автономный округ)</option>
                <option value="NIJEGOROD">Нижегородская (Область)</option>
                <option value="NOVGOROD">Новгородская (Область)</option>
                <option value="NOVOSIB">Новосибирская (Область)</option>
                <option value="OMSK">Омская (Область)</option>
                <option value="ORENB">Оренбургская (Область)</option>
                <option value="ORL">Орловская (Область)</option>
                <option value="PENZENSK">Пензенская (Область)</option>
                <option value="PERM">Пермский (Край)</option>
                <option value="PRIMORSK">Приморский</option>
                <option value="PSKOVSK">Псковская (Область)</option>
                <option value="ROSTOV">Ростовская (Область)</option>
                <option value="RAZAN">Рязанская (Область)</option>
                <option value="SAMAR">Самарская (Область)</option>
                <option value="SARATOV">Саратовская (Область)</option>
                <option value="SAXA">Саха/Якутия (Республика)</option>
                <option value="SAHALINSK">Сахалинская (Область)</option>
                <option value="SEVASTOP">Севастополь (Город)</option>
                <option value="SVERDLOVSK">Свердловская (Область)</option>
                <option value="SEV_OS">Северная Осетия-Алания (Республика)</option>
                <option value="SMOLENSK">Смоленская (Область)</option>
                <option value="STAVR">Ставропольский (Край)</option>
                <option value="TAMBOV">Тамбовская (Область)</option>
                <option value="TATAR">Татарстан (Республика)</option>
                <option value="TVERSK">Тверская (Область)</option>
                <option value="TOMSK">Томская (Область)</option>
                <option value="TYLSK">Тульская (Область)</option>
                <option value="TIVA">Тыва (Республика)</option>
                <option value="TYMEN">Тюменская (Область)</option>
                <option value="YDMYR">Удмуртская (Республика)</option>
                <option value="YLANOV">Ульяновская (Область)</option>
                <option value="XABAROV">Хабаровский (Край)</option>
                <option value="XAKASIA">Хакасия (Республика)</option>
                <option value="XAN">Ханты-Мансийский Автономный округ-Югра (Автономный округ)</option>
                <option value="CHELAB">Челябинская (Область)</option>
                <option value="CHECHEN">Чеченская (Республика)</option>
                <option value="CHYKOT">Чукотский (Автономный округ)</option>
                <option value="CHYVA">Чувашская Республика (Республика)</option>
                <option value="YAM_NEN">Ямало-Ненецкий (Автономный округ)</option>
                <option value="YAROSLAV">Ярославская (Область)</option>
            </optgroup>
        </>
    );

}

function availableCityType() {

    return (
        <>
            <option value="CITY">{t`City`}</option>
            <option value="POCELOK">{t`Pocelok`}</option>
            <option value="SETTLEMENT">{t`Settlement`}</option>
            <option value="WORKING VILLAGE">{t`Working village`}</option>
            <option value="STANICA">{t`Stanica`}</option>
            <option value="SELO">{t`Selo`}</option>
        </>
    );
}

function availableStreetType() {

    return (
        <>
            <option value="STREET">{t`Street`}</option>
            <option value="ALLEY">{t`Alley`}</option>
            <option value="BOULEVARD">{t`Boulevard`}</option>
            <option value="QUAY">{t`Quay`}</option>
            <option value="LANE">{t`Lane`}</option>
            <option value="PASSAGE">{t`Passage`}</option>
            <option value="AVENUE">{t`Avenue`}</option>
            <option value="DEADLOCK">{t`Deadlock`}</option>
            <option value="HIGHWAY">{t`Highway`}</option>
            <option value="PATROL">{t`Patrol`}</option>
            <option value="MICRODISTRICT">{t`Microdistrict`}</option>
            <option value="QUARTER">{t`Quarter`}</option>
            <option value="SQUARE">{t`Square`}</option>
        </>
    );
}

function availableBFROOcode() {

    return (
        <>
            <option value="0072">Москва</option>
            <option value="1039">Архангельски</option>
            <option value="1020">Астрахански</option>
            <option value="1014">Барнау</option>
            <option value="1016">Белгоро</option>
            <option value="0956">Благовещенски</option>
            <option value="2013">Братски</option>
            <option value="1066">Брянск</option>
            <option value="1054">Владивостокски</option>
            <option value="1655">Владикавказски</option>
            <option value="0851">Владими</option>
            <option value="1008">Волгоградски</option>
            <option value="0051">Вороне</option>
            <option value="0002">Екатеринбур</option>
            <option value="0751">Иванов</option>
            <option value="1057">Ижевски</option>
            <option value="1009">Йошкар-Ол</option>
            <option value="2011">Иркутс</option>
            <option value="1038">Калининградски</option>
            <option value="0651">Калуг</option>
            <option value="1156">Камчатски</option>
            <option value="1018">Киро</option>
            <option value="2551">Костром</option>
            <option value="0055">Краснода</option>
            <option value="2046">Красноярс</option>
            <option value="2007">Кузбас</option>
            <option value="2302">Кургански</option>
            <option value="1751">Курс</option>
            <option value="1051">Липец</option>
            <option value="1956">Магадански</option>
            <option value="4506">Мурмански</option>
            <option value="1755">Нальчи</option>
            <option value="2302">Нижний Новгоро</option>
            <option value="0926">Новгородски</option>
            <option value="1045">Новомосковс</option>
            <option value="0040">Новосибирс</option>
            <option value="1043">Омс</option>
            <option value="2751">Орё</option>
            <option value="1061">Оренбур</option>
            <option value="1218">Пенз</option>
            <option value="2042">Перм</option>
            <option value="1065">Петрозаводски</option>
            <option value="2006">Псковски</option>
            <option value="2005">Ростовски</option>
            <option value="1251">Рязан</option>
            <option value="0018">Самар</option>
            <option value="0006">Санкт-Петербур</option>
            <option value="0818">Саранс</option>
            <option value="1052">Сарато</option>
            <option value="0856">Сахалински</option>
            <option value="1044">Смоленс</option>
            <option value="1059">Ставропольски</option>
            <option value="1004">Сыктывкарски</option>
            <option value="0951">Тамбо</option>
            <option value="1351">Твер</option>
            <option value="1019">Тольятт</option>
            <option value="1440">Томс</option>
            <option value="1015">Тюменски</option>
            <option value="1071">Улан-Уд</option>
            <option value="1031">Ульяновс</option>
            <option value="1062">Уф</option>
            <option value="0056">Хабаровс</option>
            <option value="1053">Чебоксар</option>
            <option value="2049">Челябински</option>
            <option value="3060">Череповецки</option>
            <option value="0540">Чит</option>
            <option value="1056">Якутски</option>
            <option value="2064">Набережные челны</option>
        </>
    );
}




