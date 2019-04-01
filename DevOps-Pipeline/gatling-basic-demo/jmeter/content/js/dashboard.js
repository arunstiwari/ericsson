/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 6;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [1.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/userdelete_en-0"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/userdelete_en-1"], "isController": false}, {"data": [1.0, 500, 1500, "SearchValidUser"], "isController": true}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/"], "isController": false}, {"data": [1.0, 500, 1500, "RegistrationStep"], "isController": true}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/user_en"], "isController": false}, {"data": [1.0, 500, 1500, "SearchUserStep"], "isController": true}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/user_en-0"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/-0"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/usersearch_en?email=arunstiwari%40gmail.com"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/userdelete_en"], "isController": false}, {"data": [1.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/-1"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/usersearch_en?email=arunstiwari%40gmail.com-1"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/user_en-1"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/usersearch_en?email=arunstiwari%40gmail.com-0"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/usersearch_en?email=ARUNSTIWARI%40GMAIL.COM-1"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/usersearch_en?email=ARUNSTIWARI%40GMAIL.COM"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/localhost:9080\/usersearch_en?email=ARUNSTIWARI%40GMAIL.COM-0"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 21, 0, 0.0, 11.380952380952383, 2, 81, 35.600000000000016, 76.89999999999995, 81.0, 0.3432438175250486, 2.9966794225331395, 0.19167000375933707], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["http:\/\/localhost:9080\/userdelete_en-0", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 166.66666666666666, 212.07682291666666, 81.21744791666667], "isController": false}, {"data": ["http:\/\/localhost:9080\/userdelete_en-1", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 500.0, 87.890625, 247.55859375], "isController": false}, {"data": ["SearchValidUser", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 144.82421875, 98.2421875], "isController": true}, {"data": ["http:\/\/localhost:9080\/", 2, 0, 0.0, 8.5, 8, 9, 9.0, 9.0, 9.0, 0.0831739166597355, 0.12045597500623804, 0.06359880541462197], "isController": false}, {"data": ["RegistrationStep", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 145.34505208333334, 87.29383680555556], "isController": true}, {"data": ["http:\/\/localhost:9080\/user_en", 2, 0, 0.0, 49.5, 18, 81, 81.0, 81.0, 81.0, 0.37257824143070045, 15.73160686009687, 0.3238228856184799], "isController": false}, {"data": ["SearchUserStep", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 175.45572916666669, 87.29383680555556], "isController": true}, {"data": ["http:\/\/localhost:9080\/user_en-0", 2, 0, 0.0, 26.5, 13, 40, 40.0, 40.0, 40.0, 0.37292560134253216, 0.5457314586052582, 0.16315495058735782], "isController": false}, {"data": ["http:\/\/localhost:9080\/-0", 2, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 0.08319467554076539, 0.10586197483361065, 0.02892314891846922], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=arunstiwari%40gmail.com", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 116.796875, 80.6640625], "isController": false}, {"data": ["http:\/\/localhost:9080\/userdelete_en", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 144.82421875, 98.2421875], "isController": false}, {"data": ["Test", 1, 0, 0.0, 99.0, 99, 99, 99.0, 99.0, 99.0, 10.101010101010102, 853.0026830808081, 17.558396464646464], "isController": true}, {"data": ["http:\/\/localhost:9080\/-1", 2, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 0.08319121500769519, 0.014623455763071419, 0.034690086726841644], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=arunstiwari%40gmail.com-1", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 333.3333333333333, 58.59375, 138.99739583333334], "isController": false}, {"data": ["http:\/\/localhost:9080\/user_en-1", 2, 0, 0.0, 3.5, 2, 5, 5.0, 5.0, 5.0, 0.3779289493575208, 15.404479934334846, 0.16312948790627363], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=arunstiwari%40gmail.com-0", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 200.0, 198.4375, 77.9296875], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=ARUNSTIWARI%40GMAIL.COM-1", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 500.0, 87.890625, 208.49609375], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=ARUNSTIWARI%40GMAIL.COM", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 111.1111111111111, 189.99565972222223, 89.62673611111111], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=ARUNSTIWARI%40GMAIL.COM-0", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 250.0, 383.544921875, 97.412109375], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 21, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
