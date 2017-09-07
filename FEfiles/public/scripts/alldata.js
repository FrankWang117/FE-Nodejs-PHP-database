$(function() {
  $.ajax({
    url: 'http://localhost:3000/showData',
    dataType: "json",
    success: function(point) {
      var jsondata = JSON.parse(point);
      var datalength = jsondata.length;

      var nowStudentsNum = Number(jsondata[datalength - 1]["atotalnum"]) + Number(jsondata[datalength - 1]["btotalnum"]) + Number(jsondata[datalength - 1]["ctotalnum"]) + Number(jsondata[datalength - 1]["dtotalnum"]);
      var nowStudentsIncrease = Number(jsondata[datalength - 1]["aincreasenum"]) + Number(jsondata[datalength - 1]["bincreasenum"]) + Number(jsondata[datalength - 1]["cincreasenum"]) + Number(jsondata[datalength - 1]["dincreasenum"]);
      var twoStudentsNum = Number(jsondata[datalength - 2]["atotalnum"]) + Number(jsondata[datalength - 2]["btotalnum"]) + Number(jsondata[datalength - 2]["ctotalnum"]) + Number(jsondata[datalength - 2]["dtotalnum"]);
      var twoStudentsIncrease = Number(jsondata[datalength - 2]["aincreasenum"]) + Number(jsondata[datalength - 2]["bincreasenum"]) + Number(jsondata[datalength - 2]["cincreasenum"]) + Number(jsondata[datalength - 2]["dincreasenum"]);
      var threeStudentsNum = Number(jsondata[datalength - 3]["atotalnum"]) + Number(jsondata[datalength - 3]["btotalnum"]) + Number(jsondata[datalength - 3]["ctotalnum"]) + Number(jsondata[datalength - 3]["dtotalnum"]);
      var threeStudentsIncrease = Number(jsondata[datalength - 3]["aincreasenum"]) + Number(jsondata[datalength - 3]["bincreasenum"]) + Number(jsondata[datalength - 3]["cincreasenum"]) + Number(jsondata[datalength - 3]["dincreasenum"]);
      var fourStudentsNum = Number(jsondata[datalength - 4]["atotalnum"]) + Number(jsondata[datalength - 4]["btotalnum"]) + Number(jsondata[datalength - 4]["ctotalnum"]) + Number(jsondata[datalength - 4]["dtotalnum"]);
      var fourStudentsIncrease = Number(jsondata[datalength - 4]["aincreasenum"]) + Number(jsondata[datalength - 4]["bincreasenum"]) + Number(jsondata[datalength - 4]["cincreasenum"]) + Number(jsondata[datalength - 4]["dincreasenum"]);
      var fiveStudentsNum = Number(jsondata[datalength - 5]["atotalnum"]) + Number(jsondata[datalength - 5]["btotalnum"]) + Number(jsondata[datalength - 5]["ctotalnum"]) + Number(jsondata[datalength - 5]["dtotalnum"]);
      var fiveStudentsIncrease = Number(jsondata[datalength - 5]["aincreasenum"]) + Number(jsondata[datalength - 5]["bincreasenum"]) + Number(jsondata[datalength - 5]["cincreasenum"]) + Number(jsondata[datalength - 5]["dincreasenum"]);
      var sixStudentsNum = Number(jsondata[datalength - 6]["atotalnum"]) + Number(jsondata[datalength - 6]["btotalnum"]) + Number(jsondata[datalength - 6]["ctotalnum"]) + Number(jsondata[datalength - 6]["dtotalnum"]);
      var sixStudentsIncrease = Number(jsondata[datalength - 6]["aincreasenum"]) + Number(jsondata[datalength - 6]["bincreasenum"]) + Number(jsondata[datalength - 6]["cincreasenum"]) + Number(jsondata[datalength - 6]["dincreasenum"]);
      var sevenStudentsNum = Number(jsondata[datalength - 7]["atotalnum"]) + Number(jsondata[datalength - 7]["btotalnum"]) + Number(jsondata[datalength - 7]["ctotalnum"]) + Number(jsondata[datalength - 7]["dtotalnum"]);
      var sevenStudentsIncrease = Number(jsondata[datalength - 7]["aincreasenum"]) + Number(jsondata[datalength - 7]["bincreasenum"]) + Number(jsondata[datalength - 7]["cincreasenum"]) + Number(jsondata[datalength - 7]["dincreasenum"]);
      $('#studentsnum').text(nowStudentsNum);
      $('#newstudents').text(sevenStudentsIncrease + sixStudentsIncrease + fiveStudentsIncrease + fourStudentsIncrease + threeStudentsIncrease + twoStudentsIncrease + nowStudentsIncrease);
      $('#allmoney').text((sevenStudentsIncrease + sixStudentsIncrease + fiveStudentsIncrease + fourStudentsIncrease + threeStudentsIncrease + twoStudentsIncrease + nowStudentsIncrease) * 100);
      $('#statsChart').highcharts({
        chart: {
          height: 400,
          type: 'line'
        },
        title: {
          text: '近七日学员变动'
        },
        subtitle: {
          text: '数据来源: ketang.com'
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
          name: '全部课程总人数',
          data: [sevenStudentsNum, sixStudentsNum, fiveStudentsNum, fourStudentsNum, threeStudentsNum, twoStudentsNum, nowStudentsNum]
        }, {
          name: '全部课程新增人数',
          data: [sevenStudentsIncrease, sixStudentsIncrease, fiveStudentsIncrease, fourStudentsIncrease, threeStudentsIncrease, twoStudentsIncrease, nowStudentsIncrease]
        }],
        credits: {
          text: 'made by wangsen',
          href: 'https://github.com/FrankWang1991/FE-Nodejs-PHP-database',
          style: {
            cursor: 'pointer',
            color: '#9E9E9E',
            fontSize: '12px'
          }
        }
      });
    },
    cache: false
  });
  console.log('%cwang sen ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
})
