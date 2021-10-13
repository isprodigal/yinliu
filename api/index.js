import { post, get } from '../utils/request.js'

const yl = {
    multiTableQuery: params => post('/mysql/multiTableQuery', params),
    select: params => post('/mysql/select', params),
    insert: params => post('/mysql/insert', params),
    delete: params => post('/mysql/delete', params),
    update: params => post('/mysql/update', params),
    randSelect: params => post('/mysql/randSelect', params),
    login: params => post('/mysql/login', params),
}

export default yl