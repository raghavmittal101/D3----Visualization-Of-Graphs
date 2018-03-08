var width = 1400,
        height = 700;

    var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height);

    var force = d3.layout.force()
                  .size([width, height]);


    d3.csv("data/graph.csv", function(error, links) {
          if (error) throw error;

    var nodesByName = {};
	links.forEach(function(graphs){
		graphs.forEach(function(point){
			point.source = nodeByName(link.seqnum, point.source);
		  	point.target = nodeByName(link.seqnum, point.target);
		});
	});
	
	  function nodeByName(seqnum, name) {
	  	if(nodesByName[seqnum] == null){nodesByName[seqnum] = {};}
		return nodesByName[seqnum][name] || (nodesByName[seqnum][name] = {name: name});
	  }
	//##########3333
	
    // Extract the array of nodes from the map by name.
    var nodes = {};
    nodesByName.forEach(function(seqnum){
    	nodes[seqnum] = d3.values(nodesByName[seqnum]);
    });

    // Create the link lines.
    var link = {};
    links.forEach(function(seqnum){
    	link[seqnum] = svg.selectAll(".link")
                .data(links[seqnum])
                .enter().append("line")
                .style("stroke", linkColour)
                .attr("class", "link");
    });

    // Create the node circles.
    var node = {};
    nodes.forEach(function(seqnum){
    	node = svg.selectAll(".node")
                .data(nodes[seqnum])
                .enter().append("circle")
                .attr("class", "node")
                .attr("r", 20)
                .attr("fill", circleColour)
                .call(force.drag);

    });
      

    // Start the force layout.
    nodes.forEach(function(seqnum){
	    force
		  .gravity(0)
		  .linkStrength(1)
		  .linkDistance(height/7)
		  .nodes(nodes[seqnum])
		  .links(links[seqnum])
		  .on("tick", tick)
		  .start();
    });



    function circleColour(d){
            if(d.source == "A1"){
                return "black";
              } else {
                  return "black";
                }
            }


    function linkColour(d){
            if(d.source == "E"){
                return "black";
              } else {
                  return "black";
                }
            }

  function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

});
