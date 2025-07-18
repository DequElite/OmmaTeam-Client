import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

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
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant: ButtonVariant;
    width: number;
    height: number;
    size_type?: '%-vh' | '%-%';
    className?: any;
    animation?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    form?:string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  isRequired: boolean;
  errorText: string;
  isError: boolean;
  isTitle?: boolean;
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  isRequired: boolean;
  isError: boolean;
  errorText: string;
}