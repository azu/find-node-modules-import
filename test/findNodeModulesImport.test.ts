import { findNodeModulesImport } from "../src/find-node-modules-import.js";
import assert from "node:assert";

describe("findNodeModulesImport", function () {
    it("should find the import", async function () {
        const result = await findNodeModulesImport(
            `\
import { foo } from 'bar1'
import { foo } from "bar2";

type A = string; // It is typescript
`
        );
        assert.deepStrictEqual(result, [
            {
                name: "bar1",
                range: [21, 25],
                loc: {
                    start: {
                        line: 1,
                        column: 21
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                }
            },
            {
                name: "bar2",
                range: [48, 52],
                loc: {
                    start: {
                        line: 2,
                        column: 21
                    },
                    end: {
                        line: 2,
                        column: 25
                    }
                }
            }
        ]);
    });
});
