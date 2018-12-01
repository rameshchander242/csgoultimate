exports.show500 = function(req, res, err){
	res.writeHead(500, "Internal Serve occured", {"Content-Type": "application/json"});
	res.write(JSON.stringify({data: "Error occured:" + err}));
	res.end();
}


exports.send200 = function(req, res){
	res.writeHead(200, {"Content-Type": "application/json"});
	res.write(JSON.stringify({message: "action completed"}));
	res.end();
}

exports.sendJson = function(req, res, data){
	res.writeHead(200, {"Content-Type": "application/json"});
	if(data){
		res.write(JSON.stringify(data))
	}
	res.end();
}

exports.show405 = function(req, res, err){
	res.writeHead(405, "Method not supported", {"Content-Type": "application/json"});
	res.write(JSON.stringify({data: "Method not supported"}));
	res.end();
}

exports.show404 = function(req, res, err){
	res.writeHead(404, "Resource not found", {"Content-Type": "application/json"});
	res.write(JSON.stringify({data: "Error occured:" + err}));
	res.end();
}

exports.show401 = function(req, res, err){
	res.writeHead(401, "authenticate failed", {"Content-Type": "application/json"});
	res.write(JSON.stringify({data: err}));
	res.end();
}
