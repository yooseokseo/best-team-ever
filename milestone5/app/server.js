const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const moment = require('moment');
const format = '{h:mm a}, {Do} {MMMM} {YYYY},';
const later = require('later');




// for testing only
const currentReminder = moment();
function a(amount, string)
{
  return new moment( currentReminder ).add(amount, string);
}

// only pick the earliest time and put it at front of array
function sort(reminders)
{
  let min = reminders[0];

  for (let i = 0; i < reminders.length; i++)
  {
  	if (reminders[i].valueOf() < min)
  	{
  	  min = reminders[i].valueOf();
  	  let temp = reminders[i];
  	  reminders[i] = reminders[0];
  	  reminders[0] = temp;
  	}
  }
}

function parse(reminders)
{
  // keep loop going by waiting for a long ass time
  // to avoid attempting to get substring of undefined
  if (reminders.length == 0)
  	reminders = [a(100000, 'days')];

  let nextReminder = reminders[0].format( format );	

  const keywords = ['after ', ' on the ', ' day of ', ' in ']
  let str = '';
  for (let i = 0; i < 4; i++)
  {
	 let bracket_left = nextReminder.indexOf('{');
	 let bracket_right = nextReminder.indexOf('}');
	 str += keywords[i] + nextReminder.substring(bracket_left+1, bracket_right);
 	 nextReminder = nextReminder.substring(bracket_right+1, nextReminder.length);
  }

  console.log('next reminder '+str);
  return str;
}


function createSchedule(reminders)
{
  sort(reminders);
  let str = parse(reminders);
  let schedule = later.parse.text(str);
  later.date.localTime();
  let next = later.schedule(schedule).next(1);

  return schedule;
}

/*
 * Create server and have it listen to port 3000 or other default ports.
 * Serves as essentially infinite loop, so we can put reminder counter/timer
 * in here since process will keep running
 */
server.listen(port, () =>{
  console.log("Started listening on port: "+port);
    
  const reminders = [a(1, 'm'), a(0, 's'), a(2, 's'), a(4, 'm'), a(5, 's')];
  let schedule = createSchedule(reminders);

  const sendReminder = () =>
  {
    console.log('log time = '+new Date()+'\n--');

    reminders.shift();
    schedule = createSchedule(reminders);

    timer.clear();
	timer = later.setInterval(sendReminder, schedule);
  }
  let timer = later.setInterval(sendReminder, schedule);



});
