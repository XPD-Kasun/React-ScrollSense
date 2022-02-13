function delay(amount) {

       return new Promise((res, rej) => {
              setTimeout(() => {
                     res();
              }, amount);
       });

}

module.exports = delay;