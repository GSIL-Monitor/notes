/**
 * @description ajax封装
 * @param url
 * @param method
 * @param data
 * @param async {Boolean}
 * @returns {*}
 * @constructor
 */
function Ajax(url, method, data, async) {
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                throw new Error("你的浏览器不支持Ajax");
            }
        }
    }
    xhr.onerror = function (e) {
        console.log(e);
    };
    xhr.open(method, url, async);
    try {
        setTimeout(function () {
            xhr.send(data);
        })
    } catch (e) {
        console.log("error:", e);
    }
    return xhr;
}
