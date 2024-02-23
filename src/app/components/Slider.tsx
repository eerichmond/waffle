import React, { useState } from 'react';

interface SliderProps {
    min: number;
    max: number;
    value: number;
    setValue: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, value, setValue }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
    };

    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                className="slider" // Assuming you have or will have some CSS for this
            />
        </div>
    );
};

export default Slider;
