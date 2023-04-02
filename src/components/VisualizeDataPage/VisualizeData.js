import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import './VisualizeDataPage.css';

const buttonStyle = {
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

const VisualizeData = () => {
    const navigate = useNavigate();
    const { sno } = useParams();

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/features/get-bar-graph?sno=${sno}&field=population&bval=3000`);
                const blob = await response.blob();
                setImageSrc(URL.createObjectURL(blob));
            } catch (error) {
                console.log(error);
            }
        };
        fetchImage();
    }, []);

    return (
        <div className='gillsans'>
            <div className='flexbox-container'>
                <img src={imageSrc}></img>
            </div>
            <div className='flexbox-container'>
                <div style={buttonStyle}>
                    <Button variant="outline-secondary" type="submit" onClick={() => navigate("/communitySearch", { replace: true })}>
                        Back to Search
                    </Button>
                </div>
                <div style={buttonStyle}>
                    <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/communityDetails/${sno}`, { replace: true })}>
                        Back to Community
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default VisualizeData;
