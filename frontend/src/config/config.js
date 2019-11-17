const BASE_URL = 'http://localhost:8000'

function getHeaders () {
return {

    'Authorization': 'Token ' + localStorage.getItem('token'),
    'Content-Type' : 'Application/json'
}
}


export {getHeaders}
export default BASE_URL