import React, {useEffect, useState} from 'react';
// import axios from "axios";
import { requestFirebaseNotificationPermission, onMessageListener } from '../../backend/utility'
import axiosInstance from "../../api/api.config";
import Cookie from "js-cookie";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { checkIfLoggedIn, UpdateFCMtoken } from "./actions";
import { userLogin } from "../../actions/LoginActions";
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import ListCreation from "../../components/ListCreation";
import PoolCreation from "../../components/PoolCreation";
import SigninSignup from "../SigninSignup"

const AppContainer = (props) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);

    onMessageListener()
    .then((payload) => {
        console.log("############", payload)
    })

    useEffect(() => {
        requestNotifications();

        checkIfLoggedIn()
        .then((res) => {
            // console.log("res ###", res.data.data.user)
            const token = Cookie.get('rankpage_access_token')
            console.log("token ###", token)
            // axios.defaults.headers.common['Authorization'] = `${token}`;
            axiosInstance.defaults.headers['Authorization'] = `${token}`; 
            props.dispatch(userLogin(res.data.data.user));
            setIsLoading(false);
        })
        .catch((err) => {
            console.log("### USER IS NOT SIGNED IN !!! ###")
            setIsLoading(false);
        })
    }, [])

    const requestNotifications = () => {
        requestFirebaseNotificationPermission()
        .then((firebaseToken) => {
            // eslint-disable-next-line no-console
            console.log("############### firebaseToken", firebaseToken);
            const data= {
                fcm_web_token: firebaseToken,
                fcm_mobile_token: null,
            }
            UpdateFCMtoken(data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log("############### err", err);
            return err;
        });
    }

    if(isLoading) {
        return (
            <LoadingSpinner
                loading={true}
                text="Loading..."
                size="large"
            />
        )
    } else {
        return (
            <>
            <SigninSignup />
            <ListCreation />
            <PoolCreation />
            </>
        )
    }
    }
    
const useStyles = makeStyles((theme) => ({
      
    })
)

function mapStateToProps(state) {
    return {
        user: state.user,
    };
  }
  

export default connect(mapStateToProps)(AppContainer);
