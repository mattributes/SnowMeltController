# Snow Melt Controller

Current state:

Has login, with session, but the session is in app memory, so if the server (app) is restarted, sessions are lost and relogin will be required.
Heater state is kept in memory, soon the state will be read from the actually heater.

## Setup
1. Get pem keys, and copy them into the ssl dir
2. Install node.js https://nodejs.org/en/download/ if you don't have it already
3. Open a terminal, which already has access to git commands or install git bash https://git-scm.com/downloads and open it 
3. git clone this repo `git clone https://github.com/mattributes/SnowMeltController.git` from terminal/ git bash
4. cd into repo and run `npm install`

## Running

1. run `node server.js` in same directory as above
2. Navigate to https://localhost:8000
3. Accept cert

## TODOs
Move session state to DB
Read/Write from heater
History (in DB)
Instructions/Rules
	Get ALL rules
	Set rule
	rule name | time created | created by

...many more

## Production readiness
Buy SSL cert? Maybe the self-signed cert will be sufficient?
...more

## Adding a user (this will change eventually)
TODO instructions

## Using No-IP
TODO instructions