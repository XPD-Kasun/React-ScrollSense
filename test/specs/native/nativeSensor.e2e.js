const delay = require("../delay");
const scrollBuilder = require('../scroll');



describe('Native scroll sensor: ', () => {

       it('after scrolling page, scroll box detects it.', async () => {

              const scroll = scrollBuilder(browser);
              await browser.url('/native/basic');

              await scroll(0, 0);
              let scrollBox = await $('.scroll-box');
              await expect(scrollBox).toHaveAttribute('class', 'scroll-box');

              await scroll(0, 1500);
              scrollBox = await $('.scroll-box');
              await expect(scrollBox).toHaveElementClass('intersecting');     

              

       });

       it('scrollsensor detach tracking when detach method called via useScrollSense', async () => {

              const scroll = scrollBuilder(browser);
              await browser.url('/native/detach');

              let scrollBox = await $('.scroll-box');
              let scrollBoxColor = await scrollBox.getCSSProperty('background-color');
              expect(scrollBoxColor.parsed.hex).toBe('#7a7a7a');

              await scroll(0, 1500);

              scrollBox = await $('.scroll-box');
              scrollBoxColor = await scrollBox.getCSSProperty('background-color');
              expect(scrollBoxColor.parsed.hex).toBe('#00ff00');

              const btn = await $('.btn');
              btn.click();

              await delay(500);

              await scroll(0, 0);

              scrollBox = await $('.scroll-box');
              scrollBoxColor = await scrollBox.getCSSProperty('background-color');
              console.log(scrollBoxColor);
              expect(scrollBoxColor.parsed.hex).toBe('#00ff00');


       });


})