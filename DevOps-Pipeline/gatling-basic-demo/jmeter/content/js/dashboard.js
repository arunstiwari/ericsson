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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 21, 0, 0.0, 11.523809523809522, 2, 75, 34.20000000000001, 71.19999999999995, 75.0, 0.3432550384936008, 2.996777386848428, 0.19167626963500548], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["http:\/\/localhost:9080\/userdelete_en-0", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 200.0, 254.4921875, 97.4609375], "isController": false}, {"data": ["http:\/\/localhost:9080\/userdelete_en-1", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 500.0, 87.890625, 247.55859375], "isController": false}, {"data": ["SearchValidUser", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 144.82421875, 98.2421875], "isController": true}, {"data": ["http:\/\/localhost:9080\/", 2, 0, 0.0, 9.5, 9, 10, 10.0, 10.0, 10.0, 0.0831739166597355, 0.12045597500623804, 0.06359880541462197], "isController": false}, {"data": ["RegistrationStep", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 145.34505208333334, 87.29383680555556], "isController": true}, {"data": ["http:\/\/localhost:9080\/user_en", 2, 0, 0.0, 49.0, 23, 75, 75.0, 75.0, 75.0, 0.3733432891543775, 15.763909954265447, 0.3244878196751913], "isController": false}, {"data": ["SearchUserStep", 1, 0, 0.0, 20.0, 20, 20, 20.0, 20.0, 20.0, 50.0, 157.91015625, 78.564453125], "isController": true}, {"data": ["http:\/\/localhost:9080\/user_en-0", 2, 0, 0.0, 24.0, 11, 37, 37.0, 37.0, 37.0, 0.37418147801683815, 0.5475692820392891, 0.16370439663236672], "isController": false}, {"data": ["http:\/\/localhost:9080\/-0", 2, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 0.08319467554076539, 0.10586197483361065, 0.02892314891846922], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=arunstiwari%40gmail.com", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 111.1111111111111, 129.77430555555557, 89.62673611111111], "isController": false}, {"data": ["http:\/\/localhost:9080\/userdelete_en", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 144.82421875, 98.2421875], "isController": false}, {"data": ["Test", 1, 0, 0.0, 98.0, 98, 98, 98.0, 98.0, 98.0, 10.204081632653061, 861.7067920918367, 17.737563775510203], "isController": true}, {"data": ["http:\/\/localhost:9080\/-1", 2, 0, 0.0, 2.5, 2, 3, 3.0, 3.0, 3.0, 0.0831981363617455, 0.014624672407338075, 0.034692972877407545], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=arunstiwari%40gmail.com-1", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 500.0, 87.890625, 208.49609375], "isController": false}, {"data": ["http:\/\/localhost:9080\/user_en-1", 2, 0, 0.0, 6.5, 3, 10, 10.0, 10.0, 10.0, 0.3784295175023652, 15.424883219016083, 0.16334555345316934], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=arunstiwari%40gmail.com-0", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 200.0, 198.4375, 77.9296875], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=ARUNSTIWARI%40GMAIL.COM-1", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 333.3333333333333, 58.59375, 138.99739583333334], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=ARUNSTIWARI%40GMAIL.COM", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 170.99609375, 80.6640625], "isController": false}, {"data": ["http:\/\/localhost:9080\/usersearch_en?email=ARUNSTIWARI%40GMAIL.COM-0", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 200.0, 306.8359375, 77.9296875], "isController": false}]}, function(index, item){
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
