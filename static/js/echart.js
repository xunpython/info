import echarts from 'echarts'
import Vue from 'vue';

export default {
	//总台架报表线性图
	zongtaijiaLine(echartData) {
		let chartID = echarts.init(document.getElementById(echartData.chartID))
		let series = []
		for (var i = 0; i < echartData.data.length; i++) {
			series.push({
				name: echartData.legendData[i],
				type: 'line',
				data: echartData.data[i],
				smooth: true,
				//折线拐点不显示
				showSymbol: true,
				lineStyle: {
					color: echartData.color[i],
				},
				areaStyle: {
					color: echartData.color[i],
					opacity: 0.2,
				},
				label: {
					show: true,
					//position: 'inside',
				},
			})
		}
		var option = {
			legend: {
				// data: ['最高气温', '最低气温']
				top: '10',
			},
			xAxis: {
				type: 'category',
				data: ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05'],
				//横坐标
				axisLine: {
					show: false,
				},
				//坐标轴刻度
				axisTick: {
					show: false,
				},
				//从原点开始显示
				boundaryGap: false,
				//坐标轴刻度标签的相关设置
				axisLabel: {
					textStyle: {
						color: '#485465',
						fontSize: 10,
						padding: [10, 0]
					}
				},
			},
			yAxis: {
				type: 'value',
				//纵坐标
				axisLine: {
					show: false,
				},
				name: '时(h)',
				//坐标轴刻度标签的相关设置
				axisLabel: {
					textStyle: {
						color: '#485465',
						fontSize: 10,
						padding: [0, 10]
					}
				},
				//坐标轴刻度
				axisTick: {
					show: false,
				},
				//去除横向分割线
				splitLine: {
					show: false,
				},
			},
			color: echartData.color,
			toolbox: {
				top: '-2',
				feature: {
					saveAsImage: {
						name: "总台架报表数据"
					}
				}
			},
			grid: {
				top: '15%', //距上边距
				right: '20',
				left: '3%',
			},
			series: series
		};

		chartID.setOption(option);
	},

	//运行时间报表信息
	yunxingPie(echartData) {
		var data = []
		var sunnunm = 0
		for (var i = echartData.data.length - 1; i >= 0; i--) {
			data.unshift(echartData.data[i].name)
			sunnunm += echartData.data[i].value
		}
		let chartID = echarts.init(document.getElementById(echartData.chartID))
		var option = {
			title: {
				show: true,
				text: '今日实时能耗',
				textStyle: {
					color: '#485465',
					fontSize: 14,
					align: 'center',
				},
				subtext: '能耗前五名',
				subtextStyle: {
					color: '#828282',
					fontSize: 10,
					align: 'center '
				},
				// // left: "center",
				// left: '8%',
				// top: '2%',
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 20,
				orient: 'vertical',
				left: '20',
				top: '15%',
				textStyle: {
					color: '#485465',
					fontSize: 12,
				},
				data: data //['组合式空调机组', '冷热源', '风机', '新风机组', '毛细管']
			},
			//设置饼图的颜色
			color: echartData.color,
			series: [{
				name: '消防管理',
				type: 'pie',
				radius: ['35%', '55%'],
				center: ['50%', '60%'],
				label: {
					show: true,
					position: 'inside',
					verticalAlign: 'middle',
					formatter: function(params) {
						var res = parseInt(params.percent) + '%';
						return res;
					}, //'{d}%',
					fontSize: 12,
				},
				labelLine: {
					show: false
				},
				data: echartData.data
			}]
		};

		chartID.setOption(option);
	},

	//智能照明柱状图
	lightBar(echartData) {
		let chartID = echarts.init(document.getElementById(echartData.chartID))
		var option = {
			color: ['#003366', '#006699', '#4cabce', '#e5323e'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			calculable: true,
			xAxis: {
				type: 'category',
				data: ['设备1', '设备2', '设备3'],
				//横坐标
				axisLine: {
					show: false,
					lineStyle: {
						color: '#00F2FF',
						width: 1,
						type: 'solid',
					},
				},
				//坐标轴刻度
				axisTick: {
					show: false,
				},
				//坐标轴刻度标签的相关设置
				axisLabel: {
					textStyle: {
						color: '#485465',
						fontSize: 10,
						padding: [5, 0]
					}
				},
			},
			yAxis: {
				type: 'value',
				//纵坐标
				axisLine: {
					show: false,
				},
				//坐标轴刻度标签的相关设置
				axisLabel: {
					textStyle: {
						color: '#485465',
						fontSize: 10,
					}
				},
				//坐标轴刻度
				axisTick: {
					show: false,
				},
				//去除横向分割线
				splitLine: {
					show: true,
					lineStyle: {
						color: '#E7EBEF',
						width: 1,
						type: 'solid',
					},
				},
			},
			grid: {
				top: '15%',
				right: '15%',
				bottom: '15%',
			},
			series: [{
				name: '运行',
				type: 'bar',
				barWidth: 42,
				data: [23, 12, 22],
				//柱状图数值设置
				label: {
					show: true,
					position: 'top',
					color: '#FFFFFF',
					fontSize: 12,
					padding: [5, 0]
				},
				//配置样式
				itemStyle: {
					//每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组 　　　　　　　　
					color: function(params) {
						var colorList = [
							['#53A8E2', '#76DDFB'],
							['#53A8E2', '#76DDFB'],
						];
						var index = params.dataIndex
						if (params.dataIndex >= colorList.length) {
							index = params.dataIndex - colorList.length;
						}
						let fsf = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: colorList[index][0]
						}, {
							offset: 0.8,
							color: colorList[index][1]
						}, ]);
						return fsf
					},

				},
			}]
		};

		chartID.setOption(option);
	},
}