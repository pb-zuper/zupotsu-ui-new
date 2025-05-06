import React from 'react';

interface ComponentProps {
    isOpen: boolean;
    onClose: () => void;
}

const Component: React.FC<ComponentProps> = ({ isOpen, onClose }) => {
    return (
        <div style={{ 
            width: isOpen ? '20%' : 0, // Adjust width based on Component state
            height: '100%', 
            // backgroundColor: '#000', 
            
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'flex-end',
            transition: 'width 0.3s ease' // Add transition for smooth animation
        }}>
            {isOpen && (
                <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    border: '1px solid red', 
                    zIndex: 1, 
                    marginRight: '-15px' 
                }}>
                    {/* Content for the Component */}
                    <button onClick={onClose}>Close</button> {/* Close button */}
                </div>
            )}
        </div>
    );
}

export default Component;
