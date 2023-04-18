var listindex = 1;
var keepCityListData = [];
var CityListModule = function () {
    return {
        init: function (sortBy, OrderBy) {

            //Local Storage Clear
            localStorage.clear();

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
            var Data = utility.ajaxselect(APIkey, result, "Post", false);

            TotalData = Data;
            console.log(Data);
            keepCityListData = Data.data;

            //Project Heading Decider

            if (QueryStringARR[5] == 0) {
                $('#CitylistHeading').text(keepCityListData[0].cities_in_india);
            }
            else {
                $('#CitylistHeading').text(keepCityListData[0].city_search);
            }


            CityListModule.ListLoad(Data.data);



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
                $.each(arr_toload, function (index, items) {

                    st += '<div class="card my-3">\
                        <div class="row no-gutters">\
                            <div class="col-1">\
                                <img class="card-img rounded-circle" src="'+ img + '/Bangalore.png">\
                    </div>\
                                <div class="col-2">\
                                    <div class="card-body">\
                                        <h5 class="card-title">'+ items.city_search + '</h5>\
                                        <p class="card-text">'+ items.state + '</p>\
                                    </div>\
                                </div>\
                                <div class="col-2">\
                                    <div class="card-body">\
                                        <span class="card-title">'+ items.current_qtr + '</span>\
                                        <p class="card-text">'+ items.saleable_rate_psf + '</p>\
                                    </div>\
                                </div>\
                                <div class="col-2">\
                                    <div class="card-body">\
                                        <span class="card-title">YoY Change</span>\
                                        <p class="card-text">'+ items.cagr_last_1yr_pct + '</p>\
                                    </div>\
                                </div>\
                                <div class="col-1">\
                                    <div class="card-body">\
                                        <span class="card-title">CAGR 3Y</span>\
                                        <p class="card-text">'+ items.cagr_last_3yr_pct + '</p>\
                                    </div>\
                                </div>\
                                <div class="col-1">\
                                    <div class="card-body">\
                                        <span class="card-title">CAGR 5Y</span>\
                                        <p class="card-text">'+ items.cagr_last_5yr_pct + '</p>\
                                    </div>\
                                </div>\
                                <div class="col-2">\
                                    <div class="card-body">\
                                        <button class="btn text-danger">View Projects</button>\
                                    </div>\
                                </div>\
                                <div class="col-1">\
                                    <div class="card-body">\
                                        <button class="btn text-danger">View trends</button>\
                                    </div>\
                                </div>\
                            </div>\
            </div>';
                    //        st += '<div class="card mb-3">\
                    //        <div class="row">\
                    //            <div class="col-1">\
                    //                <img class="card-img" src="'+ img + '/Bangalore.png" style="height:100px;width:100px">\
                    //        </div>\
                    //                <div class="col-11">\
                    //                    <div class="card-body">\
                    //                        <h5 class="card-title">'+ items.name + '</h5>\
                    //                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\
                    //                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\
                    //                    </div>\
                    //                </div>\
                    //            </div>\
                    //</div >';
                });
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
                $('#CitynameSortID').text(Text);
                $('#CitynameSortID').addClass('text-danger');


                //Remove Red From Text
                $('#CityCurrRateSortID').removeClass('text-danger');
                $('#CityyoySortID').removeClass('text-danger');
                $('#CityCAGR3YSortID').removeClass('text-danger');
                $('#CityCAGR5YSortID').removeClass('text-danger');

                //Remove Icon
                $('#CityCurRateSortIcon').removeClass();
                $('#CityYoySortIcon').removeClass();
                $('#Citycagr3ySortIcon').removeClass();
                $('#Citycagr5ySortIcon').removeClass();





            }
            else if (sortby == "current_rate") {

                var Text = CityListModule.orderbyDecider("#CityCurRateSortIcon", orderby);
                $('#CityCurrRateSortID').text(Text);
                $('#CityCurrRateSortID').addClass('text-danger');

                $('#CitynameSortID').removeClass('text-danger');
                $('#CityyoySortID').removeClass('text-danger');
                $('#CityCAGR3YSortID').removeClass('text-danger');
                $('#CityCAGR5YSortID').removeClass('text-danger');

                //Remove Icon
                $('#CityNameSortIcon').removeClass();
                $('#CityYoySortIcon').removeClass();
                $('#Citycagr3ySortIcon').removeClass();
                $('#Citycagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_1yr") {

                var Text = CityListModule.orderbyDecider("#CityYoySortIcon", orderby);
                $('#CityYoySortIcon').text(Text);
                $('#CityyoySortID').addClass('text-danger');

                //Remove Red from Text
                $('#CitynameSortID').removeClass('text-danger');
                $('#CityCurrRateSortID').removeClass('text-danger');
                $('#CityCAGR3YSortID').removeClass('text-danger');
                $('#CityCAGR5YSortID').removeClass('text-danger');

                //Remove Icon from Text
                $('#CityNameSortIcon').removeClass();
                $('#CityCurRateSortIcon').removeClass();
                $('#Citycagr3ySortIcon').removeClass();
                $('#Citycagr5ySortIcon').removeClass();

            }
            else if (sortby == "cagr_last_3yr") {

                var Text = CityListModule.orderbyDecider("#Citycagr3ySortIcon", orderby);
                $('#CityCAGR3YSortID').text(Text);
                $('#CityCAGR3YSortID').addClass('text-danger');

                $('#CitynameSortID').removeClass('text-danger');
                $('#CityCurrRateSortID').removeClass('text-danger');
                $('#CityyoySortID').removeClass('text-danger');
                $('#CityCAGR5YSortID').removeClass('text-danger');


                //Remove Icon from Text
                $('#CityNameSortIcon').removeClass();
                $('#CityCurRateSortIcon').removeClass();
                $('#CityYoySortIcon').removeClass();
                $('#Citycagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_5yr") {

                var Text = CityListModule.orderbyDecider("#Citycagr5ySortIcon", orderby);
                $('#CityCAGR5YSortID').text(Text);
                $('#CityCAGR5YSortID').addClass('text-danger');

                $('#CitynameSortID').removeClass('text-danger');
                $('#CityCurrRateSortID').removeClass('text-danger');
                $('#CityyoySortID').removeClass('text-danger');
                $('#CityCAGR3YSortID').removeClass('text-danger');


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
                $(IconID).addClass("fa fa-arrow-down text-danger");


            }
            else {
                $(IconID).addClass("fa fa-arrow-up text-danger");

            }


        },
        CityPayload: function (lookup, QueryStringarr, sortBy, OrderBy) {
            var jsonstr = {};
            if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
                jsonstr = {
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }

            }
            else if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] != 0) {
                jsonstr = {
                    "city_id": "" + QueryStringarr[5] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }           
            else {
                jsonstr = {
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }




            return APIPayload = {
                "lookup": "" + lookup + "",
                "json_str": JSON.stringify(jsonstr)
            };

        }
    }
}();

