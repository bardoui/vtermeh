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
            sourcemap: true,
        },
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: pkg.unpkg,
            format: "umd",
            name: "vTermeh",
            sourcemap: true,
            globals: {
                vue: "Vue",
            },
        },
    ],
    plugins: [
        cleaner({
            targets: ["./dist/"],
        }),
        copy({
            targets: [
                { src: "src/choose.scss", dest: "dist" },
                { src: "src/dropdown.scss", dest: "dist" },
                { src: "src/field.scss", dest: "dist" },
                { src: "src/file-upload.scss", dest: "dist" },
                { src: "src/icon-toggle.scss", dest: "dist" },
                { src: "src/jalaali-picker.scss", dest: "dist" },
                { src: "src/options.scss", dest: "dist" },
                { src: "src/pagination.scss", dest: "dist" },
                { src: "src/pie.scss", dest: "dist" },
                { src: "src/simple-pagination.scss", dest: "dist" },
                { src: "src/tab.scss", dest: "dist" },
                { src: "src/tile.scss", dest: "dist" },
                { src: "src/toggle.scss", dest: "dist" },
                { src: "src/toman.scss", dest: "dist" },
            ],
        }),
        scss({
            output: true,
        }),
        typescript({
            tsconfig: "./tsconfig.json",
        }),
        VuePlugin(),
        commonjs(),
    ],
    external: ["vue", "shortid"],
};
