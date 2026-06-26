"use client"

import { useEffect, useRef } from 'react';

// Political strength data per state
const STATE_DATA: Record<string, { support: number; risk: string; party: string }> = {
    "Johor":             { support: 91, risk: "High",   party: "Party A" },
    "Kedah":             { support: 62, risk: "Medium", party: "Party B" },
    "Kelantan":          { support: 48, risk: "High",   party: "Party B" },
    "Melaka":            { support: 74, risk: "Low",    party: "Party A" },
    "Negeri Sembilan":   { support: 70, risk: "Low",    party: "Party A" },
    "Pahang":            { support: 55, risk: "Medium", party: "Party B" },
    "Perak":             { support: 66, risk: "Medium", party: "Party A" },
    "Perlis":            { support: 58, risk: "Medium", party: "Party B" },
    "Pulau Pinang":      { support: 80, risk: "Low",    party: "Party A" },
    "Sabah":             { support: 53, risk: "High",   party: "Party B" },
    "Sarawak":           { support: 60, risk: "Medium", party: "Party B" },
    "Selangor":          { support: 85, risk: "Low",    party: "Party A" },
    "Terengganu":        { support: 44, risk: "High",   party: "Party B" },
    "W.P. Kuala Lumpur": { support: 88, risk: "Low",    party: "Party A" },
    "W.P. Labuan":       { support: 61, risk: "Medium", party: "Party A" },
    "W.P. Putrajaya":    { support: 77, risk: "Low",    party: "Party A" },
};

function getColor(support: number): string {
    if (support >= 80) return '#1a3a2a';   // dark green — strong
    if (support >= 65) return '#2d6a4f';   // medium green
    if (support >= 55) return '#74c69d';   // light green — moderate
    return '#f4a261';                       // orange — at risk
}

export default function MalaysiaMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Dynamically import Leaflet (client-only)
        const initMap = async () => {
            const L = (await import('leaflet')).default;
            await import('leaflet/dist/leaflet.css');

            const map = L.map(mapRef.current!, {
                center: [4.0, 109.5],
                zoom: 5,
                zoomControl: true,
                scrollWheelZoom: false,
                attributionControl: false,
            });

            mapInstanceRef.current = map;

            // Light minimal tile layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
                attribution: '©OpenStreetMap ©CartoDB',
                subdomains: 'abcd',
                maxZoom: 19,
            }).addTo(map);

            // Fetch Malaysia states GeoJSON
            const response = await fetch(
                'https://raw.githubusercontent.com/govhackaustralia/hackerspace/master/malaysia_states.geojson'
            ).catch(() => null);

            // Fallback: use a known working source
            const geoRes = await fetch(
                'https://raw.githubusercontent.com/longztian/hdbscan/master/demo/malaysia_states.geojson'
            ).catch(() => null);

            const finalRes = response?.ok ? response : geoRes?.ok ? geoRes : null;

            if (finalRes) {
                const geojson = await finalRes.json();

                L.geoJSON(geojson, {
                    style: (feature: any) => {
                        const name = feature?.properties?.name || feature?.properties?.Name || '';
                        const data = STATE_DATA[name];
                        return {
                            fillColor: data ? getColor(data.support) : '#d4e6d4',
                            weight: 1.5,
                            opacity: 1,
                            color: '#ffffff',
                            fillOpacity: 0.85,
                        };
                    },
                    onEachFeature: (feature: any, layer: any) => {
                        const name = feature?.properties?.name || feature?.properties?.Name || 'Unknown';
                        const data = STATE_DATA[name];
                        if (data) {
                            layer.bindTooltip(
                                `<div style="font-family:sans-serif;font-size:12px;padding:4px 8px;border-radius:6px;">
                                    <strong>${name}</strong><br/>
                                    Support: <b>${data.support}%</b><br/>
                                    Risk: ${data.risk}<br/>
                                    ${data.party}
                                </div>`,
                                { sticky: true, className: 'leaflet-tooltip-custom' }
                            );
                        }
                        layer.on({
                            mouseover: (e: any) => {
                                e.target.setStyle({ weight: 2.5, fillOpacity: 1 });
                            },
                            mouseout: (e: any) => {
                                e.target.setStyle({ weight: 1.5, fillOpacity: 0.85 });
                            },
                        });
                    },
                }).addTo(map);
            } else {
                // Fallback: show markers for key states if GeoJSON fails
                const states = [
                    { name: 'Johor Bahru', lat: 1.48, lng: 103.76, support: 91 },
                    { name: 'Kuala Lumpur', lat: 3.14, lng: 101.69, support: 88 },
                    { name: 'Penang', lat: 5.41, lng: 100.33, support: 80 },
                    { name: 'Selangor', lat: 3.07, lng: 101.51, support: 85 },
                    { name: 'Melaka', lat: 2.19, lng: 102.25, support: 74 },
                    { name: 'Sabah', lat: 5.98, lng: 116.07, support: 53 },
                    { name: 'Sarawak', lat: 1.55, lng: 110.36, support: 60 },
                ];
                states.forEach(s => {
                    L.circleMarker([s.lat, s.lng], {
                        radius: 10,
                        fillColor: getColor(s.support),
                        color: '#fff',
                        weight: 2,
                        fillOpacity: 0.9,
                    })
                    .bindTooltip(`<b>${s.name}</b><br/>Support: ${s.support}%`, { sticky: true })
                    .addTo(map);
                });
            }

            // Legend
            const legend = new (L.Control.extend({
                options: { position: 'bottomright' },
                onAdd: () => {
                    const div = L.DomUtil.create('div');
                    div.innerHTML = `
                        <div style="background:white;padding:8px 10px;border-radius:8px;font-size:11px;font-family:sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.15)">
                            <div style="font-weight:600;margin-bottom:5px">Support Level</div>
                            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px"><span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:#1a3a2a"></span> Strong (≥80%)</div>
                            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px"><span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:#2d6a4f"></span> Good (65–79%)</div>
                            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px"><span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:#74c69d"></span> Moderate (55–64%)</div>
                            <div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:#f4a261"></span> At Risk (&lt;55%)</div>
                        </div>`;
                    return div;
                },
            }))();
            legend.addTo(map);
        };

        initMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={mapRef}
            style={{ width: '100%', height: '100%', borderRadius: '12px' }}
        />
    );
}