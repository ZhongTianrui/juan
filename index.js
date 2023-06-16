const express = require('express');
const app = express();
const port = 3004;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
});

app.get('/uid', (req, res) => {
    console.log(req.query.uid);
    const axios = require('axios');
    axios.get('https://www.luogu.com.cn/user/' + req.query.uid + '?_contentOnly')
    .then((response) => {
        var data = Math.round(response.data.currentData.user.passedProblemCount / 100);
        var tgl = response.data.currentData.user.passedProblemCount / response.data.currentData.user.submittedProblemCount * 100;
        var ans = "这位的卷王等级为 " + data.toString() + "，0~5 为新手，6~10 为卷将，10+ 为卷王。\n他的通过率为 " + tgl.toFixed(2) + "% 。\n欢迎再次使用卷王检测器。"
        res.send(ans);
    })
    .catch((error) => {
        console.error(error);
        res.send(error);
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
