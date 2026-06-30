
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UploadTrendItem {
    date: string;
    Reports: number;
    Research: number;
    Others: number;
}

interface DocumentUploadTrendChartProps {
    trendData: UploadTrendItem[];
}

export default function TrendChart({ trendData }: DocumentUploadTrendChartProps) {
    return (
        <div className="w-full h-full min-h-65">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: 10, bottom: -2 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="none" />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 14, fill: 'var(--b1)', fontFamily: 'var(--font-creato, Creato, sans-serif)' }}
                        className="text-(--b1) text-sm tracking-[0.02em]"
                        dy={16}
                        height={40}
                        axisLine={false}
                        tickLine={false}
                    />
                    
                    <YAxis
                        domain={[0, 800]}
                        ticks={[0, 200, 400, 600, 800]}
                        axisLine={false}
                        tickLine={false}
                        width={45}
                        tick={({ x, y, payload }) => (
                            <text
                                x={Number(x) - 40}
                                y={Number(y) + 4}
                                textAnchor="start"
                                fill="#1B1B21"
                                fontSize={14}
                                className="font-creato text-(--b1) text-sm tracking-[0.02em]"
                            >
                                {payload.value}
                            </text>
                        )}
                    />

                    <Tooltip
                        cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-white text-(--b1) border border-gray-200/80 rounded-xl p-3 shadow-sm flex flex-col gap-2 font-creato text-xs tracking-[0.02em]">
                                        {payload.map((entry, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span
                                                    className="w-2.5 h-2.5 rounded-full block shrink-0"
                                                    style={{ backgroundColor: entry.stroke }}
                                                />
                                                <span className="font-normal">
                                                    {entry.name} {entry.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />

                    <Line type="monotone" name="Research" dataKey="Research" stroke="#397968" strokeWidth={3.5} dot={{ r: 0 }} activeDot={{ r: 6, stroke: '#3549E5', strokeWidth: 2, fill: '#fff' }} />
                    <Line type="monotone" name="Reports" dataKey="Reports" stroke="#CCE88E" strokeWidth={3.5} dot={{ r: 0 }} activeDot={{ r: 6, stroke: '#3549E5', strokeWidth: 2, fill: '#fff' }} />
                    <Line type="monotone" name="Others" dataKey="Others" stroke="#FF7D60" strokeWidth={3.5} dot={{ r: 0 }} activeDot={{ r: 6, stroke: '#3549E5', strokeWidth: 2, fill: '#fff' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

