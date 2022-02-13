import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollSense from "../../io/ScrollSense";
import ScrollBox from './ScrollBox';
import setupIntersectionObserverMock from './setupIntersectionObserverMock';

describe('IO sensor provider', () => {

       beforeAll(() => {
              setupIntersectionObserverMock();
       })

       it('mounts without errors', () => {

              render(<ScrollSense></ScrollSense>);
       });

       it('renders scrollbox without errors', () => {

              render(<ScrollBox></ScrollBox>);
              let item = screen.getByText('Scroller');

              expect(item.style.backgroundColor).toBe('red');

       });

       it('Renders sensor with scroll box without errors', () => {

              render(
                     <ScrollSense>
                            <div style={{ height: 1000 }}>Placeholder</div>
                            <ScrollBox height={300}></ScrollBox>
                     </ScrollSense>
              );

              let item = screen.getByText('Scroller');
              fireEvent.scroll(global.document.body, { target: { scrollY: 1200 } });


       });


})