import { render, screen, fireEvent } from '@testing-library/react';


import Button from './Button.component';

describe('Button component testing', ()=>{
    test('should be rendered with children', ()=>{
        render(
            <Button 
                variant='branded'
                width={10}
                height={10}
            >
                Click me!
            </Button>
        )

        expect(screen.getByText('Click me!')).toBeInTheDocument();
    });
});