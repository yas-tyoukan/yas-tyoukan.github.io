import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

import IMAGE_STAR from './star.svg';
import IMAGE_UNSTAR from './unstar.svg';

export default class StarField extends React.PureComponent {
  static propTypes = {
    defaultPoint: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultPoint: 0,
    max: 5,
    onChange: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      point: props.defaultPoint,
    };

    this.setPoint = ::this.setPoint;
  }

  setPoint(point) {
    this.setState({ point });
    const { onChange, max } = this.props;
    if (onChange) {
      onChange(point, max);
    }
  }

  render() {
    const { max } = this.props;
    const { point } = this.state;
    return (
      <button type="button" className="o_star-field" onClick={() => this.setPoint(0)}>
        {(() => {
          const ret = [];
          for (let i = 1; i <= max; i += 1) {
            const key = `star-${i}`;
            const src = i <= point ? IMAGE_STAR : IMAGE_UNSTAR;
            const onClick = (e) => {
              e.stopPropagation();
              this.setPoint(i);
            };
            ret.push(
              /* eslint-disable jsx-a11y/click-events-have-key-events */
              /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
              <img key={key} alt={key} src={src} onClick={onClick} />,
              /* eslint-enable */
            );
          }
          return ret;
        })()}
      </button>
    );
  }
}
