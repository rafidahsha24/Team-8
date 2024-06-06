                    const chartRevenueOrder = document.getElementById("chartRevenueOrder");
                    const chartRevenue = document.getElementById("chartRevenue");
                    const chartOrder = document.getElementById("chartOrder");

                    // option dropdown Total Revenue
                    const TotalRevenue = document.getElementById("TotalRevenue")
                    const FilterMonth = document.getElementById("filter-month")

                    // option dropdown Total Order
                    const TotalOrder = document.getElementById("TotalOrder")
                    const FilterMonth2 = document.getElementById("filter-month2")

                                       

                    async function DataRevenueOrder() {
                        const dataJson1 = await fetch("./data/revenue_order_quantity.json");
                        const dataObj1 = await dataJson1.json();

                        new Chart(chartRevenueOrder, {
                        type: "line",
                        data: {
                            labels: dataObj1.map((item) => item.Bulan),
                            datasets: [
                            {
                                label: "Total monthly revenue in 2014",
                                data: dataObj1.map((item) => item.total_revenue),
                                borderWidth: 1,
                            },
                            {
                                label: "Total Order Quantity per month in 2014",
                                data: dataObj1.map((item) => item.total_order_quantity),
                                borderWidth: 1,
                            }
                            ]
                        },
                        //pluggin zoom
                        options: {
                                plugins: {
                                zoom: {
                                    zoom: {
                                    wheel: {
                                        enabled: true,
                                    },
                                    pinch: {
                                        enabled: true
                                    },
                                    mode: 'xy',
                                    }
                                }
                                }
                            }, //pluggin zoom
                        });
                    }
                    
                    async function DataRevenue() {
                        const dataJson2 = await fetch("./data/total_revenue_perbulan2014.json");
                        const dataObj2 = await dataJson2.json();

                        
                        new Chart(chartRevenue, {
                            type: "line",
                            data: {
                                labels: dataObj2.map((item) => item.bulan),
                                datasets: [
                                    {
                                        label: "Total monthly revenue in 2014",
                                        data: dataObj2.map((item) => item.total_revenue),
                                        borderWidth: 1,
                                    },
                                ],
                            },
                        });
                        TotalRevenue.textContent = dataObj2.find((item)=>item.bulan==="January").total_revenue
                        FilterMonth.addEventListener("change",()=>{
                            TotalRevenue.textContent = dataObj2.find((item)=>item.bulan===FilterMonth.value).total_revenue
                        })
                    }

                    
                    async function DataOrder() {
                        const dataJson3 = await fetch("./data/total_quantity_perbulan2014.json");
                        const dataObj3 = await dataJson3.json();

                        
                        new Chart(chartOrder, {
                        type: "line",
                        data: {
                            labels: dataObj3.map((item) => item.bulan),
                            datasets: [
                            {
                                label: "Total Order Quantity per month in 2014",
                                data: dataObj3.map((item) => item.total_order_quantity),
                                borderWidth: 1,
                            },
                            ],
                        },
                        });
                        TotalOrder.textContent = dataObj3.find((item)=>item.bulan==="January").total_quantity
                        FilterMonth2.addEventListener("change",()=>{
                            TotalOrder.textContent = dataObj3.find((item)=>item.bulan===FilterMonth2.value).total_quantity
                        });
                    }
                    
                    DataRevenueOrder();
                    DataRevenue();
                    DataOrder();

                    $(document).ready(function() {
                        fetch('./data/revenue_order_quantity.json').then(response => response.json()).then(data => {
                            const tbody = $('#data-table tbody');
                            
                            data.forEach(table => {
                                const tr = $('<tr>');

                                const monthTd = $('<td>').text(table.Bulan);
                                const revenueTd = $('<td>').text(table.total_revenue);
                                const orderTd = $('<td>').text(table.total_order_quantity);

                                tr.append(monthTd, revenueTd, orderTd);
                                tbody.append(tr);
                            });

                            $('#data-table').DataTable();
                        }).catch(error => console.error('Error fetching data:', error));
                    });

                    const chartSub_Catergory = document.getElementById("sub-category");
            
                    async function DataSubCategory() {
                        const dataJson4 = await fetch("./data/sub_category2014.json");
                        const dataObj4 = await dataJson4.json();
                        console.log(dataJson4);
            
                        // Plugin zoom scales
                        const scaleOpts = {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)',
                            },
                            title: {
                                display: true,
                                text: (ctx) => ctx.scale.axis + ' axis',
                            }
                        };
                        const scales = {
                            x: {
                                type: 'category',
                                min: 5,
                                max: 11,
                            },
                            y: {
                                type: 'linear'
                            },
                        };
                        Object.keys(scales).forEach(scale => Object.assign(scales[scale], scaleOpts));
            
                        new Chart(chartSub_Catergory, {
                            type: "bar",
                            data: {
                                labels: dataObj4.map((item) => item.sub_category),
                                datasets: [
                                    {
                                        label: "Total Order Quantity per Sub-Category in 2014",
                                        data: dataObj4.map((item) => item.total_order_quantity),
                                        borderWidth: 1,
                                        fill: true,
                                        borderColor: 'rgb(0, 255, 128)',
                                        backgroundColor: 'rgb(0, 255, 128)',
                                    },
                                ],
                            },
                            options: {
                                scales: scales,
                                plugins: {
                                    zoom: {
                                        pan: {
                                            enabled: true,
                                            mode: 'xy',
                                            threshold: 5,
                                        },
                                        zoom: {
                                            wheel: {
                                                enabled: true
                                            },
                                            pinch: {
                                                enabled: true
                                            },
                                            mode: 'xy',
                                        },
                                    }
                                },
                            },
                        });
                    }
                    DataSubCategory();