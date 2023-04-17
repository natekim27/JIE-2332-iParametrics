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

const VisualizeData = (props) => {
    const navigate = useNavigate();
    const { sno } = useParams();

    const [imageList, setImageList] = useState(''); 

    // const [isNational, setNational] = useState(false); 

    // const handleSliderChange = () => {
    //   setNational(!isNational);
    //   window.location.reload();
    // };
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/features/get-by-sno?sno=${sno}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then(async (data) => {
      
            const fields = [
              { name: "population", value: data[0]["population"] || 0  },
              { name: "gdp", value: data[0]["gdp"] || 0  },
              { name: "nri", value: data[0]["nri"] || 0  },
              { name: "taxes", value: data[0]["taxes"] || 0  },
              { name: "college_univ", value: data[0]["college_univ"] || 0 },
              { name: "declarations", value: data[0]["declarations"] },
              { name: "pa", value: data[0]["pa"] || 0  },
              { name: "hm", value: data[0]["hm"] || 0  },
            ];
      
            const imageList = [];
      
            const fetchImage = async () => {
              for (let i = 0; i < fields.length; i++) {
                const { name, value } = fields[i];
                const response = await fetch(
                  `http://127.0.0.1:5000/features/get-bar-graph?sno=${sno}&field=${name}&bval=${value}&national=${props.isNational}`
                );
                const blob = await response.blob();
                const src = URL.createObjectURL(blob);
                imageList.push(src);
                setImageList(imageList);
      
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
              for (let i = 0; i < fields.length; i++) {
                const { name, value } = fields[i];
                const response = await fetch(
                  `http://127.0.0.1:5000/features/get-pie-chart?sno=${sno}&field=${name}&bval=${value}&national=${props.isNational}`
                );
                const blob = await response.blob();
                const src = URL.createObjectURL(blob);
                imageList.push(src);
                setImageList(imageList);
      
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
            };
            fetchImage();
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
      

    return (
        <div className='font-face-gs'>
            <div className='grid-container'>
                <div className='grid-item'>
                    <img src={imageList[8]}></img>
                </div>
                <div className='grid-item'>
                    <img src={imageList[1]}></img>
                </div>
                <div className='grid-item'>
                    <img src={imageList[2]}></img>
                </div>
                <div className='grid-item'>
                    <img src={imageList[3]}></img>
                </div>
                <div className='grid-item'>
                    <img src={imageList[4]}></img>
                </div>
                <div className='grid-item'>
                    <img src={imageList[5]}></img>
                </div>
                <div className='grid-item'>
                    <img src={imageList[6]}></img>
                </div>
                <div className='grid-item'>
                    <img src={imageList[7]}></img>
                </div>
            </div>
            <div className='flexbox-container'>
                {/* <div style={buttonStyle}>
                    <Button variant="outline-secondary" type="submit" onClick={() => handleSliderChange()}>
                        Toggle National
                    </Button>
                </div> */}
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