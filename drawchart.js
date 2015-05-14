        function drawChart(data, ct) {
            var dataArr = new Array();

            for (var i = 0; i < data.length; i++) {
                var valObj = new Object();
                valObj.value = data[i];
                dataArr.push(valObj);
            }

            var dataContent = JSON.parse(JSON.stringify(dataArr))
            console.log(dataArr);
            var atoms = Molecule.getAtoms();
            var paper = d3.select('.container').append('svg')
                .attr('width', 800)
                .attr('height', 600);


            var a = atoms[ct];
            a = a();
            a.init(dataContent);
            a.draw(paper);

        };
