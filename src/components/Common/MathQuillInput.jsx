import React from 'react';
import { StaticMathField } from 'react-mathquill';

const MathQuillInput = ({latex}) => {
    return (
        <div id='math-display'>
            <StaticMathField>{latex}</StaticMathField>
        </div>
    );
};

export default MathQuillInput;
