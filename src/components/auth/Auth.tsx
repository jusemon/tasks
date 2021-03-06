import React from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { withTheme, Button, Theme } from 'react-native-paper';
import { NavigationPropBase, ThemePropBase } from '../../shared/base/types';
import Form, { FormField, FormResult, FormFieldType } from '../../shared/components/Form';
import Constants from "expo-constants";
import firebaseApp from '../../shared/firebase';

interface AuthProps extends NavigationPropBase, ThemePropBase { }

interface AuthState {
  formFields: Array<FormField>;
}

interface LoginForm {
  email: string;
  password: string;
}

const style = ({ colors }: Theme) => StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  formContainer: {
    padding: 10,

  },
  logoContainer: {
    alignItems: "center"
  },
  logo: {
    height: 128,
    width: 128
  },
  button: {
    backgroundColor: colors.accent,
    width: 256,
    alignSelf: "center"
  }
});

class Auth extends React.Component<AuthProps, AuthState> {

  state: AuthState = {
    formFields: [{
      fieldName: 'email',
      label: 'Email',
      type: FormFieldType.Text,
      defaultValue: ''
    }, {
      fieldName: 'password',
      label: 'Password',
      type: FormFieldType.Password,
      defaultValue: ''
    }]
  };
  result: LoginForm;

  private handleOnChange = (result: FormResult) => {
    this.result = {...result as any};
  }

  private onLogin = async () => {
    try {
      const { user } = await firebaseApp.auth().signInWithEmailAndPassword(this.result.email, this.result.password);
      const token = await user.getIdToken();
      await AsyncStorage.setItem('userToken', token);
      this.props.navigation.navigate('App');
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const styles = style(this.props.theme);
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../../assets/icon.png')} />
        </View>
        <View style={styles.formContainer}>
          <Form
            formFields={this.state.formFields}
            handleOnChange={this.handleOnChange}
            theme={this.props.theme}
          />
        </View>
        <Button style={styles.button} theme={{ colors: { primary: '#fff' } }} onPress={this.onLogin}>Login</Button>
      </View>
    );
  }
}

export default withTheme(Auth);
