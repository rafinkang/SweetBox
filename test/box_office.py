import requests
import json
from DbConn import *
from datetime import datetime, timedelta

API_KEY = "d9dbe114c7c43200437493cbcb36ee74"
BOX_OFFICE_URL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"


def insert_boxoffice(showrange):
    db = DbConn()
    url = BOX_OFFICE_URL+"?key="+API_KEY+"&targetDt="+showrange
    data = requests.get(url).json()
    
    boxOfficeResult = data['boxOfficeResult']
    showRange = boxOfficeResult['showRange']
    dailyBoxOfficeList = boxOfficeResult['dailyBoxOfficeList']

    insert_query = """
    INSERT INTO boxOffice
    (showrange, rnum, rank, rankinten, rankoldandnew, moviecd, movienm, opendt, salesamt, salesshare, salesinten, saleschange, salesacc, audicnt, audiinten, audichange, audiacc, scrncnt, showcnt)
    VALUES (:showrange, :rnum, :rank, :rankinten, :rankoldandnew, :moviecd, :movienm, :opendt, :salesamt, :salesshare, :salesinten, :saleschange, :salesacc, :audicnt, :audiinten, :audichange, :audiacc, :scrncnt, :showcnt)
    """
    select_query = "SELECT * FROM BOXOFFICE WHERE SHOWRANGE = :SHOWRANGE AND MOVIECD = :MOVIECD"


    for i in dailyBoxOfficeList: # 하루에 1위~10위 데이터 들어있음
        salesInten = i['salesInten']
        openDt = i['openDt']
        if len(openDt) < 3:
            continue

        audiInten = i['audiInten']
        rnum = i['rnum']
        movieCd = i['movieCd']
        audiAcc = i['audiAcc']
        showCnt = i['showCnt']
        audiCnt = i['audiCnt']
        salesAmt = i['salesAmt']
        movieNm = i['movieNm']
        rank = i['rank']
        audiChange = i['audiChange']
        rankInten = i['rankInten']
        scrnCnt = i['scrnCnt']
        rankOldAndNew = i['rankOldAndNew']
        salesChange = i['salesChange']
        salesAcc = i['salesAcc']
        salesShare = i['salesShare']
        
        query_params = {
            'showrange' : showRange,
            'rnum' : rnum,
            'rank' : rank,
            'rankinten' : rankInten,
            'rankoldandnew' : rankOldAndNew,
            'moviecd' : movieCd,
            'movienm' : movieNm,
            'opendt' : openDt,
            'salesamt' : salesAmt,
            'salesshare' : salesShare,
            'salesinten' : salesInten,
            'saleschange' : salesChange,
            'salesacc' : salesAcc,
            'audicnt' : audiCnt,
            'audiinten' : audiInten,
            'audichange' : audiChange,
            'audiacc' : audiAcc,
            'scrncnt' : scrnCnt,
            'showcnt' : showCnt
        }

        select_result = db.execute(select_query, {"SHOWRANGE": showRange, "MOVIECD": movieCd})

        if len(select_result) == 0:
            db.execute(insert_query, query_params)
            # print(showRange, movieNm,'성공적으로 DB에 입력했슴')
        # else :
        #     print(showRange, movieNm,'는 안대요 안대~!')
    print(showrange, "작업 완료. -----")
    db.disconnect()







def make_date(start_date, end_date):
    # yyyymmdd 일자를 datetime 객체로 변환 
    start_date = datetime.strptime(start_date, '%Y%m%d')
    end_date = datetime.strptime(end_date, '%Y%m%d')
    # end_date = datetime.today()

    # 날짜를 입력할 리스트 
    str_date_list = []

    while start_date.strftime('%Y%m%d') != end_date.strftime('%Y%m%d'):
        str_date_list.append(start_date.strftime('%Y%m%d'))
        start_date += timedelta(days=1)

    return str_date_list


dateList = make_date('20190101', '20200101')

for m_date in dateList:
    insert_boxoffice(m_date)

# print(dateList)