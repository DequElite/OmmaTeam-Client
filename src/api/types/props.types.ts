import { InputHTMLAttributes } from "react";

export interface OmmaCardsProps {
    iconPath: string;
    title: string;
    desc: string;
    buttonText: string;
    link: string;
    width?: number;
    height?: number;
    style?: any;
}

export type ButtonVariant = 'branded' | 'dark' | 'branded-reverese';
export interface ButtonProps {
    children: React.ReactNode;
    variant: ButtonVariant;
    width: number;
    height: number;
    className?: any;
    animation?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  isRequired: boolean;
  errorText: string;
  isError: boolean;
}