'use strict';

// WebSocket に接続する
const ws = new WebSocket('ws://localhost:8080');

// サーバからメッセージを受信したら output に表示する
ws.addEventListener('message', e => {
	output.textContent += e.data + '\n';
});

// フォームを送信しようとしたら WebSocket でサーバにメッセージを送る
form.addEventListener('submit', e => {
	e.preventDefault(); // form の送信を行わない
	ws.send(msg.value);
});
