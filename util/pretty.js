/*
 * Prettifies the epoch time to human redable date format...
 * @epoch (Integer) - unix epoch number
 * @dateFormat (String) - format in which date should be prettified
 *
 * @dateForamt string can be composed from following (case sensitive)
 * 	DDDD		- Full name of the weekday e.g. Monday
 *	DDD		- Short name of the weekday e.g. Mon
 *	yyyy 		- Full year e.g. 2015
 * 	MMMM		- Full month name e.g. January
 * 	MMM		- Short month name e.g. Jan
 * 	MM		- Month in two digits
 * 	dd		- Date in two digits
 * 	hh		- hours
 *	mm		- minutes
 *	ss		- seconds
 */
 export function prettyDate(epoch, dateFormat){
	
	//TODO: add args validations here in future..
	var shortMonths = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	var longMonths  = 'January_Febrary_March_April_May_June_July_August_September_Octeber_November_December'.split('_');
	
	var shortDays = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	var longDays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	
	var _df 	= dateFormat;
	
	// convert epoch date to date object
	var 	dt 	= new Date(epoch * 1000);
	
	var	date	= dt.getDate(),
		month	= dt.getMonth(),
		year	= dt.getFullYear(),
		day 	= dt.getDay(),
		
		hour	= dt.getHours(),
		mins	= dt.getMinutes(),
		secs	= dt.getSeconds();
	
	// year
	if (_df && _df.indexOf('yyyy') != -1) {
		_df = _df.replace('yyyy', year);
	}
	
	// day of week in long format e.g. Monday
	if (_df && _df.indexOf('DDDD') != -1) {
		_df = _df.replace('DDDD', longDays[day]);
	}
	
	// day of week in short format e.g. Mon
	if (_df && _df.indexOf('DDD') != -1) {
		_df = _df.replace('DDD', shortDays[day]);
	}
	
	// date of the month
	if (_df && _df.indexOf('dd') != -1) {
		_df = _df.replace('dd', date < 10 ? ('0' + date) : date);
	}
	
	// Month of the year in long format e.g. January
	if (_df && _df.indexOf('MMMM') != -1) {
		_df = _df.replace('MMMM', longMonths[month]);
	}
	
	// Month of the year in short format e.g. Jan
	if (_df && _df.indexOf('MMM') != -1) {
		_df = _df.replace('MMM', shortMonths[month]);
	}
	
	// Month of the year in numeric format e.g. 01
	if (_df && _df.indexOf('MM') != -1) {
		_df = _df.replace('MM', (month + 1) < 10 ? ('0' + month) : month);
	}
	
	// hours
	if (_df && _df.indexOf('hh') != -1) {
		_df = _df.replace('hh', hour < 10 ? ('0' + hour) : hour);
	}
	
	// minutes
	if (_df && _df.indexOf('mm') != -1) {
		_df = _df.replace('mm', mins < 10 ? ('0' + mins) : mins);
	}
	
	// seconds
	if (_df && _df.indexOf('ss') != -1) {
		_df = _df.replace('ss', secs < 10 ? ('0' + secs) : secs);
	}
	
	return _df;
}