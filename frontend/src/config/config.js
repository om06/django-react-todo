const BASE_URL = 'http://localhost:8000'

const headers = {
    'Authorization': 'Token ' + localStorage.getItem('token'),
    'Content-Type' : 'Application/json'
}


export {headers}
export default BASE_URL