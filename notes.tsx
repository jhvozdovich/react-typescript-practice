import React from 'react';

// Components - choose one and be consistent

interface Props {
    name: string;
    color: string;
}

type OtherProps = {
    name: string;
    color: string;
};

// Component written as a function declaration
// Using the function declaration with the interface Props - public APIS's definition
function Heading({ name, color }: Props): React.ReactNode {
    return <h1>My Website Heading</h1>;
}

// Component ritten as a function expression
// Using the function expression with the type OtherProps - type more constrained, for react component props and state
const OtherHeading: React.FC<OtherProps> = ({ name, color }) => <h1>My Website Heading</h1>;

// type as prop
// descriptive comments with props recommended
// use types or interfaces consistenly for props
// use defaults or handle if props optional
type Props2 = {
    /** color to use for the background*/
    color?: string;
    /** standard children prop: accepts any valid React Node */
    children: React.ReactNode;
    /** callback function passed to the onClick handler*/
    onClick: () => void;
};

const Button: React.FC<Props2> = ({ children, color = 'tomato', onClick }) => {
    return (
        <button style={{ backgroundColor: color }} onClick={onClick}>
            {children}
        </button>
    );
};

// Hooks --------------------------------------------------------------
// `value` is inferred as a string
// `setValue` is inferred as (newValue: string) => void
const [value, setValue] = useState('');

// to initialize hook with null ish value:
type User = {
    email: string;
    id: string;
};

// the generic is the < >
// the union is the User | null
// together, TypeScript knows, "Ah, user can be User or null".
const [user, setUser] = useState<User | null>(null);

// discriminated unions

type AppState = {};
type Action = { type: 'SET_ONE'; payload: string } | { type: 'SET_TWO'; payload: number };

export function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SET_ONE':
            return {
                ...state,
                one: action.payload, // `payload` is string
            };
        case 'SET_TWO':
            return {
                ...state,
                two: action.payload, // `payload` is number
            };
        default:
            return state;
    }
}

// Use cases  --------------------------------------------------------------
// Forms - typing the onChange function used

const MyInput = () => {
    const [value, setValue] = React.useState('');

    // The event type is a "ChangeEvent"
    // We pass in "HTMLInputElement" to the input
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return <input value={value} onChange={onChange} id="input-example" />;
};

// Extending component props - depends on if type or interface
//  FOR TYPE - type and "= ButtonPropsType & "
type ButtonPropsType = {
    /** the background color of the button */
    color: string;
    /** the text to show inside the button */
    text: string;
};

type ContainerPropsType = ButtonPropsType & {
    /** the height of the container (value used with 'px') */
    height: number;
    width: number;
};

const ContainerPropsType: React.FC<ContainerPropsType> = ({ color, height, width, text }) => {
    return <div style={{ backgroundColor: color, height: `${height}px` }}>{text}</div>;
};

//  FOR INTERFACE - interface and extends
interface ButtonPropsInterface {
    /** the background color of the button */
    color: string;
    /** the text to show inside the button */
    text: string;
}

interface ContainerPropsInterface extends ButtonPropsInterface {
    /** the height of the container (value used with 'px') */
    height: number;
    width: number;
}

const Container: React.FC<ContainerPropsInterface> = ({ color, height, width, text }) => {
    return <div style={{ backgroundColor: color, height: `${height}px` }}>{text}</div>;
};

// Checking for types package in third party libraries -----------------------

// yarn
// yarn add @types/<package-name>

// npm
// npm install @types/<package-name>

// jest example
// npm install @types/jest

// Adding declaration file if none --------------------------------------

// file in root for banana-js make banana-js.d.ts declaration file
// basic (no types):
// declare module 'banana-js';
// thorough:
// declare namespace bananaJs {
//     function getBanana(): string;
//     function addBanana(n: number) void;
//     function removeBanana(n: number) void;
// }
