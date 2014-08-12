/*---------------*\
	JS - Demo Chart
\*---------------*/

$(document).ready(function () {

	demo_statistic_chart.chartBar_B();

});

//generate random number for charts
randNum = function () {
	//return Math.floor(Math.random()*101);
	return(Math.floor(Math.random() * (1 + 40 - 20))) + 20;
}

var coloursChart = ["#edc240", "#61ba61", "#1083c7", "#db6464", "#ff9933", "#009999"]

// CHARTS SETTINGS
// 
demo_statistic_chart = {

	// DEMO CHART BAR B - Horizontal
	// 
	chartBar_B: function () {
		var elem = $('#statChartFlotBar');

		var d1 = [];
		for(var i = 0; i <= 3; i += 1)
		d1.push([parseInt(Math.random() * 30), i]);

		var d2 = [];
		for(var i = 0; i <= 3; i += 1)
		d2.push([parseInt(Math.random() * 30), i]);

		var d3 = [];
		for(var i = 0; i <= 3; i += 1)
		d3.push([parseInt(Math.random() * 30), i]);

		var d4 = [];
		for(var i = 0; i <= 3; i += 1)
		d3.push([parseInt(Math.random() * 30), i]);

		var data = new Array();
		data.push({
			label: "Data 1",
			data: d1,
			bars: {
				order: 1
			}
		});
		data.push({
			label: "Data 2",
			data: d2,
			bars: {
				order: 2
			}
		});
		data.push({
			label: "Data 3",
			data: d3,
			bars: {
				order: 3
			}
		});
		data.push({
			label: "Data 4",
			data: d3,
			bars: {
				order: 4
			}
		});

		var options = {
			legend: {
				position: "ne",
				noColumns: 0,
				backgroundColor: "rgba(255,255,255,0.1)",
				margin: [0, 0],
				labelFormatter: function (label, series) {
					return '&nbsp;' + label + '&nbsp;';
				}
			},
			grid: {
				show: true,
				aboveData: false,
				color: "#333",
				labelMargin: 5,
				axisMargin: 0,
				borderWidth: 0,
				borderColor: null,
				minBorderMargin: 5,
				clickable: true,
				hoverable: true,
				autoHighlight: false,
				mouseActiveRadius: 20
			},
			series: {
				grow: {
					active: false
				},
				bars: {
					show: true,
					horizontal: true,
					barWidth: 0.2,
					fill: 1
				}
			},
			yaxis: {
				font: {
					weight: "bold"
				},
				tickColor: "rgba(0,0,0,0.2)",
			},
			xaxis: {
				font: {
					weight: "bold"
				},
				tickColor: "rgba(0,0,0,0.2)",
			},

			colors: coloursChart
		};

		$.plot(elem, data, options);

		// Create a tooltip on our chart

		// elem.qtip({
		// 	prerender: true,
		// 	content: 'Loading...',
		// 	position: {
		// 		viewport: $(window),
		// 		target: 'mouse',
		// 		adjust: {
		// 			x: 7
		// 		}
		// 	},
		// 	show: false,
		// 	style: {
		// 		classes: 'ui-tooltip-shadow ui-tooltip-tipsy',
		// 		tip: false
		// 	}
		// });

		// Bind the plot hover

		// elem.bind("plothover", function (event, coords, item) {
		// 	var self = $(this),
		// 		api = $(this).qtip(),
		// 		previousPoint, content,
		// 		round = function (x) {
		// 			return Math.round(x * 1000) / 1000;
		// 		};
		// 	if(!item) {
		// 		api.cache.point = false;
		// 		return api.hide(event);
		// 	}
		// 	previousPoint = api.cache.point;
		// 	if(previousPoint !== item.dataIndex) {
		// 		api.cache.point = item.dataIndex;
		// 		content = item.series.label + ' = ' + round(item.datapoint[1]);
		// 		api.set('content.text', content);
		// 		api.elements.tooltip.stop(1, 1);
		// 		api.show(coords);

		// 	}
		// });
	}
};