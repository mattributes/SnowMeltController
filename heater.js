//Reads/writes to/from hardware

'use strict'

const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out'); 

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

	//TEMPORARY - testing led
	getLEDStatus(){
		return led.readSync() === 0 ? false : true;
	}

	setLEDStatus(isSettingOn){

		console.log("is setting LED to", isSettingOn);

		if (isSettingOn){
			led.writeSync(1);
		}else{
			led.writeSync(0);
		}
	}	
	//END TEMPORARY
}

module.exports = Heater;