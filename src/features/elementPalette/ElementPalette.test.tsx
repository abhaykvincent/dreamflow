import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { ElementPalette } from './ElementPalette';
import { Canvas } from '../canvas/Canvas';

test ('New element is created when clicked', () => {
    render(
        <Provider store={store}>
            <Canvas/>
            <ElementPalette/>
        </Provider>
    );

    // target element be clicked
    const divButton = screen.getByTestId('html-div');
    fireEvent.click(divButton);
    // check if new element is created
    const canvas = screen.getByTestId('canvas');
    expect(canvas.children.length).toBe(1);
    expect(canvas.children[0].tagName).toBe('DIV');
    }
    );
