import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import './VisualizeDataPage.css';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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

    const [imageList, setImageList] = useState([]); 

    // const [isNational, setNational] = useState(false); 

    let fields = [
              { name: "population", value: 0  },
              { name: "gdp", value: 0  },
              { name: "nri", value: 0  },
              { name: "taxes", value: 0  },
              { name: "college_univ", value: 0 },
              { name: "declarations", value: 0 },
              { name: "pa", value: 0  },
              { name: "hm", value: 0  },
    ];
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/features/get-by-sno?sno=${sno}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then(async (data) => {
      
            fields = [
              { name: "population", value: data["population"] || 0  },
              { name: "gdp", value: data["gdp"] || 0  },
              { name: "nri", value: data["nri"] || 0  },
              { name: "taxes", value: data["taxes"] || 0  },
              { name: "college_univ", value: data["college_univ"] || 0 },
              { name: "declarations", value: data["declarations"] },
              { name: "pa", value: data["pa"] || 0  },
              { name: "hm", value: data["hm"] || 0  },
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
      
    const downloadImages = async () => {
      const zip = new JSZip();
    
      for (let i = 0; i < imageList.length; i++) {
        const field = fields && fields[i % 8].name;
        const response = await fetch(imageList[i]);
        const blob = await response.blob();
        (i < 8) ? zip.file(`${field}_bar.jpg`, blob) : zip.file(`${field}_pie.jpg`, blob);
      }
    
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, 'images.zip');
      });
    };

    const handleBackToSearch = () => {
      fetch("http://127.0.0.1:5000/features/delete-local-images")
      .catch((err) => {
        console.log(err.message);
      });
      navigate("/communitySearch", { replace: true });
    };

    const handleBackToCommunity = () => {
      fetch("http://127.0.0.1:5000/features/delete-local-images")
      .catch((err) => {
        console.log(err.message);
      });
      navigate(`/communityDetails/${sno}`, { replace: true });
    };

    return (
        <div className='font-face-gs'>
            <div className='grid-container'>
                <div className='grid-item'>
                    <img src={imageList[0]}></img>
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
                {(props.isNational) ?
                  <div className='grid-item'>
                      <img src={imageList[6]}></img>
                  </div>
                : null}
                {(props.isNational) ?
                  <div className='grid-item'>
                      <img src={imageList[7]}></img>
                  </div>
                : null}
            </div>
            <div className='flexbox-container'>
                <div style={buttonStyle}>
                    <Button variant="outline-secondary" type="submit" onClick={handleBackToSearch}>
                        Back to Search
                    </Button>
                </div>
                <div style={buttonStyle}>
                    <Button variant="outline-secondary" type="submit" onClick={handleBackToCommunity}>
                        Back to Community
                    </Button>
                </div>
                <div style={buttonStyle}>
                    <Button variant="outline-secondary" type="submit" onClick={downloadImages}>
                        Download Images
                    </Button> 
                </div>
            </div>
        </div>
    );
}

export default VisualizeData;