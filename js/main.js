'use strict';

// 変数定義

// 時間関係の変数
let hhh = 0;
let mmm = 0;
let sss = 0;
let hh = 0;
let mm = 0;
let ss = 0;

// ループ制御用変数
let guruguru;

// 今タイマーは動いてますか？の判定用変数。0:off / 1:on 
let timer_on = 0;

// 今一時停止中ですか？の判定用変数。0:not stop / 1:stop
let timer_stop = 0;



// 関数宣言

// ゼロ埋め
function zeroPad(number) {
  return number.toString().padStart(2, '0');
}

// カウントダウンシステム
function countdown_timer() {
  // ラスト1秒
  if (hhh === 0 && mmm === 0 && sss === 1) {
    // 秒を減らす
    sss -= 1;
    // 背景を点滅させる
    document.querySelector('body').classList.add('flash');
    // 止める
    clearInterval(guruguru);
    // タイマー今オフですよのやつ
    timer_on = 0;

    // まだ秒数が残ってるなら
  } else if (sss >= 1) {
    // 秒を減らす
    sss -= 1;

    // 秒は0だが、分が残ってるなら
  } else if (mmm >= 1) {
    // 分を減らす
    mmm -= 1;
    // 秒を59にする
    sss = 59;

    // 秒も分も0だが、時間が残ってるなら
  } else if (hhh >= 1) {
    // 時間を減らす
    hhh -= 1;
    // 分を59にする
    mmm = 59;
    // 秒を59にする
    sss = 59;
  }

  // ゼロ埋め
  hh = zeroPad(hhh);
  mm = zeroPad(mmm);
  ss = zeroPad(sss);

  // ゼロ埋めした数値をhtml上に反映
  document.getElementById('hour').textContent = hh;
  document.getElementById('min').textContent = mm;
  document.getElementById('sec').textContent = ss;
}


// ループ
function roop() {
  // 1秒ごとにカウントダウンシステムを繰り返す
  guruguru = setInterval(countdown_timer, 1000);
}


// スタートボタン押下時
function start(event) {
  // リロード防止
  event.preventDefault();

  // タイマー一時停止中の時
  if (timer_stop === 1) {
    // 一時停止中じゃないですよのやつ
    timer_stop = 0;
    // スタートボタンの色を変更
    document.getElementById('start').style.background = '#ff6347';
    // ストップボタンの色を戻す
    document.getElementById('stop').style.background = '#757575';
    // ループへ
    roop();

    // タイマーがoffの時
  } else if (timer_on === 0) {

    // hmsを取得
    const h = document.getElementById('form_time').input_h.value;
    const m = document.getElementById('form_time').input_m.value;
    const s = document.getElementById('form_time').input_s.value;

    // hmsに値があれば整数（数値）として各変数に突っ込む。そうでなければ0にする。
    if (h) {
      hhh = parseInt(h);
    } else {
      hhh = 0;
    }
    if (m) {
      mmm = parseInt(m);
    } else {
      mmm = 0;
    }
    if (s) {
      sss = parseInt(s);
    } else {
      sss = 0;
    }

    // エラーチェック
    // hmsが全部0or空欄（だと、hhh/mmm/sssは0になってるはず）
    if (hhh === 0 && mmm === 0 && sss === 0) {
      // エラー
      document.querySelector('.error').textContent = 'hours、minutes、secondsいずれかに有効な数値を入力してください。';

      // 全部整数であれば動く
    } else {
      // エラー出てるなら消す
      document.querySelector('.error').textContent = '';

      // ゼロ埋め
      hh = zeroPad(hhh);
      mm = zeroPad(mmm);
      ss = zeroPad(sss);

      // ゼロ埋めした数値をhtml上に反映
      document.getElementById('hour').textContent = hh;
      document.getElementById('min').textContent = mm;
      document.getElementById('sec').textContent = ss;

      // クラスついてたら消す
      document.querySelector('body').classList.remove('flash');

      // スタートボタンの色を変更
      document.getElementById('start').style.background = '#ff6347';

      // タイマー今onですよのやつ
      timer_on = 1;

      // ループへ
      roop();

    }
  }
}


// ストップボタン押下時
function stop() {
  // タイマーが動いていて、一時停止中でないなら起動。そうでなければ何も起こらない
  if (timer_on === 1 && timer_stop === 0) {
    // 一時停止中ですよのやつ
    timer_stop = 1;
    // スタートボタンの色を戻す
    document.getElementById('start').style.background = '#757575';
    // ストップボタンの色を変える
    document.getElementById('stop').style.background = '#66cdaa';
    // 止める
    clearInterval(guruguru);
  }
}



// リセットボタン押下時
function reset() {
  // 止める
  clearInterval(guruguru);
  // 全部初期値にする
  timer_on = 0;
  timer_stop = 0;
  hhh = 0;
  mmm = 0;
  sss = 0;

  // ゼロ埋め
  hh = zeroPad(hhh);
  mm = zeroPad(mmm);
  ss = zeroPad(sss);

  // ゼロ埋めした数値をhtml上に反映
  document.getElementById('hour').textContent = hh;
  document.getElementById('min').textContent = mm;
  document.getElementById('sec').textContent = ss;

  // クラスついてたら消す
  document.querySelector('body').classList.remove('flash');

  // スタートボタンの色を戻す
  document.getElementById('start').style.background = '#757575';
  // ストップボタンの色を戻す
  document.getElementById('stop').style.background = '#757575';

  // フォームクリア
  document.getElementById('form_time').input_h.value = '';
  document.getElementById('form_time').input_m.value = '';
  document.getElementById('form_time').input_s.value = '';
}



// イベント設定

// スタートボタンとファンクションの紐づけ
document.getElementById('form_time').addEventListener('submit', start);

// ストップボタンとファンクションの紐づけ
document.getElementById('stop').addEventListener('click', stop);

// リセットボタンとファンクションの紐づけ
document.getElementById('reset').addEventListener('click', reset);