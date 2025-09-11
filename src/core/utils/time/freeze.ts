export async function freeze(timeout = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
