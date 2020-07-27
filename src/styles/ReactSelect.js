
import Colors from "../static/_colors";

export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: Colors.brandColor,
        color: Colors.white,
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: Colors.white,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: Colors.white,
      ':hover': {
        backgroundColor: Colors.brandColor,
        color: 'white',
      },
    }),
  };