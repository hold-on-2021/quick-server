let staticPath = process.argv[2]
let port = process.argv[3]

var express = require('express')
var axios = require('axios')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
app.use(express.static(staticPath));
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	console.log('DEBUG_LOG:all', req.body);
	if (req.body && req.body.url) {
		let detail = req.body;
		let feishuHook = 'https://open.feishu.cn/open-apis/bot/v2/hook/bff72dd1-95ac-43a6-b764-bf809fd9f682'
		axios.post(feishuHook, {
			"msg_type": "post",
			"content": {
				"post": {
					"zh_cn": {
						"title": "程序异常通知",
						"content": [
							[{
								"tag": "text",
								"text": `项目: ${detail.project_name}`
							}],
							[{
								"tag": "text",
								"text": `问题描述: ${detail.message}`
							}],
							[{
								"tag": "text",
								"text": `问题等级: ${detail.level}`
							}],
							[
								detail.event && {

									"tag": "text",
									"text": `发生时间: ${detail.event.timestamp * 1000}`
								}
							],
							[
								detail.event && {
									"tag": "text",
									"text": `运行环境: ${detail.event.environment}`
								}
							],
							[{
								"tag": "text",
								"text": `监控帐号: ${'992340655@qq.com'}`
							}],
							[{
								"tag": "text",
								"text": `监控密码: ${'123456'}`
							}],
							[{
								"tag": "a",
								"text": detail.url,
								"href": detail.url
							}]
						]
					}
				}
			}
		})
	}
	next();
});

app.get('/', function (req, res) {
	res.send('Welcome!')
})
app.listen(port)