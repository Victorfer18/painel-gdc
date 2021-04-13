const playload_relatorio = {
    total_registros: 200000,
    total_terminados: 1700,
    total_operadores: 47,
    calendario_producao: [
        { data: '12/04', total_resgistrado: 400, total_terminados: 270 },
        { data: '13/04', total_resgistrado: 580, total_terminados: 533 },
        { data: '14/04', total_resgistrado: 630, total_terminados: 622 },
        { data: '15/04', total_resgistrado: 271, total_terminados: 268 },
        { data: '16/04', total_resgistrado: 487, total_terminados: 400 },
        { data: '17/04', total_resgistrado: 625, total_terminados: 600 },
        { data: '18/04', total_resgistrado: 333, total_terminados: 333 },
        { data: '19/04', total_resgistrado: 301, total_terminados: 280 },
        { data: '20/04', total_resgistrado: 200, total_terminados: 170 },
        { data: '21/04', total_resgistrado: 500, total_terminados: 250 },
        { data: '22/04', total_resgistrado: 653, total_terminados: 372 },
    ]
}

const ctx = document.getElementById('myChart').getContext('2d');
const options = {
    responsive: false,
    plugins: {
        legend: {
            position: 'top',
        }
    }
}
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: playload_relatorio.calendario_producao.map(post => post.data),
        datasets: [
            {
                label: 'Total Registrado',
                data: playload_relatorio.calendario_producao.map(post => post.total_resgistrado),
                borderColor: '#f1c40f',
                backgroundColor: '#e67e22',
            },
            {
                label: 'Total Terminado',
                data: playload_relatorio.calendario_producao.map(post => post.total_terminados),
                borderColor: '#2ecc71',
                backgroundColor: '#27ae60',
            }
        ]
    },
    options,
});