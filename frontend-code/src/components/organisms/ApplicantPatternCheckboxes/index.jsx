import React from 'react';
import './style.less';
import Button from '~/components/atoms/Button';

const patterns = [
  {
    name: '性別',
    patterns: ['男性', '女性'],
  },
  {
    name: '年代',
    patterns: ['10代', '20代', '30代', '40代', '50代', '60代以上'],
  },
  {
    name: '属性',
    patterns: ['高校生', '大学生', '主婦(夫)', 'フリーター', 'シニア', '外国人'],
  },
];


export default class StarField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };

    this.handleClickPattern = ::this.handleClickPattern;
  }

  handleClickPattern(pattern) {
    const { selected } = this.state;
    const index = selected.indexOf(pattern);
    if (index === -1) {
      selected.push(pattern);
    } else {
      selected.splice(index, 1);
    }
    this.setState({ selected: selected.slice(0) });
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="o_applicant-pattern-checkboxes">
        {
          patterns.map(({ patterns: p, name: n }) => (
            <div className="pattern-wrapper" key={n}>
              {
                p.map((name) => {
                  const checked = selected.indexOf(name) !== -1;
                  return (
                    <Button
                      onClick={() => this.handleClickPattern(name)}
                      key={name}
                      size="small"
                      variant={checked ? 'contained' : 'outlined'}
                      color="secondary"
                    >
                      {name}
                    </Button>
                  );
                })
              }
            </div>
          ))
        }
      </div>
    );
  }
}
