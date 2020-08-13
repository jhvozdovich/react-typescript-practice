import React from 'react';

// Components - choose one and be consistent
// Props -

interface Props {
    name: string;
    color: string;
}

type OtherProps = {
    name: string;
    color: string;
};

// Component written as a function declaration
// Using the function declaration with the interface Props
function Heading({ name, color }: Props): React.ReactNode {
    return <h1>My Website Heading</h1>;
}

// Component ritten as a function expression
// Using the function expression with the type OtherProps
const OtherHeading: React.FC<OtherProps> = ({ name, color }) => <h1>My Website Heading</h1>;

type Props = {
    /** color to use for the background */
    color?: string;
    /** standard children prop: accepts any valid React Node */
    children: React.ReactNode;
    /** callback function passed to the onClick handler*/
    onClick: () => void;
};

const Button: React.FC<Props> = ({ children, color = 'tomato', onClick }) => {
    return (
        <button style={{ backgroundColor: color }} onClick={onClick}>
            {children}
        </button>
    );
};
