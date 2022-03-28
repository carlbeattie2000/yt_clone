export function timeSinceDate(date) {

  const datePassed = new Date(date);

  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - datePassed.getTime()

  const seconds = timeDifference / 1000;

  const differentTimeValuesInSeconds = {
    years: (60 * 524160) - 1,
    months: (60 * 40320) - 1,
    weeks: (60 * 10080) - 1,
    days: (60 * 1440) - 1,
    hours: (60*60) - 1,
    minutes: (60) - 1
  }

  let numberValue = 0;
  let formattedDateString = "";

  if (seconds > differentTimeValuesInSeconds.years ) {

    numberValue = Math.floor(seconds / differentTimeValuesInSeconds.years);
    formattedDateString =  numberValue + " year"

  } else if (seconds > differentTimeValuesInSeconds.months) {

    numberValue = Math.floor(seconds / differentTimeValuesInSeconds.months);
    formattedDateString =  numberValue + " month"

  } else if (seconds > differentTimeValuesInSeconds.weeks) {

    numberValue = Math.floor(seconds / differentTimeValuesInSeconds.weeks);
    formattedDateString =  numberValue + " week"

  } else if (seconds > differentTimeValuesInSeconds.days) {

    numberValue = Math.floor(seconds / differentTimeValuesInSeconds.days);
    formattedDateString =  numberValue + " day"

  } else if (seconds > differentTimeValuesInSeconds.hours) {

    numberValue = Math.floor(seconds / differentTimeValuesInSeconds.hours);
    formattedDateString =  numberValue + " hour"

  } else if (seconds > differentTimeValuesInSeconds.minutes) {

    numberValue = Math.floor(seconds / differentTimeValuesInSeconds.minutes);
    formattedDateString =  numberValue + " minute"

  } else {

    numberValue = seconds;
    formattedDateString =  seconds + " second";

  }

  if (numberValue > 1) {
    return formattedDateString + "s ago";
  } else {
    return formattedDateString + " ago";
  }

}