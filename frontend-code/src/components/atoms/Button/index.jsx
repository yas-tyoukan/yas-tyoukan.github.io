import React from 'react';
import classNames from 'classnames';
import MUIButton from '@material-ui/core/Button';

export default ({ className, ...props }) => (
  <MUIButton className={classNames('a_button', className)} {...props} />
);
