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

       it('scrollsensor stops listening when detach method called useScrollSense retuned SensorProxy', async () => {

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
              expect(scrollBoxColor.parsed.hex).toBe('#00ff00');


       });

       it('reports correct values when sensors are nested', async () => {

              const scroll = scrollBuilder(browser);
              browser.setWindowSize(1200, 1000);
              await browser.url('/native/nesting');

              await scroll(0, 1500);

              const scrollBoxes = $$('.scroll-box');

              let box1 = parseInt(await scrollBoxes[0].$('.test').getText());
              let box2 = parseInt(await scrollBoxes[1].$('.test').getText());
              // let box3 = parseInt(await scrollBoxes[2].$('.test').getText());


              expect(box1).toBe(300);
              expect(box2).toBe(300);

              await scroll(0, 2000);

              let box4 = parseInt(await scrollBoxes[3].$('.test').getText());

              if(!isNaN(box4)) {
                     expect(box4).toBeLessThan(100);              
              }
              else{
                     console.log('<NestedSensorsTest> Quick scroll down with 3000ms delay sets NaN as the height')
              }

              await delay(3100);

              box4 = parseInt(await scrollBoxes[3].$('.test').getText());

              expect(box4).toBe(300);


       });

       it('reports correct values within io sensor', async () => {

              const scroll = scrollBuilder(browser);
              browser.setWindowSize(1200, 1000);
              await browser.url('/native/ionesting');

              await scroll(0, 1500);

              const scrollBoxes = $$('.scroll-box');

              let box1 = parseInt(await scrollBoxes[0].$('.test').getText());
              let box2 = parseInt(await scrollBoxes[1].$('.test').getText());
              // let box3 = parseInt(await scrollBoxes[2].$('.test').getText());


              expect(box1).toBe(300);
              expect(box2).toBe(300);

              await scroll(0, 2000);

              let box4 = parseInt(await scrollBoxes[3].$('.test').getText());

              if(!isNaN(box4)) {
                     expect(box4).toBeLessThan(100);              
              }
              else{
                     console.log('<NestedSensorsTest> Quick scroll down with 3000ms delay sets NaN as the height')
              }

              await delay(3100);

              box4 = parseInt(await scrollBoxes[3].$('.test').getText());

              expect(box4).toBe(300);


       });

       it('detects when items inside inner scroll areas get into view', async ()=> {

              let getListItem = (index) => {

                     let listItems = $$('.list-item');
                     return listItems[index];

              };

              const scroll = scrollBuilder(browser);
              browser.setWindowSize(1200, 1000);
              await browser.url('/native/nestinglist');

              let className = await getListItem(0).getAttribute('class');
              expect(className.indexOf('intersecting')).toBeLessThan(0);

              await scroll(0, 1500);

              await browser.execute(() => {
                     let el = document.getElementsByClassName('list-test')[0];
                     let evt = new Event('scroll');
                     el.dispatchEvent(evt);
              });

              className = await getListItem(0).getAttribute('class');

              console.log('>> ', className);
              expect(className.indexOf('intersecting')).toBeGreaterThanOrEqual(0);
              
              


       });


})