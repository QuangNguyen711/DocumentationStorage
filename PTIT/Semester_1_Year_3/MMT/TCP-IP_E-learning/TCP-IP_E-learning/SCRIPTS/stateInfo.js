// JavaScript Document
var intervalID = "";
function startCoreInt() {
	intervalID = window.setInterval("RI_getCoreData()",100)
}

function RI_getCoreData() {
	var frameDoc= window.parent.frames["cmiresults"].document;
	var core_data= frameDoc.body.innerHTML;
	//alert(core_data);
	if (core_data != null) {
		if (core_data.toUpperCase().indexOf("[CORE_LESSON]") > -1) {
			//alert(core_data);
			window.clearInterval(intervalID);
			RI_getData(core_data);
		}
	}
}

function RI_getData(core_data) {
	var movie = window.document.player;
	//get bookmarking
	var lesson_loc = core_data.toUpperCase().indexOf("LESSON_LOCATION");
	var car_return = core_data.indexOf("\r",lesson_loc);
	var aicc_lesson_loc = core_data.substring(lesson_loc,car_return);
	var lesson_file = aicc_lesson_loc.substring(aicc_lesson_loc.indexOf("=")+1)
	movie.SetVariable("AICC_bookmark",lesson_file);
	//alert(lesson_file);
	//Get state info
	var state_loc = core_data.toUpperCase().lastIndexOf("[CORE_LESSON]\r\n") + 15;
	car_return = core_data.indexOf("\r",state_loc);
	var state_info = core_data.substring(state_loc,car_return);
	if (state_info.toUpperCase() == "[CORE_VENDOR]") {
		state_info = "";  
	}
	//alert(state_info);
	movie.SetVariable("AICC_state",state_info);
	//get userid and user name
	var user_loc = core_data.toUpperCase().indexOf("STUDENT_ID");
	car_return = core_data.indexOf("\r",user_loc);
	var user_id = core_data.substring(user_loc,car_return);
	user_id = user_id.substring(user_id.indexOf("=")+1);
	//alert(user_id);
	movie.SetVariable("AICC_userid",user_id);
	
	user_loc = core_data.toUpperCase().indexOf("STUDENT_NAME");
	car_return = core_data.indexOf("\r",user_loc);
	var user_name = core_data.substring(user_loc,car_return);
	user_name = user_name.substring(user_name.indexOf("=")+1);
	movie.SetVariable("AICC_username",user_name);
	//alert(user_name);
	//Get lesson Status
	var status_loc = core_data.toUpperCase().indexOf("LESSON_STATUS");
	car_return = core_data.indexOf("\r",status_loc);
	var lesson_status = core_data.substring(status_loc,car_return);
	lesson_status = lesson_status.substring(lesson_status.indexOf("=")+1);
	movie.SetVariable("AICC_lessonstatus",lesson_status);
	//alert(lesson_status);
}