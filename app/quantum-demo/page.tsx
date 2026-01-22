import React from 'react';
import QuantumSlider from '../../components/QuantumSlider';

export default function QuantumDemoPage() {
    const images = {
        raw: '/quantum/raw.png',
        standard: '/quantum/basic.png',
        luxury: '/quantum/luxury.png'
    };

    return (
        <div className="w-full min-h-screen bg-black">
            <QuantumSlider images={images} />
        </div>
    );
}
