const routes = [
  {
    path: '/',
    method: 'GET',
    handler: (request, h) => {
      return "Ini home page";
    }
  }, 
  {
    path: '/about',
    method: 'GET',
    handler: (request, h) => {
      return "Ini about page";
    }
  },
  {
    path: '/hello/{name?}',
    method: 'GET',
    handler: (request, h) => {
      const { name = "stranger" } = request.params;
      const {lang } = request.query;
      
      if (lang === 'id') {
        return `Halo, ${name}!`;
      } else {
        return `Hello, ${name}!`;
      }
    }
  },
  {
    path: '/login',
    method: 'POST',
    handler: (request, h) => {
      const {username, password} = request.payload;
      return `Welcome, ${username}!`;
    }
  },
  {
    path: "/{any*}",
    method: "*",
    handler: (request, h) => {
      return "Halaman tidak ditemukan!";
    }
  }
]

module.exports = routes;