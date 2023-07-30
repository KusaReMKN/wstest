const fs = require('fs');
const http = require('http');
const ws = require('ws');

const port = 8080;

/* HTTP サーバくん */
const server = http.createServer((req, res) => {
	switch (req.url) {
		case '/':
		case '/index.html':
			res.writeHead(200, {
				'Content-Type': 'text/html',
			});
			res.end(fs.readFileSync('./index.html', 'utf-8'));
			break;
		case '/index.js':
			res.writeHead(200, {
				'Content-Type': 'text/html',
			});
			res.end(fs.readFileSync('./index.js', 'utf-8'));
			break;
		default:
			res.writeHead(404);
			res.end('404');
	}
});

const wss = new ws.WebSocketServer({ server });
/* WebSocket サーバくん */
wss.on('connection', ws => {
	/* エラー発生時 */
	ws.on('error', e => {
		console.error(e);
	});

	/* メッセージ受信時 */
	ws.on('message', e => {
		// メッセージはバイト列として送られてくる
		// デコードして文字列にする
		const msg = e.toString('utf-8');
		console.log('received:', msg);

		// 全てのクライアントに放送する
		wss.clients.forEach(client => {
			client.send(msg);
		});
	});
});

server.listen(port);
