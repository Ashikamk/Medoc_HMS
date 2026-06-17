function AgeCalculation(dateString)
{
 var Today = new Date();
    var Todayyear = Today.getFullYear();
    var todaymonth = parseInt(Today.getMonth() + 1);
    var todaydate = Today.getDate();
    var now = new Date();
    var today = new Date(now.getYear(), now.getMonth(), now.getDate());
    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
    var yearDob = parseInt(dateString.substring(10, 6));
    var monthDob = parseInt(dateString.substring(3, 5));
    var DOBDate = parseInt(dateString.substring(0, 2));
    var dob = new Date(yearDob, monthDob - 1, DOBDate);
    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";

    yearAge = yearNow - yearDob;
    if (monthNow >= monthDob)
        var monthAge = monthNow - monthDob;
    else {
        yearAge--;
        var monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob)
        var dateAge = dateNow - dateDob;
    else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }
    return age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };
}