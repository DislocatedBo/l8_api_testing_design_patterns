import supertest from "supertest"
import config from "../../config"
const { url } = config
/* eslint-disable */

//Контроллер User

const user = {
    //
    token: '',

    //Create user

    async createUser(payload) {
        const res = await supertest(url)
            .post('/Account/v1/User')
            .set('accept', 'application/json')
            .send(payload)
        return res
    },

    //Get user
    async getUser(uuid) {
        const res = await supertest(url)
            .get(`/Account/v1/User/${uuid}`)
            .set('accept', 'application/json')
            .set('Authorization', `Bearer ${this.token}`)
        return res
    },

    //Delete user
    async deleteUser(uuid) {
        const res = await supertest(url)
            .delete(`/Account/v1/User/${uuid}`)
            .set('accept', 'application/json')
        return res.body
    },


    //Функция получения токена

    getToken: (payload) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('accept', 'application/json')
            .send(payload)
    },

    async getAuthToken() {
        const payload = config.credentials
        const res = await this.getToken(payload)
        user.token = res.body.token
        return res.body.token
    }

    //Функция авторизации с полученным токеном

    // authorization: (payload) => {
    //     return supertest(url)
    //     .post('/Account/v1/Authorized')
    //     .set('accept', 'application/json')
    //     .set('authorization', `Bearer ${user.token}`)
    //     .send(payload)
    // }
}
export default user