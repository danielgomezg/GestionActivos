class Api {

    static getTokenFromLocalStorage() {
        // return localStorage.getItem('accessToken');
        return sessionStorage.getItem('accessToken');
    }

    static call(url = '', method = 'GET', body = {}, type = 'json') {
        
        
        let token = Api.getTokenFromLocalStorage()

        let params = { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            ...body
        }
        // Si type es file se quita Content-Type del header
        if (type == 'file') {
            delete params.headers['Content-Type']
        }

        return fetch(url, {
            method,
            ...params
        })
        .then(response => {
            // console.log(response)

            // console.log(response)
            let statusCode = response.status

            return response.json().then(data => {
                
                // console.log(data)
                
                if (statusCode == 401 && data.message == 'token-exp') {
                    // localStorage.removeItem('user');
                    // localStorage.removeItem('accessToken');
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('accessToken');
                    window.location.href = '/login'
                    return;
                }
                else {
                    if (data.code == '401' && data.message == 'token-exp') {
                        // localStorage.removeItem('user');
                        // localStorage.removeItem('accessToken');
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('accessToken');
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