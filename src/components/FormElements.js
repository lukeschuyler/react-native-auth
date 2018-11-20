import React from 'react';
import { TextInput, StyleSheet, View, Text, Button } from 'react-native';

/* 
  These elements will be used with a redux-form wrapper
 */

export const FormInput = props => {
  const { input, ...inputProps } = props;
  return <TextInput 
            { ...inputProps }
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
        />
}
