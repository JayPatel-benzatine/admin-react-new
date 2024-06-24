import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import moment from 'moment';

function BarChart() {

    const DashboardData = useSelector((state) => state.dashboard?.dashboardStatics)
    const [labels, setLabels] = useState([])
    const [datas, setDatas] = useState([])

    useEffect(() => {
        if (DashboardData && DashboardData?.barchart && DashboardData?.barchart.length > 0) {
            const dates = DashboardData?.barchart.map(item => moment(item.date, "YYYY-MM-DD").format("DD MMM"));
            const totals = DashboardData?.barchart.map(item => item.total);
            setLabels(dates)
            setDatas(totals)
        }
        return () => { }
    }, [DashboardData])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Orders',
                data: datas,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <div>
            <Bar options={options} data={data} />;
        </div>
    )
}

export default BarChart