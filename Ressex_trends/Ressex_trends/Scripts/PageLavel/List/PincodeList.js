var listindex = 1;
var keepPincodeListData = [];
var PincodeListModule = function () {
    return {
        init: function (sortBy,OrderBy) {

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
            PincodeListModule.sortingDecider(sortBy, OrderBy);
            var result = PincodeListModule.PincodePayload("pincode", QueryStringARR,sortBy,OrderBy);

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, result.payload, "Post", false);

            TotalData = Data;
            console.log(Data);
            keepPincodeListData = Data.data;

            //Project Heading Decider

            if (result.Category == "AllPincodes") {
                $('#PincodelistHeading').text(keepPincodeListData[0].pincodes_in_india);
            }
            else if (result.Category == "PincodeinPincode") {
                $('#PincodelistHeading').text(keepPincodeListData[0].pincode_input);
            }
            else if (result.Category == "PincodesinCity") {
                $('#PincodelistHeading').text(keepPincodeListData[0].pincodes_in_city);
            }
            else {
                $('#PincodelistHeading').text(keepPincodeListData[0].pincodes_in_india);
            }
           
            
            PincodeListModule.ListLoad(Data.data);



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
                    $('#PincodeviewmoreList').hide();
                }
                var img = utility.FrontEndAPIURL("images");
                var st = ''
                $("#PincodeList").empty();
                $.each(arr_toload, function (index, items) {

                    st += '<div class="card my-3">\
                        <div class="row no-gutters">\
                            <div class="col-1">\
                                <img class="card-img rounded-circle" src="'+ img + '/Bangalore.png">\
                    </div>\
                                <div class="col-2">\
                                    <div class="card-body">\
                                        <h5 class="card-title">'+ items.pincode + '</h5>\
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
                                        <button class="btn text-danger" onClick="ProjectByPincode('+ items.pincode+')">View Projects</button>\
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
                var paginateText = 'Showing <b>' + arr_toload.length + '</b> pincodes out of <b>' + keepPincodeListData.length+'</b>';
                $('#PincodePaginationText').empty();
                $('#PincodePaginationText').append(paginateText);
                $("#PincodeList").append(st);
            }

        },
        sortingDecider : function (sortby, orderby) {

                //SortBy
                if (sortby == "name") {
                    var Text = PincodeListModule.orderbyDecider("#PincodeNameSortIcon", orderby);
                    $('#PincodenameSortID').text(Text);
                    $('#PincodenameSortID').addClass('text-danger');


                    //Remove Red From Text
                    $('#PincodeCurrRateSortID').removeClass('text-danger');
                    $('#PincodeyoySortID').removeClass('text-danger');
                    $('#PincodeCAGR3YSortID').removeClass('text-danger');
                    $('#PincodeCAGR5YSortID').removeClass('text-danger');

                    //Remove Icon
                    $('#PincodeCurRateSortIcon').removeClass();
                    $('#PincodeYoySortIcon').removeClass();
                    $('#Pincodecagr3ySortIcon').removeClass();
                    $('#Pincodecagr5ySortIcon').removeClass();





                }
                else if (sortby == "current_rate") {

                    var Text = PincodeListModule.orderbyDecider("#PincodeCurRateSortIcon", orderby);
                    $('#PincodeCurrRateSortID').text(Text);
                    $('#PincodeCurrRateSortID').addClass('text-danger');

                    $('#PincodenameSortID').removeClass('text-danger');
                    $('#PincodeyoySortID').removeClass('text-danger');
                    $('#PincodeCAGR3YSortID').removeClass('text-danger');
                    $('#PincodeCAGR5YSortID').removeClass('text-danger');

                    //Remove Icon
                    $('#PincodeNameSortIcon').removeClass();
                    $('#PincodeYoySortIcon').removeClass();
                    $('#Pincodecagr3ySortIcon').removeClass();
                    $('#Pincodecagr5ySortIcon').removeClass();
                }
                else if (sortby == "cagr_last_1yr") {

                    var Text = PincodeListModule.orderbyDecider("#PincodeYoySortIcon", orderby);
                    $('#PincodeYoySortIcon').text(Text);
                    $('#PincodeyoySortID').addClass('text-danger');

                    //Remove Red from Text
                    $('#PincodenameSortID').removeClass('text-danger');
                    $('#PincodeCurrRateSortID').removeClass('text-danger');
                    $('#PincodeCAGR3YSortID').removeClass('text-danger');
                    $('#PincodeCAGR5YSortID').removeClass('text-danger');

                    //Remove Icon from Text
                    $('#PincodeNameSortIcon').removeClass();
                    $('#PincodeCurRateSortIcon').removeClass();
                    $('#Pincodecagr3ySortIcon').removeClass();
                    $('#Pincodecagr5ySortIcon').removeClass();

                }
                else if (sortby == "cagr_last_3yr") {

                    var Text = PincodeListModule.orderbyDecider("#Pincodecagr3ySortIcon", orderby);
                    $('#PincodeCAGR3YSortID').text(Text);
                    $('#PincodeCAGR3YSortID').addClass('text-danger');

                    $('#PincodenameSortID').removeClass('text-danger');
                    $('#PincodeCurrRateSortID').removeClass('text-danger');
                    $('#PincodeyoySortID').removeClass('text-danger');
                    $('#PincodeCAGR5YSortID').removeClass('text-danger');


                    //Remove Icon from Text
                    $('#PincodeNameSortIcon').removeClass();
                    $('#PincodeCurRateSortIcon').removeClass();
                    $('#PincodeYoySortIcon').removeClass();
                    $('#Pincodecagr5ySortIcon').removeClass();
                }
                else if (sortby == "cagr_last_5yr") {

                    var Text = PincodeListModule.orderbyDecider("#Pincodecagr5ySortIcon", orderby);
                    $('#PincodeCAGR5YSortID').text(Text);
                    $('#PincodeCAGR5YSortID').addClass('text-danger');

                    $('#PincodenameSortID').removeClass('text-danger');
                    $('#PincodeCurrRateSortID').removeClass('text-danger');
                    $('#PincodeyoySortID').removeClass('text-danger');
                    $('#PincodeCAGR3YSortID').removeClass('text-danger');


                    //Remove Icon from Text
                    $('#PincodeNameSortIcon').removeClass();
                    $('#PincodeCurRateSortIcon').removeClass();
                    $('#PincodeYoySortIcon').removeClass();
                    $('#Pincodecagr3ySortIcon').removeClass();
                }



        },
        orderbyDecider : function (IconID, orderby) {

            //OrderBy



            if (orderby == "desc") {
                $(IconID).addClass("fa fa-arrow-down text-danger");


            }
            else {
                $(IconID).addClass("fa fa-arrow-up text-danger");

            }


        },
        PincodePayload: function (lookup, QueryStringarr, sortBy, OrderBy) {
            var jsonstr = {};
            var Category;
            if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
                Category = "AllPincodes";
                jsonstr = {
                    "sort_by": sortBy,
                    "order_by": OrderBy
                };

            }
            else if (QueryStringarr[3] != 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
                Category = "PincodeinPincode";
                jsonstr = {
                    "pincode": "" + QueryStringarr[3] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }

            else if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] != 0) {
                Category = "PincodesinCity";
                jsonstr = {
                    "city_id": "" + QueryStringarr[5] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }
            else {
                Category = "AllPincodes";
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

function PincodeViewmoreListClick() {
    listindex++;
    $("#PincodeList").empty();
    PincodeListModule.ListLoad(keepPincodeListData);
    
}

function PincodeNameSortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("name","asc");
    $('#overlay').fadeOut();
}
function PincodeCurRateSortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("current_rate", "asc");
    $('#overlay').fadeOut();
}
function PincodeYoySortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("cagr_last_1yr", "asc");
    $('#overlay').fadeOut();
}
function Pincodecagr3ySortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("cagr_last_3yr", "asc");
    $('#overlay').fadeOut();
}
function Pincodecagr5ySortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("cagr_last_5yr", "asc");
    $('#overlay').fadeOut();
}

function PincodeNamesortIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        PincodeListModule.init("name", "desc");
        $('#PincodeNameSortIcon').removeClass();
        $('#PincodeNameSortIcon').addClass("fa fa-arrow-down text-danger");
        //$('#').removeClass();
        //$('#CurRateSortIcon').removeClass();
        //$('#YoySortIcon').removeClass();
        //$('#cagr3ySortIcon').removeClass();
    }
    else {
        PincodeListModule.init("name", "asc");
        $('#PincodeNameSortIcon').removeClass();
        $('#PincodeNameSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function PincodeCurRateIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        PincodeListModule.init("current_rate", "desc");
        $('#PincodeCurRateSortIcon').removeClass();
        $('#PincodeCurRateSortIcon').addClass("fa fa-arrow-down text-danger");
        
    }
    else {
        PincodeListModule.init("current_rate", "asc");
        $('#PincodeCurRateSortIcon').removeClass();
        $('#PincodeCurRateSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function PincodeyoyIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        PincodeListModule.init("cagr_last_1yr", "desc");
        $('#PincodeYoySortIcon').removeClass();
        $('#PincodeYoySortIcon').addClass("fa fa-arrow-down text-danger");
    }
    else {
        PincodeListModule.init("cagr_last_1yr", "asc");
        $('#PincodeYoySortIcon').removeClass();
        $('#PincodeYoySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function Pincodecagr3yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        PincodeListModule.init("cagr_last_3yr", "desc");
        $('#Pincodecagr3ySortIcon').removeClass();
        $('#Pincodecagr3ySortIcon').addClass("fa fa-arrow-down text-danger");
        
    }
    else {
        PincodeListModule.init("cagr_last_3yr", "asc");
        $('#Pincodecagr3ySortIcon').removeClass();
        $('#Pincodecagr3ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function Pincodecagr5yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        PincodeListModule.init("cagr_last_5yr", "desc");
        $('#Pincodecagr5ySortIcon').removeClass();
        $('#Pincodecagr5ySortIcon').addClass("fa fa-arrow-down text-danger");
       
    }
    else {
        PincodeListModule.init("cagr_last_5yr", "asc");
        $('#Pincodecagr5ySortIcon').removeClass();
        $('#Pincodecagr5ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}

function ProjectByPincode(id) {
    var resultroutingurl = utility.FrontEndAPIURL('list/project/' + id+'/0/0');
    window.location.href = resultroutingurl;
}



