//                _ 
//   ____ _____  (_)
//  / __ `/ __ \/ / 
// / /_/ / /_/ / /  
// \__,_/ .___/_/   
//     /_/          

//格式化數字
var MANY_ZEROS = "000000000000000000";
function leftZeroPad(val, minLength) 
{
  if (typeof(val) != "string")
  val = String(val);
  return (MANY_ZEROS.substring(0, minLength - val.length)) + val;
}

$(document).ready(function()
{
  var startDate = new Date('<s:property  value="startTime" />');
  var endDate = new Date('<s:property  value="endTime" />');
  // TEST
  /////////////////////////////////////////////////////////
  // var startDate    = new Date('2014/11/21 10:41:00'); //
  // var endDate      = new Date('2014/11/25 12:44:04'); //
  /////////////////////////////////////////////////////////
  
  var millisecond = 1000;         // 1 秒有 1000 毫秒
      second      = 60,           // 1 分鐘有 60 秒
      minute      = 60 * second,  // 1 小時有 60 分鐘
      hour        = 24 * minute;  // 1 天有 24 小時
  var spantime    = endDate - startDate,
      spantime    = spantime / millisecond,
      seconds     = spantime % second,
      minutes     = spantime % minute / second,
      hours       = spantime % hour / minute,
      days        = spantime / hour;
  var d = Math.floor(days);
  var h = leftZeroPad(Math.floor(hours) , 2);
  var m = leftZeroPad(Math.floor(minutes) , 2);
  var s = leftZeroPad(Math.floor(seconds) , 2);
  
  $('.date-dd').text(d);
  $('.date-hh').text(h);
  $('.date-mm').text(m);
  $('.date-ss').text(s);
});