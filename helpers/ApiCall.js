class Api {

    static getTokenFromLocalStorage() {
        return localStorage.getItem('accessToken');
    }

    static call(url = '', method = 'GET', body = {}, token = "") {
        
        
        token = Api.getTokenFromLocalStorage()

        let params = { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            ...body
        }


        return fetch(url, {
            method,
            ...params
        })
        .then(response => {
            console.log("logggg")
            console.log(response)

            let statusCode = response.status

            return response.json().then(data => {
                
                
                if (statusCode == 401 && data.message == 'token-exp') {
                    window.location.href = '/login'
                    return;
                }
                else {
                    if (data.code == '401' && data.message == 'token-exp') {
                        window.location.href = '/login'
                        return;
                    }
                    return { success: true, statusCode: data.code, data }
                }
            });
        })
        // .then(data => {
        //     console.log(data)
        //     return { success: true, data: data }
        // })
        .catch(error => {
            console.error('Error:', error)
            return { success: false, statusCode: 500 }
        });

    }

}
export default Api