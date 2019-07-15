import React from 'react';
import CenteringTemplate from '.';

const contentsSampleEl = (
  <>
    <h1>問題</h1>
    <p>『エビフライ』にあって、『カキフライ』にないもの、なぁ〜んだ？</p>
    <p>答え：エビ</p>
  </>
);

export default stories => stories
  .add('horizontal', () => <CenteringTemplate horizontal contents={contentsSampleEl} />)
  .add('vertical', () => <CenteringTemplate vertical contents={contentsSampleEl} />)
  .add('horizontal and vertical', () => <CenteringTemplate horizontal vertical contents={contentsSampleEl} />);
