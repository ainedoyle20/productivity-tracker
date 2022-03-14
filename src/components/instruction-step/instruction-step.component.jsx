import React from "react";

import {
    InstructionStepContainer,
    InstructionStepTitle,
    InstructionStepSubtitle,
} from './instruction-step.styles';

const InstructionStep = ({ title, text }) => {
    return (
        <InstructionStepContainer>
            <InstructionStepTitle>{title}</InstructionStepTitle>
            <InstructionStepSubtitle>
                {text}
            </InstructionStepSubtitle>
        </InstructionStepContainer>
    );
}

export default InstructionStep;
