var RspData;
var result;

var TotalData1 = '';
var Bardatasource = '';
var UserType = '';

var LocationTrendsModule = function () {
    var TotalData;
    var graphvariable;
    var CheckboxIDs = [];
    return {
        init: function () {
            $("#valTxtLocation").text('Just one step away from getting your current property valuation...');
            var QueryStringARR = common.GetQueryString();
            result = common.GetTrendsTypePayload(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {

            }
            else {
            }
            var jsonstr = {
                "id": result.Id,
            }
            var Payload = {
                "lookup": "Location",
                "json_str": JSON.stringify(jsonstr)
            }
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            RspData = utility.ajaxselect(APIkey, Payload, "Post", false);

            TotalData = RspData;
            console.log(RspData);
            $("#screenNameLocation").text(RspData.data[0].screen_name);
            $("#qtrTextLocation").text(RspData.data[0].current_qtr_text);
            $("#rateTxtLocation").text(RspData.data[0].current_rate_in_txt);
            $("#cagrPctLocation").text(RspData.data[0].cagr_last_1yr_pct);
            $("#CAGRDropDownTextLocation").text("CAGR 3Y");
            $("#calculatedCAGRLocation").text(RspData.data[0].cagr_last_3yr_pct);

            common.dtpicker_cal("#fromDateIDLocation");
            LocationTrendsModule.Multilinegraph();
            LocationTrendsModule.checkboxTrend();


        },
        Multilinegraph: function () {
            /* chartClear();*/
            var label = [];
            var axistxt = [];
            ticks = {
                min: 0,
                max: 6,
                stepSize: 1
            };
            responsive = false;
            var totaldataset = [];
            var LocationLine = [];
            var RegionLine = [];
            var CityLine = [];
            var Graphlabels = [];
            TotalData.data.forEach(function (item) {
                //Location Check
                if (item.location_saleable_rate == 0) {
                    LocationLine.push(null);
                }
                else {
                    LocationLine.push(item.location_saleable_rate);
                }

                //Region Check
                if (item.region_saleable_rate == 0) {
                    RegionLine.push(null);
                }
                else {
                    RegionLine.push(item.region_saleable_rate);
                }


                //City Check
                if (item.city_saleable_rate== 0) {
                    CityLine.push(null);
                }
                else {
                    CityLine.push(item.city_saleable_rate);
                }

                Graphlabels.push(item.dos_month_year);
            });

            var dataThird = {
                label: TotalData.data[0].location_text,
                labelvalue: TotalData.data[0].location_name,
                data: LocationLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].location_color
            };

            var dataFourth = {
                label: TotalData.data[0].region_text,
                labelvalue: TotalData.data[0].region_name,
                data: RegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].region_color
            };
            var dataFifth = {
                label: TotalData.data[0].city_text,
                labelvalue: TotalData.data[0].city_name,
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };

            label = Graphlabels;




            var totaldataset = [];

           
            totaldataset.push(dataThird);
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Quater', "Y": 'Saleable Rate in ₹/sqft' });

            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlineLocation", totaldataset, true, axistxt, label, ticks);


        },
        MultilinegraphIndex: function () {
            /* chartClear();*/
            var label = [];
            var axistxt = [];
            ticks = {
                min: 0,
                max: 6,
                stepSize: 1
            };
            responsive = false;
            var totaldataset = [];
            var LocationLine = [];
            var RegionLine = [];
            var CityLine = [];
            var Graphlabels = [];
            TotalData.data.forEach(function (item) {
                //Location Check
                if (item.location_price_index == 0) {
                    LocationLine.push(null);
                }
                else {
                    LocationLine.push(item.location_price_index);
                }

                //Region Check
                if (item.region_price_index == 0) {
                    RegionLine.push(null);
                }
                else {
                    RegionLine.push(item.region_price_index);
                }


                //City Check
                if (item.city_price_index == 0) {
                    CityLine.push(null);
                }
                else {
                    CityLine.push(item.city_price_index);
                }

                Graphlabels.push(item.dos_month_year);
            });

            var dataThird = {
                label: TotalData.data[0].location_text,
                labelvalue: TotalData.data[0].location_name,
                data: LocationLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].location_color
            };

            var dataFourth = {
                label: TotalData.data[0].region_text,
                labelvalue: TotalData.data[0].region_name,
                data: RegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].region_color
            };
            var dataFifth = {
                label: TotalData.data[0].city_text,
                labelvalue: TotalData.data[0].city_name,
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };

            label = Graphlabels;




            var totaldataset = [];


            totaldataset.push(dataThird);
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Time', "Y": 'Price Index' });

            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlineLocation", totaldataset, true, axistxt, label, ticks);


        },
        getvaluation: function () {
            var jsonstr = {
                "id": result.Id,
                "orig_value_rs": $("#OrgvalueLocation").val(),
                "orig_date": $("#fromDateIDLocation").val()
            };
            var Payload = {
                "lookup": "location_valuation",
                "json_str": JSON.stringify(jsonstr)
            };

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            var retData = utility.ajaxselect(APIkey, Payload, "Post", false);
            console.log(retData);

            if (retData.status == "OK") {
                $("#currValLocation").text(retData.data[0].current_valuation_rs);
                $("#valTxtLocation").text(retData.data[0].current_value_text_popup);
            }
            else {
                $("#currValLocation").text('');
                $("#valTxtLocation").text('');
            }

        },
        CAGRCalculation: function (t) {
            var attributetobeUsed;
            if (TotalData.data[0].location_line_flag  == 1) {
                attributetobeUsed = "location_saleable_rate";
            }
            else if (TotalData.data[0].region_line_flag == 1) {
                attributetobeUsed = "region_saleable_rate";
            }
            else if (TotalData.data[0].city_line_flag == 1) {
                attributetobeUsed = "city_saleable_rate";
            }

            var formulaCalulator = common.CAGRFormularCalulation(t, (TotalData.data.length - 1), TotalData.data, attributetobeUsed);
            $("#calculatedCAGRLocation").text(formulaCalulator);
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
                col1: "Registration Date",
                col2: "Transaction Count",
                col3: "Transacted Value RS"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.registration_date,     //.replace(/,/g, "|"),
                    col2: subitem.transaction_count,
                    col3: subitem.transacted_value_rs,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Transaction Trends Daily";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        checkboxTrend: function () {
            const legend = $("#LocationCheckbox");
            var st = ''
            st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox">\
                                <input type="checkbox" class="custom-control-input" onchange="locationALLchnage(event)" id="checkLocationALL" checked="true">\
                                <label class="custom-control-label pointer" for="checkLocationALL">ALL</label>\
                            </div>\
                            <div class="cityNameCol"></div>\
                        </div >';

            graphvariable.data.datasets.forEach((dataset, index) => {
                console.log('dataset' + dataset);
                CheckboxIDs.push("dataset" + index);
                /* onchange = citycheckboxchnage('+ id+')"*/
                st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox light-purple">\
                                <input type="checkbox" class="custom-control-input" onchange="locationcheckboxchnage(event)" id="dataset'+ index + '" checked="true">\
                                <label class="custom-control-label pointer" for="dataset'+ index + '">' + dataset.label + '</label>\
                            </div>\
                            <div class="cityNameCol">'+ dataset.labelvalue + '</div>\
                        </div >';
            });

            $("#LocationCheckbox").append(st);
        },
        checkboxEffect: function (e, allFlag, allflagValue) {

            if (allFlag && allflagValue) {
                graphvariable.data.datasets.forEach((dataset, index) => {
                    graphvariable.hide(index);
                });
                CheckboxIDs.forEach((item, index) => {
                    var controlID = "#" + item;
                    //$(controlID).removeAttr('checked'); // checks it
                    $(controlID).prop('checked', false); // unchecks it
                    //document.getElementById(controlID).checked = false;
                });

            }
            else if (allFlag && !allflagValue) {
                graphvariable.data.datasets.forEach((dataset, index) => {
                    graphvariable.show(index);
                });
                CheckboxIDs.forEach((item, index) => {
                    var controlID = '#' + item;
                    document.getElementById('dataset0');//.setAttribute('checked', 'checked');
                    //document.getElementById(controlID).checked = true;
                    //$(controlID).removeAttr('checked'); // checks it
                    $(controlID).prop('checked', true); // checks it

                });
            }
            else {

                if (graphvariable.isDatasetVisible(e)) {
                    graphvariable.hide(e);
                }
                else {
                    graphvariable.show(e);
                }
            }

        }

    }
}();

