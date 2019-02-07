let headers = new Headers({
    "Content-Type": "application/json"
});

export function setTokenHeader(token){
    if(token){
        headers.append("Authorization", `Bearer ${token}`);
    } else {
        headers.delete("Authorization");
    }
}

export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        return fetch(path, {
            method,
            headers,
            body: JSON.stringify(data)
        })
        .then(handleErrors)
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            return reject(err);
        })
    })
}

async function handleErrors(res){
    if(res.ok){
        return res.json();
    } else {
        let err = await res.json()
        throw Error(err.error.message)
    }
}