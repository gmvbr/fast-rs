export function requestLib(name: string) {
  try {
    return require(name);
  } catch (e) {
    throw new Error('required ' + name + ', run: npm install ' + name);
  }
}
