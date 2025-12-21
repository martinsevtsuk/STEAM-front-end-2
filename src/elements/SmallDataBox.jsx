import Chart from "react-apexcharts";
import "../css/SmallDataBox.css";

function SmallDataBox(props) {

    const chartOptions = {
        chart: {
            type: "line",
            sparkline: { enabled: true },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        colors: ["#4CAF50"],
        colors: ["#4CAF50"],
    xaxis: {
        type: "datetime",
        labels: {
            datetimeUTC: false, // local time
            formatter: function(value, timestamp) {
                // value = label, timestamp = ms
                const date = new Date(timestamp);
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
            },
        },
    },
        markers: {
            size: 4,
        }
    };

    const chartSeries = [
        {
            name: "Num people",
            data: props.data?.map(item => ({
                x: new Date(item.trackTime).getTime(),
                y: item.number,
            })) || [],
        },
    ];
return (
        <div className="small-data-box-container">
            <div className="data-box-title-container">
                <p className="data-box-title">{props.title}</p>
            </div>

            <div className="data-box-content-container">
                <div className="data-box-text-data-container">
                    <div className="data-box-sensor-data-container">
                        {props.data && props.data.length > 0 && (
                            <p className="data-box-sensor-data">
                                {props.data[0].number}
                            </p>
                        )}
                    </div>
                    <div className="data-box-sensor-interpretation-container">
                        <div className="data-box-sensor-text-level">
                            <p className="data-box-sensor-text">Moderate</p>
                        </div>
                        <div className="data-box-sensor-color-level">
                            <div className="data-box-sensor-color"></div>
                        </div>
                    </div>
                </div>

                <div className="data-box-graph-container">
                    <p className="data-box-graph-title">Viimase aja muutus</p>
                    <div className="data-box-graph">
                       <div style={{ width: "95%", height: "100%" }}>
                            <Chart
                            options={chartOptions}
                             series={chartSeries}
                            type="line"
                            width="100%"       // fills wrapper div
                             height="100%"      // fills wrapper height
                         />
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SmallDataBox;







