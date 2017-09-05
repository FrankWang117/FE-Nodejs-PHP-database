$(function() {
  $.ajax({
    url: 'http://localhost:3000/index/added',
    dataType: "json",
    success: function(point) {
      var jsondata = JSON.parse(point);
      // console.log(typeof Number(jsondata[0]["aincreasenum"]));
      var datalength = jsondata.length;
      var nowAll = Number(jsondata[datalength - 1]["ctotalnum"]);
      var nowIncrease = Number(jsondata[datalength - 1]["cincreasenum"]);
      var twoAll = Number(jsondata[datalength - 2]["ctotalnum"]);
      var twoIncrease = Number(jsondata[datalength - 2]["cincreasenum"]);
      var threeAll = Number(jsondata[datalength - 3]["ctotalnum"]);
      var threeIncrease = Number(jsondata[datalength - 3]["cincreasenum"]);
      var fourAll = Number(jsondata[datalength - 4]["ctotalnum"]);
      var fourIncrease = Number(jsondata[datalength - 4]["cincreasenum"]);
      var fiveAll = Number(jsondata[datalength - 5]["ctotalnum"]);
      var fiveIncrease = Number(jsondata[datalength - 5]["cincreasenum"]);
      var sixAll = Number(jsondata[datalength - 6]["ctotalnum"]);
      var sixIncrease = Number(jsondata[datalength - 6]["cincreasenum"]);
      var sevenAll = Number(jsondata[datalength - 7]["ctotalnum"]);
      var sevenIncrease = Number(jsondata[datalength - 7]["cincreasenum"]);
      $('#thirdclass').highcharts({
        chart: {
          type: 'line'
        },
        title: {
          text: '近七日学员变动'
        },
        subtitle: {
          text: '数据来源: yd.ke.qq.com'
        },
        xAxis: {
          categories: ['前六天', '前五天', '前四天', '前三天', '前天', '昨天', '今天']
        },
        yAxis: {
          title: {
            text: '人数'
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true // 开启数据标签
            },
            enableMouseTracking: true // 关闭鼠标跟踪，对应的提示框、点击事件会失效
          }
        },
        series: [{
          name: '总人数',
          data: [sevenAll, sixAll, fiveAll, fourAll, threeAll, twoAll, nowAll]
        }, {
          name: '新增人数',
          data: [sevenIncrease, sixIncrease, fiveIncrease, fourIncrease, threeIncrease, twoIncrease, nowIncrease]
        }]
      });
    },
    cache: false
  });
})
