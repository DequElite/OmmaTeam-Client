// import { render, screen, fireEvent } from '@testing-library/react';
// import {describe, test, expect, vi} from 'vitest';
// import '@testing-library/jest-dom';
// import Input from './Input.component';

// describe('Input component testing', ()=>{
//     test('should be rendered with all properties and placeholder', ()=>{
//         render(
//             <Input 
//                 title='Hello'
//                 isRequired={true}
//                 errorText='Error'
//                 isError={true}
//                 placeholder='input'
//             />
//         )

//         const input = screen.getByPlaceholderText('input');

//         expect(input).toBeInTheDocument();
//         expect(screen.getByText('Hello')).toBeInTheDocument();
//         expect(screen.getByText('*Error')).toBeInTheDocument();
//     });

//     test('should not render error message when isError is false', () => {
//         render(
//             <Input 
//                 title="Username"
//                 isRequired={false}
//                 isError={false}
//                 errorText=""
//                 placeholder="Your name"
//             />
//         );

//         expect(screen.queryByText('*Error')).not.toBeInTheDocument();
//     });

//     test('should call onChange when typing', () => {
//         const mockChange = vi.fn();

//         render(
//             <Input 
//                 title="Login"
//                 isRequired={false}
//                 isError={false}
//                 errorText=""
//                 placeholder="Login"
//                 onChange={mockChange}
//             />
//         )

//         const input = screen.getByPlaceholderText('Login');
//         fireEvent.change(input, {
//             target: {
//                 value: 'DequElite Test'
//             }
//         });

//         expect(mockChange).toHaveBeenCalled()
//     })
// });