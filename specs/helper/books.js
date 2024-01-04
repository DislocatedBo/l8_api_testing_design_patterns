import supertest from "supertest"
import config from "../../config"
import user from "./user"
const url = config.url


/* eslint-disable */

//Контроллер BookStore

//payload

const bookPayload = {
    "userId": config.userID,
    "collectionOfIsbns": [
        {
            "isbn": config.isbn
        }
    ]
}

const bookPayloaddel = {
    "userId": config.userID,
    "isbn": config.isbn
}

//request

const books = {
    async createBook() {
        const res = await supertest(url)
            .post('/BookStore/v1/Books')
            .set('accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + await user.getAuthToken(config.credentials))
            .send(bookPayload)
        return res
    },
    async deleteBook() {
        const res = await supertest(url)
            .delete(`/BookStore/v1/Book`)
            .set('accept', 'application/json')
            .set('Authorization', 'Bearer ' + await user.getAuthToken(config.credentials))
            .send(bookPayloaddel)
        return res
    },
    async updateBook(isbn) {
        const res = await supertest(url)
            .put(`/BookStore/v1/Books/` + isbn)
            .set('accept', 'application/json')
            .set('Authorization', 'Bearer ' + await user.getAuthToken(config.credentials))
            .send(bookPayloaddel)
        return res
    },
    async getBook(isbn) {
        const res = await supertest(url)
            .get(`/BookStore/v1/Book?ISBN=` + isbn)
            .set('Authorization', 'Bearer ' + await user.getAuthToken(config.credentials))
        return res
    }
}
export default books