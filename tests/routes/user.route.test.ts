// /api/v1/users

import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../../src/app"
import { UserModel } from "../../src/models/user.model";
import { generateAccessToken } from "../../src/utils/auth.utill";
import { request } from "node:http";
import { verifyToken } from "../../src/middlewares/jwt.middleware";


vi.mock("../../src/models/user.model", () => {
    return {
        UserModel: {
            findAll: vi.fn(async() => [])
        },
    };
});

describe("test express", () => {
    it("Get / should return code 200", async() => {
        const response = await supertest(app).get("/api/v1/users");
        const statusCode = response.statusCode;
        expect(statusCode).toBe(200);
    });
});

/*
describe("test express with Token", () => {
    it("Get / should return code 200", async() => {
        const token = generateAccessToken("test@test.com", "1");
        const { statusCode, body } = await request(app)
            .get("/api/v1/users")
            .set("Authorization", 'Bearer ${token}');

        console.log(body);
        expect(statusCode).toBe(200);
    });
});


vi.mock("../../src/middlewares/jwt.middleware", () => {
    return {
        verifyToken: vi.fn( (req, res, next) => {
            //Simular datos de usuario autenticado
            req.email = "mocked@example.com";
            req.uid = "mocked-uid";
            next();
        }),
    };
});

describe("/users", () => {

    it("Get should returns users", async () => {
        const response = await request(app).getHeader("/api/v1/users");

        expect(response.statusCode).toBe(200);
    })

});
*/