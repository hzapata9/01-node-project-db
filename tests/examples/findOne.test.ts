import { describe, it, expect } from "vitest";

export const findOneById = async(id: number) => {
    if(id === 1) {
        return Promise.resolve( {id: 1, name: "John Doe"} );
    }
    return Promise.resolve(null);
};

describe("findOneById", () => {
    it("find users with id 1", async() => {

        const id = 1;
        const user = await findOneById(id);

        expect(user).toEqual( {id: 1, name: "John Doe"});
    });

    it("does not find users with id 2", async() => {

        const id = 2;
        const user = await findOneById(id);

        expect(user).toBe(null);
    });

});