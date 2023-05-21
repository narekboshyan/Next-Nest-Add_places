import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
 schema: "http://localhost:5001/graphql",
 generates: {
  "src/graphql/types.ts": {
   plugins: ["typescript"],
  },
  "src/graphql/mutations/": {
   documents: "./**/*.graphql",
   preset: "near-operation-file",
   presetConfig: {
    extension: ".generated.ts",
    baseTypesPath: "../types.ts",
    folder: "generated",
   },
   plugins: ["typescript-operations", "typescript-react-query"],
   config: {
    exposeQueryKeys: true,
    exposeDocument: true,
    skipTypename: true,
    addInfiniteQuery: true,
    fetcher: {
     func: "@/configs/axiosConfigs#axiosRequest",
     isReactHook: true,
    },
   },
  },
  "src/graphql/queries/": {
   documents: "./**/*.graphql",
   preset: "near-operation-file",
   presetConfig: {
    extension: ".generated.ts",
    baseTypesPath: "../types.ts",
    folder: "generated",
   },
   plugins: ["typescript-operations", "typescript-react-query"],
   config: {
    exposeQueryKeys: true,
    exposeDocument: true,
    skipTypename: true,
    addInfiniteQuery: true,
    fetcher: {
     func: "@/configs/axiosConfigs#axiosRequest",
     isReactHook: true,
    },
    fetchPolicy: "cache-and-network",
   },
  },
 },
};
export default config;
