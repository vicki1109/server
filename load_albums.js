var http = require('http');
fs = require('fs');

function load_album_list(callback)
{
	fs.readdir(
		"albums",(err,files)=>{
			if(err)
			{
				callback(err);
				return;
			}

			var only_dirs = [];
			for(var i = 0;files && i<files.length;i++)
			{
				fs.stat("albums/"+files[i],(err,stats)=>{
					if(stats.isDirectory()){
						only_dirs.push(files[i]);
					}
				});
			}
			callback(null,only_dirs);
		}
		);
}

function handle_incoming_request(req,res)
{
	console.log("INCOMING REQUEST: "+req.method+ " "+req.url);
	load_album_list(function(err,albums){
		if(err){
			res.writeHead(503,{"Content-Type":"application/json"});
			res.end(JSON.stringify(err)+"\n");
			return;
		}

		var out = {
			error:null,data:{albums:albums}
		};
		res.writeHead(200,{"Content-Type":"application/json"});
		res.end(JSON.stringify(out)+"\n");
	});
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);