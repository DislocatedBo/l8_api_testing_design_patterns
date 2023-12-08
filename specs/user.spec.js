/*https://bookstore.demoqa.com/swagger/
Напишите API тесты на следующие апи ручки (api endpoints)

Авторизация
Удаление пользователя
Получение информации о пользователе
При написании АПИ-тестов обязательно использовать контроллеры, так же вынести в конфиг данные для авторизации, базовый УРЛ.
Будет плюсом, если так же вы отрефакторите тесты написанные в рамках ДЗ АПИ тесты:

*/

/* eslint-disable */
import config from "../config"
import user from "./helper/user"

describe('user', () => {
    it('Token successfully generated', async () => {
        const response = await user.getToken(config.credentials)
        expect(response.status).toBe(200)
        expect(response.body.token).toBeDefined()
        expect(response.body.expires).toBeDefined()
        expect(response.body.status).toBe('Success')
        expect(response.body.result).toBe('User authorized successfully.')
    })
    it('login', async () => {
        const response = await user.loginuser()
        expect(response.status).toBe(200)
        expect(response.body).toBe(true)
    })
    it('create user', async () => {
        const cred = await user.gencreduserpass("create");
        const response = await user.createUser(cred)
        expect(response.status).toBe(201)
        expect(response.body.userID).toBeDefined()
    })
    it('get user', async () => {
        const cred = await user.gencreduserpass("get");
        const response = await user.createUser(cred)
        const resget = await user.getUser(response.body.userID, cred)
        expect(resget.status).toBe(200)
        expect(resget.body.userId).toBe(response.body.userID)
        expect(resget.body.username).toBe(cred.userName)
    })
    it('delete user', async () => {
        const cred = await user.gencreduserpass("del");
        const response = await user.createUser(cred)
        const resdel = await user.deleteUser(response.body.userID, cred)
        expect(resdel.status).toBe(204)
    })

})
