import supertest from "supertest"
import config from "../../config"
const { url } = config
const payload = config.credentials

/* eslint-disable */

//Контроллер Login

const login = {

    //Login into application

    userLogin: (payload) => {
        return supertest(url)
            .post('/api/Login')
            .set('accept', 'application/json')
            .send(payload)
    }
}
export default login