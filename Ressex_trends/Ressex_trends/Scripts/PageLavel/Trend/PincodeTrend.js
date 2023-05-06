var RspData;
var result;

var TotalData1 = '';
var Bardatasource = '';
var UserType = '';

var PincodeTrendsModule = function () {
    var TotalData;
    return {
        init: function () {
            $("#valTxtPincode").text('Just one step away from getting your current property valuation...');
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
                "lookup": "Pincode",
                "json_str": JSON.stringify(jsonstr)
            }
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            RspData = utility.ajaxselect(APIkey, Payload, "Post", false);

            TotalData = RspData;
            console.log(RspData);
            $("#screenNamePincode").text(RspData.data[0].screen_name);
            $("#qtrTextPincode").text(RspData.data[0].current_qtr_text);
            $("#rateTxtPincode").text(RspData.data[0].current_rate_in_txt);
            $("#cagrPctPincode").text(RspData.data[0].cagr_last_1yr_pct);
            $("#CAGRDropDownTextPincode").text("CAGR 3Y");
            $("#calculatedCAGRPincode").text(RspData.data[0].cagr_last_3yr_pct);

            common.dtpicker_cal("#fromDateIDPincode");
            PincodeTrendsModule.Multilinegraph();


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
            var PincodeLine = [];
            var SubRegionLine = [];
            var RegionLine = [];
            var CityLine = [];
            var Graphlabels = [];
            TotalData.data.forEach(function (item) {
                if (item.pincode_saleable_rate == 0) {
                    PincodeLine.push(null);
                }
                else {
                    PincodeLine.push(item.pincode_saleable_rate);
                }

                //Sub Region Check
                if (item.subregion_or_suburb_saleable_rate == 0) {
                    SubRegionLine.push(null);
                }
                else {
                    SubRegionLine.push(item.subregion_or_suburb_saleable_rate);
                }

                //Region Check
                if (item.region_saleable_rate == 0) {
                    RegionLine.push(null);
                }
                else {
                    RegionLine.push(item.region_saleable_rate);
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

            var dataSecond = {
                label: "Pincode",
                data: PincodeLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].pincode_color
            };
            var dataThird = {
                label: "Sub Region",
                data: SubRegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].region_color
            };

            var dataFourth = {
                label: "Region",
                data: RegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].suburb_color
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

            totaldataset.push(dataSecond);
            totaldataset.push(dataThird);
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Quater', "Y": 'Saleable Rate in ₹/sqft' });

            //  label = OsgroupbyDate;
            var Linedatasource = utility.bindmultilinedinamic("scanlinePincode", totaldataset, true, axistxt, label, ticks);


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
            var PincodeLine = [];
            var SubRegionLine = [];
            var RegionLine = [];
            var CityLine = [];
            var Graphlabels = [];
            TotalData.data.forEach(function (item) {
                if (item.pincode_price_index == 0) {
                    PincodeLine.push(null);
                }
                else {
                    PincodeLine.push(item.pincode_price_index);
                }

                //Sub Region Check
                if (item.subregion_or_suburb_price_index == 0) {
                    SubRegionLine.push(null);
                }
                else {
                    SubRegionLine.push(item.subregion_or_suburb_price_index);
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

            var dataSecond = {
                label: "Pincode",
                data: PincodeLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].pincode_color
            };
            var dataThird = {
                label: "Sub Region",
                data: SubRegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].region_color
            };

            var dataFourth = {
                label: "Region",
                data: RegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].suburb_color
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

            totaldataset.push(dataSecond);
            totaldataset.push(dataThird);
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Time', "Y": 'Price Index' });

            //  label = OsgroupbyDate;
            var Linedatasource = utility.bindmultilinedinamic("scanlinePincode", totaldataset, true, axistxt, label, ticks);


        },
        getvaluation: function () {
            var jsonstr = {
                "id": result.Id,
                "orig_value_rs": $("#OrgvaluePincode").val(),
                "orig_date": $("#fromDateIDPincode").val()
            };
            var Payload = {
                "lookup": "pincode_valuation",
                "json_str": JSON.stringify(jsonstr)
            };
            
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            var retData = utility.ajaxselect(APIkey, Payload, "Post", false);
            console.log(retData);

            if (retData.status == "OK") {
                $("#currValPincode").text(retData.data[0].current_valuation_rs);
                $("#valTxtPincode").text(retData.data[0].current_value_text_popup);
            }
            else {
                $("#currValPincode").text('');
                $("#valTxtPincode").text('');
            }

        },
        CAGRCalculation: function (t) {
            var attributetobeUsed;
            if (TotalData.data[0].pincode_line_flag == 1) {
                attributetobeUsed = "pincode_saleable_rate";
            }
            else if (TotalData.data[0].suburb_line_flag == 1) {
                attributetobeUsed = "subregion_or_suburb_saleable_rate";
            }
            else if (TotalData.data[0].region_line_flag == 1) {
                attributetobeUsed = "region_saleable_rate";
            }
            else if (TotalData.data[0].city_line_flag == 1) {
                attributetobeUsed = "city_saleable_rate";
            }
            

            var formulaCalulator = common.CAGRFormularCalulation(t, (TotalData.data.length - 1), TotalData.data, attributetobeUsed);
            $("#calculatedCAGRPincode").text(formulaCalulator);
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

    }
}();

$("#getValuationPincode").click(function () {
    // var SearchName = Cookies.get('SearchName');
    //var SName = utility.getCookie('SearchName');

    PincodeTrendsModule.getvaluation();
});

$('#CAGRListPincode a').on('click', function () {
    var value = $(this).html();
    $("#CAGRDropDownTextPincode").text(value);

    var temp_t = value.split('Y')[0];
    var t = Number(temp_t.split(' ')[1]);
    PincodeTrendsModule.CAGRCalculation(t);
});

$("#PincodeTrendIndex").click(function () {

    $("#PincodeTrendIndex").addClass('active');
    $('#PincodePriceIndex').removeClass('active');
    PincodeTrendsModule.MultilinegraphIndex();
});
$("#PincodeTrendPrice").click(function () {

    $("#PincodeTrendPrice").addClass('active');
    $('#PincodeTrendIndex').removeClass('active');
    PincodeTrendsModule.Multilinegraph();
});

function goBack() {
    window.history.back()
}

