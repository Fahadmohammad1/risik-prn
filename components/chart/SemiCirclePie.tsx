import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface SemiCircleChartProps {
    totalDocsValue: string;
}

export default function SemiCircleChartOnly({ totalDocsValue }: SemiCircleChartProps) {
    const chartData = [
        { name: 'Reports', value: 42, color: '#CCE88E' },
        { name: 'Research', value: 28, color: '#22493E' },
        { name: 'Surveys', value: 15, color: '#E5A90F' },
        { name: 'News', value: 10, color: '#3549E5' },
        { name: 'Others', value: 5, color: '#FF7D60' }
    ];

    return (
        <div className='w-full'>
            <div className="relative w-full mt-2" style={{ height: '240px', overflow: 'hidden' }}>
                <div className="absolute inset-0 z-5" style={{ height: '480px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius="72%"
                                outerRadius="98%"
                                paddingAngle={1.5}
                                cornerRadius={10}
                                dataKey="value"
                            >
                                {chartData.map((entry, idx) => (
                                    <Cell
                                        key={`cell-${idx}`}
                                        fill={entry.color}
                                        className="hover:opacity-85 transition-opacity cursor-pointer focus:outline-none"
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                cursor={false}
                                offset={-45}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        const absoluteValue = Math.round((data.value / 100) * 2450).toLocaleString();

                                        return (
                                            <div
                                                className="bg-white z-5 border border-neutral-200/70 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 font-sans text-xs font-normal text-[#1B1B21]"
                                                style={{ boxShadow: '0 2px 8px -1px rgba(0, 0, 0, 0.06), 0 1px 3px -1px rgba(0, 0, 0, 0.04)' }}
                                            >
                                                <span
                                                    className="w-2.5 h-2.5 rounded-full block shrink-0"
                                                    style={{ backgroundColor: data.color }}
                                                />
                                                <span className="tracking-tight text-neutral-700">{absoluteValue}</span>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="absolute bottom-2 z-4 left-1/2 -translate-x-1/2 text-center w-full">
                    <span className="font-creato text-5xl sm:text-6xl font-normal text-(--b1) tracking-tight">
                        {totalDocsValue}
                    </span>
                    <p className="font-creato text-gray-700 text-sm sm:text-base font-normal mt-1">Total Documents</p>
                </div>
            </div>

            <div className="flex overflow-auto flex-wrap items-center justify-between gap-x-2 mt-4 gap-y-2 w-full border border-(--DDDDDB) rounded-md p-3 bg-gray-50/40">
                {chartData.map((type) => (
                    <div key={type.name} className="flex items-center gap-1.5 transition-colors cursor-pointer">
                        <span className="w-2.5 h-2.5 rounded-full block shrink-0" style={{ backgroundColor: type.color }}></span>
                        <span className="font-creato font-normal text-[11px] sm:text-xs text-gray-600">{type.name} {type.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}