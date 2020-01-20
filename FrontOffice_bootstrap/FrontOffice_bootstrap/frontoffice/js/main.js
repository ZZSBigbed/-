
$(document).ready(function () {
	addMarketSummary();
	bar();
//	var jsonstr;
//	$.ajax( {  
//		  type : 'GET',  
//		  url : 'data/rmtypesummary.txt',  
//		  data : jsonstr,
//		  dataType : 'text',  
//		  success : function(data) {  
//				addRmTypeSummary(data);
//		  },  
//		  error : function(data) {  
//				alert("json RmTypeSummary error");
//		  }  
//	  });


})

function addRmTypeSummary( jsondata ){
	var json = $.parseJSON( jsondata ); 
	
	var bardata = new Array();
	for( var i=0,j = json.length;i<j;i++){
		bardata.push([ json[i].rmtype, json[i].rooms ]);
	} 

	 $.plot("#rmTypeSummary", [ bardata ], {
		  series: {
			lines: {
			  lineWidth: 1  
			},
				bars: {
					show: true,
					barWidth: 0.5,
					align: "center",
			   lineWidth: 0,
			   fillColor: "#428BCA"
				}
		  },
		grid: {
			borderColor: '#ddd',
			borderWidth: 1,
			labelMargin: 10
		  },
		  xaxis: {
				mode: "categories",
				tickLength: 0
		  }
	 });

}


function addMarketSummary(){
	  var placeholder = $('#marketSummary').css({'width':'90%' , 'min-height':'150px'});
	  var data = [
		{ label: "散客",  data: 38.7, color: "#68BC31"},
		{ label: "团购",  data: 24.5, color: "#2091CF"},
		{ label: "团队",  data: 8.2, color: "#AF4E96"},
		{ label: "长包房",  data: 18.6, color: "#DA5430"},
		{ label: "其它",  data: 10, color: "#FEE074"}
	  ]
	  function drawPieChart(placeholder, data, position) {
		  $.plot(placeholder, data, {
			series: {
				pie: {
					show: true,
					tilt:0.8,
					highlight: {
						opacity: 0.25
					},
					stroke: {
						color: '#fff',
						width: 2
					},
					startAngle: 2
				}
			},
			legend: {
				show: true,
				position: position || "ne", 
				labelBoxBorderColor: null,
				margin:[-30,15]
			}
			,
			grid: {
				hoverable: true,
				clickable: true
			}
		 })
	 }
	 drawPieChart(placeholder, data);

//	 placeholder.data('chart', data);
//	 placeholder.data('draw', drawPieChart);
	 
}

function bars(){
	var d1 = [];
	for (var i = 0; i <= 10; i += 1)
		d1.push([i, parseInt(Math.random() * 30)]);

	var d2 = [];
	for (var i = 0; i <= 10; i += 1)
		d2.push([i, parseInt(Math.random() * 30)]);

	var d3 = [];
	for (var i = 0; i <= 10; i += 1)
		d3.push([i, parseInt(Math.random() * 30)]);

	var d = [];
	d.push([0,100]);
	d.push([1,80]);
	d.push([2,80]);
	d.push([3,80]);
	d.push([4,80]);
	d.push([5,80]);
	d.push([6,80]);
	d.push([7,80]);

	var stack = 0, bars = true, lines = false, steps = false;
	
	function plotWithOptions() {
		$.plot($("#rmTypeSummary"), [ d ], {
			series: {
				stack: stack,
				lines: { show: lines, fill: true, steps: steps },
				bars: { show: bars, barWidth: 0.6 }
			}
		});
	}

	plotWithOptions();
}

function bar(){

   var d1 = [   
                { label: "Bar1", data: [ [0,14], [1, 13], [2, 11], [3, 7] ] ,color: '#abcdef' },  
                { label: "Bar2", data: [ [0,8], [1, 22], [2, 33], [3, 11] ] , color: '#fedcba'}  
            ];  
    $.plot($("#rmTypeSummary"), d1, {  
           series: {  
                bars: {  
                    show: true 
                }  
            },  
            bars: {  
                align: "center",  
                barWidth: 0.5  
            },  
            xaxis: {  
                show: true,  
                //position: 'left',  
                //color: '#ccc',  
                //tickColor: '#fff',  
                ticks: [[0,'ST'],[1,'SK'],[2,'TD'],[3,'DK']],  
                tickSize: 2,  
                axisLabelUseCanvas: true,  
                axisLabelFontSizePixels: 12,  
                axisLabelFontFamily: 'Verdana, Arial',  
                axisLabelPadding: 10  
   
            },  
        }); 

}