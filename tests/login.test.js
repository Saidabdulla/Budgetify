const supertest = require("supertest");
const app = require("../server");

describe("Login", () => {
    it("POST should login existing user", async () => {
        const customer = {
            firstName: "Saidabdulla",
            lastName: "Masharipov",
            email: "saidabdulladev@gmail.com",
            password: "saidabdulla",
        };

        const response = await supertest(app).post(`/auth/login`).send({
            email: customer.email,
            password: customer.password,
        });
        expect(response.body.firstName).toBe(customer.firstName);
        expect(response.body.lastName).toBe(customer.lastName);
        expect(response.status).toBe(200);
        expect(response.status)
    });
});
