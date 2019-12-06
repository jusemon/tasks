import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { TextInput, Theme } from 'react-native-paper';
import { ThemePropBase, NavigationPropBase } from '../base/types';
import { withNavigation } from 'react-navigation';
import { SelectItem } from './Select';

export enum FormFieldType {
  'Text',
  'List'
}

export interface FormField {
  defaultValue: string | number;
  fieldName: string;
  label: string;
  type: FormFieldType;
  secureTextEntry: boolean;
  items?: Array<SelectItem<any>>;
};

export interface FormResult {
  [field: string]: string | number;
};

export interface FormProps extends ThemePropBase, NavigationPropBase {
  formFields: Array<FormField>;
  handleOnChange: (form: FormResult) => any;
}

const style = ({ colors }: Theme) => StyleSheet.create({
  textInput: {
    backgroundColor: colors.primary
  },
  picker: {
    borderBottomColor: '#000',
    color: '#fff'
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
  static defaultProps = { formFields: [] };
  constructor(props: FormProps) {
    super(props);
    this.state = this.props.formFields.reduce((output, input) => ({ ...output, [input.fieldName]: input.defaultValue }), {});
  }

  private handleOnChangeSelect(formField: FormField): ((value: SelectItem<any>) => void) & Function {
    return (value: SelectItem<any>) => {
      const state = { ...this.state, [formField.fieldName]: value }
      this.props.handleOnChange(state);
      this.setState({ [formField.fieldName]: value })
    };
  }

  private handleOnChangeText(formField: FormField): ((text: string) => void) & Function {
    return (value: string) => {
      const state = { ...this.state, [formField.fieldName]: value }
      this.props.handleOnChange(state);
      this.setState({ [formField.fieldName]: value })
    };
  }

  render() {
    const styles = style(this.props.theme);
    return (
      <>
        {this.props.formFields.map((formField: FormField) => {
          switch (formField.type) {
            case FormFieldType.List:
              return (
                <TouchableHighlight
                  key={formField.fieldName}
                  onPress={() => {
                    this.props.navigation.navigate("Select",
                      {
                        items: formField.items,
                        handleOnSelect: (text: string) => { this.handleOnChangeText(formField)(text); }
                      })
                  }}>
                  <TextInput
                    label={formField.label}
                    style={styles.textInput}
                    theme={theme.textInput}
                    value={this.state[formField.fieldName].label}
                    secureTextEntry={formField.secureTextEntry}
                    editable={false}
                  />
                </TouchableHighlight>
              )
            case FormFieldType.Text:
            default:
              return (
                <TextInput
                  key={formField.fieldName}
                  label={formField.label}
                  style={styles.textInput}
                  theme={theme.textInput}
                  value={this.state[formField.fieldName]}
                  secureTextEntry={formField.secureTextEntry}
                  onChangeText={this.handleOnChangeText(formField)}
                />
              )
          }
        }
        )}
      </>
    );
  }
}

export default withNavigation(Form);

