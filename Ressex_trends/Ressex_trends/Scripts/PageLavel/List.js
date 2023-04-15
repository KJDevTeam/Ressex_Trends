var listindex = 1;
var keepListData = [];
var ListModule = function () {
    return {
        init: function () {

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
                "json_str": JSON.stringify(jsonstr)
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
                $.each(arr_toload, function (index, items) {
                    st += '<div class="card mb-3">\
                    <div class="row">\
                        <div class="col-1">\
                            <img class="card-img" src="'+ img + '/Bangalore.png" style="height:100px;width:100px">\
                    </div>\
                            <div class="col-11">\
                                <div class="card-body">\
                                    <h5 class="card-title">'+ items.name + '</h5>\
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\
                                </div>\
                            </div>\
                        </div>\
            </div >';
                });
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