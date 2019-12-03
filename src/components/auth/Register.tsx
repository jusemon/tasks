import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme, Theme } from 'react-native-paper';
import { NavigationPropBase, ThemePropBase } from '../../shared/base/types';
import Form, { FormField, FormResult } from '../../shared/components/Form';

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
  static navigationOptions = {
    title: 'Register'
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

  handleOnPress = (result: FormResult) => {
    console.log('result: ', result);
    this.props.navigation.goBack();
  }

  render() {
    const { container } = style(this.props.theme);
    return (
      <View style={container}>
        <Form
          formFields={this.state.formFields}
          handleOnPress={this.handleOnPress}
          theme={this.props.theme}
        />
      </View>
    );
  }
}

export default withTheme(Register);
