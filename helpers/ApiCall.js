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
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return { success: true, data: data }
        })
        .catch(error => {
            console.error('Error:', error)
            return { success: false }
        });
    }

}
export default Api