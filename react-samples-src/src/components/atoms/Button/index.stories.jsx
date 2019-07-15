import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '.';

export default (stories) => {
  const props = {
    onClick: action('onClick'),
  };
  const colors = [
    'default',
    'inherit',
    'primary',
    'secondary',
  ];

  const sizes = [
    'small',
    'medium',
    'large',
  ];

  const variants = [
    'text',
    'outlined',
    'contained',
  ];

  colors.forEach(color => stories
    .add(`color: ${color}`, () => (<Button color={color} {...props}>ボタン</Button>)));

  sizes.forEach(size => stories
    .add(`size: ${size}`, () => (<Button size={size} color="primary" {...props}>ボタン</Button>)));

  variants.forEach(variant => stories
    .add(`variant: ${variant}`, () => (<Button variant={variant} color="primary" {...props}>ボタン</Button>)));

  stories
    .add('multi-line', () => (
      <Button
        color="primary"
        {...props}
      >
        <p>
          利用規約に同意して
          <br />
          登録する
        </p>
      </Button>
    ));

  stories
    .add('fullWidth', () => (<Button color="primary" fullWidth>ボタン</Button>));

  stories
    .add('disabled', () => (<Button color="primary" disabled>ボタン</Button>));

  return stories;
};
