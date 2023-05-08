var RspData;
var result;

var TotalData1 = '';
var Bardatasource = '';
var UserType = '';

var ProjectTrendsModule = function () {
    var TotalData;
    var graphvariable;
    var CheckboxIDs = [];
    return {
        init: function () {
            $("#valTxtProject").text('Just one step away from getting your current property valuation...');
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
                "lookup": "Project",
                "json_str": JSON.stringify(jsonstr)
            }
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            RspData = utility.ajaxselect(APIkey, Payload, "Post", false);
            
            TotalData = RspData;
            console.log(RspData);
            $("#screenNameProject").text(RspData.data[0].screen_name);
            $("#qtrTextProject").text(RspData.data[0].current_qtr_text);
            $("#rateTxtProject").text(RspData.data[0].current_rate_in_txt);
            $("#cagrPctProject").text(RspData.data[0].cagr_last_1yr_pct);
            $("#CAGRDropDownTextProject").text("CAGR 3Y");
            $("#calculatedCAGRProject").text(RspData.data[0].cagr_last_3yr_pct);
            
            common.dtpicker_cal("#fromDateIDProject");
            ProjectTrendsModule.Multilinegraph();
            ProjectTrendsModule.checkboxTrend();
           
            
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
            //data= [0, 59, 75, 20, 20, 55, 40],
            var projectLine = [];
            var PincodeLine = [];
            var SubRegionLine = [];
            var RegionLine = [];
            var CityLine = [];
            var Graphlabels = [];
            
            TotalData.data.forEach(function (item) {
                console.log(item.project_price_index_tag);
                //Project Check
                if (item.project_saleable_rate == 0) {
                    projectLine.push(null);
                }
                else {
                    projectLine.push(item.project_saleable_rate);
                }

                //Pincode Check
                if (item.pincode_saleable_rate == 0) {
                    PincodeLine.push(null);
                }
                else {
                    PincodeLine.push(item.pincode_saleable_rate);
                }

                //SubRegion Check
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
            var dataFirst = {
                label: TotalData.data[0].project_text,
                labelvalue: TotalData.data[0].project_name,
                data: projectLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].project_color
            };

            var dataSecond = {
                label: TotalData.data[0].pincode_text,
                labelvalue: TotalData.data[0].pincode_name,
                data: PincodeLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].pincode_color
            };
            var dataThird = {
                label: TotalData.data[0].region_text,
                labelvalue: TotalData.data[0].region_name,
                data: SubRegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].region_color
            };

            var dataFourth = {
                label: TotalData.data[0].suburb_text,
                labelvalue: TotalData.data[0].suburb_name,
                data: RegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].suburb_color
            };
            var dataFifth = {
                label: TotalData.data[0].city_text,
                labelvalue: TotalData.data[0].city_name,
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };
           // label.push(item.dos_month_year);
           
            label = Graphlabels;
               
           
            //    TotalData.data.forEach(function (item) {
            //    totaldataset.push({
            //        //"label": "lbl",
            //        "data": item.project_saleable_rate,  //OsgroupbyDate
            //        "fill": false,
            //        "borderColor": item.project_color, //randomcolour(),
            //        "backgroundColor": item.project_color
            //    });
            //        label.push(item.dos_month_year);
            //});
            
            var totaldataset = [];
            totaldataset.push(dataFirst);
            totaldataset.push(dataSecond);
            totaldataset.push(dataThird);
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

                axistxt.push({ "X": 'Quarter', "Y": 'Saleable Rate in ₹/sqft' });
          
            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlineProject", totaldataset, true, axistxt, label, ticks);
           
           
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
            //data= [0, 59, 75, 20, 20, 55, 40],
            var projectLine = [];
            var PincodeLine = [];
            var SubRegionLine = [];
            var RegionLine = [];
            var CityLine = [];
            var Graphlabels = [];

            TotalData.data.forEach(function (item) {
                console.log(item.project_price_index_tag);
                //Project Check
                if (item.project_price_index == 0) {
                    projectLine.push(null);
                }
                else {
                    projectLine.push(item.project_price_index);
                }

                //Pincode Check
                if (item.pincode_price_index == 0) {
                    PincodeLine.push(null);
                }
                else {
                    PincodeLine.push(item.pincode_price_index);
                }

                //SubRegion Check
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
            var dataFirst = {
                label: TotalData.data[0].project_text,
                labelvalue: TotalData.data[0].project_name,
                data: projectLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].project_color
            };

            var dataSecond = {
                label: TotalData.data[0].pincode_text,
                labelvalue: TotalData.data[0].pincode_name,
                data: PincodeLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].pincode_color
            };
            var dataThird = {
                label: TotalData.data[0].region_text,
                labelvalue: TotalData.data[0].region_name,
                data: SubRegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].region_color
            };

            var dataFourth = {
                label: TotalData.data[0].suburb_text,
                labelvalue: TotalData.data[0].suburb_name,
                data: RegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].suburb_color
            };
            var dataFifth = {
                label: TotalData.data[0].city_text,
                labelvalue: TotalData.data[0].city_name,
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };
            // label.push(item.dos_month_year);

            label = Graphlabels;


            //    TotalData.data.forEach(function (item) {
            //    totaldataset.push({
            //        //"label": "lbl",
            //        "data": item.project_saleable_rate,  //OsgroupbyDate
            //        "fill": false,
            //        "borderColor": item.project_color, //randomcolour(),
            //        "backgroundColor": item.project_color
            //    });
            //        label.push(item.dos_month_year);
            //});

            var totaldataset = [];
            totaldataset.push(dataFirst);
            totaldataset.push(dataSecond);
            totaldataset.push(dataThird);
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Time', "Y": 'Price Index' });

            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlineProject", totaldataset, true, axistxt, label, ticks);


        },
        getvaluation: function (SName) {
            switch (SName) {
                case "project":
                    var jsonstr = {
                        "id": result.Id,
                        "pin_input": RspData.data[0].pincode,
                        "orig_value_rs": $("#OrgvalueProject").val(),
                        "orig_date": $("#fromDateIDProject").val()
                    }
                    var Payload = {
                        "lookup": "project_valuation",
                        "json_str": JSON.stringify(jsonstr)
                    }
                    break;
                    //return Payload;
                case "location":
                    var jsonstr = {
                        "id": result.locationid,
                        "orig_value_rs": $("#Orgvalue").val(),
                        "orig_date": $("#fromDateID").val()
                    }
                    var Payload = {
                        "lookup": "location_valuation",
                        "json_str": JSON.stringify(jsonstr)
                    }
                        break;
                    //return Payload;
                case "pincode":
                    var jsonstr = {
                        "id": result.pincode,
                        "orig_value_rs": $("#Orgvalue").val(),
                        "orig_date": $("#fromDateID").val()
                    }
                    var Payload = {
                        "lookup": "pincode_valuation",
                        "json_str": JSON.stringify(jsonstr)
                    }
                    break;
                    //return Payload;
              
                case "city":
                    var jsonstr = {
                        "id": result.city_id,
                        "orig_value_rs": $("#Orgvalue").val(),
                        "orig_date": $("#fromDateID").val()
                    }
                    var Payload = {
                        "lookup": "city_valuation",
                        "json_str": JSON.stringify(jsonstr)
                    }
                    //return Payload;
                    break;
            }
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            var retData = utility.ajaxselect(APIkey, Payload, "Post", false);
            console.log(retData);

            if (retData.status == "OK") {
                $("#currValProject").text(retData.data[0].current_valuation_rs);
                $("#valTxtProject").text(retData.data[0].current_value_text_popup);
            }
            else {
                $("#currValProject").text('');
                $("#valTxtProject").text('');
            }

        },
        CAGRCalculation: function (t) {
            var attributetobeUsed;
            if (TotalData.data[0].project_line_flag == 1) {
                attributetobeUsed = "project_saleable_rate";
            }
            else if (TotalData.data[0].suburb_line_flag  == 1) {
                attributetobeUsed = "subregion_or_suburb_saleable_rate";
            }
            else if (TotalData.data[0].region_line_flag  == 1) {
                attributetobeUsed = "region_saleable_rate";
            }
            else if (TotalData.data[0].city_line_flag  == 1) {
                attributetobeUsed = "city_saleable_rate";
            }
            else if (TotalData.data[0].pincode_line_flag  == 1) {
                attributetobeUsed = "pincode_saleable_rate";
            }

            var formulaCalulator = common.CAGRFormularCalulation(t, (TotalData.data.length-1), TotalData.data, attributetobeUsed);
            $("#calculatedCAGRProject").text(formulaCalulator);
        },        
        ProjectCsvExport: function () {
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
                col2: "Project",
                col3: "Pincode",
                col4: "Suburb",
                col5: "region",
                col6: "city",
                col7: "project_saleable_rate_psf",
                col8: "project_price_index",
                col9: "project_price_index_tag",
                col10: "pincode_saleable_rate_psf",
                col11: "pincode_price_index",
                col12: "pincode_price_index_tag",
                col13: "suburb_saleable_rate_psf",
                col14: "suburb_price_index",
                col15: "suburb_price_index_tag",
                col16: "region_saleable_rate_psf",
                col17: "region_price_index",
                col18: "region_price_index_tag",
                col19: "city_saleable_rate_psf",
                col20: "city_price_index",
                col21: "city_price_index_tag",

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.dos_month_year,     //.replace(/,/g, "|"),
                    col2: subitem.project_name,
                    col3: subitem.pincode,
                    col4: subitem.subregion_or_suburb,     //.replace(/,/g, "|"),
                    col5: subitem.region,
                    col6: subitem.city,
                    col7: subitem.project_saleable_rate,     //.replace(/,/g, "|"),
                    col8: subitem.project_price_index,
                    col9: subitem.project_price_index_tag,
                    col10: subitem.pincode_saleable_rate,     //.replace(/,/g, "|"),
                    col11: subitem.pincode_price_index,
                    col12: subitem.pincode_price_index_tag,
                    col13: subitem.subregion_or_suburb_saleable_rate,     //.replace(/,/g, "|"),
                    col14: subitem.subregion_or_suburb_price_index,
                    col15: subitem.subregion_or_suburb_price_index_tag,
                    col16: subitem.region_saleable_rate,     //.replace(/,/g, "|"),
                    col17: subitem.region_price_index,
                    col18: subitem.region_price_index_tag,
                    col19: subitem.city_saleable_rate,     //.replace(/,/g, "|"),
                    col20: subitem.city_price_index,
                    col21: subitem.city_price_index_tag,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Project_Trends";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        checkboxTrend: function () {
            const legend = $("#ProjectCheckbox");
            var st = ''
            st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox">\
                                <input type="checkbox" class="custom-control-input" onchange="projectALLchnage(event)" id="checkProjectALL" checked="true">\
                                <label class="custom-control-label pointer" for="checkProjectALL">ALL</label>\
                            </div>\
                            <div class="cityNameCol"></div>\
                        </div >';

            graphvariable.data.datasets.forEach((dataset, index) => {
                console.log('dataset' + dataset);
                CheckboxIDs.push("dataset" + index);
                /* onchange = citycheckboxchnage('+ id+')"*/
                st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox light-purple">\
                                <input type="checkbox" class="custom-control-input" onchange="projectcheckboxchnage(event)" id="dataset'+ index + '" checked="true">\
                                <label class="custom-control-label pointer" for="dataset'+ index + '">' + dataset.label + '</label>\
                            </div>\
                            <div class="cityNameCol">'+ dataset.labelvalue + '</div>\
                        </div >';
            });

            $("#ProjectCheckbox").append(st);
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

$("#getValuationProject").click(function () {
   // var SearchName = Cookies.get('SearchName');
    //var SName = utility.getCookie('SearchName');

    ProjectTrendsModule.getvaluation('project');
});

$('#CAGRListProject a').on('click', function () {
    var value = $(this).html();
    $("#CAGRDropDownTextProject").text(value);

    var temp_t = value.split('Y')[0];
    var t = Number(temp_t.split(' ')[1]);
    ProjectTrendsModule.CAGRCalculation(t);
});
$("#ProjectTrendIndex").click(function () {

    $("#ProjectTrendIndex").addClass('active');
    $('#ProjectTrendPrice').removeClass('active');
    ProjectTrendsModule.MultilinegraphIndex();
});
$("#ProjectTrendPrice").click(function () {

    $("#ProjectTrendPrice").addClass('active');
    $('#ProjectTrendIndex').removeClass('active');
    ProjectTrendsModule.Multilinegraph();
});

$("#ProjectCSVDownload").click(function () {

    ProjectTrendsModule.ProjectCsvExport();
});

function projectcheckboxchnage(event) {

    $('#checkProjectALL').prop('checked', false); // Unchecks it
    console.log("change" + event.currentTarget.id);

    var value = event.currentTarget.id;
    var valuetobeSent = value.split('dataset')[1];
    ProjectTrendsModule.checkboxEffect(valuetobeSent);

}
function projectALLchnage(event) {


    if (event.target.checked) {
        ProjectTrendsModule.checkboxEffect(undefined, true, false);
    }
    else {
        ProjectTrendsModule.checkboxEffect(undefined, true, true);
    }
}
