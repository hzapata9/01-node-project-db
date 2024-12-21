import { vitest, describe, it, expect } from "vitest";

const sum = (a: number , b: number) => a + b;

describe("func sum", () => {

    it("add 1 + 2 returns 3", () => {

        const a = 1;
        const b = 2;

        const result = sum(a, b);

        expect(result).toBe(3);
    });

});