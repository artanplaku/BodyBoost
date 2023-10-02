import "../styles/Modal.scss"

const Modal = ({ 
    isOpen,
     onClose,
     weightInput, 
     setWeightInput, 
     dateInput, 
     setDateInput, 
     onSubmit 
    }) => {
    if (!isOpen) return null;

    const handleWeightChange = (e) => {
        setWeightInput(e.target.value);
    };

    const handleDateChange = (e) => {
        setDateInput(e.target.value);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Weight Entry</h2>
                    <button onClick={onClose} className="modal-close-button">X</button>
                </div>
                <input 
                    type="number" 
                    placeholder="Weight" 
                    className="weight-input" 
                    value={weightInput}
                    onChange={handleWeightChange}
                />
                <input 
                    type="date" 
                    className="date-input" 
                    value={dateInput}
                    onChange={handleDateChange}
                />
                <button className="submit-button" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Modal