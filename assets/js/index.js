import { auth, relatorio } from './library/superapp.sandbox.js'
const App = {
    dash: 'dash.html',
    get_form_login() {
        let formulario = document.js_form_login
        return {
            email: formulario.email.value,
            senha: formulario.senha.value
        }
    },
    print_error(message) {
        document.querySelector('.js-error').innerHTML = message
    },
    async login() {
        let dados = App.get_form_login()
        let { next, message } = await auth.login(dados.email, dados.senha)
        if (next) {
            window.location.href = App.dash
        } else {
            App.print_error(message)
        }
    },
    async router_public() {
        let status = await auth.logged()
        if (status)
            window.location.href = App.dash
    },
    async router_private() {
        let status = await auth.logged()
        if (!status)
            window.location.href = 'index.html'
    },
    logout() {
        auth.logout().then(() => {
            window.location.href = 'index.html'
        })
    },
    set_resumo(operadores, registros, finalizados) {
        document.querySelector('.js-operadores').innerHTML = operadores
        document.querySelector('.js-registros').innerHTML = registros
        document.querySelector('.js-finalizados').innerHTML = finalizados
    },
    async render_relatorio() {
        let graph = document.querySelector('#myChart')
        if (graph) {
            let { calendario_producao, total_operadores, total_registros, total_terminados } = await relatorio.get()
            App.set_resumo(total_operadores, total_registros, total_terminados)

            const playload_relatorio = { calendario_producao, total_operadores, total_registros, total_terminados }

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

        }
    },
    indisponivel() {
        alert('Recurso indisponível no momento')
    },
}

App.render_relatorio()

globalThis.app = App