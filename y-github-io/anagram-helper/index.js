window.onload = () => {

  const imageEl = document.querySelector('#background-image');
  const createEl = document.querySelector('#create-button');
  const playgroundEl = document.querySelector('#play-ground');
  const fileUploadEl = document.querySelector('#file-upload');
  const openImageSizePromptEl = document.querySelector('#open-image-size-prompt');

  createEl.addEventListener('click', () => {
    const text = document.querySelector('#text').value;
    text.split('').forEach((c, index) => {
      const el = document.createElement('div');
      el.innerText = c;
      el.classList.add('draggable');
      el.setAttribute('draggable', "true");
      el.style.top = `${index * 30 + 100}px`;
      el.style.left = `${index * 30}px`;
      playgroundEl.appendChild(el);
      el.addEventListener("mousedown", mdown, false);
      el.addEventListener("touchstart", mdown, false);
    });
  }, false);

  fileUploadEl.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      imageEl.setAttribute('src', target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }, false);

  openImageSizePromptEl.addEventListener('click', () => {
    const input = window.prompt('Input width x height. example "800x500" or "800x" or "x500"');
    const [w, h] = input.split('x');
    imageEl.setAttribute('width', w);
    imageEl.setAttribute('height', h);
  }, false);
};

// https://q-az.net/elements-drag-and-drop/
//マウスが押された際の関数
function mdown(e) {

  //クラス名に .drag を追加
  this.classList.add("drag");

  //タッチデイベントとマウスのイベントの差異を吸収
  if (e.type === "mousedown") {
    var event = e;
  } else {
    var event = e.changedTouches[0];
  }

  //要素内の相対座標を取得
  x = event.pageX - this.offsetLeft;
  y = event.pageY - this.offsetTop;

  //ムーブイベントにコールバック
  document.body.addEventListener("mousemove", mmove, false);
  document.body.addEventListener("touchmove", mmove, false);
}

//マウスカーソルが動いたときに発火
function mmove(e) {

  //ドラッグしている要素を取得
  var drag = document.getElementsByClassName("drag")[0];

  //同様にマウスとタッチの差異を吸収
  if (e.type === "mousemove") {
    var event = e;
  } else {
    var event = e.changedTouches[0];
  }

  //フリックしたときに画面を動かさないようにデフォルト動作を抑制
  e.preventDefault();

  //マウスが動いた場所に要素を動かす
  drag.style.top = event.pageY - y + "px";
  drag.style.left = event.pageX - x + "px";

  //マウスボタンが離されたとき、またはカーソルが外れたとき発火
  drag.addEventListener("mouseup", mup, false);
  document.body.addEventListener("mouseleave", mup, false);
  drag.addEventListener("touchend", mup, false);
  document.body.addEventListener("touchleave", mup, false);

}

//マウスボタンが上がったら発火
function mup(e) {
  var drag = document.getElementsByClassName("drag")[0];

  //ムーブベントハンドラの消去
  document.body.removeEventListener("mousemove", mmove, false);
  drag.removeEventListener("mouseup", mup, false);
  document.body.removeEventListener("touchmove", mmove, false);
  drag.removeEventListener("touchend", mup, false);

  //クラス名 .drag も消す
  drag.classList.remove("drag");
}