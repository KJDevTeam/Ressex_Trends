var serverstr = 'https://api.liasesforas.com/LF/api/';
var BaseUrl = 'https://api.liasesforas.com/LF/api/';
if (typeof (utility) === "undefined") {
    utility = {};
}
utility._btntimeout = function () {
    return 1000;
}
utility.ServiceAPIURL = function (url) {
    //var GetUrl = window.location.href;
    //return GetUrl + url;

    var GetUrl = window.location.href.split(':');
    if (GetUrl[1] == "//localhost") {
       // return window.location.origin + '/' + url;
        return serverstr + url;
    }
    else {
        //return window.location.origin + '/' + window.location.pathname.split('/')[1] + url;
        return serverstr + url;
    }
};
utility.FrontEndAPIURL = function (url) {
    //var GetUrl = window.location.href;
    //return GetUrl + url;

    var GetUrl = window.location.href.split(':');
    if (GetUrl[1] == "//localhost") {
        return window.location.origin + '/' + url;
        
    }
    else {
        return window.location.origin + '/' + window.location.pathname.split('/')[1] + '/' +  url;
        
    }
};

utility.getCookie_old = function (c_name) {
    var i, x, y, m, n = null, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        if (x != "") {
            var ARRcookiesVal = y.split("&");
            if (ARRcookiesVal.length > 0) {
                for (j = 0; j < ARRcookiesVal.length; j++) {
                    m = ARRcookiesVal[j].substr(0, ARRcookiesVal[j].indexOf("="));
                    n = ARRcookiesVal[j].substr(ARRcookiesVal[j].indexOf("=") + 1);
                    m = m.replace(/^\s+|\s+$/g, "");
                    if (m == c_name) {
                        return unescape(n);
                        break;
                    }
                    else {
                        n = "";
                        //return n;
                    }
                }

            }
        }
        else {

            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    }
    return unescape(n);
};
utility.getCookie = function (cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
utility.checkCookie =function (name) {
    let userdetails = utility.getCookie(name);
    if (userdetails != "") {
        return true;
        /*alert("Welcome again " + username);*/
    } else {
       /* alert("call RFT");*/
        return false;
    }
    
}
utility.setCookie_old = function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};
utility.setCookie = function setCookie(cname, cvalue,expTime) {
    var d = new Date();
    d.setTime(d.getTime() + (expTime* 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};
utility.ajaxselect = function (urlToHandler, jsonData, requestType, async) {
    var FinalData;
    $.ajax({
        url: urlToHandler,
        data: jsonData,
        dataType: 'json',
        async: async,
        ////contentType: 'application/json',
        ////requestType: requestType,
        traditional: true,
        type: requestType,
        beforeSend: function (xhr) {
            var val = utility.checkCookie("access_token");
            if (val == false) {
                var cName = "user_details";
                var user_details = utility.getCookie(cName);
                console.log(user_details);
                if (user_details != "") {
                    var refresh_token = JSON.parse(user_details).token.refresh_token;
                }
                else {
                    window.location.replace(window.location.origin);
                }
                var APIkey = utility.ServiceAPIURL("Dashboard/token?refresh_token=" + refresh_token);
                var rsp = utility.ajaxselectforRefreshToken(APIkey, "", "Get", false);
                if (rsp.status != "OK") {
                    window.location.replace(window.location.origin);
                }
                console.log(rsp);
                utility.setCookie("access_token", rsp.access_token, rsp.expires_in);
            }
            xhr.setRequestHeader('Authorization', 'bearer ' +utility.getCookie("access_token"));
        },
        success: function (allData) {
            FinalData = allData;

        },
        error: function (data, status, jqXHR) {

        }


    });
   return FinalData;

};

utility.ajaxselectforRefreshToken = function (urlToHandler, jsonData, requestType, async) {
    var FinalData;
    $.ajax({
        url: urlToHandler,
        data: jsonData,
        dataType: 'json',
        async: async,
        ////contentType: 'application/json',
        ////requestType: requestType,
        traditional: true,
        type: requestType,
        success: function (allData) {
            FinalData = allData;

        },
        error: function (data, status, jqXHR) {

        }


    });
    return FinalData;

};


utility.callajax = function (urlToHandler, jsonData, requestType, async)
{
    var FinalData;
        $.ajax({
            type: "post",
            url: "/Home/GetDistrict",
            data: { stateId: $('#ddlState').val() },
            datatype: "json",
            traditional: true,
            success: function (data) {
                FinalData = data;
            },
             error: function (data, status, jqXHR) {

            }
        });
    return FinalData;
}

utility.ajaxput = function (urlToHandler, jsonData, requestType, async, modal, successmsg) {
    var FinalData;
    $.ajax({
        url: urlToHandler,
        data: jsonData,
        dataType: 'json',
        async: async,
        contentType: 'application/json',
        requestType: requestType,
        success: function (allData) {
            FinalData = allData;
            if (modal == true) {

                utility.Modal("Ok", successmsg, allData);


            }
        },
        error: function (data, status, jqXHR) {
            utility.Error(data, status, jqXHR);
            $('#error').html("Internal Server error");
        }


    });

    return FinalData;

};
//utility.bindSelect = function (Controlid, valf, txf, datalst, isautocomplete, Selecteddata,SpecialControl) {
//    //SpecialControl means if we don't want select with o value to be pushed in dropdown
//    $(Controlid).empty();
//    if (isautocomplete) {
//        if (Selecteddata == undefined)
//            Selecteddata = "--Select--";
//        var encapsulatedata = utility.buildautocompleteListdata(datalst, valf, txf, Selecteddata, SpecialControl);
//        $(Controlid).select2({
//            data: encapsulatedata,
//        });
//        $('.select2').addClass('select2-custom');

//    }
//    else {
//        var encapsulatedata = utility.buildListdata(datalst, valf, txf);
//        $(Controlid).append($("<option />").val(-1).text("--Select--"));
//        $.each(encapsulatedata, function (key, value) {
//            $(Controlid).append($("<option />").val(value.Value).text(value.Text));
//        });
//    }

//};
//utility.buildListdata = function (data, valf, txf) {
//    var arr = [];
//    data.forEach(function (value) {
//        var valuefield;
//        var textfield;
//        Object.keys(value).forEach(function (key) {
//            if (key === valf) {
//                valuefield = value[key];
//            }
//            else if (key === txf) {
//                textfield = value[key];
//            }
//        });
//        if (textfield == undefined) {
//            arr.push({ "Value": valuefield, "Text": valuefield });
//        }
//        else if (valuefield == undefined) {
//            arr.push({ "Value": textfield, "Text": textfield });
//        }
//        else if (textfield != undefined && valuefield != undefined) {
//            arr.push({ "Value": valuefield, "Text": textfield });
//        }

//    });
//    return arr;
//};
//utility.buildautocompleteListdata = function (data, valf, txf, Selecteddata, SpecialControl) {
//    if (SpecialControl) {
//        var arr = [];
//    }
//    else {
//        var arr = [{ "id": "0", "text": "--Select--" }];
//    }
    


//    data.forEach(function (value) {
//        var valuefield;
//        var textfield;
//        Object.keys(value).forEach(function (key) {
//            if (key === valf) {
//                valuefield = value[key];
//            }
//            else if (key === txf) {
//                textfield = value[key];
//            }
//        });
//        if (textfield == undefined) {
//            arr.push({ "id": valuefield, "text": valuefield });
//        }
//        else if (valuefield == undefined) {
//            arr.push({ "id": textfield, "text": textfield });
//        }
//        else if (textfield != undefined && valuefield != undefined) {
//            arr.push({ "id": valuefield, "text": textfield });
//        }

//    });

//    if (Array.isArray(Selecteddata)) {
//        $.each(arr, function (key, value) {
//            for (i = 0; i < Selecteddata.length; i++) {
//                if (value.id == Selecteddata[i])
//                    value.selected = true;
//            }
           
//        })
//    }
//    else {
//        $.each(arr, function (key, value) {
//            if (value.id == Selecteddata)
//                value.selected = true;
//        })
//    }
    


//    return arr;
//};

utility.logoffuserLogin= function () {
    var urlToHandler = utility.ServiceAPIURL("");
    var jsonData;
    jsonData = 'iTOKEN=';
    var data = utility.ajaxselect(urlToHandler, jsonData, "POST", false);
    sessionStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.setItem("Rtoken", Userdata[0].token);
    window.location.replace("/login.aspx");
}

/////////////////////////////JSON TO CSV///////////////////////////////

utility.convertToCSV = function (objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

utility.exportCSVFile = function (headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = utility.convertToCSV(jsonObject);
    var exportedFilenmae = fileTitle + '.csv';  //|| 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
utility.buildColoumnchart_attr = function (data, valf, Controlid,attr) {
    var arr = [];
    valf.forEach(function (v) {
        data.forEach(function (value) {
            var valuefield;
            var textfield;
            Object.keys(value).forEach(function (key) {
                if (key === v) {
                    if (valf == "transacted_value_rs") {
                        valuefield = value.transacted_value_rs;
                        gradcolor = value.srcolor;
                    } else {
                        valuefield = value.transaction_count;
                        gradcolor = value.srcolor;
                    }
                    if (Controlid == "TranBarColoumn") {
                        switch (attr) {
                            case 'TranDaily':
                                textfield = value.registration_date;
                                break;
                            case 'TranMonthly':
                                textfield = value.registration_month;
                                break;
                            case 'TranQuaterly':
                                textfield = value.dos_month_year;
                                break;
                            case 'TranYearly':
                                textfield = value.fy_year;
                                break;
                        }
                        
                    }
                    arr.push({
                        "valuefield": valuefield, "textfield": textfield,
                        "gradientcolor": gradcolor, "idfield": value.id != null ? value.id : ''
                    });
                }
            });
        });

    })
    return arr;
};
utility.buildColoumnchartdata = function (data, valf, Controlid) {
    var arr = [];
    valf.forEach(function (v) {
        data.forEach(function (value) {
            var valuefield;
            var textfield;
            Object.keys(value).forEach(function (key) {
                if (key === v) {
                    if (valf == "transacted_value_rs") {
                        valuefield = value.transacted_value_rs;
                        gradcolor = value.srcolor;
                    } else {
                        valuefield = value.transaction_count;
                        gradcolor = value.srcolor;
                    }
                    if (value.report_type == 'FLATGROUP_DISTRIBUTION') {
                        textfield = value.flatgroup_name;
                        gradcolor = value.srcolor;
                    } else if (Controlid == "Flatbarchart" || Controlid == "PropertyColoumn") {
                        textfield = value.carpet_area_range; 
                        gradcolor = value.srcolor;
                    }
                    else if (Controlid == "Agreementbarchart") {
                        textfield = value.cost_col_name;
                        gradcolor = value.crcolor;
                    }
                    else if (Controlid == "PropPricebarchart") {
                        textfield = value.pricerange;
                        gradcolor = value.rrcolor;
                    }
                    else if (Controlid == "PropertyTypeColoumn") {
                        textfield = value.age_range;
                        gradcolor = value.rrcolor;
                        valuefield = value.buyers_count;
                    }
                    else if (Controlid == "Buyerbarchart") {
                        textfield = value.buyers_type;
                        gradcolor = value.rrcolor;
                        valuefield = value.buyers_count;
                    }
                    else if (Controlid == "TranBarColoumn") {
                        textfield = value.registration_date;
                        gradcolor = value.rrcolor;
                        valuefield = value.transaction_count;
                    }
                    
                    arr.push({
                        "valuefield": valuefield, "textfield": textfield,
                        "gradientcolor": gradcolor,"idfield": value.id != null ? value.id : ''
                    });
                }
            });
        });

    })
    return arr;
};
utility.bindColoumnchart = function (Controlid, arrParam = ["Type", "Value"], datalst, Ytext, Xtext, attr) {
    var ColChart;
    Chart.helpers.each(Chart.instances, function (instance) {
        if (instance.canvas.id == Controlid) {
            ColChart = instance;
        }
    })
    var ctx = document.getElementById(Controlid).getContext("2d");

   /* var Gradient = ctx.createLinearGradient(0, 0, 1, 500);*/
    var Gradient = ctx.createLinearGradient(1, 1, 1, 300);
    Gradient.addColorStop(0, datalst[0].top_color);
    Gradient.addColorStop(1, datalst[0].bottom_color);
    
   
    //Gradient.addColorStop(0, 'rgb(120, 117, 192)');
    //Gradient.addColorStop(1, 'rgb(242, 139, 139)');
    if (Controlid == "TranBarColoumn") {
       
        var encapsulatedata = utility.buildColoumnchart_attr(datalst, arrParam, Controlid, attr);

    } else {
        var encapsulatedata = utility.buildColoumnchartdata(datalst, arrParam, Controlid);

    }
   // var encapsulatedata = utility.buildColoumnchartdata(datalst, arrParam, Controlid);

    ////////////////COL CHART/////////////////////
    var Coloumnlabels = [];
    var Coloumndata = [];
    var Coloumniddata = [];
    //var Gradient = [];
    for (i = 0; i < encapsulatedata.length; i++) {
        Coloumnlabels.push(encapsulatedata[i].textfield)
        Coloumndata.push(encapsulatedata[i].valuefield)
        Coloumniddata.push(encapsulatedata[i].idfield)
        //Gradient.push(encapsulatedata[i].gradientcolor)
    }
    var meta = ColChart;
    if (meta != undefined) {
        meta.destroy();
    }

    var config = {
        //var ColChart = new Chart(Controlid).Bar(chartData, {
        type: 'bar',
        data: {
            labels: Coloumnlabels,
            datasets: [
                {
                    label: "Data",
                    data: Coloumndata,
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: Gradient,
                    iddata: Coloumniddata
                    // yAxisID: 'clients',
                }
            ]
        },
        options: {
             responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            title: {
                display: false,
                fontSize: 10
            },
            
            plugins: {
                legend: {
                display: false
            },
                //datalabels: {
                //    //formatter: function (value, ctx) {
                //    //    var sum = 0;
                //    //    let dataArr = ctx.chart.data.datasets[0].data;
                //    //    dataArr.forEach(function (value) {
                //    //        sum = 100;
                //    //    });
                //    //    //if (value != 0) {
                //    //    let percentage = (parseFloat(value).toFixed(2) * 100 / sum) + "%";
                //    //    return percentage;
                //    //},
                //    font: {
                //        weight: "bold", color: "#000"
                //    }

                //},

            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: Ytext
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: Xtext 
                    }
                }
            },
            //scales: {
            //    xAxes: [{
            //        id: "Coloumnlabels",
            //        ticks: {
            //            autoSkip: false,
            //            fontStyle: "bold",
            //            fontSize: 12,
            //            callback: function (value, index, values) {
            //                return value;
            //            }
            //        }
            //    }
            //    ],
            //    yAxes: [
            //        {
            //            id: "Coloumndata",
            //            ticks: {
            //                fontStyle: "bold",
            //                fontSize: 11,
            //                beginAtZero: true,
            //                min: 0,
            //                max: 100,

            //            },
            //            scaleLabel: {
            //                display: true,
            //                //labelString: '%',
            //                fontSize: 10
            //            }
            //        }
            //    ]
            //},
            tooltips: {
                enabled: true, mode: 'index',
                intersect: false
            },
            //hover: { mode: null },
            hover: {
                mode: 'nearest',
                animationDuration: 0
            },
            onClick: (event, elements, chart) => {
                if (elements[0]) {

                    if (chart.canvas.id == "PropertyColoumn") {
                        const i = elements[0].index;
                        /*alert(chart.data.labels[i] + ': ' + chart.data.datasets[0].data[i]);*/
                        RegistrationSummaryModule.PropertyColumnClick(chart.data.labels[i]);
                    }
                   
                }
            }
        }
    }

    ColChart = new Chart(Controlid, config)
    //////////////////////END HERE///////////////////
    return ColChart;
}


utility.bindline = function (Controlid, lbl, dt, hovervals, ticks, responsive, colour, axistxt, titletxt) {
    var mylineChart;
    Chart.helpers.each(Chart.instances, function (instance) {
        if (instance.canvas.id == Controlid) {
            mylineChart = instance;
        }
    })
    var meta = mylineChart;
    if (meta != undefined) {
        meta.destroy();
    }
     var ctx = document.getElementById(Controlid).getContext("2d");
    //var gradient = ctx.createLinearGradient(0, 0, 1, 500);
    //gradient.addColorStop(0,'rgb(120, 117, 192)');
    //gradient.addColorStop(1,'rgb(242, 139, 139)');
    var config = {
        type: 'line',
        data: {
            labels: lbl,
            // dataPoints: hovervals,
            //tooltipItems: hovervals,
            datasets: [{
               /* label: 'data',
                borderColor: gradient, //'rgba(255,0,0)',
                backgroundColor: gradient,*/
                borderColor: colour,
                data: dt,
                //fill: true,
            }],

        },
        options: {
           /* responsive: responsive,*/
            maintainAspectRatio: false,
            plugins: {
                legend: false,
            },
            //responsive: false,
            //point: { display: false },
            //plugins: {
            //    datalabels: {
            //        display: false,
            //    },
            //},
            //title: {
            //    display: false,
            //    //text: titletxt
            //},
            //legend: {
            //    display: false
            //},
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: axistxt[0].Y
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: axistxt[0].X
                    }
                }
            },
           
        },
       
        //plugins: {
        //    legend: {
        //        display: false
               
        //    },
        //    //title: {
        //    //    display: false,
                
        //    //},
        //    //afterDraw: function (chart) {
        //    //    if (chart.data.labels.length === 0) {
        //    //        // No data is present
        //    //        var ctx = chart.chart.ctx;
        //    //        var width = chart.chart.width;
        //    //        var height = chart.chart.height
        //    //        chart.clear();

        //    //        ctx.save();
        //    //        ctx.textAlign = 'center';
        //    //        ctx.textBaseline = 'middle';
        //    //        ctx.font = "30px normal 'Helvetica Nueue'";
        //    //        ctx.fillText('No data to display', width / 2, height / 2);
        //    //        ctx.restore();
        //    //    }
        //    //}
        //}
    };
    lineChart = new Chart(Controlid, config);
   
        var divwidth = document.getElementById("price").offsetWidth;
        var divheight = document.getElementById("price").offsetHeight;
        ctx.canvas.parentNode.style.height = divheight;
        ctx.canvas.parentNode.style.width = divwidth;
    
    
       
   
    return lineChart;
}

