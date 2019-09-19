import React from "react";

export const request = {
    sendRequest,
    downloadFile,
    downloadBlob,
    convertFormToObj,
    loading,
};

const rootApi = "/api/v1";

function convertFormToObj(inputs) {

    let responseObj = {};

    let buildRespObj = (key, value, respObj) => {
        // ищем вложенные массивы
        let matches = key.match(/(.*?)\[(.*)]/);

        // это вложенный массив
        if (matches && matches.length === 3) {

            if (!respObj[matches[1]]) respObj[matches[1]] = {};
            respObj[matches[1]][matches[2]] = value;

        } else {
            respObj[key] = value;
        }
    };

    if (inputs instanceof FormData) {

        inputs.forEach(function (value, key) {
            // console.log('input value', value, 'input key', key);

            if (value !== "") {
                buildRespObj(key, value, responseObj);
            }
        });

    } else if (inputs instanceof Object) {

        Object.entries(inputs).forEach(pair => {

            let key = pair[0];
            let value = pair[1];

            buildRespObj(key, value, responseObj);
        });
    }

    return responseObj;
}

//addHeaderNames - parameter which is added to response body, taken from the response header
function sendRequest(method, url, data, {getJson, sentJson = true, addHeaderNames} = {}) {

    const requestOptions = {
        method: method,
        body: data,
        credentials: 'same-origin',
        headers: getAuthHeader(getJson, sentJson)
    };

    url = rootApi + url;

    return fetch(url, requestOptions)
        .then(function (response) {

            let token = response.headers.get('token');
            if (token) {
                let user = JSON.parse(localStorage.getItem('user'));
                if (user.token !== token) {
                    user.token = token;
                    localStorage.setItem('user', JSON.stringify(user));
                }
            }
            //
            switch (response.status) {

                case 200: {

                    return response.text()
                        .then(text => {
                            if (text && addHeaderNames) {
                                let resObject = JSON.parse(text);
                                if (Array.isArray(addHeaderNames)) {
                                    addHeaderNames.forEach(headerName => {
                                        resObject[headerName] = (response.headers.get(headerName) || "").split(",").map(it => it.trim());
                                    });
                                } else {
                                    resObject[addHeaderNames] = (response.headers.get(addHeaderNames) || "").split(",").map(it => it.trim());
                                }
                                return resObject;
                            }
                            return text ? JSON.parse(text) : text;
                        });
                }

                case 401: {
                    let errorJson = response.text()
                        .then(text => JSON.parse(text));

                    if (errorJson.message === "invalid token") return true;

                    console.log("token invalid. logout");
                    return logout();
                }

                case 403: {
                    return goToNotPermittedPage()
                }

                case 404: {
                    return null;
                }

                default: {
                    console.log("Network response was not ok.");
                    return goToErrorPage()
                }
            }

        });

}

function downloadFile(type, url, {
    json, fileName, responseMapper = response => {
        if (response.ok) {
            return response.blob();
        }
        return null;
    }
} = {}) {

    const requestOptions = {
        method: type,
        headers: getAuthHeader(false),
        credentials: 'same-origin',
        body: json
    };

    return fetch(url, requestOptions)
        .then(response => responseMapper(response))
        .then(blob => downloadBlob(blob, fileName));
}

function downloadBlob(blob, fileName) {
    // 2. Create blob link to download
    let url = window.URL.createObjectURL(new Blob([blob]));
    let link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    // 3. Append to html page
    document.body.appendChild(link);
    // 4. Force download
    link.click();
    // 5. Clean up and remove the link
    link.parentNode.removeChild(link);
}

// if you want view json as response
function getAuthHeader(getJson, sentJson = true) {

    // return authorization headersMap with jwt token
    let userDataRow = localStorage.getItem('user');
    let token = JSON.parse(userDataRow).token;

    let headersMap = new Map();

    if (sentJson) {

        headersMap.set("Content-Type", "application/json");

        if (getJson) {
            headersMap.set("Accept", "application/json");
        }
    }

    if (token) {
        headersMap.set("Authorization", 'Bearer ' + token);
    }

    return headersMap;
}

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}

function loading() {
    return <div className="animated fadeIn pt-1 text-center">Загрузка...</div>;
}

function goToErrorPage() {
    window.location.href = "/500";
}

function goToNotPermittedPage() {
    window.location.href = "/403";
}
