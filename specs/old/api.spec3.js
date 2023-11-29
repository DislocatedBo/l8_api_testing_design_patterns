/*https://bookstore.demoqa.com/swagger/
Напишите API тесты на следующие апи ручки (api endpoints)

Авторизация
Удаление пользователя
Получение информации о пользователе
При написании АПИ-тестов обязательно использовать контроллеры, так же вынести в конфиг данные для авторизации, базовый УРЛ.
Будет плюсом, если так же вы отрефакторите тесты написанные в рамках ДЗ АПИ тесты:

*/

/* eslint-disable */
import supertest from "supertest"
import config from "../../config"
import user from "../helper/user"
import login from "./login"

describe('login', () => {
    //Успешный логин в систему

    it.only('Login was succesfull', async () => {
        const response = await login.userLogin(login.payload)
        expect(response.status).toBe(415)
    })
})



describe('user', () => {

    //Успешная генерация токена
    it('Token successfully generated', async () => {
        const response = await user.getAuthToken()
        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.token).toBeDefined()
        expect(data.expires).toBeDefined()
        expect(data.status).toBe('Success')
        expect(data.result).toBe('User authorized successfully.')
    })

    //Успешное получение информации о пользователе
    it('getUser', async () => {
        await user.getAuthToken()
        const response = await user.getUser(config.userID)
        expect(response.status).toBe(201)
        expect(data.userID).toBeDefined()
        expect(data.username).toBe('Tname2')
        expect(data.books).toEqual([])
    })

    //Успешное удаление пользователя
    it('deleteUser', async () => {
        const response = await user.deleteUser(config.userID)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({})
    })

})
