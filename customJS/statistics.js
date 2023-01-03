$(document).ready(function () {
nome = []
atletas = [];
competicoes = [];
paises = [];
modalidades = [];

$.ajax({
    url: 'http://192.168.160.58/Olympics/api/Statistics/Games_Athletes',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (data) {
        for (var i = 0; i < data.length; i++) {
            nome.push(data[i].Name);
            atletas.push(data[i].Counter);
        }
    }
});

$.ajax({
    url: 'http://192.168.160.58/Olympics/api/Statistics/Games_Competitions',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (data) {
        for (var i = 0; i < data.length; i++) {
            competicoes.push(data[i].Counter);
        }
    },
}),

    $.ajax({
        url: 'http://192.168.160.58/Olympics/api/Statistics/Games_Countries',
        dataType: 'json',
        data: JSON.stringify({}),
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                paises.push(data[i].Counter);
            }
        }
    });

$.ajax({
    url: 'http://192.168.160.58/Olympics/api/Statistics/Games_Modalities',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (data) {
        for (var i = 0; i < data.length; i++) {
            modalidades.push(data[i].Counter);
        }
    },
    complete: function () {


        var atleta = document.getElementById('atletas');
        var atletasGraph = new Chart(atleta, {
            type: 'line',
            data: {
                labels: nome,
                datasets: [{
                    label: 'Atletas',
                    data: atletas,
                    borderColor: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
                }],
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });


        var pais = document.getElementById('paises');
        var paisGraph = new Chart(pais, {
            type: 'line',
            data: {
                labels: nome,
                datasets: [{
                    label: 'Países',
                    data: paises,
                    borderColor: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
                }],
            },
            options: {
                maintainAspectRatio: false,
            }
        });

        var competicao = document.getElementById('competicoes');
        var competicoesGraph = new Chart(competicao, {
            type: 'line',
            data: {
                labels: nome,
                datasets: [{
                    label: 'Competições',
                    data: competicoes,
                    borderColor: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
                }],
            },
            options: {
                maintainAspectRatio: false,
            }
        });

        var modalidade = document.getElementById('modalidades');
        var modalidadesGraph = new Chart(modalidade, {
            type: 'line',
            data: {
                labels: nome,
                datasets: [{
                    label: 'Modalidades',
                    data: modalidades,
                    borderColor: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
                }],
            },
            options: {
                maintainAspectRatio: false,
            }
        });
        hideLoader()
    }
});
});
