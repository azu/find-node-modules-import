import { findNodeModulesImport, filterModulesByBuiltinModules } from "../src/find-node-modules-import.js";
import assert from "node:assert";

describe("findNodeModulesImport", function () {
    it("filterModulesByBuiltinModules filter only builtin modules", async function () {
        const result = await findNodeModulesImport(
            `\
import foo from "foo"
;import assert from 'node:assert'
import fs from "fs";

type A = string; // It is typescript
`
        );
        let filterd = filterModulesByBuiltinModules(result);
        assert.deepStrictEqual(filterd, [
            {
                name: "node:assert",
                range: [43, 54],
                loc: {
                    start: {
                        line: 2,
                        column: 21
                    },
                    end: {
                        line: 2,
                        column: 32
                    }
                }
            },
            {
                name: "fs",
                range: [72, 74],
                loc: {
                    start: {
                        line: 3,
                        column: 16
                    },
                    end: {
                        line: 3,
                        column: 18
                    }
                }
            }
        ]);
    });
    it("should find node:prefix", async function () {
        const result = await findNodeModulesImport(
            `\
import assert from 'node:assert'
import fs from "fs";

type A = string; // It is typescript
`
        );
        assert.deepStrictEqual(result, [
            {
                name: "node:assert",
                range: [20, 31],
                loc: {
                    start: {
                        line: 1,
                        column: 20
                    },
                    end: {
                        line: 1,
                        column: 31
                    }
                }
            },
            {
                name: "fs",
                range: [49, 51],
                loc: {
                    start: {
                        line: 2,
                        column: 16
                    },
                    end: {
                        line: 2,
                        column: 18
                    }
                }
            }
        ]);
    });
    it("should find import statement", async function () {
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
