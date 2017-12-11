//Reads/writes to/from hardware

'use strict'

//const Gpio = require('onoff').Gpio;
//const led = new Gpio(18, 'out'); 

//this is just temporary in memory variable, will pull from hardware...
var STATUS = true;

var HEATER_EXPIRATION;

class Heater {
	constructor(){

	}

	//read from hardware
	getStatus(){
		console.log("getting status");
		//TODO read hardware
		return STATUS;
	}

	//set hardware
	setStatus(isSettingOn, duration){

		console.log("setting status", isSettingOn);

		//TODO set hardware
		STATUS = isSettingOn;

		if (isSettingOn){
			//turn on heater
			setTimeout(() => {
				//TODO show time remaining!
				console.log("DURATION ENDED TURNING OFF!!!!!!!!!!");
				//TODO set hardware.
				STATUS = false;

			}, duration * 60 * 1000);


			HEATER_EXPIRATION = new Date().getTime() + duration * 60 * 1000;

		}else{
			//turn off heater
			HEATER_EXPIRATION = 0;
		}
	}

	getRemainingTime(){
		const now = new Date().getTime();

		if(HEATER_EXPIRATION > now){
			return HEATER_EXPIRATION - now;
		}else{
			return 0;
		}

	}

	//TEMPORARY - testing led
	/*getLEDStatus(){
		return led.readSync() === 0 ? false : true;
	}

	setLEDStatus(isSettingOn){

		console.log("is setting LED to", isSettingOn);

		if (isSettingOn){
			led.writeSync(1);
		}else{
			led.writeSync(0);
		}
	}	*/
	//END TEMPORARY
}

module.exports = Heater;