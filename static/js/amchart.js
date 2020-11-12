// <!-- Chart code -->
// https://www.amcharts.com/demos/bar-chart-race/#code
am4core.ready(function() {

// Themes begin
// am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_frozen);
// Themes end

var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(40, 40, 40, 40);

chart.numberFormatter.bigNumberPrefixes = [
    { "number": 1e+3, "suffix": "K" },
    { "number": 1e+6, "suffix": "M" },
    { "number": 1e+9, "suffix": "B" }
];

var label = chart.plotContainer.createChild(am4core.Label);
label.x = am4core.percent(97);
label.y = am4core.percent(95);
label.horizontalCenter = "right";
label.verticalCenter = "middle";
label.dx = -15;
label.fontSize = 50;

var playButton = chart.plotContainer.createChild(am4core.PlayButton);
playButton.x = am4core.percent(97);
playButton.y = am4core.percent(95);
playButton.dy = -2;
playButton.verticalCenter = "middle";
playButton.events.on("toggled", function(event) {
    if (event.target.isActive) {
    play();
    }
    else {
    stop();
    }
})

var stepDuration = 3000;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "network";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = true;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "network";
series.dataFields.valueX = "MAU";
series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.template.column.cornerRadiusTopRight = 5;
series.interpolationDuration = stepDuration;
series.interpolationEasing = am4core.ease.linear;

var labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "right";
labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
labelBullet.label.textAlign = "end";
labelBullet.label.dx = -10;

chart.zoomOutButton.disabled = true;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target){
    return chart.colors.getIndex(target.dataItem.index);
});

var year = 2003;
label.text = year.toString();

var interval;

function play() {
    if(year > 2019) { year = 2003; }
    interval = setInterval(function(){
    nextYear();
    }, stepDuration)
    nextYear();
}

function stop() {
    if (interval) {
    clearInterval(interval);
    }
}

function nextYear() {
    year++

    if (year > 2019) {
        stop()
        // year = 2003;
    }

    var newData = allData[year];
    var itemsWithNonZero = 0;
    for (var i = 0; i < chart.data.length; i++) {
    chart.data[i].MAU = newData[i].MAU;
    if (chart.data[i].MAU > 0) {
        itemsWithNonZero++;
    }
    }

    if (year == 2003) {
    series.interpolationDuration = stepDuration / 4;
    valueAxis.rangeChangeDuration = stepDuration / 4;
    }
    else {
    series.interpolationDuration = stepDuration;
    valueAxis.rangeChangeDuration = stepDuration;
    }

    chart.invalidateRawData();
    label.text = year.toString();

    categoryAxis.zoom({ start: 0, end: 0.2 });
}


categoryAxis.sortBySeries = series;

