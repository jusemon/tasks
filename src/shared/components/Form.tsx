import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, FAB, withTheme, Theme } from 'react-native-paper';
import { ThemePropBase } from '../base/types';

export interface FormField {
  defaultValue: string | number;
  fieldName: string;
  label: string;
  secureTextEntry: boolean;
};

export interface FormResult {
  [field: string]: string | number;
};

export interface FormProps extends ThemePropBase {
  formFields: Array<FormField>;
  handleOnPress: (form: FormResult) => any;
}

const style = ({ colors }: Theme) => StyleSheet.create({
  textInput: {
    backgroundColor: colors.primary
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

const theme = {
  textInput: {
    colors: {
      primary: '#fff',
      placeholder: '#fff',
      text: '#fff'
    }
  }
}

class Form extends React.Component<FormProps> {
  static defaultProps = { formStructure: [] };
  state = {};

  handleOnPress = () => {
    this.props.handleOnPress(this.state);
  };

  render() {
    const styles = style(this.props.theme);
    return (
      <>
        {this.props.formFields.map(formField => (
          <TextInput
            key={formField.fieldName}
            label={formField.label}
            style={styles.textInput}
            theme={theme.textInput}
            value={this.state[formField.fieldName] || formField.defaultValue}
            secureTextEntry={formField.secureTextEntry}
            onChangeText={(value: string) => this.setState({ [formField.fieldName]: value })}
          />
        ))}

        <FAB
          style={styles.fab}
          icon="check"
          onPress={this.handleOnPress} />
      </>
    );
  }
}

export default Form;

