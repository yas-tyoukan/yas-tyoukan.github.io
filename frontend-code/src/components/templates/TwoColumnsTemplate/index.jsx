import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.less';

const TwoColumnsTemplate = ({
  className,
  headerContents,
  topContents,
  bottomContents,
}) => (
  <div className={classNames('t_two-columns-template', className)}>
    <div className="header">{headerContents}</div>
    <div className="contents-wrapper">
      <div className="top">{topContents}</div>
      <div className="bottom">{bottomContents}</div>
    </div>
  </div>
);

TwoColumnsTemplate.propTypes = {
  className: PropTypes.string,
  headerContents: PropTypes.node,
  topContents: PropTypes.node,
  bottomContents: PropTypes.node,
};

TwoColumnsTemplate.defaultProps = {
  className: '',
  headerContents: '',
  topContents: '',
  bottomContents: '',
};

export default TwoColumnsTemplate;
