export const environment = {
  socket: {
      baseUrl: "https://front-br-challenges.web.app/api/v2/",

      events: {
          base: 'green-thumb',
          getOne: 'green-thumb/?sun={sun}&water={water}&pets={pets}'
      }
  }
}
Object.freeze(environment);