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

              it('scrollsensor stops listening when detach method called useScrollSense retuned SensorProxy', async () => {

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


              it('reports correct values when sensors are nested', async () => {

                     const scroll = scrollBuilder(browser);
                     browser.setWindowSize(1200, 1000);
                     await browser.url('/io/nesting');

                     await scroll(0, 1000);

                     const scrollBoxes = $$('.scroll-box');

                     let box1 = scrollBoxes[0];
                     let box2 = scrollBoxes[1];
                     let box4 = scrollBoxes[3];
                     // let box3 = parseInt(await scrollBoxes[2].$('.test').getText());


                     let box1Color = await box1.getCSSProperty('background-color');
                     expect(box1Color.parsed.hex).toBe('#00ff00');
                     let box2Color = await box2.getCSSProperty('background-color');
                     expect(box2Color.parsed.hex).toBe('#7a7a7a');

                     await scroll(0, 1500);

                     box2Color = await box2.getCSSProperty('background-color');
                     expect(box2Color.parsed.hex).toBe('#00ff00');
                     box4Color = await box4.getCSSProperty('background-color');
                     expect(box4Color.parsed.hex).toBe('#7a7a7a');

                     await scroll(0, 1700);


                     box4Color = await box4.getCSSProperty('background-color');
                     expect(box4Color.parsed.hex).toBe('#00ff00');


              });

              it('reports correct values within native sensor', async () => {

                     const scroll = scrollBuilder(browser);
                     browser.setWindowSize(1200, 1000);
                     await browser.url('/io/nativenesting');

                     await scroll(0, 1000);

                     const scrollBoxes = $$('.scroll-box');

                     let box1 = scrollBoxes[0];
                     let box2 = scrollBoxes[1];
                     let box4 = scrollBoxes[3];
                     // let box3 = parseInt(await scrollBoxes[2].$('.test').getText());


                     let box1Color = await box1.getCSSProperty('background-color');
                     expect(box1Color.parsed.hex).toBe('#00ff00');
                     let box2Color = await box2.getCSSProperty('background-color');
                     expect(box2Color.parsed.hex).toBe('#7a7a7a');

                     await scroll(0, 1500);

                     box2Color = await box2.getCSSProperty('background-color');
                     expect(box2Color.parsed.hex).toBe('#00ff00');
                     box4Color = await box4.getCSSProperty('background-color');
                     expect(box4Color.parsed.hex).toBe('#7a7a7a');

                     await scroll(0, 1700);


                     box4Color = await box4.getCSSProperty('background-color');
                     expect(box4Color.parsed.hex).toBe('#00ff00');



              });

              it('detects when items inside inner scroll areas get into view', async () => {

                     let getListItem = (index) => {

                            let listItems = $$('.list-item');
                            return listItems[index];

                     };

                     const scroll = scrollBuilder(browser);
                     browser.setWindowSize(1200, 1000);
                     await browser.url('/io/nestinglist');

                     let className = await getListItem(0).getAttribute('class');
                     expect(className.indexOf('intersecting')).toBeLessThan(0);

                     await scroll(0, 1500);

                     await browser.execute(() => {
                            let el = document.getElementsByClassName('list-test')[0];
                            let evt = new Event('scroll');
                            el.dispatchEvent(evt);
                     });

                     className = await getListItem(0).getAttribute('class');

                     expect(className.indexOf('intersecting')).toBeGreaterThanOrEqual(0);

              });

       });



})