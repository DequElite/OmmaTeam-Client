// import { render, screen, fireEvent } from '@testing-library/react';
// import {describe, test, expect} from 'vitest';
// import '@testing-library/jest-dom';
// import PasswordInput from './PasswordInput.component';

// describe('PasswordInput component testing', ()=>{
//     test('should be rendered with password type and toggles visibility by tipe', ()=>{
//         render(
//             <PasswordInput
//                 title="Password"
//                 placeholder="Enter password"
//                 isRequired={true}
//                 isError={false}
//                 errorText=""
//             />
//         );

//         const input = screen.getByPlaceholderText('Enter password');
//         const eyeBtn = screen.getByRole('button');

//         expect(screen.getByText('Password')).toBeInTheDocument();
//         expect(input).toHaveAttribute('type', 'password');
//         expect(eyeBtn).toBeInTheDocument();

//         fireEvent.click(eyeBtn);
//         expect(input).toHaveAttribute('type', 'text');

//         fireEvent.click(eyeBtn);
//         expect(input).toHaveAttribute('type', 'password');
//     });
// });