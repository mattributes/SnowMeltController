//Reads/writes to/from hardware

'use strict'

//this is just temporary in memory variable, will pull from hardware...
var STATUS = true;

class Heater {
	constructor(){

	}

	//read from hardware
	getStatus(){
		console.log("getting status");
		return STATUS;
	}

	//set hardware
	setStatus(isSettingOn){

		console.log("setting status", isSettingOn);

		STATUS = isSettingOn;

		if (isSettingOn){
			//turn on heater

		}else{
			//turn off heater

		}
	}
}

module.exports = Heater;