import React from "react";
import {dateProcessing} from "../../utils/other/dateProcessing";
import * as printStatus from "../../utils/other/printStatus";

function getNestedProperty(item, property){
    let props = property.split('.');
    props.forEach(p =>{
        if (item === undefined || item === null){
            return null;
        }
        item = item[p];
    });
    return item;
}

export function getHeader(columns) {
    let headers = columns.map((item) =>
        <th key={item.text}>(item.text)</th>
    );
    return (<tr>
        {headers}
    </tr>);
}

export function getContent(data, columns, handleClick) {

    if (data.length === 0) {
        return (
            <tr>
                <td align="center" colSpan={columns.length}>
                    Ничего не найдено
                </td>
            </tr>
        );
    } else {
        return data.map((item, keyItem) => {

            let cells = columns.map((columnData, columnKey) => {

                let column = columnData.dataField;
                let cellData = columnData.fnCreatedCell ? columnData.fnCreatedCell(getNestedProperty(item, column)) : getNestedProperty(item, column);

                switch (column) {
                    case "cdat":
                    case "udat":
                        return <td key={columnKey}>{dateProcessing.getFormattedDateTime(cellData)}</td>;

                    case "status":
                        return <td key={columnKey}>{printStatus.printColorStatus(cellData)}</td>;

                    case "assigner": {
                        if (cellData) {
                            return <td key={columnKey}>{cellData}</td>
                        } else {
                            return <td key={columnKey}>Нет</td>
                        }
                    }


                    default:
                        return <td key={columnKey}>{cellData}</td>
                }
            });

            return (
                <tr key={keyItem} onClick={() => handleClick(item)}>
                    {cells}
                </tr>
            );

        });
    }
}
