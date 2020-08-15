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
//  entending FC gives function all generic functional component definitions (children prop, return type assignable to JSX element)
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
// if a prop is ignored or something isn't the right type - notified and cant continue
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

// can extend native HTML element

import React, { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** The text inside the button */
    text: string;
    /** The type of button, pulled from the Enum ButtonTypes */
    type: ButtonTypes;
    /** The function to execute once the button is clicked */
    action: () => void;
}

const ExtendedButton: React.FC<IButtonProps> = ({ text, type, action }) => {};

// this syntax is needed to auto generate docs
const ExtendedButton: React.FC<IButtonProps> = ({ text, type, action }: IButtonProps) => {};

// Enums ----------------------------------------------------------------------

/** A set of groupped constants */
enum SelectableButtonTypes {
    Important = 'important',
    Optional = 'optional',
    Irrelevant = 'irrelevant',
}

interface IButtonProps {
    text: string;
    /** The type of button, pulled from the Enum SelectableButtonTypes */
    type: SelectableButtonTypes;
    action: (selected: boolean) => void;
}

const ExtendedSelectableButton = ({ text, type, action }: IButtonProps) => {
    let [selected, setSelected] = useState(false);

    return (
        <button
            className={'extendedSelectableButton ' + type + (selected ? ' selected' : '')}
            onClick={(_) => {
                setSelected(!selected);
                action(selected);
            }}
        >
            {text}
        </button>
    );
};

/** Exporting the component AND the Enum */
export { ExtendedSelectableButton, SelectableButtonTypes };

// Importing and using Enums
import React from 'react';
import './App.css';
import {
    ExtendedSelectableButton,
    SelectableButtonTypes,
} from './components/ExtendedSelectableButton/ExtendedSelectableButton';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <ExtendedSelectableButton
                    type={SelectableButtonTypes.Important}
                    text="Select me!!"
                    action={(selected) => {
                        console.log(selected);
                    }}
                />
            </header>
        </div>
    );
};

export default App;

// Enums translate to plain JS
// original
enum SelectableButtonTypes {
    Important = 'important',
    Optional = 'optional',
    Irrelevant = 'irrelevant',
}
// transformed
'use strict';
var SelectableButtonTypes;
(function (SelectableButtonTypes) {
    SelectableButtonTypes['Important'] = 'important';
    SelectableButtonTypes['Optional'] = 'optional';
    SelectableButtonTypes['Irrelevant'] = 'irrelevant';
})(SelectableButtonTypes || (SelectableButtonTypes = {}));

// Interfaces vs Type Aliases ------------------------------------------------
// different concepts but similar uses
// both extendable
//extending interfaces
interface PartialPointX {
    x: number;
}
interface Point extends PartialPointX {
    y: number;
}

//extending types
type PartialPointX = { x: number };
type Point = PartialPointX & { y: number };

// Interface extends type
type PartialPointX = { x: number };
interface Point extends PartialPointX {
    y: number;
}

//Type alias extends interfaces
interface PartialPointX {
    x: number;
}
type Point = PartialPointX & { y: number };

// both define objects
//defining the interface for objects
interface Point {
    x: number;
    y: number;
}

//using types as well
type Point2 = {
    x: number;
    y: number;
};

//   Same implementation
//implementing the Interface
class SomePoint implements Point {
    x: 1;
    y: 2;
}

//Implementing the Type alias
class SomePoint2 implements Point2 {
    x: 1;
    y: 2;
}

type PartialPoint = { x: number } | { y: number };

// This is the only thing you can't do: implement a union type
class SomePartialPoint implements PartialPoint {
    x: 1;
    y: 2;
}

// difference - declaration merging with interfaces 


interface Point { x: number; } //declaration #1
interface Point { y: number; } //declaration #2

// These two declarations become:
// interface Point { x: number; y: number; }
const point: Point = { x: 1, y: 2 };

// difference - optional props for interfaces
//...
interface IProps {
    prop1: string,
    prop2: number, 
    myFunction: () => void,
    prop3?: boolean //optional prop
  }
  
  //...
  function MyComponent({...props}: IProps) {
    //...
  }
  
  /** You can then use them like this */
  <mycomponent prop1="text here" prop2=404 myFunction={() = {
    //...
  }} />
  
  <mycomponent prop1="text here" prop2={404} myFunction={() = {
    //...
  }}  prop3={false} />


//   HOOKS -----------------------------------------------------------
// adding type checks
const [user, setUser] = React.useState<IUser>(user);
// nullable values
const [user, setUser] = React.useState<IUser | null>(null);
setUser(newUser);


// Generic components -------------------------------------------------
interface Props<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
  }
  
  function List<T>(props: Props<T>) {
    const { items, renderItem } = props;
    const [state, setState] = React.useState<T[]>([]); 
    
    return (
      <div>
        {items.map(renderItem)}
      </div>
    );
  }

// using with type inference
ReactDOM.render(
    <List
      items={["a", "b"]} // type of 'string' inferred here
      renderItem={item => (
        <li key={item}>
          {item.trim()} //allowed, because we're working with 'strings' all around 
        </li>
      )}
    />,
    document.body
  );
//   using with specifying types 
ReactDOM.render(
    <List<number>
      items={[1,2,3,4]} 
      renderItem={item => <li key={item}>{item.toPrecision(3)}</li>}
    />,
    document.body
  );


//   Extending HTML Elements -----------------------------------------------
// define component typeas a native html element or an extension if they look and behave like native html elements


export interface IBorderedBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

class BorderedBox extends React.Component<IBorderedBoxProps, void> {
    public render() {
        const {children, title, ...divAttributes} = this.props;

        return (
            //it is a DIV afterall, and we're trying to let the user use this component knowing that.
            <div {...divAttributes} style={{border: "1px solid red"}}>
                <h1>{title}</h1>
                {children}
            </div>
        );
    }
}

const myBorderedBox = <BorderedBox title="Hello" onClick={() => alert("Hello")}/>;

// Event types ------------------------------------------------------------------
// react has its own events so can't use html events directly, but many same names
// ex  React.MouseEvent
// can restrict elements an event handler can be used on with generics
// use unions for multiple elements use same handler

/** This will allow you to use this event handler both, on anchors and button elements */
function eventHandler(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    console.log("TEST!")
}

// Integrated type definition -------------------------------------------------
//  index.d.ts and global.d.ts - have type and interface definitons used by react
// inside node_modules/@types/react with npm install
