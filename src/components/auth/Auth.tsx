import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme, Button } from 'react-native-paper';
import { NavigationPropBase, ThemePropBase } from '../../shared/base/types';
import Form, { FormField, FormResult } from '../../shared/components/Form';

interface AuthProps extends NavigationPropBase, ThemePropBase { }

interface AuthState {
  formFields: Array<FormField>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#283593'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

class Auth extends React.Component<AuthProps, AuthState> {
  static navigationOptions = {
    title: 'Login'
  }

  state = {
    formFields: [{
      fieldName: 'email',
      label: 'Email',
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
    return (
      <View style={styles.container}>
        <Button onPress={()=>this.props.navigation.navigate('Register')}>Register</Button>
        <Form
          formFields={this.state.formFields}
          handleOnPress={this.handleOnPress}
          theme={this.props.theme}
        />
      </View>
    );
  }
}

export default withTheme(Auth);
