/* eslint-disable @typescript-eslint/no-explicit-any */
import {FastRS} from './fast-rs';

export async function run<Config>(
  module: NodeModule,
  done: (fast: FastRS<Config>) => any
) {
  if (require.main === module) {
    exports._instance = new FastRS();
    await done(exports._instance);
    await exports._instance.listen();
  }
}

export function config(k: string): string | undefined {
  return exports._instance.config[k];
}
