import React from 'react';
import { action } from '@storybook/addon-actions';
import TextField from '.';

const onChange = action('onChange');

export default stories => stories
  .add('default', () => (
    <TextField
      placeholder="ログインID"
      label="ログインID"
      input={{ onChange }}
      meta={{}}
    />
  ))
  .add('error', () => (
    <TextField
      placeholder="ログインID"
      label="ログインID"
      input={{ onChange }}
      error
      helperText="入力に間違いがあります"
    />
  ))
  .add('meta.error (redux-form想定)', () => (
    <TextField
      placeholder="ログインID"
      label="ログインID"
      input={{ onChange }}
      error
      meta={{ error: '入力に間違いがあります' }}
    />
  ));
