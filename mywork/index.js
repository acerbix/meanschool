'use strict';
var _h = require ("http");
var _p = 8585;

function _req_processor(req, resp)
{
	resp.writeHead(200, {'Content-type': 'text/html'} );
	resp.write("<HTML><BODY bgcolor='cyan'><H1>Hello world</H1></BODY></HTML>");
	resp.end ("Request served: you asked for - " + req.url  );
	console.log ("Request received for - " + req.url );
}

function startLog ()
{
	console.log ("Server listening on port: %s", _p );
}

var _server = _h.createServer (_req_processor);
_server.listen (_p, startLog());
