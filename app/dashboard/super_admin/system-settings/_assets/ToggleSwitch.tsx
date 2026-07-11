"use client"

import React from "react"

interface ToggleSwitchProps {
    isActive: boolean
    onToggle: () => void
}

export default function ToggleSwitch({ isActive, onToggle }: ToggleSwitchProps) {
    return (
        <button
            onClick={onToggle}
            type="button"
            className={`
                relative w-[42px] h-[22px] rounded-full p-[3px] 
                transition-colors duration-300 ease-in-out 
                focus:outline-none cursor-pointer select-none
                ${isActive ? 'bg-[#22493E]' : 'bg-[#DDDDDB]'}
            `}
        >
            <span
                className={`
                    block w-[16px] h-[16px] rounded-full shadow-sm 
                    transition-transform duration-300 ease-in-out transform
                    ${isActive ? 'translate-x-[20px] bg-[#CCE88E]' : 'translate-x-0 bg-white'}
                `}
            />
        </button>
    )
}