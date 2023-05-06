var RspData;
var result;

var TotalData1 = '';
var Bardatasource = '';
var UserType = '';



var CityTrendsModule = function () {
    var TotalData;
    var graphvariable;
    var CheckboxIDs = [];
    return {
        init: function () {
            
            $("#valTxtCity").text('Just one step away from getting your current property valuation...');
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
                "lookup": "City",
                "json_str": JSON.stringify(jsonstr)
            }
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            RspData = utility.ajaxselect(APIkey, Payload, "Post", false);

            TotalData = RspData;
            console.log(RspData);
            $("#screenNameCity").text(RspData.data[0].screen_name);
            $("#qtrTextCity").text(RspData.data[0].current_qtr_text);
            $("#rateTxtCity").text(RspData.data[0].current_rate_in_txt);
            $("#cagrPctCity").text(RspData.data[0].cagr_last_1yr_pct);
            $("#CAGRDropDownTextCity").text("CAGR 3Y");
            $("#calculatedCAGRCity").text(RspData.data[0].cagr_last_3yr_pct);

            common.dtpicker_cal("#fromDateIDCity");
            CityTrendsModule.Multilinegraph();
            CityTrendsModule.checkboxTrend();


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
            var CountryLine = [];
            var CityLine = [];
            var Graphlabels = [];
            TotalData.data.forEach(function (item) {
                

                //Country Check
                if (item.country_saleable_rate == 0) {
                    CountryLine.push(null);
                }
                else {
                    CountryLine.push(item.india_saleable_rate);
                }

                //City Check

                if (item.city_saleable_rate == 0) {
                    CityLine.push(null);
                }
                else {
                    CityLine.push(item.city_saleable_rate);
                }

                Graphlabels.push(item.dos_month_year);
            });

            

            var dataFourth = {
                label: "Country",
                data: CountryLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].country_color
            };
            var dataFifth = {
                label: "City",
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };

            label = Graphlabels;




            var totaldataset = [];

           
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Quater', "Y": 'Saleable Rate in ₹/sqft' });

            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlineCity", totaldataset, true, axistxt, label, ticks);


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
            var CountryLine = [];
            var CityLine = [];
            var Graphlabels = [];
            TotalData.data.forEach(function (item) {


                //Country Check
                if (item.india_price_index == 0) {
                    CountryLine.push(null);
                }
                else {
                    CountryLine.push(item.india_price_index);
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



            var dataFourth = {
                label: "Country",
                data: CountryLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].country_color
            };
            var dataFifth = {
                label: "City",
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };

            label = Graphlabels;




            var totaldataset = [];


            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Time', "Y": 'Price Index' });

            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlineCity", totaldataset, true, axistxt, label, ticks);



        },
        getvaluation: function () {
            var jsonstr = {
                "id": result.Id,
                "orig_value_rs": $("#OrgvalueCity").val(),
                "orig_date": $("#fromDateIDCity").val()
            };
            var Payload = {
                "lookup": "city_valuation",
                "json_str": JSON.stringify(jsonstr)
            };

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            var retData = utility.ajaxselect(APIkey, Payload, "Post", false);
            console.log(retData);

            if (retData.status == "OK") {
                $("#currValCity").text(retData.data[0].current_valuation_rs);
                $("#valTxtCity").text(retData.data[0].current_value_text_popup);
            }
            else {
                $("#currValCity").text('');
                $("#valTxtCity").text('');
            }

        },
        CAGRCalculation: function (t) {
            var attributetobeUsed;
            if (TotalData.data[0].city_line_flag  == 1) {
                attributetobeUsed = "city_saleable_rate";
            }
            else if (TotalData.data[0].country_line_flag  == 1) {
                attributetobeUsed = "india_saleable_rate";
            }
            

            var formulaCalulator = common.CAGRFormularCalulation(t, (TotalData.data.length - 1), TotalData.data, attributetobeUsed);
            $("#calculatedCAGRCity").text(formulaCalulator);
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
            const legend = $("#TrendCheckbox");
            var st = ''
            st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox light-purple">\
                                <input type="checkbox" class="custom-control-input" onchange="cityALLchnage(event)" id="checkCityALL" checked="true">\
                                <label class="custom-control-label pointer" for="checkCityALL">ALL</label>\
                            </div>\
                            <div class="cityNameCol"></div>\
                        </div >';

            graphvariable.data.datasets.forEach((dataset, index) => {
                console.log('dataset' + dataset);
                CheckboxIDs.push("Dataset"+index);
               /* onchange = citycheckboxchnage('+ id+')"*/
                st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox light-purple">\
                                <input type="checkbox" class="custom-control-input" onchange="citycheckboxchnage(event)" id="dataset'+ index +'" checked="true">\
                                <label class="custom-control-label pointer" for="dataset'+ index +'">'+dataset.label+'</label>\
                            </div>\
                            <div class="cityNameCol">Rustomjee Crown</div>\
                        </div >';
            });

            $("#TrendCheckbox").append(st);
        },
        checkboxEffect: function (e,allFlag,allflagValue) {

            if (allFlag && allflagValue) {
                graphvariable.data.datasets.forEach((dataset, index) => {
                    graphvariable.hide(index);
                });
                CheckboxIDs.forEach((item, index) => {
                    var controlID = "#"+ item;
                    $(controlID).prop('checked', false); // unchecks it
                    
                });

            }
            else if (allFlag && !allflagValue) {
                graphvariable.data.datasets.forEach((dataset, index) => {
                    graphvariable.show(index);
                });
                CheckboxIDs.forEach((item, index) => {
                    var controlID = '#' + item;
                    $(controlID).prop('checked', true); // checks it
                    //$("#dataset0").prop('checked', true); // Unchecks it
                    //$("#dataset1").prop('checked', true); // Unchecks it
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

$("#getValuationCity").click(function () {
    // var SearchName = Cookies.get('SearchName');
    //var SName = utility.getCookie('SearchName');

    CityTrendsModule.getvaluation();
});

$('#CAGRListCity a').on('click', function () {
    var value = $(this).html();
    $("#CAGRDropDownTextCity").text(value);

    var temp_t = value.split('Y')[0];
    var t = Number(temp_t.split(' ')[1]);
    CityTrendsModule.CAGRCalculation(t);
});

$("#CityTrendIndex").click(function () {

    $("#CityTrendIndex").addClass('active');
    $('#CityPriceIndex').removeClass('active');
    CityTrendsModule.MultilinegraphIndex();
});
$("#CityTrendPrice").click(function () {

    $("#CityTrendPrice").addClass('active');
    $('#CityTrendIndex').removeClass('active');
    CityTrendsModule.Multilinegraph();
});

//$('#dataset0').click(function () {
//    if ($(this).is(":checked"))
//        alert("checked Score: " + $(this).data("Score"));
//    else
//        alert("not checked Score: " + $(this).data("Score"));
//});

//$("input[type='checkbox']").change(function () {
//    alert("Event is bound");
//});

function citycheckboxchnage(event) {

    $('#checkCityALL').prop('checked', false); // Unchecks it
    console.log("change" + event.currentTarget.id);

    var value = event.currentTarget.id;
    var valuetobeSent = value.split('dataset')[1];
    CityTrendsModule.checkboxEffect(valuetobeSent);

}
function cityALLchnage(event) {

    //$('#checkCityALL').prop('checked', false); // Unchecks it
    if (event.target.checked) {
        CityTrendsModule.checkboxEffect(undefined, true, false);
    }
    else {
        CityTrendsModule.checkboxEffect(undefined,true,true);
    }

    console.log("All Changechange" + event);

    //var value = event.currentTarget.id;
    //var valuetobeSent = value.split('dataset')[1];
    //

}


function goBackCity() {
    window.history.back()
}


