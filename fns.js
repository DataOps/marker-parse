function parse() {

            $('#container').empty();
            var text = editor.getValue();
            var parsed = parser.parse(text)

            var output = JSON.stringify(parsed, null, 4);
            document.getElementById("chartText").style.display = 'none';

            console.log("output: " + output);

            var supportedCharts = ['ScatterPlot', 'PieChart', 'BarChart'];

            var data = [];
            var chartType = "";
            var color = "0xFFFFFF";
            var chartLabel = true

            for (var i = 0; i < parsed.length; i++) {
                if (parsed[i].type == "data") {
                    for (var j = 0; j < parsed[i].value.length; j++) {
                        if (parsed[i].value[i].type == "file") {
                            data = "";
                            data = parsed[i].value[0].value;
                            break;
                        } else if (parsed[i].value[i].type == ("int" || "string")) {
                            data[j] = parsed[i].value[j].value;
                        }
                    }
                } else if (parsed[i].type == "type") {
                    if (supportedCharts.indexOf(parsed[i].value) != -1) {
                        chartType = parsed[i].value;
                    } else {
                        console.log("Unsupported chart type!");
                    }
                } else if (parsed[i].type == "color") {
                    color = parsed[i].value;
                } else if (parsed[i].type == "labels") {
                    chartLabel = (parsed[i].value == "true");
                } else {
                    console.log("Unsupported parsing error");
                }
            }

                        var atoms = Molecule.getAtoms();
                        if(atoms[chartType]){
                            drawChart(data, chartType);

                        } else {
                            console.log("ChartType not supported!")
                        }


            // function includeCSSfile(href) {
            //   var head_node = document.getElementsByTagName('head')[0];
            //   var link_tag = document.createElement('link');
            //   link_tag.setAttribute('rel', 'stylesheet');
            //   link_tag.setAttribute('type', 'text/css');
            //   link_tag.setAttribute('href', href);
            //   head_node.appendChild(link_tag);
            // }

            // if (typeof data == "string") {
            //     // CSV
            //     if (chartType == "donut") {
            //         draw(data);
            //     }
            // }

        }

        var langTools = ace.require("ace/ext/language_tools");
        var editor = ace.edit("editor");
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/marker");

        editor.commands.addCommand({
            name: 'myCommand',
            bindKey: {
                win: 'Ctrl-Enter',
                mac: 'Command-Enter'
            },
            exec: function(editor) {
                parse();
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });


        var codeSuggestion = {
            getCompletions: function(editor, session, pos, prefix, callback) {

                if (prefix.length === 0) {
                    callback(null, []);
                    return
                } else {


                    $.getJSON("chartTypes.json", function(wordList) {
                        callback(null, wordList.map(function(ea) {
                            return {
                                name: ea.name,
                                value: ea.name,
                                meta: "chartType"
                            }
                        }));
                    })

                }

            }
        }

        langTools.addCompleter(codeSuggestion);

        document.getElementById('fileUpl').onchange = function() {
            var file = this.files[0];
            var fileName = file.name;
            var reader = new FileReader();

            reader.readAsText(file);
            reader.onload = function() {
                var fileContent = this.result;

                console.log(fileContent);
                var value = editor.getValue();
                value = value.split("\n");
                for (var i = 0; i < value.length; i++) {
                    if (value[i].indexOf("#data") > -1) {
                        value[i] = "#data: " + fileName
                    }
                }
                value = value.toString().replace(/\,/g, '\n')
                editor.setValue(value, 1);

                var data = fileContent;
                var parsedCSV = d3.csv.parseRows(data);

                var container = d3.select("#filedata")
                    .append("table")
                    .selectAll("tr")
                    .data(parsedCSV).enter()
                    .append("tr")
                    .selectAll("td")
                    .data(function(d) {
                        return d;
                    }).enter()
                    .append("td")
                    .text(function(d) {
                        return d;
                    });

            };
        }
