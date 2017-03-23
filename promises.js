var name;
p = new Promise(function(resolve){
	setTimeout(function()
	{
		resolve();
	},1000);
});

p.then(function(){
	name = 'linkFly';
	console.log(name);
}).then(function(){
	name = 'cnBlog';
	console.log(name);
});