var RspData;
var result;

var TotalData1 = '';
var Bardatasource = '';
var UserType = '';

var PincodeTrendsModule = function () {
    var TotalData;
    var graphvariable;
    var CheckboxIDs = [];
    return {
        init: function () {
            $("#valTxtPincode").text('Just one step away from getting your current property valuation...');
            var QueryStringARR = common.GetQueryString();
            result = common.GetTrendsTypePayload(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {
                $("#PincodeTrendGraphChanger").remove();
                $('#PincodeCheckbox').remove();
                $('#PincodeTrendGraph').hide();
            }
            else {
                $('#PincodeNologinmask').hide();
                $("#PincodeCheckboxNoLoginMask").remove();
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
            PincodeTrendsModule.checkboxTrend();


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
                label: TotalData.data[0].pincode_text,
                labelvalue: TotalData.data[0].pincode_name,
                data: PincodeLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].pincode_color
            };
            var dataThird = {
                label: TotalData.data[0].suburb_text,
                labelvalue: TotalData.data[0].suburb_name,
                data: SubRegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].suburb_color
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

            totaldataset.push(dataSecond);
            totaldataset.push(dataThird);
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Quarter', "Y": 'Saleable Rate in ₹/sqft', "color": '#192447' });

            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlinePincode", totaldataset, true, axistxt, label, ticks);


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
                label: TotalData.data[0].pincode_text,
                labelvalue: TotalData.data[0].pincode_name,
                data: PincodeLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].pincode_color
            };
            var dataThird = {
                label: TotalData.data[0].suburb_text,
                labelvalue: TotalData.data[0].suburb_name,
                data: SubRegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].suburb_color
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

            totaldataset.push(dataSecond);
            totaldataset.push(dataThird);
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Time', "Y": 'Price Index', "color": '#192447' });

            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlinePincode", totaldataset, true, axistxt, label, ticks);


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
        PincodeCsvExport: function () {
            //////CSV structure//////
            var arr = TotalData.data;
            var item = arr.length > 0 ? arr : [];
            var itemsFormatted = [];
            var blank = {
                col1: "",
                col2: "",
                col3: "",

            };
            var header = {
                col1: "Quarter",
                col2: "Pincode",
                col3: "Suburb",
                col4: "region",
                col5: "city",
                col6: "pincode_saleable_rate_psf",
                col7: "pincode_price_index",
                col8: "pincode_price_index_tag",
                col9: "suburb_saleable_rate_psf",
                col10: "suburb_price_index",
                col11: "suburb_price_index_tag",
                col12: "region_saleable_rate_psf",
                col13: "region_price_index",
                col14: "region_price_index_tag",
                col15: "city_saleable_rate_psf",
                col16: "city_price_index",
                col17: "city_price_index_tag",

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.dos_month_year,     //.replace(/,/g, "|"),
                    col5: subitem.pincode,
                    col3: subitem.subregion_or_suburb,     //.replace(/,/g, "|"),
                    col4: subitem.region,
                    col5: subitem.city,
                    col6: subitem.pincode_saleable_rate,     //.replace(/,/g, "|"),
                    col7: subitem.pincode_price_index,
                    col8: subitem.pincode_price_index_tag,
                    col9: subitem.subregion_or_suburb_saleable_rate,     //.replace(/,/g, "|"),
                    col10: subitem.subregion_or_suburb_price_index,
                    col11: subitem.subregion_or_suburb_price_index_tag,
                    col12: subitem.region_saleable_rate,     //.replace(/,/g, "|"),
                    col13: subitem.region_price_index,
                    col14: subitem.region_price_index_tag,
                    col15: subitem.city_saleable_rate,     //.replace(/,/g, "|"),
                    col16: subitem.city_price_index,
                    col17: subitem.city_price_index_tag,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Pincode_Trends";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        checkboxTrend: function () {
            const legend = $("#PincodeCheckbox");
            var st = ''
            st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox all">\
                                <input type="checkbox" class="custom-control-input" onchange="pincodeALLchnage(event)" id="checkPincodeALL" checked="true">\
                                <label class="custom-control-label pointer" for="checkPincodeALL">ALL</label>\
                            </div>\
                            <div class="cityNameCol"></div>\
                        </div >';

            graphvariable.data.datasets.forEach((dataset, index) => {
                console.log('dataset' + dataset);
                CheckboxIDs.push("dataset" + index);
                /* onchange = citycheckboxchnage('+ id+')"*/
                st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox">\
                                <input type="checkbox" class="custom-control-input" onchange="pincodecheckboxchnage(event)" id="dataset'+ index + '" checked="true">\
                                <label class="custom-control-label pointer" style="--checkboxshadow:'+ dataset.borderColor + '; --checkboxBorder:' + dataset.borderColor + '; --checkboxFocus:' + dataset.borderColor +'" for="dataset'+ index + '">' + dataset.label + '</label>\
                            </div>\
                            <div class="cityNameCol">'+ dataset.labelvalue + '</div>\
                        </div >';
            });

            $("#PincodeCheckbox").append(st);
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
$("#PincodeCSVDownload").click(function () {

    PincodeTrendsModule.PincodeCsvExport();
});

function pincodecheckboxchnage(event) {

    $('#checkPincodeALL').prop('checked', false); // Unchecks it
    console.log("change" + event.currentTarget.id);

    var value = event.currentTarget.id;
    var valuetobeSent = value.split('dataset')[1];
    PincodeTrendsModule.checkboxEffect(valuetobeSent);

}
function pincodeALLchnage(event) {


    if (event.target.checked) {
        PincodeTrendsModule.checkboxEffect(undefined, true, false);
    }
    else {
        PincodeTrendsModule.checkboxEffect(undefined, true, true);
    }
}

function goBack() {
    window.history.back()
}

