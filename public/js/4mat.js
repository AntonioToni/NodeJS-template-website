function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("login").style.display = "none";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("login").style.display = "block";
}

var Days = [31,28,31,30,31,30,31,31,30,31,30,31];// index => month [0-11]
$(document).ready(function(){
    var option = '<option value="day">dan</option>';
    var selectedDay="day";
    for (var i=1;i <= Days[0];i++){ //add option days
        option += '<option value="'+ i + '">' + i + '</option>';
    }
    $('#day').append(option);
    $('#day').val(selectedDay);

    var option = '<option value="month">mjesec</option>';
    var selectedMon ="month";
    for (var i=1;i <= 12;i++){
        option += '<option value="'+ i + '">' + i + '</option>';
    }
    $('#month').append(option);
    $('#month').val(selectedMon);

    var d = new Date();
    var option = '<option value="year">godina</option>';
    selectedYear ="year";
    for (var i=1950;i <= d.getFullYear();i++){// years start i
        option += '<option value="'+ i + '">' + i + '</option>';
    }
    $('#year').append(option);
    $('#year').val(selectedYear);
});
function isLeapYear(year) {
    year = parseInt(year);
    if (year % 4 != 0) {
        return false;
    } else if (year % 400 == 0) {
        return true;
    } else if (year % 100 == 0) {
        return false;
    } else {
        return true;
    }
}

function change_year(select)
{
    if( isLeapYear( $(select).val() ) )
      {
            Days[1] = 29;
            if( $("#month").val() == 2)
            {
                   var day = $('#day');
                   var val = $(day).val();
                   $(day).empty();
                   var option = '<option value="day">day</option>';
                   for (var i=1;i <= Days[1];i++){ //add option days
                         option += '<option value="'+ i + '">' + i + '</option>';
             }
                   $(day).append(option);
                   if( val > Days[ month ] )
                   {
                          val = 1;
                   }
                   $(day).val(val);
             }
    }
    else {
        Days[1] = 28;
    }
}

function change_month(select) {
    var day = $('#day');
    var val = $(day).val();
    $(day).empty();
    var option = '<option value="day">day</option>';
    var month = parseInt( $(select).val() ) - 1;
    for (var i=1;i <= Days[ month ];i++){ //add option days
        option += '<option value="'+ i + '">' + i + '</option>';
    }
    $(day).append(option);
    if( val > Days[ month ] )
    {
        val = 1;
    }
    $(day).val(val);
}

var click = 0;
function openNav(x) {
    if (click == 0) {
        document.getElementById("mySidenav").classList.add("sidenavexpand");
        document.getElementById("navbtn").classList.add("containernav-move");
        click = 1;
    } else {
        document.getElementById("mySidenav").classList.remove("sidenavexpand");
        document.getElementById("navbtn").classList.remove("containernav-move");
        click = 0;
    }
    x.classList.toggle("change");
}
