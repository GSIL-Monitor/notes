const PromiseAjax = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = handler;
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.state === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    })
};
PromiseAjax('http://www.baidu.com').then(res => {
    console.log(res);
}).catch(error => {
    console.log(error);
});
