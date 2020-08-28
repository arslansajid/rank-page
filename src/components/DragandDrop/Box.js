import React from 'react'
import { useDrag } from 'react-dnd';
import { Typography, Grid, colors } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../static/_colors';
import RightIcon from '@material-ui/icons/ChevronRight';
import Avatar from '@material-ui/core/Avatar';
import Config from "../../api/config";

const Box = ({ name, type, isDropped, number, image }) => {
    const classes = useStyles();

    const [{ opacity }, drag] = useDrag({
        item: { name, type },
        collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

  return (
    <div ref={drag} className={isDropped ? classes.disabled : classes.container} style={{ opacity }}>
        <Grid container>
            <Grid className={classes.blueSection} item xs={2}>
                {number}
            </Grid>
            <Grid item xs={10} className={classes.textSection}>
                <Grid container alignItems="center" justify="space-between">
                <Grid className={classes.row}>
                    <Avatar className={classes.avatar} src={!!image && image ? `${Config.BASE_APP_URL}${image}` : require("../../assets/images/user.jpg")} />
                    {isDropped ?
                        <Typography className={classes.text}>{name}</Typography>
                        :
                        <Typography className={classes.text}>{name}</Typography>
                    }
                </Grid>
                <RightIcon fontSize="large" className = {classes.iconColor}/>
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0 0.5em 0.5em 0',
        cursor: 'move',

        background: '#FAFAFA',
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 4,
    },
    disabled: {
        margin: '0 0.5em 0.5em 0',
        cursor: 'move',
        background: '#FAFAFA',
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        opacity: '0.6 !important',
        filter: 'brightness(0.8)',
        cursor: 'not-allowed'
    },
    blueSection: {
        padding: '0.5em',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        background: Colors.brandColor,
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSection: {
        textAlign: 'center',
        padding: '0.5em',
    },
    row: {
        display: "flex",
        alignItems: 'center'
    },
    avatar: {
        marginRight: 10,
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    text: {
        fontSize: 18,
    },
    iconColor: {
        fill : Colors.fillGray,
    }
})
)


export default Box;
