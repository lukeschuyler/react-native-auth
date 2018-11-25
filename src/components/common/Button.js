import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ onPress, children, styles }) => {
  const { textStyle, buttonStyle } = styles;
  return (
    <TouchableOpacity 
      style={buttonStyle}
      onPress={onPress}  
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
