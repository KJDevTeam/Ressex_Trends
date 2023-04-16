var listindex = 1;
var keepListData = [];
var ListModule = function () {
    return {
        init: function (sortBy,OrderBy) {

            var QueryStringARR = common.GetQueryString();
            var result = common.GetTrendsTypePayload(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {

            }
            else {



            }
            common.sortingDecider(sortBy, OrderBy);

            if (result.TrendsType == "pincode") {
                var jsonstr = {
                    "pincode": result.Id,
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }
            else if (result.TrendsType == "location") {
                var jsonstr = {
                    "location_id": result.Id,
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }
            else if (result.TrendsType == "city") {
                var jsonstr = {
                    "city_id": result.Id,
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }




            var Payload = {
                "lookup": "Project",
                "json_str": JSON.stringify(jsonstr)
            }

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, Payload, "Post", false);

            TotalData = Data;
            console.log(Data);
            keepListData = Data.data
            ListModule.ListLoad(Data.data);



        },
        ListLoadnameSort: function () {
            var QueryStringARR = common.GetQueryString();
            var result = common.GetTrendsTypePayload(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {

            }
            else {



            }

            if (result.TrendsType == "pincode") {
                var jsonstr = {
                    "pincode": result.Id,
                    "sort_by": "name",
                    "order_by": "desc"
                }
            }
            else if (result.TrendsType == "location") {
                var jsonstr = {
                    "location_id": result.Id,
                }
            }
            else if (result.TrendsType == "city") {
                var jsonstr = {
                    "city_id": result.Id,
                }
            }




            var Payload = {
                "lookup": "Project",
                "json_str": JSON.stringify(jsonstr),

            }

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, Payload, "Post", false);

            TotalData = Data;
            console.log(Data);
            keepListData = Data.data
            ListModule.ListLoad(Data.data);
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
                    $('#viewmoreList').hide();
                }
                var img = utility.FrontEndAPIURL("images");
                var st = ''
                $("#List").empty();
                $.each(arr_toload, function (index, items) {

                    st += '<div class="card my-3">\
                        <div class="row no-gutters">\
                            <div class="col-1">\
                                <img class="card-img rounded-circle" src="'+ img + '/Bangalore.png">\
                    </div>\
                                <div class="col-2">\
                                    <div class="card-body">\
                                        <h5 class="card-title">'+ items.name + '</h5>\
                                        <p class="card-text">'+ items.region_city+'</p>\
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
                                        <span class="card-title">Project Status</span>\
                                        <p class="card-text">'+ items.project_status +'</p>\
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
                var paginateText = 'Showing ' + arr_toload.length + ' projects out of ' + keepListData.length;
                $('#PaginationText').text(paginateText);
                $("#List").append(st);
            }

        }
    }
}();

function viewmoreListClick() {
    listindex++;
    $("#List").empty();
    ListModule.ListLoad(keepListData);
    
}

function NameSortclick() {
    $('#overlay').fadeIn();
    ListModule.init("name","asc");
    $('#overlay').fadeOut();
}

function CurRateSortclick() {
    $('#overlay').fadeIn();
    ListModule.init("current_rate", "asc");
    $('#overlay').fadeOut();
}
function YoySortclick() {
    $('#overlay').fadeIn();
    ListModule.init("cagr_last_1yr", "asc");
    $('#overlay').fadeOut();
}
function cagr3ySortclick() {
    $('#overlay').fadeIn();
    ListModule.init("cagr_last_3yr", "asc");
    $('#overlay').fadeOut();
}
function cagr5ySortclick() {
    $('#overlay').fadeIn();
    ListModule.init("cagr_last_5yr", "asc");
    $('#overlay').fadeOut();
}

function NamesortIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ListModule.init("name", "desc");
        $('#NameSortIcon').removeClass();
        $('#NameSortIcon').addClass("fa fa-arrow-down text-danger");
        //$('#').removeClass();
        //$('#CurRateSortIcon').removeClass();
        //$('#YoySortIcon').removeClass();
        //$('#cagr3ySortIcon').removeClass();
    }
    else {
        ListModule.init("name", "asc");
        $('#NameSortIcon').removeClass();
        $('#NameSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function CurRateIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ListModule.init("current_rate", "desc");
        $('#CurRateSortIcon').removeClass();
        $('#CurRateSortIcon').addClass("fa fa-arrow-down text-danger");
        
    }
    else {
        ListModule.init("current_rate", "asc");
        $('#CurRateSortIcon').removeClass();
        $('#CurRateSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function yoyIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ListModule.init("cagr_last_1yr", "desc");
        $('#YoySortIcon').removeClass();
        $('#YoySortIcon').addClass("fa fa-arrow-down text-danger");
    }
    else {
        ListModule.init("cagr_last_1yr", "asc");
        $('#YoySortIcon').removeClass();
        $('#YoySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function cagr3yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ListModule.init("cagr_last_3yr", "desc");
        $('#cagr3ySortIcon').removeClass();
        $('#cagr3ySortIcon').addClass("fa fa-arrow-down text-danger");
        
    }
    else {
        ListModule.init("cagr_last_3yr", "asc");
        $('#cagr3ySortIcon').removeClass();
        $('#cagr3ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function cagr5yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ListModule.init("cagr_last_5yr", "desc");
        $('#cagr5ySortIcon').removeClass();
        $('#cagr5ySortIcon').addClass("fa fa-arrow-down text-danger");
       
    }
    else {
        ListModule.init("cagr_last_5yr", "asc");
        $('#cagr5ySortIcon').removeClass();
        $('#cagr5ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}




