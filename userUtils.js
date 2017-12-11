'use strict'

const bcrypt = require('bcrypt');
const userTable = require('./hashTable.json');

class UserUtils {
	constructor(){}

	generate(pw){
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(pw, salt);
		console.log(hash);
	}

	checkUserPassInput(req){
		let reqBody;

		if (typeof req.body === "string"){
			reqBody = JSON.parse(req.body);
		}
		else{
			reqBody = req.body;
		}

		const userName = reqBody.user;
		const password = reqBody.password;

		if (userTable[userName]){
			console.log("found user ", userName);
			if (bcrypt.compareSync(password, userTable[userName])){
				console.log("Successful login by ", reqBody.user);
				req.session.authenticated = true;
				req.session.user = reqBody.user;
				return true;
			}else{
				console.log("Failed login by ", reqBody.user);
			}
		}else{
			console.log("user not found", userName);
		}

		return false;
	}

	checkSession(req){
		if (req.session.authenticated){
			console.log("Successful session authentication by ", req.session.user);
			return true;
		}

		return false;
	}

	getUserLoggedInUserName(){
		
	}
}

module.exports = UserUtils;