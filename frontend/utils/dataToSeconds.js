function convertSecondsIntoAppropriateFormat(seconds) {
    
  let timeString = "";
  
  if (seconds > 3600) {
      
      timeString = new Date(seconds * 1000).toISOString().substr(11, 8);
      
  } else if (seconds > 59) {
      
      timeString = new Date(seconds * 1000).toISOString().substr(14, 5);
      
  } else {
      
      if (seconds > 9) {
          
          timeString = "00:" + seconds.toString();
          
      } else {
          
          timeString = "00:" + "0" + seconds.toString().slice(0, 1) + seconds.toString().slice(1);
          
      }
      
  }
  
  return timeString
  
}

export default convertSecondsIntoAppropriateFormat