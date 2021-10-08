export const httpClient = {

  get: async (url, options) => {
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
      },

      ...options,
    }).then(response => response.json())
  },

}