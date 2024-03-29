import React from 'react'
import { useDrop } from 'react-dnd';
import { Typography, Grid, colors } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../static/_colors';
import RightIcon from '@material-ui/icons/ChevronRight';
import Avatar from '@material-ui/core/Avatar';
import Config from "../../api/config";

const Dustbin = ({ accept, lastDroppedItem, onDrop, number, isDragging }) => {
    const classes = useStyles();

    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        }),
    })

    const isActive = isOver && canDrop
    let backgroundColor;
    // if (isActive) {
    //     backgroundColor = 'darkgreen'
    // } else if (canDrop) {
    //     backgroundColor = 'darkkhaki'
    // }
    if (isActive) {
        backgroundColor = 'transparent'
    } else if (canDrop) {
        backgroundColor = 'transparent'
    }

  return (
    <div ref={drop} className={isDragging ? classes.lightcontainer : classes.container} style={{ backgroundColor }}>

        <Grid container>
            <Grid className={classes.blueSection} item xs={2}>
                {number}
            </Grid>
            <Grid item xs={10} className={classes.textSection}>
                {!!lastDroppedItem && (
                    <Grid container alignItems="center" justify="space-between">
                        <Grid className={classes.row}>
                            <Avatar className={classes.avatar} src={!!lastDroppedItem.image ? `${Config.BASE_APP_URL}${lastDroppedItem.image}` : require("../../assets/images/user.jpg")} />
                            {lastDroppedItem && (
                                `${lastDroppedItem.name}`
                            )}
                        </Grid>
                    </Grid>
                )}
                
            </Grid>
        </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0 0.5em 0.5em 0',
        background: '#FAFAFA',
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 4,
        minHeight: 51,
    },
    lightcontainer: {
        margin: '0 0.5em 0.5em 0',
        background: '#FAFAFA',
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 4,
        minHeight: 51,
        filter: 'contrast(0.5)',
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
        alignItems: 'center',
        minHeight: 51,
    },
    textSection: {
        textAlign: 'center',
        padding: '0.5em',
        minHeight: 51,
    },
    row: {
        display: "flex",
        alignItems: 'center'
    },
    avatar: {
        marginRight: 15,
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    text: {
    },
    iconColor: {
        fill : Colors.fillGray,
    }
}))

export default Dustbin;