utility.bindmultilinedinamic = function (Controlid, dataCritical, responsive, axistxt, label, ticks, tooltipTitle) {
    var ColChart;
    Chart.helpers.each(Chart.instances, function (instance) {
        if (instance.canvas.id == Controlid) {
            ColChart = instance;
        }
    })

    var meta = ColChart;
    if (meta != undefined) {
        meta.destroy();
    }


    tooltipTitle = "Actual";
    var chartOptions =
    {
        responsive: responsive,
        maintainAspectRatio:false,
        //bezierCurve: true,
        //point: { display: false },
        plugins: {
            datalabels: {
                display: false,
            },
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    title: function (tooltipItem) {
                        return tooltipTitle;                   
                        
                    },
                    label: function (tooltipItem) {
                        /*console.log(tooltipItem);*/
                        return tooltipItem.formattedValue;
                    }
                }
            }
        },
        //title: {
        //    display: true,
        //    text:'da' //titletxt
        //},
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 100,
                fontColor: 'black'
            }
        },
        
        scales: {
            y: {
                title: {
                    display: true,
                    text: axistxt[0].Y
                }
            },
            x: {
                title: {
                    display: true,
                    text: axistxt[0].X
                }
            }
        },
        
    }



    var MultilineData = {
        labels: label,
        datasets: dataCritical
    };

    var lineChart = new Chart(Controlid, {
        type: 'line',
        data: MultilineData,
        options: chartOptions,
       
    });

    return lineChart;
}

