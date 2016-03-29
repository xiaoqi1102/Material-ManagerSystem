/**
 * Created by xiaoqi on 2016/3/6.
 */
var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
var cache={};

function send404(response){
    response.writeHead(404,{'Content-type':'text/plain'});
    response.write('Error 404: resource not found');
    response.end();
}

function sendFile(resonse,filePath,fileContents){
    resonse.writeHead(
        200,
        {'content-type':mime.lookup(path.basename(filePath))}
    );
    resonse.end(fileContents);
};
function serveStatic(response,cache,absPath){
    if(cache[absPath]){
        sendFile(response,absPath,cache[absPath]);
    }else{
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath]=data;
                        sendFile(response,absPath,data)
                    }
                })
            }else{
                send404(response);
            }
        })
    }
};


var server=http.createServer(function(request,response){
    var filePath=false;
    if(request.url=='/'){
        filePath='/index.html';
    }else{
        //filePath='public'+request.url;
        filePath=request.url;
    }
    var absPath='./'+filePath;
    serveStatic(response,cache,absPath);
});

server.listen(3000,function(){
    console.log('Server listening on port 3000.');
})