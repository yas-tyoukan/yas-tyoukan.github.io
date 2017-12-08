(function () {
  var questions = [
    '経験のない未開拓な領域に取り組むよりも、慣れている仕事をきわめていく方が好きだ',
    '「一体感」「団結力」「連帯感」というキーワードに魅力を感じる',
    'ついつい誰かと比較してしまって、優越感や劣等感を感じることがよくある',
    '誰かにアドバイスされるより、自分でコントロールしていきたい',
    '気になったことは、すぐに調べる方だ',
    '何も計画せずに、行き当たりばったりで過ごすことにかなり不安を感じる方だ',
    '困っている人を見ると、つい黙っていられなくて、声をかけてしまう方だ',
    '多くの人に注目されるような大きなイベントは率先して取り組む',
    '依存することも、されることも、嫌いだ',
    '人から「悩みなんてないんじゃない？」と言われたことがある',
    '「癒し」「リラクゼーション」「リフレッシュ効果」などのキャッチコピーに惹かれる',
    '初対面でも、自分から話しかけるタイプだ',
    '「あなたは特別だ」と言われると、とても嬉しい',
    'グループや組織で、自分だけ周りと意見が違っても、特に気にならない',
    '周囲の評価に関係なく、ずっと続けている趣味やコレクションがある',
    'どんなに誘われても、スカイダイビングやバンジージャンプはしたくない',
    '遠出をするなら、一人より、誰かと出かけたい',
    '誰かの役に立てると思うと、多少の犠牲を払っても、頑張ってしまう',
    'どんなに好きなあ相手でも、毎週末デートをするのはしんどい',
    '冗談を思いつくと、言わずにはいられない',
    'お金の使い方は計画的で、衝動買いはしない方だ',
    '誰とも関わらずに一人で完結する作業より、グループで取り組む作業が好きだ',
    '人から注目されることは気分がいい',
    '一人きりで、すきなことをすきなだけできる時間が欠かせない',
    'CMやざっでで見た新商品はとりあえずチェックして見たくなる',
    'アクシデントやトラブルのない、安定した人生を歩みたい',
    '自分には直接関係なくても、周囲のケンカを見聞きすると、落ち着かない気分になる',
    '勝負事や競争するゲームでは、つい熱くなる',
    '細かいマニュアルや人から支持されることが多い仕事は苦手だ',
    '未体験のことに取り組むのがすき',
    '自分の体に疲れを感じたら、無理をしないで休養を取るようにする',
    '一人は「自由」というより、「寂しい」という感じがする',
    'コツコツと地道に頑張っている自分の姿は、あまり人に見せたくない',
    'いくら家族でも、「相手は相手、自分は自分」と割り切っている部分がある',
    '毎日変わらない単調な作業をするよりは、リスクやスリルのある仕事がしたい',
    '初めての場所に行ったときは、迷わないように、行きと同じ道を帰るようにする',
    '誘われると、なかなか断れない',
    '間違っている人がいたら、自分の知っている正しい方法を教えたくなる',
    'コース料理よりも、ビュッフェ形式の方がワクワクする',
    '何かに夢中になると、人から声をかけられても気づかないことがよくある',
    '創造性やアイデアが問われる課題より、数や量をこなす課題が得意だ',
    'グループや組織の輪を考えて、自分の都合を変更することは苦にならない',
    '自分の願望に向かって頑張ることや、自ら掲げた目標を達成することに喜びを感じる',
    '規則やルールが厳しいことで、窮屈に感じることがよくある',
    '自分の専門分野に関係がないことでも、興味を持ったことは時間を投資して学びたい',
    '健康のために、継続してやっていることがある',
    '相手に嫌われないように、と考えて行動することが多い',
    '自分の仕事や役割の責任が大きい方が、モチベーションが上がる',
    '知らない店に一人で入ったり、一人で食事をすることは、苦にならない',
    '「限定○個」とか「○○名物」などの広告に好奇心をくすぐられる'
  ];

  function createCheckboxes(){
    var wrapper = document.getElementsByClassName('form-wrapper')[0];
    for(var i = 0, l = questions.length; i < l; i++){
      var q = questions[i];
      var label = document.createElement('label');
      var span = document.createElement('span');
      span.innerText = q;
      var checkbox = document.createElement('input');
      checkbox.className = "q-check";
      checkbox.setAttribute('type', 'checkbox');
      label.appendChild(checkbox);
      label.appendChild(span);
      wrapper.appendChild(label);
    };
  }

function getScore(){
    var score = [0,0,0,0,0];
    var checkboxes = document.getElementsByClassName('q-check');
    for(var i = 0, l = checkboxes.length; i < l; i++){
      if(checkboxes[i].checked){
        score[i % 5]++;
      }
    }
    return score;
}

function render(ctx, score){
  var option = {
    type: 'radar',
    options:{
      legend:{
        display: false
      },
			scale:{
				ticks:{
					beginAtZero:true,
					max:5,
					min:0
				}
			}
		},
    data: {
      labels: ['生存', '愛・所属', '力・価値', '自由', '楽しみ'],
      datasets: [{
          data: score
      }]
    }
  };
  new Chart(ctx, option);
}

  window.onload = function () {
      createCheckboxes();
      var score = getScore();
      var ctx = document.getElementById("myChart").getContext('2d');
      render(ctx, score);


      var wrapper = document.getElementsByClassName('form-wrapper')[0];
      wrapper.addEventListener('change', function(){
        render(ctx, getScore());
      })
  };
})();
