import React, { useState } from 'react';
import Dialog from "../Common/Dialog";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import RecoverAccount from "./recoverAccount";
import Categories from "./categories";


const SignUp = (props) => {
    const [showStep1, setShowStep1] = useState(false);
    const [showStep2, setShowStep2] = useState(false);
    const [showStep3, setShowStep3] = useState(false);
    const [recoverAccount, setRecoverAccount] = useState(false);
    const [categories, setCategories] = useState(true);

    return (
      <div>
        {showStep1 && 
          <Dialog
            title={"Register"}
            open={showStep1}
            message={<Step1 />}
            applyForm={() => setShowStep1(false)}
            // cancelForm={() => setShowStep1(false)}
            backAction = {() => setShowStep1(false)}
            hideActions={true}
          />
         }
        {showStep2 &&
        <Dialog
          title={"Register"}
          open={showStep2}
          message={<Step2 />}
          applyForm={() => setShowStep1(true)}
          // cancelForm={() => setShowStep1(false)}
          backAction = {() => setShowStep2(false)}
          hideActions={true}
        />
        }

        {showStep3 &&
        <Dialog
          title={"Choose Categories"}
          open={showStep2}
          message={<Step3 />}
          applyForm={() => setShowStep1(true)}
          // cancelForm={() => setShowStep1(false)}
          backAction = {() => setShowStep2(false)}
          hideActions={true}
        />
        }

        {recoverAccount &&
        <Dialog
          title={"Sign In"}
          open={recoverAccount}
          message={<RecoverAccount />}
          applyForm={() => setShowStep1(true)}
          // cancelForm={() => setShowStep1(false)}
          backAction = {() => setShowStep2(false)}
          hideActions={true}
        />
        }

        {categories &&
        <Dialog
          title={"Choose Categories"}
          open={categories}
          message={<RecoverAccount />}
          applyForm={() => setShowStep1(true)}
          // cancelForm={() => setShowStep1(false)}
          backAction = {() => setShowStep2(false)}
          hideActions={true}
        />
        }

      </div>
    )
};

SignUp.defaultProps = {};

export default SignUp;
