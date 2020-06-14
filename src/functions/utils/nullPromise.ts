export const nullPromise = (): Promise<null> => {
  return new Promise(r => setTimeout(() => r(null), 0))
}
