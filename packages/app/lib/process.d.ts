import { FastRS } from "./fast-rs";

declare function run<Config>(done: (fast: FastRS<Config>) => Promise<any>|any);

declare function config(k: string): string | undefined;