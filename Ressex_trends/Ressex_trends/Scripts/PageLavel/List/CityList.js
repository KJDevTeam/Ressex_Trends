var listindex = 1;
var keepCityListData = [];
var CityListModule = function () {
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
            CityListModule.sortingDecider(sortBy, OrderBy);
            var result = CityListModule.CityPayload("City", QueryStringARR,sortBy, OrderBy);

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, result.payload, "Post", false);

            TotalData = Data;
            console.log(Data);
            if (Data.status == 'OK') {



                keepCityListData = Data.data;

                //Project Heading Decider

                if (result.Category == "AllCities") {
                    $('#CitylistHeading').text(keepCityListData[0].cities_in_india);
                }
                else if (result.Category == "CityinCity") {
                    $('#CitylistHeading').text(keepCityListData[0].city_search);
                }
                else {
                    $('#CitylistHeading').text(keepPincodeListData[0].cities_in_india);
                }


                CityListModule.ListLoad(Data.data);
            }
            else {
                $('#CitySortandFilter').remove();
                $('#CityviewmoreList').hide();
                $("#CityList").empty();
                $("#CityList").append('<div class="d-flex align-items-center justify-content-center" style="height: 250px;"><h5>No Data found</h5></div>');


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
                    $('#CityviewmoreList').hide();
                }
                var img = utility.FrontEndAPIURL("images");
                var st = ''
                $("#CityList").empty();
                var userdetails = common.CheckIsPaid();
                UserType = userdetails.UserType;
                if (UserType != "Paid") {
                    $.each(arr_toload, function (index, items) {

                        st += '<div class="searchResultCard d-flex align-items-center">\
                        <div class="mediaBlk rounded-circle mr-5"><img src="'+ img + '/search-img-1.png" alt="" class="rounded-circle"></div>\
                            <div class="d-flex justify-content-between flex-1">\
                                    <div class="searchCol">\
                                        <label class="name">'+ items.city_search + '</label>\
                                        <div class="location">'+ items.state + '</div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>'+ items.current_qtr + '</label>\
                                        <div>Rs xxxx %<i class="fa fa-lock text-danger ml-2"></i></div>\
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
                                  <a href="javascript:void(0)" onClick="ProjectByCity('+ items.region_or_city_id + ')">View<br>Projects</a>\
                               </div>\
                               <div class="d-flex align-items-center justify-content-end ml-5 pl-5">\
                                  <a href="javascript:void(0)" onClick="CityTrendsRoute('+ items.region_or_city_id + ')">View<br>Trends</a>\
                               </div>\
                           </div>';
                    });
                }
                else {
                    $.each(arr_toload, function (index, items) {

                        st += '<div class="searchResultCard d-flex align-items-center">\
                        <div class="mediaBlk rounded-circle mr-5"><img src="'+ img + '/search-img-1.png" alt="" class="rounded-circle"></div>\
                            <div class="d-flex justify-content-between flex-1">\
                                    <div class="searchCol">\
                                        <label class="name">'+ items.city_search + '</label>\
                                        <div class="location">'+ items.state + '</div>\
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
                               <div class="d-flex align-items-center justify-content-end ml-5 pl-5">\
                                  <a href="javascript:void(0)" onClick="ProjectByCity('+ items.region_or_city_id + ')">View<br>Projects</a>\
                               </div>\
                               <div class="d-flex align-items-center justify-content-end ml-5 pl-5">\
                                  <a href="javascript:void(0)" onClick="CityTrendsRoute('+ items.region_or_city_id + ')">View<br>Trends</a>\
                               </div>\
                           </div>';
                    });
                }
                var paginateText = 'Showing <b>' + arr_toload.length + '</b> cities out of <b>' + keepCityListData.length + '</b>';
                $('#CityPaginationText').empty();
                $('#CityPaginationText').append(paginateText);
                $("#CityList").append(st);
            }

        },
        sortingDecider: function (sortby, orderby) {

            //SortBy
            if (sortby == "name") {
                var Text = CityListModule.orderbyDecider("#CityNameSortIcon", orderby);
                $('#CitynameSortID').addClass('sortBy');


                //Remove Red From Text
                $('#CityCurrRateSortID').removeClass('sortBy');
                $('#CityyoySortID').removeClass('sortBy');
                $('#CityCAGR3YSortID').removeClass('sortBy');
                $('#CityCAGR5YSortID').removeClass('sortBy');

                //Remove Icon
                $('#CityCurRateSortIcon').removeClass();
                $('#CityYoySortIcon').removeClass();
                $('#Citycagr3ySortIcon').removeClass();
                $('#Citycagr5ySortIcon').removeClass();





            }
            else if (sortby == "current_rate") {

                var Text = CityListModule.orderbyDecider("#CityCurRateSortIcon", orderby);
                $('#CityCurrRateSortID').addClass('sortBy');

                $('#CitynameSortID').removeClass('sortBy');
                $('#CityyoySortID').removeClass('sortBy');
                $('#CityCAGR3YSortID').removeClass('sortBy');
                $('#CityCAGR5YSortID').removeClass('sortBy');

                //Remove Icon
                $('#CityNameSortIcon').removeClass();
                $('#CityYoySortIcon').removeClass();
                $('#Citycagr3ySortIcon').removeClass();
                $('#Citycagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_1yr") {

                var Text = CityListModule.orderbyDecider("#CityYoySortIcon", orderby);
                $('#CityyoySortID').addClass('sortBy');

                //Remove Red from Text
                $('#CitynameSortID').removeClass('sortBy');
                $('#CityCurrRateSortID').removeClass('sortBy');
                $('#CityCAGR3YSortID').removeClass('sortBy');
                $('#CityCAGR5YSortID').removeClass('sortBy');

                //Remove Icon from Text
                $('#CityNameSortIcon').removeClass();
                $('#CityCurRateSortIcon').removeClass();
                $('#Citycagr3ySortIcon').removeClass();
                $('#Citycagr5ySortIcon').removeClass();

            }
            else if (sortby == "cagr_last_3yr") {

                var Text = CityListModule.orderbyDecider("#Citycagr3ySortIcon", orderby);
                
                $('#CityCAGR3YSortID').addClass('sortBy');

                $('#CitynameSortID').removeClass('sortBy');
                $('#CityCurrRateSortID').removeClass('sortBy');
                $('#CityyoySortID').removeClass('sortBy');
                $('#CityCAGR5YSortID').removeClass('sortBy');


                //Remove Icon from Text
                $('#CityNameSortIcon').removeClass();
                $('#CityCurRateSortIcon').removeClass();
                $('#CityYoySortIcon').removeClass();
                $('#Citycagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_5yr") {

                var Text = CityListModule.orderbyDecider("#Citycagr5ySortIcon", orderby);
                
                $('#CityCAGR5YSortID').addClass('sortBy');

                $('#CitynameSortID').removeClass('sortBy');
                $('#CityCurrRateSortID').removeClass('sortBy');
                $('#CityyoySortID').removeClass('sortBy');
                $('#CityCAGR3YSortID').removeClass('sortBy');


                //Remove Icon from Text
                $('#CityNameSortIcon').removeClass();
                $('#CityCurRateSortIcon').removeClass();
                $('#CityYoySortIcon').removeClass();
                $('#Citycagr3ySortIcon').removeClass();
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
        CityPayload: function (lookup, QueryStringarr, sortBy, OrderBy) {
            var jsonstr = {};
            var Category;
            if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
                Category = "AllCities";
                jsonstr = {
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }

            }
            else if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] != 0) {
                Category = "CityinCity";
                jsonstr = {
                    "city_id": "" + QueryStringarr[5] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }           
            else {
                Category = "AllCities";
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

        }
    }
}();

function CityViewmoreListClick() {
    listindex++;
    $("#CityList").empty();
    CityListModule.ListLoad(keepCityListData);

}

function CityNameSortclick(event) {

    $('#overlay').fadeIn();
    if ($(CityNameSortIcon).hasClass('asc') || $(CityNameSortIcon).hasClass('desc')) {

        if ($(CityNameSortIcon).hasClass('asc')) {
            CityListModule.init("name", "desc");
            $('#CityNameSortIcon').removeClass();
            $('#CityNameSortIcon').addClass("desc");

        }
        else {
            CityListModule.init("name", "asc");
            $('#CityNameSortIcon').removeClass();
            $('#CityNameSortIcon').addClass("asc");
        }
    }
    else {

        CityListModule.init("name", "asc");
    }
    $('#overlay').fadeOut();
}
function CityCurRateSortclick(event) {
    $('#overlay').fadeIn();
    if ($(CityCurRateSortIcon).hasClass('asc') || $(CityCurRateSortIcon).hasClass('desc')) {

        if ($(CityCurRateSortIcon).hasClass('asc')) {
            CityListModule.init("current_rate", "desc");
            $('#CityCurRateSortIcon').removeClass();
            $('#CityCurRateSortIcon').addClass("desc");

        }
        else {
            CityListModule.init("current_rate", "asc");
            $('#CityCurRateSortIcon').removeClass();
            $('#CityCurRateSortIcon').addClass("asc");
        }
    }
    else {

        CityListModule.init("current_rate", "desc");
    }
    $('#overlay').fadeOut();
}
function CityYoySortclick(event) {

    $('#overlay').fadeIn();
    if ($(CityYoySortIcon).hasClass('asc') || $(CityYoySortIcon).hasClass('desc')) {

        if ($(CityYoySortIcon).hasClass('asc')) {
            CityListModule.init("cagr_last_1yr", "desc");
            $('#CityYoySortIcon').removeClass();
            $('#CityYoySortIcon').addClass("desc");

        }
        else {
            CityListModule.init("cagr_last_1yr", "asc");
            $('#CityYoySortIcon').removeClass();
            $('#CityYoySortIcon').addClass("asc");
        }
    }
    else {

        CityListModule.init("cagr_last_1yr", "desc");
    }
    $('#overlay').fadeOut();


}
function Citycagr3ySortclick(event) {
    $('#overlay').fadeIn();
    if ($(Citycagr3ySortIcon).hasClass('asc') || $(Citycagr3ySortIcon).hasClass('desc')) {

        if ($(Citycagr3ySortIcon).hasClass('asc')) {
            CityListModule.init("cagr_last_3yr", "desc");
            $('#Citycagr3ySortIcon').removeClass();
            $('#Citycagr3ySortIcon').addClass("desc");

        }
        else {
            CityListModule.init("cagr_last_3yr", "asc");
            $('#Citycagr3ySortIcon').removeClass();
            $('#Citycagr3ySortIcon').addClass("asc");
        }
    }
    else {

        CityListModule.init("cagr_last_3yr", "desc");
    }
    $('#overlay').fadeOut();



}
function Citycagr5ySortclick(event) {

    $('#overlay').fadeIn();
    if ($(Citycagr5ySortIcon).hasClass('asc') || $(Citycagr5ySortIcon).hasClass('desc')) {
        if ($(Citycagr5ySortIcon).hasClass('asc')) {
            CityListModule.init("cagr_last_5yr", "desc");
            $('#Citycagr5ySortIcon').removeClass();
            $('#Citycagr5ySortIcon').addClass("desc");

        }
        else {
            CityListModule.init("cagr_last_5yr", "asc");
            $('#Citycagr5ySortIcon').removeClass();
            $('#Citycagr5ySortIcon').addClass("asc");
        }
    }
    else {

        CityListModule.init("cagr_last_5yr", "desc");
    }
    $('#overlay').fadeOut();
}

//function CityNamesortIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        CityListModule.init("name", "desc");
//        $('#CityNameSortIcon').removeClass();
//        $('#CityNameSortIcon').addClass("desc");
//        //$('#').removeClass();
//        //$('#CurRateSortIcon').removeClass();
//        //$('#YoySortIcon').removeClass();
//        //$('#cagr3ySortIcon').removeClass();
//    }
//    else {
//        CityListModule.init("name", "asc");
//        $('#CityNameSortIcon').removeClass();
//        $('#CityNameSortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function CityCurRateIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        CityListModule.init("current_rate", "desc");
//        $('#CityCurRateSortIcon').removeClass();
//        $('#CityCurRateSortIcon').addClass("desc");

//    }
//    else {
//        CityListModule.init("current_rate", "asc");
//        $('#CityCurRateSortIcon').removeClass();
//        $('#CityCurRateSortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function CityyoyIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        CityListModule.init("cagr_last_1yr", "desc");
//        $('#CityYoySortIcon').removeClass();
//        $('#CityYoySortIcon').addClass("desc");
//    }
//    else {
//        CityListModule.init("cagr_last_1yr", "asc");
//        $('#CityYoySortIcon').removeClass();
//        $('#CityYoySortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function Citycagr3yIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        CityListModule.init("cagr_last_3yr", "desc");
//        $('#Citycagr3ySortIcon').removeClass();
//        $('#Citycagr3ySortIcon').addClass("desc");

//    }
//    else {
//        CityListModule.init("cagr_last_3yr", "asc");
//        $('#Citycagr3ySortIcon').removeClass();
//        $('#Citycagr3ySortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function Citycagr5yIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        CityListModule.init("cagr_last_5yr", "desc");
//        $('#Citycagr5ySortIcon').removeClass();
//        $('#Citycagr5ySortIcon').addClass("desc");

//    }
//    else {
//        CityListModule.init("cagr_last_5yr", "asc");
//        $('#Citycagr5ySortIcon').removeClass();
//        $('#Citycagr5ySortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}

function ProjectByCity(id) {
    var resultroutingurl = utility.FrontEndAPIURL('list/project/0/0/' + id);
    window.location.href = resultroutingurl;
}

function CityTrendsRoute(id) {
    var resultroutingurl = utility.FrontEndAPIURL('trend/city/' + id + '/CityText');
    window.location.href = resultroutingurl;
}





