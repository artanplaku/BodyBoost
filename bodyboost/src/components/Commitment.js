import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import '../styles/Commitment.css'
import SignatureCanvas from 'react-signature-canvas';
import { Collapse } from 'antd';


const { Panel } = Collapse;

const Commitment = () => {
    const [content, setContent] = useState('I, [Your Name], commit to achieving my personal goals...');
    const [submittedContent, setSubmittedContent] = useState("");
    const [signatureImage, setSignatureImage] = useState("");
    const [contracts, setContracts] = useState([]);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const sigCanvas = useRef({});

//---------------------------------------------------------------------------------------
const handleContentChange = (value) => {
    const formattedValue = value.replace(/ /g, ' ').replace(/\n/g, '<br/>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    setContent(formattedValue);
};
//---------------------------------------------------------------------------------------
    useEffect(() => {
        const fetchContracts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token is missing.');
                return;
            }
        
            try {
                const response = await axios.get('https://bodyboostbackend.onrender.com/api/contracts/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
        
                console.log(response.data);
                setContracts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchContracts();
    }, []);
//---------------------------------------------------------------------------------------

    const saveContract = async () => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    
        if (!token) {
            console.error('Token is missing.');
            return;
        }
    
        if (!userId) {
            console.error('User ID is missing.');
            return;
        }
    
        try {
            const response = await axios.post('https://bodyboostbackend.onrender.com/api/contracts/create', {
                content: content,
                signature: signature,
                userId: userId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log(response.data);
            const contractId = response.data._id; 
            console.log(`contractID: ${contractId}`);
           
            const contractResponse = await axios.get(`https://bodyboostbackend.onrender.com/api/contracts/${contractId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(`get req: ${response.data}`);
    
            setSubmittedContent(contractResponse.data.content);
            setSignatureImage(contractResponse.data.signature);
            alert('Your contract has been saved.');
        } catch (error) {
            console.error(error);
        }
    };
    //---------------------------------------------------------------------------------------
    const deleteContract = async (contractId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing.');
            return;
        }
    
        try {
            await axios.delete(`https://bodyboostbackend.onrender.com/api/contracts/${contractId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            // Remove the deleted contract from the state
            setContracts(contracts.filter(contract => contract._id !== contractId));
        } catch (error) {
            console.error(error);
        }
    };

   
    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline'],        // toggled buttons
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
        ],
      };

      return (
        <div className='contract-container'>
          <h2>Commitment Contract</h2>
           <p>Write your personal commitment contract here. This is a contract with yourself to achieve your personal goals.</p>
            <Collapse accordion>
                <Panel header="Create Contract" key="1">
                    <div className="quill-wrapper">
                        <ReactQuill value={content} onChange={handleContentChange} modules={modules} className="editor"/>
                    </div>
                    <div className="signature-section">
                      <h2>Signature</h2>
                      <SignatureCanvas ref={sigCanvas} canvasProps={{width: 400, height: 100, className: 'sigCanvas', style: {backgroundColor: 'rgba(0,0,0,0.1)'}}} />
                    </div>
                    <button onClick={saveContract} className="save-button">Save Contract</button>
                </Panel>
            </Collapse>
            <div className="content-wrapper">
                <div className="contract-content" dangerouslySetInnerHTML={{ __html: submittedContent }} />
            </div>
            {signatureImage && <img src={signatureImage} alt="Signature" />}
            {contracts.map(contract => (
            <div key={contract._id} className="content-wrapper">
                <div className="contract-content" dangerouslySetInnerHTML={{ __html: contract.content }} />
                <div className="signature-display">
                  <h2>Signature:</h2>
                  <img src={contract.signature} alt="Signature" />
                </div>
                <button onClick={() => deleteContract(contract._id)}>Delete</button>
            </div>
            ))}
        </div>
    )
    
}

export default Commitment