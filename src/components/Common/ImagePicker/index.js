import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useDropzone} from 'react-dropzone';
import Colors from '../../../static/_colors';

const ImagePicker = (props) => {
  const [files, setFiles] = useState(props.image);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      if(!!acceptedFiles) {
        props.setImage(acceptedFiles);
      }
    }
  });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    // files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const classes = useStyles();

  const renderThumbs = files.map(file => (
    <div key={file.name} style={{position: 'relative'}} >
      <div className = {classes.thumb }>
        <div className = {classes.thumbInner}>
          <img
            className = {classes.image}
            src={file.preview}
          />
        </div>
      </div>
    </div>
  ));

  

  return (
    <>
      <div {...getRootProps({className: classes.dropZone})} className = {classes.dropZone}>
      {renderThumbs}
        <div className = {classes.imageContainer}>
          <input {...getInputProps()} />
          <div className = {classes.picker}>
            <div className ={classes.pickerText}>
              PHOTO
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// const Thumb = styled.div`
//   cursor: pointer;
//   display: inline-flex;
//   border-radius: 2;
//   width: 78px;
//   height: 78px;
//   box-sizing: border-box;
//   position: absolute;
//   top: 0;
//   left: 0;
//   border-radius: 3px;

//   @media (max-width: 425px) {
//     width: 64px;
//     height: 64px;
//   }
// `;

// const ThumbInner = styled.div`
//   min-width: 0;
//   overflow: hidden;
//   border-radius: 3px;
// `;

// const Image = styled.img`
//   display: block;
//   width: auto;
//   height: 100%;
//   overflow: hidden;

//   @media (max-width: 425px) {
//     width: 64px;
//     height: 64px;
//   }
// `;


// const DropZone = styled.div`
// 	width: 78px;
// 	height: 78px;
//   background-color: transparent;
//   z-index: 100;

//   @media (max-width: 425px) {
//     width: 64px;
//     height: 64px;
//   }
// `;

// const ImageContainer = styled.div`
// 	width: 78px;
// 	height: 78px;
// 	background-color: #484B5C;
// 	display: flex;
// 	justify-content: center;
//   align-items: center;
//   border-radius: 3px;
//   cursor: pointer;

//   @media (max-width: 425px) {
//     width: 64px;
//     height: 64px;
//   }
// `;

// const Picker = styled.div`
// 	width: 64px;
// 	height: 64px;
// 	border: 1px dashed white;
// 	display: flex;
// 	justify-content: center;
//   align-items: center;
  
//   @media (max-width: 425px) {
//     width: 52px;
//     height: 52px;
//   }
// `;

// const PickerText = styled.div`
//   color: #fff;
//   font-family: Montserrat;
//   font-size: 11px;
// `;

const useStyles = makeStyles((theme) =>
    createStyles({




        thumb: {
          cursor: 'pointer',
          display: 'inline-flex',
          borderRadius: 2,
          width: '5rem',
          height: '5rem',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '3px'
				},
				thumbInner: {
          minWidth: 0,
          overflow: 'hidden',
          borderRadius: '50%',
				},
        image: {
          display: 'block',
          width: 'auto',
          height: '100%',
          overflow: 'hidden'
        },
        dropZone: {
          width: '5rem',
          height: '5rem',
          backgroundColor: 'transparent',
          zIndex: 100
				},
				imageContainer :{
          width: '5rem',
          height: '5rem',
          backgroundColor: '#484B5C',
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '3px',
          cursor: 'pointer',
          border : '1px solid #333',
          borderRadius : '50%',
				},
				picker :{
          width: '5rem',
          height: '5rem',
          // border: '1px dashed white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',

				},
        pickerText: {
          color: Colors.white,
          fontSize: '11px',
        }
    })
);

export default ImagePicker;