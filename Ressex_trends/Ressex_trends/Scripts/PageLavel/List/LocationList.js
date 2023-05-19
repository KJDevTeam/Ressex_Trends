var listindex = 1;
var keeplocationListData = [];
var LocationListModule = function () {
    var TotalData;
    return {
        init: function (sortBy, OrderBy) {

            //Local Storage Clear
            //localStorage.clear();
            localStorage.removeItem('ShortcutFilter');

            var QueryStringARR = common.GetQueryString();
            var result = common.GetTrendsTypePayload(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {

            }
            else {



            }
            LocationListModule.sortingDecider(sortBy, OrderBy);
            var result = LocationListModule.LocationPayload("location", QueryStringARR,sortBy, OrderBy);

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, result.payload, "Post", false);

            TotalData = Data.data;
            console.log(Data);

            if (Data.status == 'OK') {


                keeplocationListData = Data.data;

                //Hiding Radio Button
                if (keeplocationListData.length == 1) {
                    $('#LocationRadiobuttons').remove();


                }

                //Project Heading Decider

                if (result.Category == "AllLocations") {
                    $('#LocationlistHeading').text(keeplocationListData[0].locations_in_india);
                }
                else if (result.Category == "LocationinLocation") {
                    $('#LocationlistHeading').text(keeplocationListData[0].location_input);
                }
                else if (result.Category == "LocationsinCity") {
                    $('#LocationlistHeading').text(keeplocationListData[0].locations_in_city);
                }
                else {
                    $('#LocationlistHeading').text(keeplocationListData[0].locations_in_india);
                }


                LocationListModule.ListLoad(Data.data);
            }
            else {
                $('#LocationSortandFilter').remove();
                $('#LocationviewmoreList').hide();
                $("#LocationList").empty();
                $("#LocationList").append('<div class="d-flex align-items-center justify-content-center" style="height: 250px;"><h5>No Data found</h5></div>');
            }
        },
        ListLoad: function (List_arr) {
            var Listlength = List_arr.length / 10;
            var ListCounter = Math.ceil(Listlength);

            if (listindex <= ListCounter) {
                var arrcount = listindex * 10;

                var arr_toload;
                if (arrcount <= List_arr.length) {
                    arr_toload = List_arr.slice(0, arrcount)
                }
                else {
                    arr_toload = List_arr.slice(0, List_arr.length);
                    $('#LocationviewmoreList').hide();
                }
                var img = utility.FrontEndAPIURL("images");
                var st = ''
                $("#LocationList").empty();
                var userdetails = common.CheckIsPaid();
                UserType = userdetails.UserType;
                if (UserType != "Paid") {
                    $.each(arr_toload, function (index, items) {


                        st += '<div class="searchResultCard d-flex align-items-center">\
                        <div class="mediaBlk rounded-circle"><img src="'+ img + '/search-img-1.png" alt="" class="rounded-circle"></div>\
                            <div class="d-flex justify-content-between flex-1">\
                                    <div class="searchCol">\
                                        <label class="name">'+ items.location + '</label>\
                                        <div class="location">'+ items.region_city + '</div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>'+ items.current_qtr + '</label>\
                                        <div>Rs xxxx<i class="fa fa-lock text-danger ml-2"></i></div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>YoY Change (%)</label>\
                                        <div class="d-flex align-items-center">x %<i class="fa fa-lock text-danger ml-2"></i></div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>CAGR (3Y)</label>\
                                        <div class="d-flex align-items-center">x %<i class="fa fa-lock text-danger ml-2"></i></div>\
                                    </div>\
                                    <div class="searchCol">\
                                            <label>CAGR (5Y)</label>\
                                            <div>x %<i class="fa fa-lock text-danger ml-2"></i></div>\
                                    </div>\
                               </div>\
                               <div class="d-flex align-items-center justify-content-end ml-5 pl-5">\
                                  <a href="javascript:void(0)" onClick="ProjectBylocation('+ items.locationid + ')">View<br>Projects</a>\
                               </div>\
                               <div class="d-flex align-items-center justify-content-end ml-5 pl-5">\
                                <a href="javascript:void(0)" onClick="LocationTrendsRoute('+ items.locationid + ')">View<br>Trends</a>\
                               </div>\
                           </div>';
                    });
                }
                else {

                    $.each(arr_toload, function (index, items) {
                        st += '<div class="searchResultCard d-flex align-items-center">\
                        <div class="mediaBlk rounded-circle"><img src="'+ img + '/search-img-1.png" alt="" class="rounded-circle"></div>\
                            <div class="d-flex justify-content-between flex-1">\
                                    <div class="searchCol">\
                                        <label class="name">'+ items.location + '</label>\
                                        <div class="location">'+ items.region_city + '</div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>'+ items.current_qtr + '</label>\
                                        <div>'+ items.saleable_rate_psf + '</div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>YoY Change (%)</label>\
                                        <div class="d-flex align-items-center">'+ items.cagr_last_1yr_pct + '<img src="' + img + '/polygon-up.svg" alt="" class="ml-2"></div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>CAGR (3Y)</label>\
                                        <div class="d-flex align-items-center">'+ items.cagr_last_3yr_pct + '<img src="' + img + '/polygon-up.svg" alt="" class="ml-2"></div>\
                                    </div>\
                                    <div class="searchCol">\
                                            <label>CAGR (5Y)</label>\
                                            <div>'+ items.cagr_last_5yr_pct + '<img src="' + img + '/polygon-up.svg" alt="" class="ml-2"></div>\
                                    </div>\
                               </div>\
                               <div class="d-flex align-items-center justify-content-end moreCol">\
                                  <a href="javascript:void(0)" onClick="ProjectBylocation('+ items.locationid + ')">View<br>Projects</a>\
                               </div>\
                               <div class="d-flex align-items-center justify-content-end moreCol">\
                                <a href="javascript:void(0)" onClick="LocationTrendsRoute('+ items.locationid + ')">View<br>Trends</a>\
                               </div>\
                           </div>';
                    });
                   
                }
                var paginateText = 'Showing <b>' + arr_toload.length + '</b> locations out of <b>' + TotalData.length + '</b>';
                $('#LocationPaginationText').empty();
                $('#LocationPaginationText').append(paginateText);
                $("#LocationList").append(st);
            }

        },
        sortingDecider: function (sortby, orderby) {

            //SortBy
            if (sortby == "name") {
                var Text = LocationListModule.orderbyDecider("#LocationNameSortIcon", orderby);
               
                $('#LocationnameSortID').addClass('sortBy');


                //Remove Red From Text
                $('#LocationCurrRateSortID').removeClass('sortBy');
                $('#LocationyoySortID').removeClass('sortBy');
                $('#LocationCAGR3YSortID').removeClass('sortBy');
                $('#LocationCAGR5YSortID').removeClass('sortBy');

                //Remove Icon
                $('#LocationCurRateSortIcon').removeClass();
                $('#LocationYoySortIcon').removeClass();
                $('#Locationcagr3ySortIcon').removeClass();
                $('#Locationcagr5ySortIcon').removeClass();





            }
            else if (sortby == "current_rate") {

                var Text = LocationListModule.orderbyDecider("#LocationCurRateSortIcon", orderby);
               
                $('#LocationCurrRateSortID').addClass('sortBy');

                $('#LocationnameSortID').removeClass('sortBy');
                $('#LocationyoySortID').removeClass('sortBy');
                $('#LocationCAGR3YSortID').removeClass('sortBy');
                $('#LocationCAGR5YSortID').removeClass('sortBy');

                //Remove Icon
                $('#LocationNameSortIcon').removeClass();
                $('#LocationYoySortIcon').removeClass();
                $('#Locationcagr3ySortIcon').removeClass();
                $('#Locationcagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_1yr") {

                var Text = LocationListModule.orderbyDecider("#LocationYoySortIcon", orderby);
               
                $('#LocationyoySortID').addClass('sortBy');

                //Remove Red from Text
                $('#LocationnameSortID').removeClass('sortBy');
                $('#LocationCurrRateSortID').removeClass('sortBy');
                $('#LocationCAGR3YSortID').removeClass('sortBy');
                $('#LocationCAGR5YSortID').removeClass('sortBy');

                //Remove Icon from Text
                $('#LocationNameSortIcon').removeClass();
                $('#LocationCurRateSortIcon').removeClass();
                $('#Locationcagr3ySortIcon').removeClass();
                $('#Locationcagr5ySortIcon').removeClass();

            }
            else if (sortby == "cagr_last_3yr") {

                var Text = LocationListModule.orderbyDecider("#Locationcagr3ySortIcon", orderby);
              
                $('#LocationCAGR3YSortID').addClass('sortBy');

                $('#LocationnameSortID').removeClass('sortBy');
                $('#LocationCurrRateSortID').removeClass('sortBy');
                $('#LocationyoySortID').removeClass('sortBy');
                $('#LocationCAGR5YSortID').removeClass('sortBy');


                //Remove Icon from Text
                $('#LocationNameSortIcon').removeClass();
                $('#LocationCurRateSortIcon').removeClass();
                $('#LocationYoySortIcon').removeClass();
                $('#Locationcagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_5yr") {

                var Text = LocationListModule.orderbyDecider("#Locationcagr5ySortIcon", orderby);
              
                $('#LocationCAGR5YSortID').addClass('sortBy');

                $('#LocationnameSortID').removeClass('sortBy');
                $('#LocationCurrRateSortID').removeClass('sortBy');
                $('#LocationyoySortID').removeClass('sortBy');
                $('#LocationCAGR3YSortID').removeClass('sortBy');


                //Remove Icon from Text
                $('#LocationNameSortIcon').removeClass();
                $('#LocationCurRateSortIcon').removeClass();
                $('#LocationYoySortIcon').removeClass();
                $('#Locationcagr3ySortIcon').removeClass();
            }



        },
        orderbyDecider: function (IconID, orderby) {

            //OrderBy
            if (orderby == "desc") {
                $(IconID).addClass("desc");


            }
            else {
                $(IconID).addClass("asc");

            }


        },
        LocationPayload:function (lookup, QueryStringarr,sortBy, OrderBy) {
            var jsonstr = {};
            var Category;
            if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
                Category = "AllLocations";
                jsonstr = {
                    "sort_by": sortBy,
                    "order_by": OrderBy
                };

            }
            else if (QueryStringarr[3] == 0 && QueryStringarr[4] != 0 && QueryStringarr[5] == 0) {
                Category = "LocationinLocation";
                jsonstr = {
                    "location_id": "" + QueryStringarr[4] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }

            else if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] != 0) {
                Category = "LocationsinCity";
                jsonstr = {
                    "city_id": "" + QueryStringarr[5] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }
            else {
                Category = "AllLocations";
                jsonstr = {
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }




            APIPayload = {
                "lookup": "" + lookup + "",
                "json_str": JSON.stringify(jsonstr)
            };

            return Results = {
                "Category": "" + Category + "",
                "payload": APIPayload,
            }

        },
        Viewmore: function () {
            listindex++;
            $("#LocationList").empty();
            LocationListModule.ListLoad(TotalData);
        }
    }
}();

function LocationViewmoreListClick() {
    
    LocationListModule.Viewmore();
}

function LocationNameSortclick(event) {

    $('#overlay').fadeIn();
    if ($(LocationNameSortIcon).hasClass('asc') || $(LocationNameSortIcon).hasClass('desc')) {

        if ($(LocationNameSortIcon).hasClass('asc')) {
            LocationListModule.init("name", "desc");
            $('#LocationNameSortIcon').removeClass();
            $('#LocationNameSortIcon').addClass("desc");

        }
        else {
            LocationListModule.init("name", "asc");
            $('#LocationNameSortIcon').removeClass();
            $('#LocationNameSortIcon').addClass("asc");
        }
    }
    else {

        LocationListModule.init("name", "asc");
    }
    $('#overlay').fadeOut();
}
function LocationCurRateSortclick(event) {
    $('#overlay').fadeIn();
    if ($(LocationCurRateSortIcon).hasClass('asc') || $(LocationCurRateSortIcon).hasClass('desc')) {

        if ($(LocationCurRateSortIcon).hasClass('asc')) {
            LocationListModule.init("current_rate", "desc");
            $('#LocationCurRateSortIcon').removeClass();
            $('#LocationCurRateSortIcon').addClass("desc");

        }
        else {
            LocationListModule.init("current_rate", "asc");
            $('#LocationCurRateSortIcon').removeClass();
            $('#LocationCurRateSortIcon').addClass("asc");
        }
    }
    else {

        LocationListModule.init("current_rate", "desc");
    }
    $('#overlay').fadeOut();
}
function LocationYoySortclick(event) {

    $('#overlay').fadeIn();
    if ($(LocationYoySortIcon).hasClass('asc') || $(LocationYoySortIcon).hasClass('desc')) {

        if ($(LocationYoySortIcon).hasClass('asc')) {
            LocationListModule.init("cagr_last_1yr", "desc");
            $('#LocationYoySortIcon').removeClass();
            $('#LocationYoySortIcon').addClass("desc");

        }
        else {
            LocationListModule.init("cagr_last_1yr", "asc");
            $('#LocationYoySortIcon').removeClass();
            $('#LocationYoySortIcon').addClass("asc");
        }
    }
    else {

        LocationListModule.init("cagr_last_1yr", "desc");
    }
    $('#overlay').fadeOut();


}
function Locationcagr3ySortclick(event) {
    $('#overlay').fadeIn();
    if ($(Locationcagr3ySortIcon).hasClass('asc') || $(Locationcagr3ySortIcon).hasClass('desc')) {

        if ($(Locationcagr3ySortIcon).hasClass('asc')) {
            LocationListModule.init("cagr_last_3yr", "desc");
            $('#Locationcagr3ySortIcon').removeClass();
            $('#Locationcagr3ySortIcon').addClass("desc");

        }
        else {
            LocationListModule.init("cagr_last_3yr", "asc");
            $('#Locationcagr3ySortIcon').removeClass();
            $('#Locationcagr3ySortIcon').addClass("asc");
        }
    }
    else {

        LocationListModule.init("cagr_last_3yr", "desc");
    }
    $('#overlay').fadeOut();



}
function Locationcagr5ySortclick(event) {

    $('#overlay').fadeIn();
    if ($(Locationcagr5ySortIcon).hasClass('asc') || $(Locationcagr5ySortIcon).hasClass('desc')) {
        if ($(Locationcagr5ySortIcon).hasClass('asc')) {
            LocationListModule.init("cagr_last_5yr", "desc");
            $('#Locationcagr5ySortIcon').removeClass();
            $('#Locationcagr5ySortIcon').addClass("desc");

        }
        else {
            LocationListModule.init("cagr_last_5yr", "asc");
            $('#Locationcagr5ySortIcon').removeClass();
            $('#Locationcagr5ySortIcon').addClass("asc");
        }
    }
    else {

        LocationListModule.init("cagr_last_5yr", "desc");
    }
    $('#overlay').fadeOut();
}


//function LocationNamesortIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        LocationListModule.init("name", "desc");
//        $('#LocationNameSortIcon').removeClass();
//        $('#LocationNameSortIcon').addClass("desc");
        
//    }
//    else {
//        LocationListModule.init("name", "asc");
//        $('#LocationNameSortIcon').removeClass();
//        $('#LocationNameSortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function LocationCurRateIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        LocationListModule.init("current_rate", "desc");
//        $('#LocationCurRateSortIcon').removeClass();
//        $('#LocationCurRateSortIcon').addClass("desc");

//    }
//    else {
//        LocationListModule.init("current_rate", "asc");
//        $('#LocationCurRateSortIcon').removeClass();
//        $('#LocationCurRateSortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function LocationyoyIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        LocationListModule.init("cagr_last_1yr", "desc");
//        $('#LocationYoySortIcon').removeClass();
//        $('#LocationYoySortIcon').addClass("desc");
//    }
//    else {
//        LocationListModule.init("cagr_last_1yr", "asc");
//        $('#LocationYoySortIcon').removeClass();
//        $('#LocationYoySortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function Locationcagr3yIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        LocationListModule.init("cagr_last_3yr", "desc");
//        $('#Locationcagr3ySortIcon').removeClass();
//        $('#Locationcagr3ySortIcon').addClass("desc");

//    }
//    else {
//        LocationListModule.init("cagr_last_3yr", "asc");
//        $('#Locationcagr3ySortIcon').removeClass();
//        $('#Locationcagr3ySortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function Locationcagr5yIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        LocationListModule.init("cagr_last_5yr", "desc");
//        $('#Locationcagr5ySortIcon').removeClass();
//        $('#Locationcagr5ySortIcon').addClass("desc");

//    }
//    else {
//        LocationListModule.init("cagr_last_5yr", "asc");
//        $('#Locationcagr5ySortIcon').removeClass();
//        $('#Locationcagr5ySortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}

function ProjectBylocation(id) {
    var resultroutingurl = utility.FrontEndAPIURL('list/project/0/' + id + '/0');
    window.location.href = resultroutingurl;
}

function LocationTrendsRoute(id) {
    var resultroutingurl = utility.FrontEndAPIURL('trend/location/' + id + '/LocationText');
    window.location.href = resultroutingurl;
}

$("input[name=locations-search]").click(function () {
    if (this.value == "pincodes") {
        var resultroutingurl = utility.FrontEndAPIURL('list/pincode/0/0/' + keeplocationListData[0].region_or_city_id_pi_input);
        window.location.href = resultroutingurl;
    }
    else if (this.value == "projects") {
        var resultroutingurl = utility.FrontEndAPIURL('list/project/0/0/' + keeplocationListData[0].region_or_city_id_pi_input);
        window.location.href = resultroutingurl;
    }
    else {

    }
});





