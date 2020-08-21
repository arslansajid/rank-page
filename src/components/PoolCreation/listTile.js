import React from 'react'
import { Typography, Grid, colors } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../static/_colors';
import Avatar from '@material-ui/core/Avatar';


const ListTile = ({ name, type, number }) => {
    const classes = useStyles();

  return (
    <div className={classes.container}>
        <Grid container>
            <Grid className={classes.blueSection} item xs={2}>
                {number}
            </Grid>
            <Grid item xs={10} className={classes.textSection}>
                <Grid container alignItems="center" justify="space-between">
                <Grid className={classes.row}>
                    <Avatar className={classes.avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                      <Typography className={classes.text}>{name}</Typography>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: '1rem',
        cursor: 'pointer',

        background: '#FAFAFA',
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 4,
    },
    disabled: {
        marginRight: '1rem',
        marginBottom: '1rem',
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
        padding: '0.4em',
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
        padding: '0.4em',
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


export default ListTile;
