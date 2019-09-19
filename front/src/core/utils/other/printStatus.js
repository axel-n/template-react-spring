import {Badge} from "reactstrap";
import React from "react";

export {
    printColorStatus
};

function printColorStatus(status) {

    if (status || status === false) {
        let color = "";
        let colorText = "text-white";

        switch (status) {
            case "NEW":
                color = "info";
                break;

            case "IN_PROGRESS":
            case "ACCEPTED":
                color = "primary";
                break;

            case "SUCCESS":
            case "PROCESSED":
            case true:
                color = "success";
                break;

            case "ERROR":
                color = "danger";
                break;
            default:
                color = "secondary";
                colorText = "text-black";
                break;
        }

        return <Badge className={"text-large " + colorText} color={color}>{status.toString()}</Badge>

    }
}
