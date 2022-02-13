const delay = require('./delay');

function scrollBuilder(b) {

       return async function (x, y) {
              await b.execute((left, top) => window.scrollTo({ behavior: 'smooth', left, top }), x, y);
              await delay(500);
       }

}

module.exports = scrollBuilder;