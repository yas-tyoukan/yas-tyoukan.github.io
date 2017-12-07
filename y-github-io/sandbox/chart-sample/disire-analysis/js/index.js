(function () {
    window.onload = function () {

        var score = getScore();

        var data = {
            labels: ['生存', '愛・所属', '力・価値', '自由', '楽しみ'],
            datasets: [{
                data: score
            }]
        }
        var ctx = document.getElementById("myChart").getContext('2d');
        var myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: data
        });
    };

})();