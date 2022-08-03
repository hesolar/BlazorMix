function googleCharts() {
    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(initChart);

    function initChart() {
        var ys = [500,450,600,700,670];
        var xs = [1999,2003,2007,2011,2015,2004,2005];
        window.createNewChart({ xs, ys });
    }

    window.createNewChart = (params) => {
        var xs = params.xs;
        var ys = params.ys;

        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'Y');

        for (var i = 0; i < ys.length; i++) {
            data.addRow([xs[i], ys[i]]);
        }

        var options = {
            hAxis: { title: 'Años' },
            vAxis: { title: 'Alumnos' },
            title: 'Nuevos alumnos en la universidad',
            legend: { position: 'none' },
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
    };




}
function GoogleRegions() {

    google.charts.load('current', {
        'packages': ['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
}
    function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
            ['Country', 'Popularity'],
            ['Germany', 12],
            ['United States', 1],
            ['Canada', 5],
            ['France', 20],
            ['RU', 2],
            ['Spain',30]
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
}
function GoogleComboChart() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawVisualization);

    
}

function drawVisualization() {
    // Some raw data (not necessarily accurate)
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Matemáticas', 'Magisterio', 'Derecho', 'Ingeniería Mecánica', 'Informática', 'Filología'],
        ['2016/17', 15, 90, 90, 18, 28, 82],
        ['2017/18', 20, 10, 50, 87, 37, 63],
        ['2018/19', 70, 10, 65, 98, 15, 60],
        ['2019/20', 110, 90, 60, 100, 36, 56],
        ['2020/21', 15, 30, 80, 92, 45, 61]
    ]);

    var options = {
        title: 'Alumnos matriculados en los grados',
        vAxis: { title: 'Alumnos' },
        hAxis: { title: 'Años' },
        seriesType: 'bars',
        series: { 5: { type: 'line' } }
    };

    var chart = new google.visualization.ComboChart(document.getElementById('googleCombo'));
    chart.draw(data, options);
}