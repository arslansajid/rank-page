import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "../../components/Common/Dialog";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp/step1.js";
import SignUpStep2 from "../../components/SignUp/step2.js";
import SelectCategories from "../../components/SignUp/selectCategories";
import RecoverAccount from "../../components/RecoverAccount";
import Success from "../../components/RecoverAccount/sucees";
import { hideSignIn, showSignIn } from "../../actions/SignInFormActions";
import { hideSignUp, showSignUp } from "../../actions/SignUpFormActions";
import { reloadData } from '../../actions/ReloadDataAction';

const UserProfile = (props) => {
    const classes = useStyles();
    const { user, signIn, signUp, dispatch } = props;
    const [showSignUpStep2, setShowSignUpStep2] = useState(false);
    const [showSelectCategories, setShowSelectCategories] = useState(false);
    const [showRecoveryModal, setShowRecoveryModal] = useState(false);
    const [showRecoverySuccess, setShowRecoverySuccess] = useState(false);
    const [value, setValue] = useState();

    const registerData = (data) => {
        setValue(data)
    }

    const switchToSignUp = () => {
        dispatch(hideSignIn());
        dispatch(showSignUp());
    }

    return (
        <>
            {
                signIn && (
                    <Dialog
                        title={"Sign In"}
                        open={signIn}
                        message={
                            <SignIn
                                showSignUp={() => switchToSignUp()}
                                showRecoveryModal={() => {
                                    setShowRecoveryModal(true);
                                    dispatch(hideSignIn());
                                }}
                                closeSignIn={() => {
                                    dispatch(hideSignIn())
                                    dispatch(reloadData())
                                }}
                            />
                        }
                        applyForm={() => dispatch(hideSignIn())}
                        cancelForm={() => dispatch(hideSignIn())}
                        hideActions={true}
                    />
                )
            }
            {
                signUp && (
                    <Dialog
                        title={"Register"}
                        open={signUp}
                        hideActions={true}
                        message={
                            <SignUp
                                moveToNext={() => {
                                    dispatch(hideSignUp());
                                    setShowSignUpStep2(true)
                                }}
                                values={value}
                                getData={(value) => registerData(value)}
                            />
                        }
                        applyForm={() => dispatch(hideSignUp())}
                        cancelForm={() => dispatch(hideSignUp())}
                    />
                )
            }
            {
                showSignUpStep2 && (
                    <Dialog
                        title={"Register"}
                        open={showSignUpStep2}
                        message={<SignUpStep2
                            openLogin = {() => {setShowSignUpStep2(false) ; dispatch(showSignIn())}}
                            registerData={value}
                            showCatergories={() => { setShowSignUpStep2(false); setShowSelectCategories(true) }}

                        />}
                        applyForm={() => { dispatch(showSignUp()); setShowSignUpStep2(false) }}
                        backAction={() => { dispatch(showSignUp()); setShowSignUpStep2(false) }}
                        hideActions={true}
                    />
                )
            }
            {
                showSelectCategories && (
                    <Dialog
                        title={"Select Categories"}
                        open={showSelectCategories}
                        message={<SelectCategories
                            close={() => setShowSelectCategories(false)}
                        />}
                        applyForm={() => setShowSelectCategories(false)}
                        skipAction={() => setShowSelectCategories(false)}

                        hideActions={true}
                    />
                )
            }
            {
                showRecoveryModal && (
                    <Dialog
                        title={"Unable to sign in"}
                        open={showRecoveryModal}
                        message={<RecoverAccount
                            showSuccess={() => { setShowRecoveryModal(false); setShowRecoverySuccess(true) }}
                        />}
                        applyForm={() => { setShowRecoveryModal(false); dispatch(showSignIn()) }}
                        backAction={() => { setShowRecoveryModal(false); dispatch(showSignIn()) }}
                        hideActions={true}
                    />
                )
            }
            {
                showRecoverySuccess && (
                    <Dialog
                        title={"Email Sent"}
                        open={showRecoverySuccess}
                        message={<Success />}
                        applyForm={() => setShowRecoverySuccess(false)}
                        cancelForm={() => setShowRecoverySuccess(false)}
                        hideActions={true}
                    />
                )
            }
        </>
    )
}

const useStyles = makeStyles((theme) => ({

}))

function mapStateToProps(state) {
    return {
        user: state.user,
        signIn: state.signIn,
        signUp: state.signUp,
    };
}

export default connect(mapStateToProps)(UserProfile);