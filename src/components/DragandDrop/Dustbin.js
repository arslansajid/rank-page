import React from 'react'
import { useDrop } from 'react-dnd';
import { Typography, Grid, colors } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../static/_colors';
import RightIcon from '@material-ui/icons/ChevronRight';
import Avatar from '@material-ui/core/Avatar';

const Dustbin = ({ accept, lastDroppedItem, onDrop, number }) => {
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
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

  return (
    <div ref={drop} className={classes.container} style={{ backgroundColor }}>
      {/* {isActive
        ? 'Release to drop'
        : `This dustbin accepts: ${accept.join(', ')}`} */}

      {/* {lastDroppedItem && (
        <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
      )} */}


        <Grid container>
            <Grid className={classes.blueSection} item xs={2}>
                {number}
            </Grid>
            <Grid item xs={10} className={classes.textSection}>
                <Grid container alignItems="center" justify="space-between">
                <Grid className={classes.row}>
                    <Avatar className={classes.avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    {lastDroppedItem && (
                        <p>Last dropped: {lastDroppedItem.name}</p>
                    )}
                    {isActive
                    ? 'Release to drop'
                    : `Accepts: ${accept.join(', ')}`}
                </Grid>
                <RightIcon fontSize="large" className = {classes.iconColor} />
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: 54,
        marginRight: '1rem',
        marginBottom: '1rem',
        background: '#FAFAFA',
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 4,
    },
    blueSection: {
        padding: '0.6em',
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
        padding: '0.6em',
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