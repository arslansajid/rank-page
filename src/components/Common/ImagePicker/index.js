import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useDropzone} from 'react-dropzone';
import Colors from '../../../static/_colors';

const ImagePicker = (props) => {
  const {type} = props;
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
      <div className = 'thumb'>
        <div className = 'thumbInner'>
          <img
            className = 'image'
            src={file.preview}
          />
        </div>
      </div>
    </div>
  ));


  return (
    <>
      <div {...getRootProps({className: type === 'image' ?  classes.dropZoneImage : classes.dropZoneCover})} className = {type === 'image' ?  classes.dropZoneImage : classes.dropZoneCover}>
      {renderThumbs}
        <div className = 'imageContainer'>
          <input {...getInputProps()} />
          {/* <div className = 'picker'> */}
          {
                type === 'image' ?
                <img src={require('../../../assets/icons/placeholder.png')} style = {{width : '100%' , borderRadius: '50%'}}/>
                :
                <img src={require('../../../assets/icons/placeholder.png')} style = {{width : '100%' , height : '150px' , objectFit : 'cover'}}/>
              }
            {/* </div> */}
          {/* <div className = 'picker'> */}
            <div className ='pickerText'>
              {/* {
                type === 'image' ?
                'PROFILE'
                :
                'COVER PHOTO'
              } */}
              Change
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) =>
    createStyles({
      dropZoneImage : {
          // width: '5rem',
          // height: '5rem',
          backgroundColor: 'transparent',
          zIndex: 100,
        '& .thumb': {
          cursor: 'pointer',
          display: 'inline-flex',
          borderRadius: 2,
          width: '7.75rem',
          height: '7.75rem',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '3px'
				},
				'& .thumbInner': {
          minWidth: 0,
          overflow: 'hidden',
          borderRadius: '50%',
				},
        '& .image': {
          display: 'block',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        },
				'& .imageContainer' :{
          width: '7.75rem',
          height: '7.75rem',
          backgroundColor: '#484B5C',
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '3px',
          cursor: 'pointer',
          // border : '1px solid #333',
          borderRadius : '50%',
				},
				'& .picker' :{
          width: '5rem',
          height: '5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          // backgroundImage : ('../../../assets/icons/placeholder.svg')

				},
        '& .pickerText': {
          fontSize: '1rem',
          position : 'absolute' ,
          color : Colors.black,
          fontWeight : 'bold',
        }
      },



      ////// cover


      dropZoneCover : {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        zIndex: 100,
      '& .thumb': {
        cursor: 'pointer',
        display: 'inline-flex',
        borderRadius: 2,
        width: '100%',
        minHeight: '150px',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '3px'
      },
      '& .thumbInner': {
        minWidth: 0,
        overflow: 'hidden',
      },
      '& .image': {
        display: 'block',
        width: '100%',
        height: '150px',
        overflow: 'hidden'
      },
      '& .imageContainer' :{
        width: '100%',
        height: '100%',
        // backgroundColor: '#484B5C',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '3px',
        cursor: 'pointer',
        // border : '1px solid #333',
      },
      '& .picker' :{
        width: '100%',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      },
      '& .pickerText': {
        fontSize: '1rem',
        position : 'absolute' ,
        color : Colors.black,
        fontWeight : 'bold',
      }
    },
    })
);

export default ImagePicker;