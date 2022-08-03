function GeneratePieChart() {

    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("piechartdiv");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                endAngle: 270
            })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        var series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category",
                endAngle: 270
            })
        );

        series.states.create("hidden", {
            endAngle: -90
        });

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll([{
            category: "Spain",
            value: 701.9
        }, {
            category: "Czechia",
            value: 5.9
        }, {
            category: "Ireland",
            value: 20.1
        }, {
            category: "Germany",
            value: 10.8
        }, {
            category: "Australia",
            value: 40.9
        }, {
            category: "Austria",
            value: 25.3
        }, {
            category: "UK",
            value: 99
        }]);

        series.appear(1000, 100);

    }); // end am5.ready()



}

function GenerateBars() {

    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("barschartdiv");


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout
        }));


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        var data = [{
            "year": "2021",
            "europe": 10,
            "namerica": 7,
            "asia": 2,
            "lamerica": 1,
            "meast": 1,
            "africa": 2
        }]


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "year",
            renderer: am5xy.AxisRendererX.new(root, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));

        xAxis.data.setAll(data);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name, fieldName) {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "year"
            }));

            series.columns.template.setAll({
                tooltipText: "{name}, {categoryX}:{valueY}",
                width: am5.percent(90),
                tooltipY: 0
            });

            series.data.setAll(data);

            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear();

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });

            legend.data.push(series);
        }

        makeSeries("Europe", "europe");
        makeSeries("North America", "namerica");
        makeSeries("Asia", "asia");
        makeSeries("Latin America", "lamerica");
        makeSeries("Middle East", "meast");
        makeSeries("Africa", "africa");


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);

    });
}

function Countries() {
    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("countrieschartdiv");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create the map chart
        // https://www.amcharts.com/docs/v5/charts/map-chart/
        var chart = root.container.children.push(am5map.MapChart.new(root, {
            panX: "rotateX",
            panY: "translateY",
            projection: am5map.geoMercator(),
            homeGeoPoint: { latitude: 2, longitude: 2 }
        }));

        var cont = chart.children.push(am5.Container.new(root, {
            layout: root.horizontalLayout,
            x: 20,
            y: 40
        }));

        // Add labels and controls
        cont.children.push(am5.Label.new(root, {
            centerY: am5.p50,
            text: "Map"
        }));

        var switchButton = cont.children.push(am5.Button.new(root, {
            themeTags: ["switch"],
            centerY: am5.p50,
            icon: am5.Circle.new(root, {
                themeTags: ["icon"]
            })
        }));

        switchButton.on("active", function () {
            if (!switchButton.get("active")) {
                chart.set("projection", am5map.geoMercator());
                chart.set("panY", "translateY");
                chart.set("rotationY", 0);
                backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
            } else {
                chart.set("projection", am5map.geoOrthographic());
                chart.set("panY", "rotateY")

                backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
            }
        });

        cont.children.push(
            am5.Label.new(root, {
                centerY: am5.p50,
                text: "Globe"
            })
        );

        // Create series for background fill
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
        var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
        backgroundSeries.mapPolygons.template.setAll({
            fill: root.interfaceColors.get("alternativeBackground"),
            fillOpacity: 0,
            strokeOpacity: 0
        });

        // Add background polygon
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
        backgroundSeries.data.push({
            geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });

        // Create main polygon series for countries
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
        var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow
        }));

        // Create line series for trajectory lines
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
        var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
        lineSeries.mapLines.template.setAll({
            stroke: root.interfaceColors.get("alternativeBackground"),
            strokeOpacity: 0.3
        });

        // Create point series for markers
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
        var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

        pointSeries.bullets.push(function () {
            var circle = am5.Circle.new(root, {
                radius: 7,
                tooltipText: "Drag me!",
                cursorOverStyle: "pointer",
                tooltipY: 0,
                fill: am5.color(0xffba00),
                stroke: root.interfaceColors.get("background"),
                strokeWidth: 2,
                draggable: true
            });

            circle.events.on("dragged", function (event) {
                var dataItem = event.target.dataItem;
                var projection = chart.get("projection");
                var geoPoint = chart.invert({ x: circle.x(), y: circle.y() });

                dataItem.setAll({
                    longitude: geoPoint.longitude,
                    latitude: geoPoint.latitude
                });
            });

            return am5.Bullet.new(root, {
                sprite: circle
            });
        });

        var paris = addCity({ latitude: 48.8567, longitude: 2.351 }, "Paris");
        var toronto = addCity({ latitude: 43.8163, longitude: -79.4287 }, "Toronto");
        var la = addCity({ latitude: 34.3, longitude: -118.15 }, "Los Angeles");
        var havana = addCity({ latitude: 23, longitude: -82 }, "Havana");

        var lineDataItem = lineSeries.pushDataItem({
            pointsToConnect: [paris, toronto, la, havana]
        });

        var planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

        var plane = am5.Graphics.new(root, {
            svgPath:
                "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
            scale: 0.06,
            centerY: am5.p50,
            centerX: am5.p50,
            fill: am5.color(0x000000)
        });

        planeSeries.bullets.push(function () {
            var container = am5.Container.new(root, {});
            container.children.push(plane);
            return am5.Bullet.new(root, { sprite: container });
        });

        var planeDataItem = planeSeries.pushDataItem({
            lineDataItem: lineDataItem,
            positionOnLine: 0,
            autoRotate: true
        });

        planeDataItem.animate({
            key: "positionOnLine",
            to: 1,
            duration: 10000,
            loops: Infinity,
            easing: am5.ease.yoyo(am5.ease.linear)
        });

        planeDataItem.on("positionOnLine", function (value) {
            if (value >= 0.99) {
                plane.set("rotation", 180);
            } else if (value <= 0.01) {
                plane.set("rotation", 0);
            }
        });

        function addCity(coords, title) {
            return pointSeries.pushDataItem({
                latitude: coords.latitude,
                longitude: coords.longitude
            });
        }

        // Make stuff animate on load
        chart.appear(1000, 100);

    }); // end am5.ready()


}

