/* mock db */
var users = [
	{
		id:1,
		username:'operatori',
		password:'1',
		role:'operator'
	},
	{
		id:2,
		username:'boss',
		password:'1',
		role:'chief'
	},
	{
		id:3,
		username:'moadgile',
		password:'1',
		role:'deputy'
	},
	{
		id:4,
		username:'rigiti',
		password:'1',
		role:'employee'
	}
];
function findUserById(id, cb) {
	var idx = id - 1;
	if (users[idx]) {
		cb(null, users[idx]);
	} else {
		cb(new Error('User ' + id + ' does not exist'));
	}
}
function findUserByUsername(username, cb) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
			return cb(null, user);
		}
	}
	return cb(null, null);
}

var moduleDefinition = {
	'operator':{
		features:[
			{
				name:'Cerilebi',
				url:''
			}
		]
	}
};
/* */


module.exports = {
	users:{
		find:{
			byId:findUserById,
			byUsername:findUserByUsername
		},
		create:{},
		destroy:{}
	}
};