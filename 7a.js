
//operations
const add = (a,b)=>{
	return Number(a)+Number(b);
}
const sub = (a,b)=>{
	return Number(a)-Number(b);
}

 const mul =(a,b)=>{
	return Number(a)*Number(b);
}
 const div = (a,b)=>{
	return Number(a)/Number(b);
}
//server http
var http = require('http');
var server = http.createServer((request,response)=>{
	response.writeHead(200,{"Context-Type":"text/plain"});
	response.end("response: "+CheckValidationAndPerformAction(request.url));
});

//action and validation
const CheckValidationAndPerformAction =(req)=>{
	let reg = new RegExp('^(\/)-?[0-9]+(.)?[0-9]*([-+\/*]){1}-?[0-9]+(.)?[0-9]*$');

	let res = reg.test(req);
	if (!res) {
		return "INVALID DATA";
	}
	return Action(req.slice(1).trim());
}

//action
const Action = (arg)=>{
	let a =arg[0]=='-'?-1:1;
	if (a==-1) {
		arg = arg.slice(1);
	}
	//find operator
	let index;
	for(i=0;i<arg.length;i++){
		if ( new RegExp('[-+\/*]').test(arg[i])) {
				index = i;
				break;
		}
	}
	a*=arg.slice(0,index);
	b = arg.slice(index+1);

	switch(arg[index]){
			case '+':
					return	add(a,b);
			case '-':
					return	sub(a,b);
			case '/':
					return	div(a,b);
			case '*':
					return	mul(a,b);
			default:
					return "";
	}
	
}

//listen
server.listen(8000,"127.0.0.1");
console.log("Server is running");