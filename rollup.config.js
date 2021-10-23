import commonjs from "@rollup/plugin-commonjs";
import VuePlugin from "rollup-plugin-vue";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import cleaner from "rollup-plugin-cleaner";
import copy from "rollup-plugin-copy";
import scss from "rollup-plugin-scss";

export default {
    input: "src/vTermeh.ts",
    dest: "dist",
    output: [
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true
        },
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg.unpkg,
            format: "umd",
            name: "vTermeh",
            sourcemap: true,
            globals: {
                vue: "Vue"
            }
        }
    ],
    plugins: [
        cleaner({
            targets: ["./dist/"]
        }),
        copy({
            targets: [
                { src: "src/choose.scss", dest: "dist" },
                { src: "src/pagination.scss", dest: "dist" }
            ]
        }),
        scss({
            output: true
        }),
        typescript({
            tsconfig: "./tsconfig.json"
        }),
        VuePlugin(),
        commonjs()
    ],
    external: ["vue"]
};
