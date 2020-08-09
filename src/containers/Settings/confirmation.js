import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import {useForm} from 'react-hook-form';


const ConformationDialog = props => {
  const [activeTab, setActiveTab] = useState(1);
  const {cancelForm , onConfirm , status} = props;

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <Typography variant="body2" className = 'space-4'>Are you sure, you want to disable your account?</Typography>
      
      <span className='space-4'>
        <Button className={activeTab === 1 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={()=> { setActiveTab(1) ; cancelForm()}}>
            <Typography>
                no
            </Typography>
        </Button>
        <Button  className={activeTab === 2 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTab(2)  ; cancelForm() ; onConfirm()}}>
            <Typography>
              {status == false ? 'Enable my account' : 'Disable my account'}
            </Typography>
        </Button>					
			</span>


    </div>
  );
};

const useStyles = makeStyles (theme =>
  createStyles ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      textAlign : 'center',
    },
    choiceButton :{
      minWidth: "20px",
      height: "40px",
      background: Colors.inputBg,
      marginRight : 10,
      color : Colors.black,
      boxShadow : 'none',
      border : '1px solid rgba(38, 38, 38, 0.12)',
    },
    choiceButtonActive :{
      minWidth: "20px",
      height: "40px",
      background: Colors.brandColor,
      marginRight : 10,
      color : Colors.white,
      border: '1px solid rgba(38, 38, 38, 0.12)',
      "&:hover": {
        background : Colors.brandColor,
    }
    },
  })
);

ConformationDialog.defaultProps = {};

export default ConformationDialog;
