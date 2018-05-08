const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const moment = require('moment');
const currentReminder = moment();
const format = 'MMMM Do YYYY, h:mm a';
const later = require('later');



// for testing only
function a(amount, string)
{
  return new moment( currentReminder ).add(amount, string);
}

// only pick the earliest time and put it at front of array
function sort(reminders)
{
  let min = reminders[0];
  let minIndex = 0;

  for (let i = 0; i < reminders.length; i++)
  {
  	if (reminders[i].valueOf() < min)
  	{
  	  min = reminders[i].valueOf();
  	  let temp = reminders[i];
  	  reminders[i] = reminders[minIndex];
  	  reminders[minIndex] = temp;
  	  minIndex = i;
  	}
  }
}

function getString(reminders)
{
  // keep loop going by waiting for a long ass time
  // to avoid attempting to get substring of undefined
  if (reminders.length == 0)
  	reminders = [a(1000000000, 'hours')];

  const formattedNext = reminders[0].format( format );	
  const month = formattedNext.substring(0, 3);
  const day = formattedNext.substring(4, 7);
  const year = formattedNext.substring(8, 12);
  const time = formattedNext.substring(14, formattedNext.length);
  
  return 'after '+time+' on the '+day+' day of '+month+' in '+year;
}

server.listen(port, () =>{
  console.log("Started listening on port: "+port);

    
  const reminders = [a(1, 's'), a(0, 's'), a(2, 's'), a(4, 's'), a(5, 's')];



  sort(reminders);


  let str = getString(reminders);
  console.log('first reminder '+str);
  let textSched = later.parse.text(str);
  later.date.localTime();
  let next = later.schedule(textSched).next(5);

  function logTime() {
    console.log('log time = '+new Date());
    // do query for all medicine. send notification for all meds that time has passed
    timer2.clear();

    reminders.shift();
    sort(reminders);
	textSched = later.parse.text(getString(reminders));
	later.date.localTime();
	next = later.schedule(textSched).next(5);
	timer2 = later.setInterval(logTime, textSched);
  }
  var timer2 = later.setInterval(logTime, textSched);

  // var txt = later.parse.text(str);
  // console.log(txt);
  // next = later.schedule(textSched).next(5);
  // function logTime2() {
  //   console.log(new Date());
  // }
  // var timer = later.setInterval(logTime2, txt);



});
