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

        console.log('params > ', params)

        return fetch(url, {
            method,
            ...params
        })
        .then(response => {

            const statusCode = response.status

            return response.json().then(data => {

                if (statusCode == 401) {
                    window.location.href = '/login'
                    return;
                }
                else {
                    return { success: true, statusCode, data }
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