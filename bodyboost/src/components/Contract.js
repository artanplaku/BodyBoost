import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import '../styles/Contract.css'
import SignatureCanvas from 'react-signature-canvas';

const Contract = () => {
    const [content, setContent] = useState('');
    const [submittedContent, setSubmittedContent] = useState("");
    const [signatureImage, setSignatureImage] = useState("")
    const sigCanvas = useRef({});


    const handleContentChange = (value) => {
        setContent(value);
    };

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
      
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
          [{ 'font': [] }],
          [{ 'align': [] }],
        ]
      };

    return (
        <div>
            <ReactQuill value={content} onChange={handleContentChange} modules={modules} className="editor"/>
            <SignatureCanvas ref={sigCanvas} canvasProps={{width: 500, height: 200, className: 'sigCanvas', style: {backgroundColor: 'rgba(0,0,0,0.1)'}}} />
            <button onClick={saveContract} className="save-button">Save Contract</button>
            <div dangerouslySetInnerHTML={{ __html: submittedContent }} />
            {signatureImage && <img src={signatureImage} alt="Signature" />}
        </div>
    )
}

export default Contract;
