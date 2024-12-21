// /api/v1/users

import supertest from "supertest";
import { describe, expect, it } from "vitest";


describe("test express", () => {
    it("Get / should return code 200", async() => {
        const response = await supertest(app).get("/");
        const statusCode = response.statusCode;

        expect(statusCode).toBe(200);
    });

});