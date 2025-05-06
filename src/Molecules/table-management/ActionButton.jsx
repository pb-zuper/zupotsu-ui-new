import React from 'react';

const ActionButton = ({ onEdit, onDelete, editIcon, deleteIcon, isReq }) => {

  const greyoutStyle = {
    filter: 'grayscale(100%)',
    WebkitFilter: 'grayscale(100%)',
    opacity: '0.5'
  };

  return (
    <div style={{ display: 'flex', width: '100px', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly", padding: 0, border: "0px solid transparent" }}>
      <button onClick={onEdit} style={{
        width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000", display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <img src={editIcon} alt="Edit Icon" width={32} height={32} />
        <span>{isReq}</span>
      </button>
      <button onClick={() => { if (isReq) { onDelete() } }} style={{
        width: "32px", cursor: isReq ? 'pointer' : "not-allowed", padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000", display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <img src={deleteIcon} alt="Delete Icon" width={32} height={32} style={!isReq ? greyoutStyle : {}} />
      </button>
    </div>
  );
};

export default ActionButton;
