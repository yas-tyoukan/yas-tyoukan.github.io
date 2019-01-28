import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.less';

const CenteringTemplate = ({
  className,
  contents,
  horizontal,
  vertical,
}) => (
  <div className={classNames('t_centering-template', className, { horizontal, vertical })}>
    <div className="contents">{contents}</div>
  </div>
);

CenteringTemplate.propTypes = {
  className: PropTypes.string,
  contents: PropTypes.node,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
};

CenteringTemplate.defaultProps = {
  className: '',
  contents: '',
  horizontal: false,
  vertical: false,
};

export default CenteringTemplate;
