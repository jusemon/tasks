import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { TextInput, Theme } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { SelectItem } from './Select';
import { ThemePropBase, NavigationPropBase } from '../base/types';

export enum FormFieldType {
  Text,
  Password,
  List,
  DateTime
}

interface FormFieldList {
  defaultValue: string | number;
  fieldName: string;
  label: string;
  type: FormFieldType.List;
  items: Array<SelectItem<any>>;
};

interface FormFieldText {
  defaultValue: string | number;
  fieldName: string;
  label: string;
  type: FormFieldType.Password | FormFieldType.Text;
};

interface FormFieldDateTime {
  defaultValue: string | number;
  fieldName: string;
  label: string;
  type: FormFieldType.DateTime;
};

export type FormField = FormFieldList | FormFieldText | FormFieldDateTime;

export interface FormResult {
  [field: string]: string | number;
};

export interface FormProps extends ThemePropBase, NavigationPropBase {
  formFields: Array<FormField>;
  handleOnChange: (form: any) => any;
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

  private handleOnChangeSelect(formField: FormFieldList) {
    return () => {
      this.props.navigation.navigate("Select", {
        items: formField.items,
        handleOnSelect: (text: string) => { this.handleOnChangeText(formField)(text); }
      });
    };
  }

  private handleOnChangeDateTimePicker(formField: FormFieldDateTime) {
    return () => {
      // this.props.navigation.navigate("Select", {
      //   items: formField.items,
      //   handleOnSelect: (text: string) => { this.handleOnChangeText(formField)(text); }
      // });
    };
  }

  private handleOnChangeText(formField: FormField): ((text: string) => void) & Function {
    return (value: string) => {
      const state = { ...this.state, [formField.fieldName]: value } as any;
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
                  onPress={this.handleOnChangeSelect(formField)}>
                  <TextInput
                    label={formField.label}
                    style={styles.textInput}
                    theme={theme.textInput}
                    value={this.state[formField.fieldName].label}
                    editable={false}
                  />
                </TouchableHighlight>
              )
            case FormFieldType.DateTime:
              return (
                <TouchableHighlight
                  key={formField.fieldName}
                  onPress={this.handleOnChangeDateTimePicker(formField)}>
                  <TextInput
                    label={formField.label}
                    style={styles.textInput}
                    theme={theme.textInput}
                    value={this.state[formField.fieldName]}
                    editable={false}
                  />
                </TouchableHighlight>
              )
            case FormFieldType.Password:
              const isPass = true;
            case FormFieldType.Text:
            default:
              return (
                <TextInput
                  key={formField.fieldName}
                  label={formField.label}
                  style={styles.textInput}
                  theme={theme.textInput}
                  value={this.state[formField.fieldName]}
                  secureTextEntry={isPass}
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

