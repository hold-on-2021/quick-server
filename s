#!/bin/bash -l

listeningPath=$1
listeningPort=$2
echo $listeningPath
if [ "$listeningPath" = "" ];then
    listeningPath=`pwd`
    # exit 1
fi
if [ "$listeningPath" = '.' ];then
    listeningPath=`pwd`
    # exit 1
fi
if [ ! $listeningPort ];then
    # echo 'usage: express <PATH> <PORT>'
    listeningPort='8000'
    # exit 1
fi
echo "指向路径：" $listeningPath
echo "监听端口：" $listeningPort
# cd ~/Documents/scripts

hostName=`ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:"|head -1`
echo -e "\n本地链接：\033[4mhttp://localhost:$listeningPort\033[0m"
echo -en "局域网链接(已复制到剪贴板)：\033[4mhttp://$hostName:$listeningPort\033[0m\n"
echo -n  "http://$hostName:$listeningPort" | pbcopy
python -mwebbrowser "http://$hostName:$listeningPort"
node ./server.js $listeningPath $listeningPort
