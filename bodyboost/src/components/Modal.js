import "../styles/Modal.scss"

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Weight Entry</h2>
                    <button onClick={onClose} className="modal-close-button">X</button>
                </div>
                <input type="number" placeholder="Weight" className="weight-input" />
                <input type="date" className="date-input" />
                <button className="submit-button">Submit</button>
            </div>
        </div>
    );
};

export default Modal