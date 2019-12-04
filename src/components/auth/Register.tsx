import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { withTheme, Theme, Text } from 'react-native-paper';
import { NavigationPropBase, ThemePropBase } from '../../shared/base/types';
import Form, { FormField, FormResult } from '../../shared/components/Form';
import { NavigationStackOptions } from 'react-navigation-stack';

interface RegisterProps extends NavigationPropBase, ThemePropBase { }

interface RegisterState {
  formFields: Array<FormField>;
}

const style = ({ colors }: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  }
});

class Register extends React.Component<RegisterProps, RegisterState> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Register',
    headerTitle: ()=> <Text>Texto</Text>
  
  }

  state = {
    formFields: [{
      fieldName: 'email',
      label: 'Email',
      secureTextEntry: false,
      defaultValue: ''
    }, {
      fieldName: 'name',
      label: 'Name',
      secureTextEntry: false,
      defaultValue: ''
    }, {
      fieldName: 'password',
      label: 'Password',
      secureTextEntry: true,
      defaultValue: ''
    }]
  };

  handleOnChange = (result: FormResult) => {
    console.log('change: ', result);
  }

  render() {
    const { container } = style(this.props.theme);
    return (
      <View style={container}>
        <Form
          formFields={this.state.formFields}
          handleOnChange={this.handleOnChange}
          theme={this.props.theme}
        />
      </View>
    );
  }
}

export default withTheme(Register);
