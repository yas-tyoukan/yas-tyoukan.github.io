import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MUIButton from '@material-ui/core/Button';

const Button = ({ className, ...props }) => (
  <MUIButton className={classNames('a_button', className)} {...props} />
);

Button.propTypes = {
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
