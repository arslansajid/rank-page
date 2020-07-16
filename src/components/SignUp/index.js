import React, { useState } from 'react';
import Dialog from "../Common/Dialog";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
// import RecoverAccount from "./recoverAccount";
import Categories from "./categories";


const SignUp = (props) => {
    // const { show , switchToSignIn} = props;
    const [showStep1, setShowStep1] = useState(true);
    const [showStep2, setShowStep2] = useState(false);
    const [showStep3, setShowStep3] = useState(false);
    const [recoverAccount, setRecoverAccount] = useState(false);
    const [categories, setCategories] = useState(false);
    const [value, setValue] = useState();

    const registerData = (data) => {
      setValue(data)
    }
    // const handleSwitchToSignIn = () => {
    //   setShowStep1(false)      
    // }

    return (
      <div>
        {showStep1 && 
          <Dialog
            title={"Register"}
            open={showStep1}
            message={<Step1  moveToNext = {() => {setShowStep1(false) ; setShowStep2(true)}}  getData = {(value) => {registerData(value)}} />}
            applyForm={() => setShowStep1(false)  }
            backAction = {() => setShowStep1(false)}
            hideActions={true}
          />
         }
        {showStep2 &&
        <Dialog
          title={"Register"}
          open={showStep2}
          message={<Step2  moveToNext = {() => {setShowStep2(false) ; setShowStep3(true)}} 
          registerData = {value}
           />}
          applyForm={() => setShowStep1(true)}
          // cancelForm={() => setShowStep1(false)}
          backAction = {() => setShowStep2(false)}
          hideActions={true}
        />
        }

        {showStep3 &&
        <Dialog
          title={"Choose Categories"}
          open={showStep3}
          message={<Step3 />}
          // applyForm={() => setShowStep1(true)}
          // cancelForm={() => setShowStep1(false)}
          // backAction = {() => setShowStep2(false)}
          hideActions={true}
        />
        }

        {/* {recoverAccount &&
        <Dialog
          title={"Sign In"}
          open={recoverAccount}
          message={<RecoverAccount />}
          applyForm={() => setShowStep1(true)}
          // cancelForm={() => setShowStep1(false)}
          backAction = {() => setShowStep2(false)}
          hideActions={true}
        />
        } */}

        {/* {categories &&
        <Dialog
          title={"Choose Categories"}
          open={categories}
          message={<RecoverAccount />}
          applyForm={() => setShowStep1(true)}
          // cancelForm={() => setShowStep1(false)}
          backAction = {() => setShowStep2(false)}
          hideActions={true}
        />
        } */}

      </div>
    )
};

SignUp.defaultProps = {};

export default SignUp;
