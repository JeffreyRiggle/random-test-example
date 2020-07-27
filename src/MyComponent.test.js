import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MyComponent } from './MyComponent';
import restHelper from './restHelper';

jest.mock('./restHelper', () => jest.fn());

describe('my component', () => {
    let component, mockShowErrorModal;

    beforeEach(() => {
        mockShowErrorModal = jest.fn();
    });

    describe('when foo and bar are not set', () => {
        beforeEach(() => {
            component = render(<MyComponent setShowErrorModal={mockShowErrorModal}/>);
            component.getByText('Submit').click();
        });

        it('should show the modal', () => {
            expect(mockShowErrorModal).toHaveBeenCalledWith(true);
        });
    });

    describe('when foo is set', () => {
        beforeEach(() => {
            component = render(<MyComponent setShowErrorModal={mockShowErrorModal}/>);
            fireEvent.change(component.getByTestId('fooinput'), { target: { value: 'something' } });
            component.getByText('Submit').click();
        });

        it('should show the modal', () => {
            expect(mockShowErrorModal).toHaveBeenCalledWith(true);
        });
    });

    describe('when bar is set', () => {
        beforeEach(() => {
            component = render(<MyComponent setShowErrorModal={mockShowErrorModal}/>);
            fireEvent.change(component.getByTestId('barinput'), { target: { value: 'foo' } });
            component.getByText('Submit').click();
        });

        it('should show the modal', () => {
            expect(mockShowErrorModal).toHaveBeenCalledWith(true);
        });
    });

    describe('when foo and bar are set', () => {
        beforeEach(() => {
            component = render(<MyComponent setShowErrorModal={mockShowErrorModal}/>);
            fireEvent.change(component.getByTestId('fooinput'), { target: { value: 'something' } });
            fireEvent.change(component.getByTestId('barinput'), { target: { value: 'foo' } });
            component.getByText('Submit').click();
        });

        it('should not show the modal', () => {
            expect(mockShowErrorModal).not.toHaveBeenCalled();
        });

        it('should call the rest helper', () => {
            expect(restHelper).toHaveBeenCalledWith(expect.objectContaining({
                foo: 'something',
                bar: 'foo'
            }), 'POST');
        });
    });
});