var allData = {
    "2003": [
        {"MAU": 0, "network": "타짜"
        },
        {"MAU": 0, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 0, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 0, "network": "동해물과 백두산이"
        },
        {"MAU": 0, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 0, "network": "아이언맨"
        },
        {"MAU": 0, "network": "아바타"
        },
        {"MAU": 0, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 0, "network": "추격자"
        },
        {"MAU": 0, "network": "해피 에로 크리스마스"
        },
        {"MAU": 0, "network": "너는 내 운명"
        },
        {"MAU": 0, "network": "맘마미아!"
        },
        {"MAU": 0, "network": "써니"
        },
        {"MAU": 0, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 0, "network": "내셔널 트레져"
        },
        {"MAU": 0, "network": "미션 임파서블 3"
        },
        {"MAU": 0, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 0, "network": "러브 액츄얼리"
        },
        {"MAU": 0, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 0, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 0, "network": "해운대"
        },
        {"MAU": 0, "network": "귀신이 산다"
        },
        {"MAU": 0, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 0, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 0, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 0, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 0, "network": "내 머리 속의 지우개"
        },
        {"MAU": 0, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 0, "network": "바람의 파이터"
        },
        {"MAU": 0, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 0, "network": "가족"
        },
        {"MAU": 0, "network": "오페라의 유령"
        },
        {"MAU": 0, "network": "태극기 휘날리며"
        },
        {"MAU": 0, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 0, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 0, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 0, "network": "시실리 2km"
        },
        {"MAU": 0, "network": "왕의 남자"
        },
        {"MAU": 0, "network": "투모로우"
        },
        {"MAU": 0, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 0, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 0, "network": "웰컴 투 동막골"
        },
        {"MAU": 0, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 0, "network": "의형제"
        },
        {"MAU": 0, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 0, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 0, "network": "한반도"
        },
        {"MAU": 0, "network": "아일랜드"
        },
        {"MAU": 0, "network": "국가대표"
        },
        {"MAU": 0, "network": "우주전쟁"
        },
        {"MAU": 0, "network": "다빈치 코드"
        },
        {"MAU": 0, "network": "아저씨"
        },
        {"MAU": 0, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 0, "network": "슈렉2"
        },
        {"MAU": 0, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 0, "network": "인셉션"
        },
        {"MAU": 0, "network": "미녀는 괴로워"
        },
        {"MAU": 0, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 0, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 0, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 0, "network": "태풍"
        },
        {"MAU": 0, "network": "니모를 찾아서"
        },
        {"MAU": 0, "network": "괴물"
        },
        {"MAU": 0, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 0, "network": "우리 형"
        },
        {"MAU": 0, "network": "친절한 금자씨"
        },
        {"MAU": 0, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 0, "network": "투사부일체"
        },
        {"MAU": 0, "network": "과속스캔들"
        },
        {"MAU": 0, "network": "트랜스포머"
        },
        {"MAU": 0, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 0, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 0, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 0, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 0, "network": "디워"
        },
        {"MAU": 0, "network": "마파도"
        },
        {"MAU": 0, "network": "광식이 동생 광태"
        },
        {"MAU": 0, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 0, "network": "트로이"
        },
        {"MAU": 0, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2004": [
        {"MAU": 0, "network": "타짜"
        },
        {"MAU": 0, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 0, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 0, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 0, "network": "아이언맨"
        },
        {"MAU": 0, "network": "아바타"
        },
        {"MAU": 0, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 0, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 0, "network": "너는 내 운명"
        },
        {"MAU": 0, "network": "맘마미아!"
        },
        {"MAU": 0, "network": "써니"
        },
        {"MAU": 0, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 0, "network": "내셔널 트레져"
        },
        {"MAU": 0, "network": "미션 임파서블 3"
        },
        {"MAU": 0, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 0, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 0, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 0, "network": "해운대"
        },
        {"MAU": 0, "network": "귀신이 산다"
        },
        {"MAU": 0, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 0, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 0, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 0, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 0, "network": "내 머리 속의 지우개"
        },
        {"MAU": 0, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 0, "network": "바람의 파이터"
        },
        {"MAU": 0, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 0, "network": "가족"
        },
        {"MAU": 0, "network": "오페라의 유령"
        },
        {"MAU": 0, "network": "태극기 휘날리며"
        },
        {"MAU": 0, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 0, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 0, "network": "시실리 2km"
        },
        {"MAU": 0, "network": "왕의 남자"
        },
        {"MAU": 0, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 0, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 0, "network": "웰컴 투 동막골"
        },
        {"MAU": 0, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 0, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 0, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 0, "network": "한반도"
        },
        {"MAU": 0, "network": "아일랜드"
        },
        {"MAU": 0, "network": "국가대표"
        },
        {"MAU": 0, "network": "우주전쟁"
        },
        {"MAU": 0, "network": "다빈치 코드"
        },
        {"MAU": 0, "network": "아저씨"
        },
        {"MAU": 0, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 0, "network": "슈렉2"
        },
        {"MAU": 0, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 0, "network": "인셉션"
        },
        {"MAU": 0, "network": "미녀는 괴로워"
        },
        {"MAU": 0, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 0, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 0, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 0, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 0, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 0, "network": "우리 형"
        },
        {"MAU": 0, "network": "친절한 금자씨"
        },
        {"MAU": 0, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 0, "network": "투사부일체"
        },
        {"MAU": 0, "network": "과속스캔들"
        },
        {"MAU": 0, "network": "트랜스포머"
        },
        {"MAU": 0, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 0, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 0, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 0, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 0, "network": "디워"
        },
        {"MAU": 0, "network": "마파도"
        },
        {"MAU": 0, "network": "광식이 동생 광태"
        },
        {"MAU": 0, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 0, "network": "트로이"
        },
        {"MAU": 0, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2005": [
        {"MAU": 0, "network": "타짜"
        },
        {"MAU": 0, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 0, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 0, "network": "아이언맨"
        },
        {"MAU": 0, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 0, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 0, "network": "너는 내 운명"
        },
        {"MAU": 0, "network": "맘마미아!"
        },
        {"MAU": 0, "network": "써니"
        },
        {"MAU": 0, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 0, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 0, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 0, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 0, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 0, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 0, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 0, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 0, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 0, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 0, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 0, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 0, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 0, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 0, "network": "웰컴 투 동막골"
        },
        {"MAU": 0, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 0, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 0, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 0, "network": "한반도"
        },
        {"MAU": 0, "network": "아일랜드"
        },
        {"MAU": 0, "network": "국가대표"
        },
        {"MAU": 0, "network": "우주전쟁"
        },
        {"MAU": 0, "network": "다빈치 코드"
        },
        {"MAU": 0, "network": "아저씨"
        },
        {"MAU": 0, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 0, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 0, "network": "인셉션"
        },
        {"MAU": 0, "network": "미녀는 괴로워"
        },
        {"MAU": 0, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 0, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 0, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 0, "network": "친절한 금자씨"
        },
        {"MAU": 0, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 0, "network": "투사부일체"
        },
        {"MAU": 0, "network": "과속스캔들"
        },
        {"MAU": 0, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 0, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 0, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 0, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 0, "network": "디워"
        },
        {"MAU": 0, "network": "마파도"
        },
        {"MAU": 0, "network": "광식이 동생 광태"
        },
        {"MAU": 0, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 0, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2006": [
        {"MAU": 0, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 0, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 0, "network": "아이언맨"
        },
        {"MAU": 0, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 0, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 0, "network": "맘마미아!"
        },
        {"MAU": 0, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 0, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 0, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 0, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 0, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 0, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 0, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 0, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 0, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 0, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 0, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 0, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 0, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 0, "network": "다빈치 코드"
        },
        {"MAU": 0, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 0, "network": "인셉션"
        },
        {"MAU": 0, "network": "미녀는 괴로워"
        },
        {"MAU": 0, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 0, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 0, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 0, "network": "투사부일체"
        },
        {"MAU": 0, "network": "과속스캔들"
        },
        {"MAU": 0, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 0, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 0, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 0, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 0, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 0, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 0, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2007": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 0, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 0, "network": "아이언맨"
        },
        {"MAU": 0, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 0, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 0, "network": "맘마미아!"
        },
        {"MAU": 0, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 0, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 0, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 0, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 0, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 0, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 0, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 0, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 0, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 0, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 0, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 0, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 0, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 0, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 0, "network": "과속스캔들"
        },
        {"MAU": 0, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 0, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 0, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 0, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 0, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 0, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2008": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 0, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 0, "network": "아이언맨"
        },
        {"MAU": 0, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 0, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 0, "network": "맘마미아!"
        },
        {"MAU": 0, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 0, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 0, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 0, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 0, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 0, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 0, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 0, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 0, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 0, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 0, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 0, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 0, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 0, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 0, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2009": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 0, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 0, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 0, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 0, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 0, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 0, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 0, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 0, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 0, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 0, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 0, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 0, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 0, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2010": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 0, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 0, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 0, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 0, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 0, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 0, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 0, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2011": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 0, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 0, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 0, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 5410669, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 6165804, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 5818753, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 0, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2012": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 7466678, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 0, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 0, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 7330305, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 0, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 7500179, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 5410669, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 6165804, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 5818753, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 0, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 7749860, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2013": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 0, "network": "관상"
        },
        {"MAU": 7466678, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 12291293, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 0, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 7057205, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 7330305, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 12976528, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 7500179, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 5410669, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 6165804, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 0, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 5818753, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 0, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 6610836, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 0, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 7749860, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2014": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 9115274, "network": "관상"
        },
        {"MAU": 7466678, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 12291293, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 11358191, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 7057205, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 7330305, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 12976528, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 0, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 0, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 0, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 7500179, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 0, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 5410669, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 6165804, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 0, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 9325679, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 5818753, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 0, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 8982567, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 6610836, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 12801369, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 7749860, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2015": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 9115274, "network": "관상"
        },
        {"MAU": 7466678, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 12291293, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 11358191, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 7057205, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 7330305, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 12976528, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 10283774, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 10270423, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 8614613, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 7500179, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 14241429, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 5410669, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 0, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 6165804, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 17583608, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 9325679, "network": "설국열차"
        },
        {"MAU": 0, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 5818753, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 8648620, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 0, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 8982567, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 6610836, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 12801369, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 7749860, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2016": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 9115274, "network": "관상"
        },
        {"MAU": 7466678, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 12291293, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 11358191, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 7057205, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 7330305, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 12976528, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 10283774, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 10270423, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 8614613, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 7500179, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 14241429, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 5410669, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 13403414, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 6165804, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 0, "network": "부산행"
        },
        {"MAU": 17583608, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 9325679, "network": "설국열차"
        },
        {"MAU": 10482686, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 5818753, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 8648620, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 12686446, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 0, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 8982567, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 6610836, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 12801369, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 7749860, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2017": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 9115274, "network": "관상"
        },
        {"MAU": 7466678, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 0, "network": "택시운전사"
        },
        {"MAU": 12291293, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 11358191, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 7057205, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 7330305, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 12976528, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 10283774, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 10270423, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 8614613, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 7500179, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 0, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 14241429, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 5410669, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 13403414, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 6165804, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 11551067, "network": "부산행"
        },
        {"MAU": 17583608, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 9325679, "network": "설국열차"
        },
        {"MAU": 10482686, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 5818753, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 8648620, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 12686446, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 9686269, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 8982567, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 6610836, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 12801369, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 7749860, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2018": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 0, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 9115274, "network": "관상"
        },
        {"MAU": 7466678, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 12166659, "network": "택시운전사"
        },
        {"MAU": 12291293, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 11358191, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 7057205, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 7330305, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 12976528, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 10283774, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 10270423, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 8614613, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 7500179, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 14401147, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 14241429, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 5410669, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 13403414, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 6165804, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 11551067, "network": "부산행"
        },
        {"MAU": 17583608, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 0, "network": "신과함께-인과 연"
        },
        {"MAU": 9325679, "network": "설국열차"
        },
        {"MAU": 10482686, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 5818753, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 8648620, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 12686446, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 9686269, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 8982567, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 6610836, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 12801369, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 7749860, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ],
    "2019": [
        {"MAU": 5665071, "network": "타짜"
        },
        {"MAU": 2281209, "network": "내 생애 가장 아름다운 일주일"
        },
        {"MAU": 11181178, "network": "어벤져스: 인피니티 워"
        },
        {"MAU": 9115274, "network": "관상"
        },
        {"MAU": 7466678, "network": "최종병기 활"
        },
        {"MAU": 18310, "network": "레옹"
        },
        {"MAU": 155441, "network": "이웃집 토토로"
        },
        {"MAU": 12166659, "network": "택시운전사"
        },
        {"MAU": 12291293, "network": "광해, 왕이 된 남자"
        },
        {"MAU": 11358191, "network": "변호인"
        },
        {"MAU": 163084, "network": "동해물과 백두산이"
        },
        {"MAU": 1756130, "network": "해리포터와 아즈카반의 죄수"
        },
        {"MAU": 7057205, "network": "어벤져스"
        },
        {"MAU": 4288568, "network": "아이언맨"
        },
        {"MAU": 13326826, "network": "아바타"
        },
        {"MAU": 1293727, "network": "내 여자친구를 소개합니다"
        },
        {"MAU": 87468, "network": "스타워즈:에피소드1 보이지 않는 위험"
        },
        {"MAU": 32606, "network": "헤드윅"
        },
        {"MAU": 5037960, "network": "추격자"
        },
        {"MAU": 71441, "network": "해피 에로 크리스마스"
        },
        {"MAU": 2679839, "network": "너는 내 운명"
        },
        {"MAU": 4570046, "network": "맘마미아!"
        },
        {"MAU": 7330305, "network": "써니"
        },
        {"MAU": 2071801, "network": "박수칠 때 떠나라"
        },
        {"MAU": 12976528, "network": "도둑들"
        },
        {"MAU": 55691, "network": "노팅 힐"
        },
        {"MAU": 1148364, "network": "내셔널 트레져"
        },
        {"MAU": 5126766, "network": "미션 임파서블 3"
        },
        {"MAU": 1505539, "network": "스파이더맨 2"
        },
        {"MAU": 119841, "network": "인생은 아름다워"
        },
        {"MAU": 10283774, "network": "인터스텔라"
        },
        {"MAU": 306422, "network": "러브 액츄얼리"
        },
        {"MAU": 2159904, "network": "나니아 연대기-사자,마녀 그리고 옷장"
        },
        {"MAU": 5395350, "network": "2012"
        },
        {"MAU": 40092, "network": "쥬라기 공원"
        },
        {"MAU": 11287394, "network": "해운대"
        },
        {"MAU": 1870098, "network": "귀신이 산다"
        },
        {"MAU": 3465456, "network": "킹콩"
        },
        {"MAU": 10270423, "network": "겨울왕국"
        },
        {"MAU": 6841937, "network": "화려한 휴가"
        },
        {"MAU": 8614613, "network": "해적: 바다로 간 산적"
        },
        {"MAU": 7500179, "network": "미션임파서블:고스트프로토콜"
        },
        {"MAU": 3677029, "network": "해리 포터와 불사조 기사단"
        },
        {"MAU": 1884256, "network": "내 머리 속의 지우개"
        },
        {"MAU": 4589877, "network": "스파이더맨 3"
        },
        {"MAU": 14401147, "network": "신과함께-죄와 벌"
        },
        {"MAU": 1440092, "network": "바람의 파이터"
        },
        {"MAU": 1286697, "network": "알렉산더"
        },
        {"MAU": 289747, "network": "라이온 킹"
        },
        {"MAU": 23198, "network": "잉글리쉬 페이션트"
        },
        {"MAU": 1267028, "network": "가족"
        },
        {"MAU": 1534723, "network": "오페라의 유령"
        },
        {"MAU": 2544096, "network": "태극기 휘날리며"
        },
        {"MAU": 4185142, "network": "말아톤"
        },
        {"MAU": 77637, "network": "몬스터 주식회사"
        },
        {"MAU": 4568697, "network": "캐리비안의 해적: 세상의 끝에서"
        },
        {"MAU": 296945, "network": "올드보이"
        },
        {"MAU": 14241429, "network": "국제시장"
        },
        {"MAU": 1261550, "network": "시실리 2km"
        },
        {"MAU": 10495829, "network": "왕의 남자"
        },
        {"MAU": 1822588, "network": "투모로우"
        },
        {"MAU": 1717703, "network": "실미도"
        },
        {"MAU": 48307, "network": "팀 버튼의 크리스마스 악몽"
        },
        {"MAU": 4518421, "network": "가문의 위기(가문의 영광2)"
        },
        {"MAU": 6424662, "network": "웰컴 투 동막골"
        },
        {"MAU": 2953659, "network": "미스터 & 미세스 스미스"
        },
        {"MAU": 89842, "network": "러브레터"
        },
        {"MAU": 5410669, "network": "의형제"
        },
        {"MAU": 50543, "network": "매트릭스3 레볼루션"
        },
        {"MAU": 4651318, "network": "쿵푸 팬더"
        },
        {"MAU": 13403414, "network": "베테랑"
        },
        {"MAU": 3325670, "network": "한반도"
        },
        {"MAU": 3170820, "network": "아일랜드"
        },
        {"MAU": 8011406, "network": "국가대표"
        },
        {"MAU": 2642111, "network": "우주전쟁"
        },
        {"MAU": 3022766, "network": "다빈치 코드"
        },
        {"MAU": 6165804, "network": "아저씨"
        },
        {"MAU": 3115100, "network": "공공의 적 2"
        },
        {"MAU": 11551067, "network": "부산행"
        },
        {"MAU": 17583608, "network": "명량"
        },
        {"MAU": 140703, "network": "미녀와 야수"
        },
        {"MAU": 394492, "network": "타이타닉"
        },
        {"MAU": 1637354, "network": "슈렉2"
        },
        {"MAU": 3425706, "network": "해리포터와 불의 잔"
        },
        {"MAU": 16098, "network": "해리가 샐리를 만났을 때"
        },
        {"MAU": 12264813, "network": "신과함께-인과 연"
        },
        {"MAU": 9325679, "network": "설국열차"
        },
        {"MAU": 10482686, "network": "어벤져스: 에이지 오브 울트론"
        },
        {"MAU": 5818753, "network": "인셉션"
        },
        {"MAU": 6041216, "network": "미녀는 괴로워"
        },
        {"MAU": 3910043, "network": "캐리비안의 해적 : 망자의 함"
        },
        {"MAU": 32443, "network": "죽은 시인의 사회"
        },
        {"MAU": 2603943, "network": "하울의 움직이는 성"
        },
        {"MAU": 28794, "network": "비포 선라이즈"
        },
        {"MAU": 1270315, "network": "늑대의 유혹"
        },
        {"MAU": 8648620, "network": "수상한 그녀"
        },
        {"MAU": 267950, "network": "해리포터와 마법사의 돌"
        },
        {"MAU": 12686446, "network": "암살"
        },
        {"MAU": 3469174, "network": "태풍"
        },
        {"MAU": 71406, "network": "니모를 찾아서"
        },
        {"MAU": 10912664, "network": "괴물"
        },
        {"MAU": 700587, "network": "반지의 제왕 : 왕의 귀환"
        },
        {"MAU": 1767352, "network": "우리 형"
        },
        {"MAU": 3093489, "network": "친절한 금자씨"
        },
        {"MAU": 4310577, "network": "강철중: 공공의 적 1-1"
        },
        {"MAU": 102596, "network": "해리포터와 비밀의 방"
        },
        {"MAU": 5039519, "network": "투사부일체"
        },
        {"MAU": 8202115, "network": "과속스캔들"
        },
        {"MAU": 7350496, "network": "트랜스포머"
        },
        {"MAU": 1117043, "network": "브리짓 존스의 일기2 : 열정과 애정"
        },
        {"MAU": 9686269, "network": "검사외전"
        },
        {"MAU": 4160337, "network": "박물관이 살아있다!"
        },
        {"MAU": 8982567, "network": "아이언맨 3"
        },
        {"MAU": 6047684, "network": "전우치"
        },
        {"MAU": 6610836, "network": "늑대소년"
        },
        {"MAU": 6679444, "network": "좋은 놈, 나쁜 놈, 이상한 놈"
        },
        {"MAU": 7854274, "network": "디워"
        },
        {"MAU": 2632663, "network": "마파도"
        },
        {"MAU": 2024146, "network": "광식이 동생 광태"
        },
        {"MAU": 7387680, "network": "트랜스포머: 패자의 역습"
        },
        {"MAU": 12801369, "network": "7번방의 선물"
        },
        {"MAU": 1996575, "network": "트로이"
        },
        {"MAU": 7749860, "network": "트랜스포머 3"
        },
        {"MAU": 113393, "network": "센과 치히로의 행방불명"
        }
    ]   
}


chart.data = JSON.parse(JSON.stringify(allData[year]));
categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

/*
오토 스타트 
series.events.on("inited", function() {
    setTimeout(function() {
    playButton.isActive = true; // this starts interval
    }, 2000)
})
*/

}); // end am4core.ready()