function Sexos() {
    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("copadiv");


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
        var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
            layout: root.verticalLayout
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
        var series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
            alignLabels: true,
            orientation: "vertical",
            valueField: "value",
            categoryField: "category",
            svgPath:
                "M421.976,136.204h-23.409l-0.012,0.008c-0.19-20.728-1.405-41.457-3.643-61.704l-1.476-13.352H5.159L3.682,74.507 C1.239,96.601,0,119.273,0,141.895c0,65.221,7.788,126.69,22.52,177.761c7.67,26.588,17.259,50.661,28.5,71.548  c11.793,21.915,25.534,40.556,40.839,55.406l4.364,4.234h206.148l4.364-4.234c15.306-14.85,29.046-33.491,40.839-55.406  c11.241-20.888,20.829-44.96,28.5-71.548c0.325-1.127,0.643-2.266,0.961-3.404h44.94c49.639,0,90.024-40.385,90.024-90.024  C512,176.588,471.615,136.204,421.976,136.204z M421.976,256.252h-32c3.061-19.239,5.329-39.333,6.766-60.048h25.234  c16.582,0,30.024,13.442,30.024,30.024C452,242.81,438.558,256.252,421.976,256.252z"
        }));

        series.labelsContainer.set("width", 100);
        series.ticks.template.set("location", 0.6);


        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
        series.data.setAll([
            { category: "Mujeres", value: 56 },
            { category: "Hombres", value: 44 }
        ]);


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        chart.set("layout", root.verticalLayout);

        var legend = chart.children.moveValue(am5.Legend.new(root, {
            paddingBottom: 15,
            paddingTop: 15,
            x: am5.percent(50),
            dx: -150,
            centerX: am5.p50
        }), 0);

        legend.markers.template.setAll({ width: 30, height: 30 });
        legend.markerRectangles.template.setAll({
            cornerRadiusBL: 20,
            cornerRadiusBR: 20,
            cornerRadiusTL: 20,
            cornerRadiusTR: 20
        });

        legend.data.setAll(series.dataItems);


        // Play  initial se ries animation
        // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
        chart.appear(1000, 100);
    })
}