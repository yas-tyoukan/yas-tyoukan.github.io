import React from 'react';
import TowColumnsTemplate from '.';

const headerContents = <h1>問題</h1>;
const topContents = <p>『エビフライ』にあって、『カキフライ』にないもの、なぁ〜んだ？</p>;
const bottomContents = <p>答え：エビ</p>;

export default stories => stories
  .add('default', () => (
    <TowColumnsTemplate
      headerContents={headerContents}
      topContents={topContents}
      bottomContents={bottomContents}
    />
  ));
