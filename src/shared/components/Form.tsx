import React, { Fragment } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { TextInput, Theme, Text } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectItem } from './Select';
import { ThemePropBase, NavigationPropBase } from '../base/types'

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
  mode: 'date' | 'time' | 'datetime';
};

export type FormField = FormFieldList | FormFieldText | FormFieldDateTime;

export interface FormResult {
  [field: string]: string | number;
};

export interface FormProps extends ThemePropBase, NavigationPropBase {
  formFields: Array<FormField>;
  handleOnChange: (form: any) => any;
}

export interface FormState {
  form: {
    [key: string]: any
  };
  dateTimes: {
    [key: string]: boolean
  };
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

class Form extends React.Component<FormProps, FormState> {
  static defaultProps = { formFields: [] };
  constructor(props: FormProps) {
    super(props);
    this.state = {
      form: this.props.formFields.reduce((output, input) => ({
        ...output, [input.fieldName]: input.defaultValue
      }), {}),
      dateTimes: this.props.formFields.filter(o => o.type === FormFieldType.DateTime).reduce((output, input) => ({
        ...output, [input.fieldName]: false
      }), {}),
    };
  }

  private handleOnChangeSelect(formField: FormFieldList) {
    return () => {
      this.props.navigation.navigate("Select", {
        items: formField.items,
        handleOnSelect: (text: string) => { this.handleOnChangeText(formField)(text); }
      });
    };
  }

  private handleOnConfirmDateTimePicker(formField: FormFieldDateTime): (e: any, date?: Date) => void {
    return (e, date) => {
      const { dateTimes } = this.state;
      dateTimes[formField.fieldName] = !dateTimes[formField.fieldName];
      if (date) {
        this.handleOnChangeText(formField, dateTimes)(date.toLocaleDateString());
      } else {
        this.setState({ dateTimes });
      }
    };
  }

  private handleOnChangeDateTimePicker(formField: FormFieldDateTime) {
    return () => {
      const { dateTimes } = this.state;
      dateTimes[formField.fieldName] = !dateTimes[formField.fieldName];
      this.setState({ dateTimes });
    };
  }

  private handleOnChangeText(formField: FormField, dateTimes?: { [key: string]: boolean }): ((text: string) => void) & Function {
    return (value: string) => {
      const { form, dateTimes: oldDateTimes } = this.state;
      form[formField.fieldName] = value;
      const newForm = { ...form } as any;
      this.props.handleOnChange(newForm);
      this.setState({ form: newForm, dateTimes: dateTimes || oldDateTimes });
    };
  }

  render() {
    const styles = style(this.props.theme);
    const { form, dateTimes } = this.state;
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
                    value={form[formField.fieldName].label}
                    editable={false}
                  />
                </TouchableHighlight>
              )
            case FormFieldType.DateTime:
              return (
                <Fragment key={formField.fieldName}>
                  <TouchableHighlight
                    onPress={this.handleOnChangeDateTimePicker(formField)}>
                    <TextInput
                      label={formField.label}
                      style={styles.textInput}
                      theme={theme.textInput}
                      value={form[formField.fieldName]}
                      editable={false}
                    />
                  </TouchableHighlight>
                  {dateTimes[formField.fieldName] &&
                    <DateTimePicker
                      mode={formField.mode}
                      value={new Date(form[formField.fieldName])}
                      onChange={this.handleOnConfirmDateTimePicker(formField)}
                    />
                  }
                </Fragment>
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
                  value={form[formField.fieldName]}
                  secureTextEntry={isPass}
                  onChangeText={this.handleOnChangeText(formField)}
                />
              )
          }
        })}
      </>
    );
  }
}

export default withNavigation(Form);