$("#getValuationLocation").click(function () {
    // var SearchName = Cookies.get('SearchName');
    //var SName = utility.getCookie('SearchName');

    LocationTrendsModule.getvaluation();
});

$('#CAGRListLocation a').on('click', function () {
    var value = $(this).html();
    $("#CAGRDropDownTextLocation").text(value);

    var temp_t = value.split('Y')[0];
    var t = Number(temp_t.split(' ')[1]);
    LocationTrendsModule.CAGRCalculation(t);
});

$("#LocationTrendIndex").click(function () {

    $("#LocationTrendIndex").addClass('active');
    $('#LocationPriceIndex').removeClass('active');
    LocationTrendsModule.MultilinegraphIndex();
});
$("#LocationTrendPrice").click(function () {

    $("#LocationTrendPrice").addClass('active');
    $('#LocationTrendIndex').removeClass('active');
    LocationTrendsModule.Multilinegraph();
});

function locationcheckboxchnage(event) {

    $('#checkLocationALL').prop('checked', false); // Unchecks it
    console.log("change" + event.currentTarget.id);

    var value = event.currentTarget.id;
    var valuetobeSent = value.split('dataset')[1];
    LocationTrendsModule.checkboxEffect(valuetobeSent);

}
function locationALLchnage(event) {


    if (event.target.checked) {
        LocationTrendsModule.checkboxEffect(undefined, true, false);
    }
    else {
        LocationTrendsModule.checkboxEffect(undefined, true, true);
    }
}

function goBackLocation() {
    window.history.back()
}
