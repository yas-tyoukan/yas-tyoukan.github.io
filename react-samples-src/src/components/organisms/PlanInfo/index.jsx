import React from 'react';
import './style.less';

import PLAN_LOGO from './plan_logo.png';

export default () => (
  <div className="o_plan-info">
    <img src={PLAN_LOGO} alt="ロゴ" />
    <div className="plan-detail">
      <p className="plan-name">求人メディアA</p>
      <p>全国</p>
      <p>枠サイズ一律</p>
    </div>
  </div>
);
