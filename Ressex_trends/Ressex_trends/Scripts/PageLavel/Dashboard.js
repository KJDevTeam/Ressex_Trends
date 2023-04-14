var cityindex = 1;
var keepCityList = [];
var LineData = [];
var DashboardModule = function () {
    var stateId = 0;
    var DistrictId = 0;
    var TalukId = 0;
    var maindata = [];
   
    
    var projectType = "Residential";
    
    return {
        init: function () {
            
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var payload = common.Payload("city_list_image");
            var rsp = utility.ajaxselect(APIkey, payload, "Post", false);
            console.log(rsp);
            keepCityList = rsp.data;
            var projectTitle = rsp.data[0].h1;
            layoutModule.init(projectTitle);
            DashboardModule.cityload(rsp.data);
            DashboardModule.Bindlinechart();
           // FilterViewModule.init(maindata);

          //  $('#selectedProjectType').text('Residential');
          ///*  $('#projecType').val('Residential');*/
          //  var _filterSelected = localStorage.getItem('filterSelected');
          //  //if (_filterSelected != "") {
          //  //    localStorage.removeItem('filterSelected');
          //  //}
          // var APIkey = utility.ServiceAPIURL("/IGR/Filligrdropdown");
          // var rsp= utility.ajaxselect(APIkey, " ", "Get", false);
          //  console.log(rsp);
          //  maindata = rsp.data;
          //  FilterViewModule.init(maindata);
          //  $(".dropdown-menu li a").click(function () {
          //      $("#options").text($(this).text());
          //      // $("#projecType").text($(this).text());
          //      // var x = document.getElementById("options").value;
          //      var value = $(this).text();
          //      projectType = value;
          //      $('#selectedProjectType').text(value);
          //      $('#SelectedProject').text('');
                
          //     /* $('#projecType').val(value);*/
          //      DashboardModule.AutocompleteSearch(projectType);
          //     /* document.getElementById("projecType").value = value;*/
          //  });   
          //  DashboardModule.AutocompleteSearch(projectType);
        },
        AutocompleteSearch: function (projectTypetoLoad) {
           $("#SelectedProject").autocomplete({
               source: function (request, response) {
                    var formatterProjectType = projectTypetoLoad.toLowerCase().substring(0, 3);
                    var str = 't=PROJECT&opt={"PROJECT_TXT":"' + request.term + '","CITY_IDS":0}"&pt="' +formatterProjectType+ '"';
                    var APIkey = utility.ServiceAPIURL("/LFCommunity/Search?" + str);
                    $.ajax({
                        url: APIkey,
                        type: "GET",
                        dataType: "json",
                        data: {},
                        success: function (data) {
                            response($.map(data.data, function (item) {
                                return { id: item.id, label: item.name+item.hint, value: item.name+item.hint };
                            }))
                        },
                    })
                },
                select: function (event, ui) {
                    
                   /* document.getElementById("projecID").value = ui.item.id;*/
                   /* var projectType = document.getElementById("projecType").value;*/
                    var projectTypeID=common.getProjectTypeID(projectType);
                  
                    /* var formatterProjectType = projectType.toLowerCase().substring(0, 3);*/
                    var ProjectId =ui.item.id;
                    
                  // localStorage.setItem('filterSelected', JSON.stringify(filterModel));
                    var url = '' + ProjectId + '/' + projectTypeID + '';
                    var routingurl = utility.FrontEndAPIURL(url);
                    window.location.href = routingurl;
                },
                
            });
        },
        cityload: function (results) {
            var cityListlength = results.length / 10;
            var cityCounter = Math.ceil(cityListlength);

            if (cityindex <= cityCounter) {
                var arrcount = cityindex * 10;

                var arr_toload;
                if (arrcount <= results.length) {
                    arr_toload = results.slice(0, arrcount)
                }
                else {
                    arr_toload = results.slice(0, results.length);
                    $('#viewmore').hide();
                }
                    
                var st = ''
                $.each(arr_toload, function (index, items) {
                    st += '<div class="col-custom-5">\
        <a href="#" class="cityCard">\
            <div class="cityCardBody">\
                <img src="images/Chennai.png" alt="">\
                    <h5>'+ items.region_or_city + '</h5>\
                    <p>'+ items.state + '</p>\
                    </div>\
                </a>\
            </div>';
                });
                $("#CityList").append(st);

            }
           
        },
        Bindlinechart: function () {
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            var payload = common.Payload("country");
            LineData = utility.ajaxselect(APIkey, payload, "Post", false);
            console.log(LineData.data);
            var lbl = [];
            var lbl_idnx = [];
            var Linedt = [];
            var Linedt_idnx = [];
            var hovervals = [];
            var colour = [];
            var axistxt = [];
            var axistxt_indx = [];
            $.map(LineData.data, function (value, index) {
                lbl.push(value.dos_month_year);
                lbl_idnx.push(value.dos_month_year);
                Linedt.push(value.saleable_rate_psf);
                Linedt_idnx.push(value.all_india_price_index);
                hovervals.push(value.saleable_rate_psf);
            });
            ticks = {
                min: 0,
                max: 6,
                stepSize: 1
            };
            colour = LineData.data[0].country_color;
            axistxt.push({ "X": 'Quater', "Y": 'Saleable Rate in ₹/sfqt' });
            axistxt_indx.push({ "X": 'Quater', "Y": 'Price Index' });
            titletxt = 'Transaction';
            responsive = true;
            var Linedatasource = utility.bindline("priceLinechart", lbl, Linedt, hovervals, ticks, true, colour, axistxt, titletxt)
            var Linedatasource1 = utility.bindline("indexLinechart", lbl_idnx, Linedt_idnx, hovervals, ticks, true, colour, axistxt_indx, titletxt)
            $("#qtrTxt").text(LineData.data[0].current_qtr_text);
            $("#qtrprice").text(LineData.data[0].current_rate_text);
            $("#Yoy").text(LineData.data[0].cagr_last_1yr_pct);
         
        },
        TransactionDailyCsvExport: function (TotalData) {
            //////CSV structure//////
            var arr = TotalData;
            var item = arr.length > 0 ? arr : [];
            var itemsFormatted = [];
            var blank = {
                col1: "",
                col2: "",
                col3: "",

            };
            var header = {
                col1: "quarter",
                col2: "saleable_rate_in_Rs/sfqt",
                col3: "all_india_price_index"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.dos_month_year,     //.replace(/,/g, "|"),
                    col2: subitem.saleable_rate_psf,
                    col3: subitem.all_india_price_index,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Trends";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
    }
}();
$("#TrendsDownload").click(function () {
    DashboardModule.TransactionDailyCsvExport(LineData.data);
});
function viewmoreClick() {
    cityindex++;
    $("#CityList").empty();
    DashboardModule.cityload(keepCityList);
}
function DateFlagChanged(date) {
    common.dtpicker(date, "#fromDateID", "#toDateID");
}
    //$("#SelectedProject").change(function () {
    //    alert("The text has been changed.");
    //});

function RouteToTransaction(id) {
    console.log('Route' + id);
    var url = '' + id + '';
    let formDate = moment().format("DD/MM/YYYY");
    let toDate = moment().format("DD/MM/YYYY");
    switch (id) {

        case "residential-sale-deals":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');
            common.ShortcutMenuFlterBinding(1, 1, formDate, toDate, "100", "Rent_Agreement_Value");

            break;
        case "residential-lease-rental-deals":

            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(1, 2, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        case "residential-land-sale-deals":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(3, 1, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        case "commercial-sale-deals":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(2, 1, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        case "commercial-lease-rental-deals":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(2, 2, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        case "mortgages":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(0, 3, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        default:

            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(0, 0, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
    }

    filterdetails = common.IsFilterSelcted();
    var routingurl = utility.FrontEndAPIURL(url);
    window.location.href = routingurl;
}
//$("#SelectedProject").on("input", function (a) {
//    if ($("#SelectedProject").val().length>3) {
//        /*alert("The text has been changed.");*/
//        DashboardModule.AutocompleteSearch($("#SelectedProject").val());
//    }
//    // Print entered value in a div box
   
//});
