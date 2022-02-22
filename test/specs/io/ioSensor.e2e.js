const delay = require("../delay");
const scrollBuilder = require('../scroll');



describe('io scroll sensor: ', () => {

       describe('Single io : ', () => {

              it('renders basic rendering page without errors', async () => {

                     const scroll = scrollBuilder(browser);
                     await browser.url('/io/basic');

                     const scrollBox = await $('.scroll-box');
                     expect(scrollBox).toExist();

                     const bigBox = await $('.big-box')
                     expect(bigBox).toExist();

                     let scrollBoxColor = await scrollBox.getCSSProperty('background-color');

                     expect(scrollBoxColor.parsed.hex).toBe('#7a7a7a');


              });

              it('after scrolling page, scroll box detects it.', async () => {

                     const scroll = scrollBuilder(browser);
                     await browser.url('/io/basic');

                     await scroll(0, 0);

                     let scrollBox = await $('.scroll-box');

                     let scrollBoxColor = await scrollBox.getCSSProperty('background-color');

                     expect(scrollBoxColor.parsed.hex).toBe('#7a7a7a');

                     await scroll(0, 1500);

                     scrollBox = await $('.scroll-box');

                     scrollBoxColor = await scrollBox.getCSSProperty('background-color');

                     expect(scrollBoxColor.parsed.hex).toBe('#00ff00');

              });

              it('scroll to bottom, then up and scroll box detects correctly', async () => {

                     const scroll = scrollBuilder(browser);
                     await browser.url('/io/basic');
                     await scroll(0, 0);

                     let scrollBox = await $('.scroll-box');
                     let scrollBoxColor = await scrollBox.getCSSProperty('background-color');
                     expect(scrollBoxColor.parsed.hex).toBe('#7a7a7a');

                     await scroll(0, 1500);

                     scrollBox = await $('.scroll-box');
                     scrollBoxColor = await scrollBox.getCSSProperty('background-color');
                     expect(scrollBoxColor.parsed.hex).toBe('#00ff00');

                     await scroll(0, 0);

                     scrollBox = await $('.scroll-box');
                     scrollBoxColor = await scrollBox.getCSSProperty('background-color');
                     expect(scrollBoxColor.parsed.hex).toBe('#7a7a7a');

              });

              it('scrollsensor detach tracking when detach method called via useScrollSense', async () => {

                     const scroll = scrollBuilder(browser);
                     await browser.url('/io/detach');
                     await scroll(0, 0);

                     let scrollBox = await $('.scroll-box');
                     let scrollBoxColor = await scrollBox.getCSSProperty('background-color');
                     expect(scrollBoxColor.parsed.hex).toBe('#7a7a7a');

                     await scroll(0, 1500);

                     scrollBox = await $('.scroll-box');
                     scrollBoxColor = await scrollBox.getCSSProperty('background-color');
                     expect(scrollBoxColor.parsed.hex).toBe('#00ff00');

                     const btn = await $('.btn');
                     btn.click();

                     await scroll(0, 0);

                     scrollBox = await $('.scroll-box');
                     scrollBoxColor = await scrollBox.getCSSProperty('background-color');
                     expect(scrollBoxColor.parsed.hex).toBe('#00ff00');


              });

       });



})