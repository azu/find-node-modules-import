import { init, parse } from "es-module-lexer";
import { StructuredSource } from "structured-source";
import builtinModules from "builtin-modules";

export type FindNodeModulesImportResult = {
    name: string;
    range: readonly [start: number, end: number];
    loc: Readonly<{
        start: { line: number; column: number };
        end: { line: number; column: number };
    }>;
};

export async function findNodeModulesImport(code: string): Promise<FindNodeModulesImportResult[]> {
    await init;
    const [imports] = parse(code);
    const source = new StructuredSource(code);
    return imports.map((imp) => {
        return {
            name: code.slice(imp.s, imp.e),
            range: [imp.s, imp.e] as const,
            loc: source.rangeToLocation([imp.s, imp.e])
        };
    });
}

export function filterModulesByModuleNames(modules: FindNodeModulesImportResult[], moduleNames: readonly string[]) {
    return modules.filter((imp) => moduleNames.includes(imp.name));
}

export function filterModulesByBuiltinModules(modules: FindNodeModulesImportResult[]) {
    return modules.filter((imp) => {
        return imp.name.startsWith("node:") || builtinModules.includes(imp.name);
    });
}
