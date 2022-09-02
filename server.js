let staticPath = process.argv[2]
let port = process.argv[3]

var express = require('express')
var axios = require('axios')
var bodyParser = require('body-parser')
var shelljs = require('shelljs')

let __start_server = ()=>{
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
			// let feishuHook = 'https://open.feishu.cn/open-apis/bot/v2/hook/bff72dd1-95ac-43a6-b764-bf809fd9f682'
			let feishuHook = 'https://open.feishu.cn/open-apis/bot/v2/hook/d02d0e18-5eed-4778-98a7-3dd7f4bb0181'
			axios.post(feishuHook, {
				"msg_type": "post",
				"content": {
					"post": {
						"zh_cn": {
							"title": detail.event ? detail.event.title : "代码发现问题",
							"content": [
								[{
									"tag": "text",
									"text": `> 项目名称：${detail.project_name}`
								}],
								[detail.event && detail.event.request && {
									"tag": "text",
									"text": `> 请求地址：${detail.event.request.url}`
								}],
								[{
									"tag": "text",
									"text": `> 问题等级：${detail.level}`
								}],
								[
									detail.event && detail.event.user && detail.event.user.ip_address && {
	
										"tag": "a",
										"text": `> IP 地址：${detail.event.user.ip_address}`,
										"href": `https://www.ipshudi.com/${detail.event.user.ip_address}.htm`
									}
								],
								[
									detail.event && {
	
										"tag": "text",
										"text": `> 发生时间：${new Date(detail.event.timestamp * 1000)}`
									}
								],
								[
									detail.event && {
										"tag": "text",
										"text": `> 运行环境：${detail.event.release}`
									}
								],
								[{
									"tag": "text",
									"text": `> 监控帐号：${'992340655@qq.com'}`
								}],
								[{
									"tag": "text",
									"text": `> 监控密码：${'123456'}`
								}],
								[{
									"tag": "a",
									"text": `> 前往查看：${detail.url}`,
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
}


let __check_alive = ()=>{
	shelljs.exec('lsof -i:80',(error, info)=>{
		if(!info.length){
		  __start_server()
		}
	})
  }
  setInterval(()=>{
	  shelljs.exec('lsof -i:80',(error, info)=>{
			 if(!info.length){
		  __start_server()
		  }
	  })
  }, 10000)
  
  __check_alive()