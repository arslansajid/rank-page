import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter, useHistory } from 'react-router-dom';
import Colors from '../../static/_colors';
import { reArrangeList } from "./action";
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux"

const drawerWidth = 280;

const Header = (props) => {
    const classes = useStyles();
    const { location, history, selectedPost } = props;
    const [showBackButton, setShowBackButton] = React.useState(false);
    const [showSubmitButton, setShowSubmitButton] = React.useState(false);
    console.log('location ' , props)

    React.useEffect(() => {
        if (location.pathname !== "/") {
            setShowBackButton(true);
        } else {
            setShowBackButton(false);
        }
        // submit button hide/show
        if (location.pathname.includes("list-detail")) {
            setShowSubmitButton(true);
        } else {
            setShowSubmitButton(false);
        }
    }, [props.location])


    const onSubmitHandler = () => {
        const data = {
            list_id: selectedPost.postId,
            list_item_ids: selectedPost.listOrder,
            user_ids: '',
            share_type: '1', //1 for public 2 for private
        }
        reArrangeList(data)
        .then((res) => {
            console.log('res', res)
            // window.alert(res.data.message);
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    return (
            <AppBar elevation={0} position="static" classes={{ root: classes.headerBar }}>
                <Toolbar className={classes.container}>
                    {
                        showBackButton && (
                            <IconButton onClick={() => history.goBack()}>
                                <BackIcon />
                            </IconButton>
                        )
                    }
                    <Typography variant="h6" className={classes.routeTitle}>
                        {location.pathname === "/" ? "Rank Page" :(location.pathname === "/edit-profile" ? 'Edit Profile' : location.pathname.split("/")[1].replace("-", " "))}
                    </Typography>
                    {
                        showSubmitButton && (
                            <Button onClick={() => onSubmitHandler()} className={classes.submitBtn} variant="contained" color="primary">
                                Submit
                            </Button>
                        )
                    }
                </Toolbar>
            </AppBar>
    );
};

const useStyles = makeStyles((theme) => ({
    headerBar: {
        backgroundColor: Colors.white,
        color: Colors.black,
        boxShadow: '#fff',
        minHeight: 64,
        marginBottom: 10,
        padding: "0 5px",

        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: '8px',
    },
    container: {
        padding: '0px !important',
        position: 'relative',
        justifyContent: 'space-between'
    },
    routeTitle: {
        textTransform: 'capitalize',
        position: "absolute",
        left: 'calc(50% - 2.5em)',

        // [theme.breakpoints.down('sm')]: {
        //     left: 'calc(50% - 30px)',
        // },
    },
    submitBtn: {
        marginRight: 10
    }
}));

Header.defaultProps = {};

function mapStateToProps(state) {
	return {
		selectedPost: state.selectedPost,
	};
}

export default withRouter(connect(mapStateToProps)(Header));

