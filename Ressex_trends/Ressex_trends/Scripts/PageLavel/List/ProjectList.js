var listindex = 1;
var keepProjectListData = [];
var ProjectListModule = function () {
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
            ProjectListModule.sortingDecider(sortBy, OrderBy);
            var result = ProjectListModule.ProjectPayload("project", QueryStringARR,sortBy, OrderBy);

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, result.payload, "Post", false);

            TotalData = Data;
            console.log(Data);

            if (Data.status == 'OK') {
                keepProjectListData = Data.data;

                //Project Heading Decider

                if (result.Category == "AllProjects") {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_india);
                }
                else if (result.Category == "ProjectsInPincode") {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_pincode);
                }
                else if (result.Category == "ProjectsInLocation") {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_location);
                }
                else if (result.Category == "ProjectsInCity") {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_city);
                }
                else {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_india);
                }
                ProjectListModule.ListLoad(Data.data);
            }
            else {
                $('#projectSortandFilter').remove();
                $('#ProjectviewmoreList').hide();
                $("#ProjectList").empty();
                $("#ProjectList").append("<span>No Data found</span>");
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
                    $('#ProjectviewmoreList').hide();
                }
                var img = utility.FrontEndAPIURL("images");
                var st = ''
                $("#ProjectList").empty();
                $.each(arr_toload, function (index, items) {

                    st += '<div class="card my-3">\
                        <div class="row no-gutters">\
                            <div class="col-1">\
                                <img class="card-img rounded-circle" src="'+ img + '/Bangalore.png">\
                    </div>\
                                <div class="col-2">\
                                    <div class="card-body">\
                                        <h5 class="card-title">'+ items.name + '</h5>\
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
                                        <span class="card-title">Project Status</span>\
                                        <p class="card-text">'+ items.project_status + '</p>\
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
                var paginateText = 'Showing <b>' + arr_toload.length + '</b> projects out of <b>' + keepProjectListData.length + '</b>';
                $('#ProjectPaginationText').empty();
                $('#ProjectPaginationText').append(paginateText);
                $("#ProjectList").append(st);
            }

        },
        sortingDecider: function (sortby, orderby) {

            //SortBy
            if (sortby == "name") {
                var Text = ProjectListModule.orderbyDecider("#ProjectNameSortIcon", orderby);
                $('#ProjectnameSortID').text(Text);
                $('#ProjectnameSortID').addClass('text-danger');


                //Remove Red From Text
                $('#ProjectCurrRateSortID').removeClass('text-danger');
                $('#ProjectyoySortID').removeClass('text-danger');
                $('#ProjectCAGR3YSortID').removeClass('text-danger');
                $('#ProjectCAGR5YSortID').removeClass('text-danger');

                //Remove Icon
                $('#ProjectCurRateSortIcon').removeClass();
                $('#ProjectYoySortIcon').removeClass();
                $('#Projectcagr3ySortIcon').removeClass();
                $('#Projectcagr5ySortIcon').removeClass();





            }
            else if (sortby == "current_rate") {

                var Text = ProjectListModule.orderbyDecider("#ProjectCurRateSortIcon", orderby);
                $('#ProjectCurrRateSortID').text(Text);
                $('#ProjectCurrRateSortID').addClass('text-danger');

                $('#ProjectnameSortID').removeClass('text-danger');
                $('#ProjectyoySortID').removeClass('text-danger');
                $('#ProjectCAGR3YSortID').removeClass('text-danger');
                $('#ProjectCAGR5YSortID').removeClass('text-danger');

                //Remove Icon
                $('#ProjectNameSortIcon').removeClass();
                $('#ProjectYoySortIcon').removeClass();
                $('#Projectcagr3ySortIcon').removeClass();
                $('#Projectcagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_1yr") {

                var Text = ProjectListModule.orderbyDecider("#ProjectYoySortIcon", orderby);
                $('#ProjectYoySortIcon').text(Text);
                $('#ProjectyoySortID').addClass('text-danger');

                //Remove Red from Text
                $('#ProjectnameSortID').removeClass('text-danger');
                $('#ProjectCurrRateSortID').removeClass('text-danger');
                $('#ProjectCAGR3YSortID').removeClass('text-danger');
                $('#ProjectCAGR5YSortID').removeClass('text-danger');

                //Remove Icon from Text
                $('#ProjectNameSortIcon').removeClass();
                $('#ProjectCurRateSortIcon').removeClass();
                $('#Projectcagr3ySortIcon').removeClass();
                $('#Projectcagr5ySortIcon').removeClass();

            }
            else if (sortby == "cagr_last_3yr") {

                var Text = ProjectListModule.orderbyDecider("#Projectcagr3ySortIcon", orderby);
                $('#ProjectCAGR3YSortID').text(Text);
                $('#ProjectCAGR3YSortID').addClass('text-danger');

                $('#ProjectnameSortID').removeClass('text-danger');
                $('#ProjectCurrRateSortID').removeClass('text-danger');
                $('#ProjectyoySortID').removeClass('text-danger');
                $('#ProjectCAGR5YSortID').removeClass('text-danger');


                //Remove Icon from Text
                $('#ProjectNameSortIcon').removeClass();
                $('#ProjectCurRateSortIcon').removeClass();
                $('#ProjectYoySortIcon').removeClass();
                $('#Projectcagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_5yr") {

                var Text = ProjectListModule.orderbyDecider("#Projectcagr5ySortIcon", orderby);
                $('#ProjectCAGR5YSortID').text(Text);
                $('#ProjectCAGR5YSortID').addClass('text-danger');

                $('#ProjectnameSortID').removeClass('text-danger');
                $('#ProjectCurrRateSortID').removeClass('text-danger');
                $('#ProjectyoySortID').removeClass('text-danger');
                $('#ProjectCAGR3YSortID').removeClass('text-danger');


                //Remove Icon from Text
                $('#ProjectNameSortIcon').removeClass();
                $('#ProjectCurRateSortIcon').removeClass();
                $('#ProjectYoySortIcon').removeClass();
                $('#Projectcagr3ySortIcon').removeClass();
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
        ProjectPayload: function (lookup, QueryStringarr, sortBy, OrderBy) {
            var jsonstr = {};
            var Category;
            if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
                Category = "AllProjects";
                jsonstr = {
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }

            }
            else if (QueryStringarr[3] != 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
                Category = "ProjectsInPincode";
                jsonstr = {
                    "pincode": "" + QueryStringarr[3] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }
            else if (QueryStringarr[3] == 0 && QueryStringarr[4] != 0 && QueryStringarr[5] == 0) {
                Category = "ProjectsInLocation";
                jsonstr = {
                    "location_id": "" + QueryStringarr[4] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                };
            }
            else if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] != 0) {
                Category = "ProjectsInCity";
                jsonstr = {
                    "city_id": "" + QueryStringarr[5] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }
            else {
                Category = "AllProjects";
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
                "Category": "" + Category+"",
                "payload": APIPayload,
            }

        }
    }
}();

function ProjectViewmoreListClick() {
    listindex++;
    $("#ProjectList").empty();
    ProjectListModule.ListLoad(keepProjectListData);

}

function ProjectNameSortclick() {
    $('#overlay').fadeIn();
    ProjectListModule.init("name", "asc");
    $('#overlay').fadeOut();
}
function ProjectCurRateSortclick() {
    $('#overlay').fadeIn();
    ProjectListModule.init("current_rate", "asc");
    $('#overlay').fadeOut();
}
function ProjectYoySortclick() {
    $('#overlay').fadeIn();
    ProjectListModule.init("cagr_last_1yr", "asc");
    $('#overlay').fadeOut();
}
function Projectcagr3ySortclick() {
    $('#overlay').fadeIn();
    ProjectListModule.init("cagr_last_3yr", "asc");
    $('#overlay').fadeOut();
}
function Projectcagr5ySortclick() {
    $('#overlay').fadeIn();
    ProjectListModule.init("cagr_last_5yr", "asc");
    $('#overlay').fadeOut();
}

function ProjectNamesortIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ProjectListModule.init("name", "desc");
        $('#ProjectNameSortIcon').removeClass();
        $('#ProjectNameSortIcon').addClass("fa fa-arrow-down text-danger");
        //$('#').removeClass();
        //$('#CurRateSortIcon').removeClass();
        //$('#YoySortIcon').removeClass();
        //$('#cagr3ySortIcon').removeClass();
    }
    else {
        ProjectListModule.init("name", "asc");
        $('#ProjectNameSortIcon').removeClass();
        $('#ProjectNameSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function ProjectCurRateIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ProjectListModule.init("current_rate", "desc");
        $('#ProjectCurRateSortIcon').removeClass();
        $('#ProjectCurRateSortIcon').addClass("fa fa-arrow-down text-danger");

    }
    else {
        ProjectListModule.init("current_rate", "asc");
        $('#ProjectCurRateSortIcon').removeClass();
        $('#ProjectCurRateSortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function ProjectyoyIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ProjectListModule.init("cagr_last_1yr", "desc");
        $('#ProjectYoySortIcon').removeClass();
        $('#ProjectYoySortIcon').addClass("fa fa-arrow-down text-danger");
    }
    else {
        ProjectListModule.init("cagr_last_1yr", "asc");
        $('#ProjectYoySortIcon').removeClass();
        $('#ProjectYoySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function Projectcagr3yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ProjectListModule.init("cagr_last_3yr", "desc");
        $('#Projectcagr3ySortIcon').removeClass();
        $('#Projectcagr3ySortIcon').addClass("fa fa-arrow-down text-danger");

    }
    else {
        ProjectListModule.init("cagr_last_3yr", "asc");
        $('#Projectcagr3ySortIcon').removeClass();
        $('#Projectcagr3ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}
function Projectcagr5yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "fa fa-arrow-up text-danger") {
        ProjectListModule.init("cagr_last_5yr", "desc");
        $('#Projectcagr5ySortIcon').removeClass();
        $('#Projectcagr5ySortIcon').addClass("fa fa-arrow-down text-danger");

    }
    else {
        ProjectListModule.init("cagr_last_5yr", "asc");
        $('#Projectcagr5ySortIcon').removeClass();
        $('#Projectcagr5ySortIcon').addClass("fa fa-arrow-up text-danger");
    }
    $('#overlay').fadeOut();
}




