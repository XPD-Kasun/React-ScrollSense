const delay = require("../delay");
const scrollBuilder = require('../scroll');



describe('Native scroll sensor: ', () => {

       it('after scrolling page, scroll box detects it.', async () => {

              const scroll = scrollBuilder(browser);
              await browser.url('/native');

              await scroll(0, 0);
              let scrollBox = await $('.scroll-box');
              await expect(scrollBox).toHaveAttribute('class', 'scroll-box');

              await scroll(0, 1500);
              scrollBox = await $('.scroll-box');
              await expect(scrollBox).toHaveElementClass('intersecting');     

              

       });



})