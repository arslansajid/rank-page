
import Colors from "../static/_colors";

export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', }),
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: Colors.brandColor,
        color: Colors.white,
        borderRadius : 5,
        padding : '2px 5px',
        display : 'flex',
        alignItems: 'center',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: Colors.white,
      marginRight : 5,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: Colors.white,
      border : '2px solid #fff',
      borderRadius : '50%',
      height : 20,
      width : 20,

      ':hover': {
        backgroundColor: Colors.brandColor,
        color: 'white',
      },
    }),
  };