var Today,Year,Month,Dates,Hours,Minutes,Seconds,Milliseconds,Day;function GetTime(){Today=new Date();Year=Today.getFullYear();Month=Today.getMonth()+1;Dates=Today.getDate();Hours=Today.getHours();Minutes=Today.getMinutes();Seconds=Today.getSeconds();Milliseconds=Today.getMilliseconds();Day=Today.getDay();}