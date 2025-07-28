// import { render, screen, fireEvent } from '@testing-library/react';
// import {describe, test, expect, vi} from 'vitest';
// import '@testing-library/jest-dom';
// import Button from './Button.component';

// describe('Button component testing', ()=>{
//     test('should be rendered with children', ()=>{
//         render(
//             <Button 
//                 variant='branded'
//                 width={10}
//                 height={10}
//             >
//                 Click me!
//             </Button>
//         )

//         expect(screen.getByText('Click me!')).toBeInTheDocument();
//     });

//     test('should be clicked', ()=>{
//         const mockClick = vi.fn()

//         render(
//             <Button 
//                 variant='branded'
//                 width={10}
//                 height={10}
//                 onClick={mockClick}
//             >
//                 Click me!
//             </Button>
//         )

//         fireEvent.click(screen.getByText('Click me!'));

//         expect(mockClick).toHaveBeenCalledTimes(1);
//     });
// });