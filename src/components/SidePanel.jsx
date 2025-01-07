// components/SidePanel.jsx
import React from 'react';

const objects = [
    { id: 1, name: 'Chair', thumbnail: '/models/chair.png' },
    { id: 2, name: 'Table', thumbnail: '/models/table.png' },
    // Add more objects as needed
];

const SidePanel = () => {
    const handleDragStart = (event, object) => {
        event.dataTransfer.setData('object', JSON.stringify(object));
    };

    return (
        <div className="w-1/4 bg-gray-200 p-4">
            <h3 className="text-2xl font-bold mb-4">Available Objects Here</h3>
            {objects.map((object) => (
                <div
                    key={object.id}
                    className="p-2 mb-2 bg-white shadow rounded cursor-pointer"
                    draggable
                    onDragStart={(e) => handleDragStart(e, object)}
                >
                    <img src={object.thumbnail} alt={object.name} className="w-full h-auto" />
                    <p className="text-center mt-2 text-black">{object.name}</p>
                </div>
            ))}
        </div>
    );
};

export default SidePanel;
