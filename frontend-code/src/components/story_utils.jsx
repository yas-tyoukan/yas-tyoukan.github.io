import React from 'react';
import {
  combineReducers,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import {
  reducer,
  reduxForm,
} from 'redux-form';
import { action } from '@storybook/addon-actions';

export const actions = {
  onSubmit(e) {
    e.preventDefault();
    action('onSubmit')(e);
  },
  handleSubmit(arg) {
    if (typeof arg.preventDefault === 'function') {
      arg.preventDefault();
    }
    return arg;
  },
};

export function createDecoratedForm(form, FormComponent, formState) {
  const Decorated = reduxForm({ form })(FormComponent);
  const mockStore = createStore(
    combineReducers({ form: reducer }),
    { form: { [form]: formState } },
  );
  return props => (
    <Provider store={mockStore}>
      <Decorated {...actions} {...props} />
    </Provider>
  );
}

export const TestForm = createDecoratedForm('sample', 'form');
