var listindex = 1;
var keeplocationListData = [];
var LocationListModule = function () {
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
            LocationListModule.sortingDecider(sortBy, OrderBy);
            var result = LocationListModule.LocationPayload("location", QueryStringARR,sortBy, OrderBy);

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, result.payload, "Post", false);

            TotalData = Data;
            console.log(Data);

            if (Data.status == 'OK') {


                keepLocationListData = Data.data;

                //Project Heading Decider

                if (result.Category == "AllLocations") {
                    $('#LocationlistHeading').text(keepLocationListData[0].locations_in_india);
                }
                else if (result.Category == "LocationinLocation") {
                    $('#LocationlistHeading').text(keepLocationListData[0].location_input);
                }
                else if (result.Category == "LocationsinCity") {
                    $('#LocationlistHeading').text(keepLocationListData[0].locations_in_city);
                }
                else {
                    $('#LocationlistHeading').text(keepLocationListData[0].locations_in_india);
                }


                LocationListModule.ListLoad(Data.data);
            }
            else {
                $('#LocationSortandFilter').remove();
                $('#LocationviewmoreList').hide();
                $("#LocationList").empty();
                $("#LocationList").append('<div class="d-flex align-items-center justify-content-center" style="height: 250px;"><h5>No Data found</h5></div>');


            }
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
                $.each(arr_toload, function (index, items) {

                    st += '<div class="card my-3">\
                        <div class="row no-gutters">\
                            <div class="col-1">\
                                <img class="card-img rounded-circle" src="'+ img + '/Bangalore.png">\
                    </div>\
                                <div class="col-2">\
                                    <div class="card-body">\
                                        <h5 class="card-title">'+ items.location + '</h5>\
                                        <p class="card-text">'+ items.region_city + '</p>\
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
                                        <button class="btn text-danger" onClick="ProjectBylocation('+ items.locationid +')">View Projects</button>\
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
                var paginateText = 'Showing <b>' + arr_toload.length + '</b> locations out of <b>' + keepLocationListData.length + '</b>';
                $('#LocationPaginationText').empty();
                $('#LocationPaginationText').append(paginateText);
                $("#LocationList").append(st);
            }

        },
        sortingDecider: function (sortby, orderby) {

            //SortBy
            if (sortby == "name") {
                var Text = LocationListModule.orderbyDecider("#LocationNameSortIcon", orderby);
                $('#LocationnameSortID').text(Text);
                $('#LocationnameSortID').addClass('text-danger');


                //Remove Red From Text
                $('#LocationCurrRateSortID').removeClass('text-danger');
                $('#LocationyoySortID').removeClass('text-danger');
                $('#LocationCAGR3YSortID').removeClass('text-danger');
                $('#LocationCAGR5YSortID').removeClass('text-danger');

                //Remove Icon
                $('#LocationCurRateSortIcon').removeClass();
                $('#LocationYoySortIcon').removeClass();
                $('#Locationcagr3ySortIcon').removeClass();
                $('#Locationcagr5ySortIcon').removeClass();





            }
            else if (sortby == "current_rate") {

                var Text = LocationListModule.orderbyDecider("#LocationCurRateSortIcon", orderby);
                $('#LocationCurrRateSortID').text(Text);
                $('#LocationCurrRateSortID').addClass('text-danger');

                $('#LocationnameSortID').removeClass('text-danger');
                $('#LocationyoySortID').removeClass('text-danger');
                $('#LocationCAGR3YSortID').removeClass('text-danger');
                $('#LocationCAGR5YSortID').removeClass('text-danger');

                //Remove Icon
                $('#LocationNameSortIcon').removeClass();
                $('#LocationYoySortIcon').removeClass();
                $('#Locationcagr3ySortIcon').removeClass();
                $('#Locationcagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_1yr") {

                var Text = LocationListModule.orderbyDecider("#LocationYoySortIcon", orderby);
                $('#LocationYoySortIcon').text(Text);
                $('#LocationyoySortID').addClass('text-danger');

                //Remove Red from Text
                $('#LocationnameSortID').removeClass('text-danger');
                $('#LocationCurrRateSortID').removeClass('text-danger');
                $('#LocationCAGR3YSortID').removeClass('text-danger');
                $('#LocationCAGR5YSortID').removeClass('text-danger');

                //Remove Icon from Text
                $('#LocationNameSortIcon').removeClass();
                $('#LocationCurRateSortIcon').removeClass();
                $('#Locationcagr3ySortIcon').removeClass();
                $('#Locationcagr5ySortIcon').removeClass();

            }
            else if (sortby == "cagr_last_3yr") {

                var Text = LocationListModule.orderbyDecider("#Locationcagr3ySortIcon", orderby);
                $('#LocationCAGR3YSortID').text(Text);
                $('#LocationCAGR3YSortID').addClass('text-danger');

                $('#LocationnameSortID').removeClass('text-danger');
                $('#LocationCurrRateSortID').removeClass('text-danger');
                $('#LocationyoySortID').removeClass('text-danger');
                $('#LocationCAGR5YSortID').removeClass('text-danger');


                //Remove Icon from Text
                $('#LocationNameSortIcon').removeClass();
                $('#LocationCurRateSortIcon').removeClass();
                $('#LocationYoySortIcon').removeClass();
                $('#Locationcagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_5yr") {

                var Text = LocationListModule.orderbyDecider("#Locationcagr5ySortIcon", orderby);
                $('#LocationCAGR5YSortID').text(Text);
                $('#LocationCAGR5YSortID').addClass('text-danger');

                $('#LocationnameSortID').removeClass('text-danger');
                $('#LocationCurrRateSortID').removeClass('text-danger');
                $('#LocationyoySortID').removeClass('text-danger');
                $('#LocationCAGR3YSortID').removeClass('text-danger');


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
                $(IconID).addClass("fa fa-arrow-down text-danger");


            }
            else {
                $(IconID).addClass("fa fa-arrow-up text-danger");

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

        }
    }
}();

function LocationViewmoreListClick() {
    listindex++;
    $("#LocationList").empty();
    LocationListModule.ListLoad(keepLocationListData);

}

function LocationNameSortclick() {
    $('#overlay').fadeIn();
    LocationListModule.init("name", "asc");
    $('#overlay').fadeOut();
}
function LocationCurRateSortclick() {
    $('#overlay').fadeIn();
    LocationListModule.init("current_rate", "asc");
    $('#overlay').fadeOut();
}
function LocationYoySortclick() {
    $('#overlay').fadeIn();
    LocationListModule.init("cagr_last_1yr", "asc");
    $('#overlay').fadeOut();
}
function Locationcagr3ySortclick() {
    $('#overlay').fadeIn();
    LocationListModule.init("cagr_last_3yr", "asc");
    $('#overlay').fadeOut();
}
function Locationcagr5ySortclick() {
    $('#overlay').fadeIn();
    LocationListModule.init("cagr_last_5yr", "asc");
    $('#overlay').fadeOut();
}

function LocationNamesortIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        LocationListModule.init("name", "desc");
        $('#LocationNameSortIcon').removeClass();
        $('#LocationNameSortIcon').addClass("fa fa-arrow-down text-danger");
        //$('#').removeClass();
        //$('#CurRateSortIcon').removeClass();
        //$('#YoySortIcon').removeClass();
        //$('#cagr3ySortIcon').removeClass();
    }
    else {
        LocationListModule.init("name", "asc");
        $('#LocationNameSortIcon').removeClass();
        $('#LocationNameSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function LocationCurRateIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        LocationListModule.init("current_rate", "desc");
        $('#LocationCurRateSortIcon').removeClass();
        $('#LocationCurRateSortIcon').addClass("fa fa-arrow-down text-danger");

    }
    else {
        LocationListModule.init("current_rate", "asc");
        $('#LocationCurRateSortIcon').removeClass();
        $('#LocationCurRateSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function LocationyoyIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        LocationListModule.init("cagr_last_1yr", "desc");
        $('#LocationYoySortIcon').removeClass();
        $('#LocationYoySortIcon').addClass("fa fa-arrow-down text-danger");
    }
    else {
        LocationListModule.init("cagr_last_1yr", "asc");
        $('#LocationYoySortIcon').removeClass();
        $('#LocationYoySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function Locationcagr3yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        LocationListModule.init("cagr_last_3yr", "desc");
        $('#Locationcagr3ySortIcon').removeClass();
        $('#Locationcagr3ySortIcon').addClass("fa fa-arrow-down text-danger");

    }
    else {
        LocationListModule.init("cagr_last_3yr", "asc");
        $('#Locationcagr3ySortIcon').removeClass();
        $('#Locationcagr3ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function Locationcagr5yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        LocationListModule.init("cagr_last_5yr", "desc");
        $('#Locationcagr5ySortIcon').removeClass();
        $('#Locationcagr5ySortIcon').addClass("fa fa-arrow-down text-danger");

    }
    else {
        LocationListModule.init("cagr_last_5yr", "asc");
        $('#Locationcagr5ySortIcon').removeClass();
        $('#Locationcagr5ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}

function ProjectBylocation(id) {
    var resultroutingurl = utility.FrontEndAPIURL('list/project/0/' + id + '/0');
    window.location.href = resultroutingurl;
}





