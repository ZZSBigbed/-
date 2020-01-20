function addRmTypeSummary( jsondata ){
	var json = $.parseJSON( jsondata ); 
	
	var bardata = new Array();
	for( var i=0,j = json.length;i<j;i++){
		bardata.push([ json[i].rmtype, json[i].rooms ]);
	} 


	 jQuery.plot("#rmTypeSummary", [ bardata ], {
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



function addMarketSummary(  ){
		var data = [
			{ label: "空房", data: [[1,10]], color: '#DCDCDC'},
			{ label: "散客", data: [[1,30]], color: '#1CAF9A'},
			{ label: "团队", data: [[1,90]], color: '#F0AD4E'},
			{ label: "长住房", data: [[1,70]], color: '#428BCA'},
			{ label: "其它", data: [[1,80]], color: '#5BC0DE'}
		 ];
		
		jQuery.plot('#marketSummary', data , {
			series: {
				pie: {
					show: true,
					radius: 1,
					label: {
						show: true,
						radius: 2/3,
						formatter: labelFormatter,
						threshold: 0.1
					}
				}
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		});
    function labelFormatter(label, series) {
		return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
	}
}
