import React, { useState, useCallback } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'
import { ItemTypes } from './ItemTypes'
import update from 'immutability-helper';
import { Typography, Grid, colors } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const Container = () => {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    { accepts: [ItemTypes.PAPER, /* NativeTypes.FILE */], lastDroppedItem: null },
  ])
  const [boxes] = useState([
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, dustbins],
  )
  return (
    <>
    <Grid container>
        <Grid item xs={6}>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {boxes.map(({ name, type }, index) => (
                <Box
                    number={index + 1}
                    name={name}
                    type={type}
                    isDropped={isDropped(name)}
                    key={index}
                />
                ))}
            </div>
        </Grid>
        <Grid item xs={6}>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {dustbins.map(({ accepts, lastDroppedItem }, index) => (
                <Dustbin
                    number={index + 1}
                    accept={accepts}
                    lastDroppedItem={lastDroppedItem}
                    onDrop={(item) => handleDrop(index, item)}
                    key={index}
                />
                ))}
            </div>
        </Grid>
    </Grid>
    </>
  )
}


export default Container;