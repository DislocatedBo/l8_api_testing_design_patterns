import supertest from "supertest"
import config from "../../config"
const url = config.url


/* eslint-disable */

//Контроллер User

const credentialsload = {
    "userName": config.credentials.userName,
    "password": config.credentials.password
}

const user = {
    //
    token: '',

    async gencreduserpass(userbase) {
        const createuser ={
            "userName": userbase + parseInt(Math.random() * 100000),
            "password": "P@ss12312"
        }
        return createuser
    },

    async loginuser() {
        const res = await supertest(url)
            .post('/Account/v1/Authorized')
            .set('accept', 'application/json')
            .send(credentialsload)
        return res
    },

    async createUser(loadcreat) {
        const res = await supertest(url)
            .post('/Account/v1/User')
            .set('accept', 'application/json')
            .send(loadcreat)
        return res
    },

    //Get user
    async getUser(uuid, token) {
        //console.log("getUser " + user.token)
        const res = await supertest(url)
            .get(`/Account/v1/User/${uuid}`)
            .set('accept', 'application/json')
            .set('Authorization', 'Bearer ' + await user.getAuthToken(token))
        return res
    },

    //Delete user
    async deleteUser(uuid, token) {
        const res = await supertest(url)
            .delete(`/Account/v1/User/${uuid}`)
            .set('accept', 'application/json')
            .set('Authorization', 'Bearer ' + await user.getAuthToken(token))
        return res
    },

    //Функция получения токена
    getToken: (cred) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(cred)
    },

    async getAuthToken(cred) {
        const res = await this.getToken(cred)
        user.token = res.body.token
        return res.body.token
    },

    //Функция авторизации с полученным токеном
    authorization: (payload) => {
        return supertest(url)
            .post('/Account/v1/Authorized')
            .set('accept', 'application/json')
            .set('authorization', `Bearer ${user.token}`)
            .send(payload)
    }
}
export default user
