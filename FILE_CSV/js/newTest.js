var csv_path = ("data/graph.csv");

var color = d3.scale.category20();

var width = 1400, height = 700;

var row_collector = {};
d3.csv(csv_path, function(rows) {

	// here row_collector should store row properties into two groups based on seqnum
    	rows.forEach(function(row) {
		if(row_collector[row.seqnum] == null){row_collector[row.seqnum] = {};}
		row_collector[row.seqnum][row.source] = {name : row.source};
		row_collector[row.seqnum][row.target] = {name : row.target};
	});


	// initialize svg
	var svg = createSVG(row_collector, width, height);

	// initialize force variable
	var force = createForce(row_collector, width, height);

	// extract the map `row_collector` to create nodes
	var nodes = extractNodes(row_collector);

	// `row_collector` is nothing but set of links between nodes
	var links = row_collector;


	// Create the link lines.
	var linkLines = createLinkLines(links, svg);

	// Create the node circles.
	var nodeCircles = createNodeCircles(nodes, force, svg);

	// Create ticks
	var tick = {};
	for(seqnum in row_collector){
		tick[seqnum] = createTick(seqnum, linkLines, nodeCircles);
	}

	// Start the force layout
	startForce(force, links, nodes, tick);
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

// function to create link lines
function createLinkLines(links, svg){
	var link = {};
	for(seqnum in links){
		link[seqnum] = svg[seqnum].selectAll(".link")
		.data(links[seqnum])
		.enter().append("line")
		.style("stroke", linkColour)
		.attr("class", "link");
	}
	return link;
}
// function to create node circles
function createNodeCircles(nodes, force, svg){
	var node = {};
	for(seqnum in nodes){
		node[seqnum] = svg[seqnum].selectAll(".node")
		.data(nodes[seqnum])
		.enter().append("circle")
		.attr("class", "node")
		.attr("r", 20)
		.attr("fill", circleColour)
		.call(force[seqnum].drag);
	}
	return node;
}


// function to create force variable
function createForce(seqnums, width, height){
	var force = {};
	for(seqnum in seqnums){
		force[seqnum] = d3.layout.force()
			.size([width, height]);
	}
	return force;
}

function createSVG(seqnums, width, height){
	var svg = {};
	for(seqnum in seqnums){
		svg[seqnum] = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height);
	}
	return svg;
}

function startForce(force, links, nodes, tick){
	for(seqnum in links){
	    force[seqnum]
	      .gravity(0)
	      .linkStrength(1)
	      .linkDistance(height/7)
	      .nodes(nodes[seqnum])
	      .links(links[seqnum])
	      .on("tick", tick[seqnum])
	      .start();
	}
}

function createTick(seqnum, linkLines, nodeCircles) {
		linkLines[seqnum].attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });

		nodeCircles[seqnum].attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	console.log(linkLines);
	return linkLines;
}

// function to extract nodes from dictionary of rows
function extractNodes(row_collector, total_seqnum){
	// `nodes` contains extracted nodes for saparated by seqnum
	var nodes = {};
	for(seqnum in row_collector){
		nodes[seqnum] = d3.values(row_collector[seqnum]);
	}
	return nodes;
}

