/* eslint-disable */
import supertest from "supertest"
import config from "../config"
import user from "./helper/user"
import books from "./helper/books"

describe('book', () => {
    it('Create book', async () => {
        await books.deleteBook()
        let response = await books.createBook()
        //expect(response.status).toBe(201)
        //expect(response.body.books[0].isbn).toBe(config.isbn)
    }, 10000)
    it('Delete book', async () => {
        await books.deleteBook()
        await books.createBook()
        let response = await books.deleteBook()
        expect(response.status).toBe(204)
        expect(response.body).toEqual({})
    }, 10000)
    it('updater book', async () => {
        await books.deleteBook()
        await books.createBook()
        let response = await books.updateBook()
        expect(response.status).toBe(400)
        expect(response.body.code).toEqual("1206")
        expect(response.body.message).toEqual("ISBN supplied is not available in User's Collection!")
    })
    it('get book', async () => {
        await books.createBook()
        let response = await books.getBook(config.isbn)
        expect(response.status).toBe(200)
        expect(response.body.isbn).toBe(config.isbn)
        expect(response.body.title).toBe('Git Pocket Guide')
    })
})
