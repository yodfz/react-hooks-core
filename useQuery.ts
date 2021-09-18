const useQuery = function () {
  const search = window.location.search
  const query = new URLSearchParams(search)
  const data: {
    [key: string]: string
  } = {}
  query.forEach((v, k) => {
    data[k] = v
  })
  return data
}

export { useQuery }
