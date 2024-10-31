export const freeze = async (timeout = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
