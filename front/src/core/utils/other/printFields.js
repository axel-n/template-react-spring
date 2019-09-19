import React from "react";

export const printFields = {
    printFieldsInLists
};

function printFieldsInLists(object) {

    return Object.keys(object).map(key => {

        return <option key={key} value={key}>{object[key]}</option>;
    });

}