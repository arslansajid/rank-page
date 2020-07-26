import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookie from "js-cookie";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { checkIfLoggedIn } from "./actions";
import { userLogin } from "../../actions/LoginActions";
import LoadingSpinner from "../../components/Common/LoadingSpinner"

const AppContainer = (props) => {
    const classes = useStyles();
    const {history} = props;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkIfLoggedIn()
        .then((res) => {
            // console.log("res ###", res.data.data.user)
            const token = Cookie.get('rankpage_access_token')
            // console.log("token ###", token)
            axios.defaults.headers.common['Authorization'] = `${token}`;
            props.dispatch(userLogin(res.data.data.user));
            setIsLoading(false);
        })
        .catch((err) => {
            console.log("### USER IS NOT SIGNED IN !!! ###")
            setIsLoading(false);
        })
    }, [])

    if(isLoading) {
        return (
            <LoadingSpinner
                loading={true}
                text="Loading..."
                size="large"
            />
        )
    } else {
        return null;
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