function CityViewmoreListClick() {
    listindex++;
    $("#CityList").empty();
    CityListModule.ListLoad(keepCityListData);

}

function CityNameSortclick() {
    $('#overlay').fadeIn();
    CityListModule.init("name", "asc");
    $('#overlay').fadeOut();
}
function CityCurRateSortclick() {
    $('#overlay').fadeIn();
    CityListModule.init("current_rate", "asc");
    $('#overlay').fadeOut();
}
function CityYoySortclick() {
    $('#overlay').fadeIn();
    CityListModule.init("cagr_last_1yr", "asc");
    $('#overlay').fadeOut();
}
function Citycagr3ySortclick() {
    $('#overlay').fadeIn();
    CityListModule.init("cagr_last_3yr", "asc");
    $('#overlay').fadeOut();
}
function Citycagr5ySortclick() {
    $('#overlay').fadeIn();
    CityListModule.init("cagr_last_5yr", "asc");
    $('#overlay').fadeOut();
}

function CityNamesortIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        CityListModule.init("name", "desc");
        $('#CityNameSortIcon').removeClass();
        $('#CityNameSortIcon').addClass("fa fa-arrow-down text-danger");
        //$('#').removeClass();
        //$('#CurRateSortIcon').removeClass();
        //$('#YoySortIcon').removeClass();
        //$('#cagr3ySortIcon').removeClass();
    }
    else {
        CityListModule.init("name", "asc");
        $('#CityNameSortIcon').removeClass();
        $('#CityNameSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function CityCurRateIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        CityListModule.init("current_rate", "desc");
        $('#CityCurRateSortIcon').removeClass();
        $('#CityCurRateSortIcon').addClass("fa fa-arrow-down text-danger");

    }
    else {
        CityListModule.init("current_rate", "asc");
        $('#CityCurRateSortIcon').removeClass();
        $('#CityCurRateSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function CityyoyIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        CityListModule.init("cagr_last_1yr", "desc");
        $('#CityYoySortIcon').removeClass();
        $('#CityYoySortIcon').addClass("fa fa-arrow-down text-danger");
    }
    else {
        CityListModule.init("cagr_last_1yr", "asc");
        $('#CityYoySortIcon').removeClass();
        $('#CityYoySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function Citycagr3yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        CityListModule.init("cagr_last_3yr", "desc");
        $('#Citycagr3ySortIcon').removeClass();
        $('#Citycagr3ySortIcon').addClass("fa fa-arrow-down text-danger");

    }
    else {
        CityListModule.init("cagr_last_3yr", "asc");
        $('#Citycagr3ySortIcon').removeClass();
        $('#Citycagr3ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function Citycagr5yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        CityListModule.init("cagr_last_5yr", "desc");
        $('#Citycagr5ySortIcon').removeClass();
        $('#Citycagr5ySortIcon').addClass("fa fa-arrow-down text-danger");

    }
    else {
        CityListModule.init("cagr_last_5yr", "asc");
        $('#Citycagr5ySortIcon').removeClass();
        $('#Citycagr5ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}




