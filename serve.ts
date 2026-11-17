import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'game'),types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg'},n=process.argv.indexOf('--port'),port=n>=0?Number(process.argv[n+1]):8080;
createServer((req,res)=>{const raw=decodeURIComponent((req.url??'/').split('?')[0]),rel=normalize(raw==='/'?'index.html':raw.replace(/^\/+/,'')),file=join(root,rel);if(rel.startsWith('..')||!file.startsWith(root)){res.writeHead(403);return res.end('Forbidden')}try{if(!statSync(file).isFile())throw Error();res.writeHead(200,{'Content-Type':types[extname(file)]??'application/octet-stream'});res.end(readFileSync(file))}catch{res.writeHead(404);res.end('Not found')}}).listen(port,'127.0.0.1',()=>console.log(`NOVAFALL on http://localhost:${port}`));
