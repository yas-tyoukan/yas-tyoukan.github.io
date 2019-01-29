import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MUITextField from '@material-ui/core/TextField';

export const TextFieldContainer = ({
  error,
  meta = {},
  helperText,
  presenter,
  input: inputProps,
  className,
  ...remainProps
}) => {
  const hasError = !!(error || (meta && meta.error && meta.touched));
  const helperTextOrErrorText = hasError && (meta.error || helperText);
  return presenter({
    ...remainProps,
    inputProps,
    className: classNames('a_text-field', className),
    error: hasError,
    helperText: helperTextOrErrorText,
  });
};

export const TextFieldPresenter = ({ ...props }) => <MUITextField {...props} />;

/**
 * https://material-ui.com/api/text-field/
 * @param props
 * @returns {*}
 * @constructor
 */
const TextField = ({ ...props }) => (
  <TextFieldContainer {...props} presenter={TextFieldPresenter} />
);

TextField.propTypes = {
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

TextField.defaultProps = {
  variant: 'standard',
};

export default TextField;
