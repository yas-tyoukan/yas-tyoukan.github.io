import React from 'react';
import { Link } from 'react-router-dom';
import './style.less';

import TextField from '~/components/atoms/TextField';
import PlanInfo from '~/components/organisms/PlanInfo';
import StarField from '~/components/organisms/StarField';
import Button from '~/components/atoms/Button';
import ApplicantPatternCheckboxes from '~/components/organisms/ApplicantPatternCheckboxes';
import CenteringTemplate from '~/components/templates/CenteringTemplate';

export default () => (
  <CenteringTemplate
    className="p_review-form"
    horizontal
    contents={(
      <>
        <header><Link to={{ pathname: '/yas-tyoukan.github.io/y-github-io/staticpages/index.html' }}>戻る</Link></header>
        <PlanInfo />
        <div className="form">
          <div className="field-wraper fieldWithUnit">
            <div className="label">応募は何件ありましたか？</div>
            <TextField
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <span className="unit">人</span>
          </div>
          <div className="field-wraper fieldWithUnit">
            <div className="label">何人採用できましたか？</div>
            <TextField
              placeholder=""
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <span className="unit">人</span>
          </div>
          <div className="field-wraper star-wrapper">
            <div className="label">どのような人からの応募がありましたか？</div>
            <ApplicantPatternCheckboxes />
          </div>
          <div className="field-wraper star-wrapper">
            <div className="label">希望通りの人の応募がありましたか</div>
            <StarField />
          </div>
          <div className="field-wraper star-wrapper">
            <div className="label">掲載までのスピード</div>
            <StarField />
          </div>
          <div className="field-wraper star-wrapper">
            <div className="label">原稿のクオリティ</div>
            <StarField />
          </div>
          <div className="field-wraper star-wrapper">
            <div className="label">フォロー</div>
            <StarField />
          </div>
          <div className="field-wraper">
            <div className="label">ここにレビューを記入してください</div>
            <TextField
              placeholder="この媒体・プランについて、気に入ったこと／気に入らなかったことはなんですか？期待通りの採用活動ができましたか？"
              multiline
              rows={5}
              type="number"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </div>
        </div>
        <Button
          size="large"
          className="large-btn"
          variant="contained"
          color="primary"
          fullWidth
        >
          レビューを投稿する
        </Button>
        <footer>
          <Button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            size="large"
            className="large-btn"
            variant="contained"
            color="inherit"
            fullWidth
          >
            ⬆︎ページトップへ
          </Button>
        </footer>
      </>
    )}
  />
);
