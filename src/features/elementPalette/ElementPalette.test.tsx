import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ElementPalette } from './ElementPalette';
import { setTarget } from '../canvas/canvasSlice';

const mockStore = configureStore([]);

describe('ElementPalette', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            canvas: {
                target: 'canvas',
            },
        });
    });

    it('renders all elements', () => {
        const { getByText } = render(
            <Provider store={store}>
                <ElementPalette />
            </Provider>
        );

        expect(getByText('Div')).toBeInTheDocument();
        expect(getByText('Section')).toBeInTheDocument();
        expect(getByText('H1')).toBeInTheDocument();
        expect(getByText('P')).toBeInTheDocument();
        expect(getByText('A')).toBeInTheDocument();
        expect(getByText('Input')).toBeInTheDocument();
        expect(getByText('Button')).toBeInTheDocument();
    });

    it('dispatches setTarget when an element is clicked', () => {
        const { getByText } = render(
            <Provider store={store}>
                <ElementPalette />
            </Provider>
        );

        fireEvent.click(getByText('Div'));

        const actions = store.getActions();
        const expectedPayload = { payload: 'div', type: setTarget.type };


        expect(actions).toEqual([expectedPayload]);

        
    });
});