var sql = require('mssql');
var conn = require("./connect")();
exports.executeSql = function ( sqlQuery, callback) {
	conn.close(); //testing
    conn.connect()
		.then(function(){
			var req = new sql.Request(conn);
			req.query(sqlQuery)
			.then(function(recordset){
				conn.close();
				callback(recordset);
			})
			.catch(function(err){
				conn.close();
				console.log(err);
				callback(null, err);
			})
		})
		.catch(function(err){
			conn.close();
			console.log(err);
			callback(null, err);
		})
};
