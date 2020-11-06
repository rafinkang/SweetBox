import requests
import json
from DbConn import *
from datetime import date, datetime, timedelta

# 민수 
# API_KEY = "d9dbe114c7c43200437493cbcb36ee74"
# 태욱
API_KEY = "ef0d1cc93bc2ef58555e96b5dd6af1e4"



BOX_OFFICE_URL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"


def insert_boxoffice(showrange):
    db = DbConn()
    url = BOX_OFFICE_URL+"?key="+API_KEY+"&targetDt="+str(showrange)
    data = requests.get(url).json()
    
    # showRange = data['boxOfficeResult']['showRange']
    dailyBoxOfficeList = data['boxOfficeResult']['dailyBoxOfficeList']
    dailydate = datetime.strptime(showrange, '%Y%m%d').strftime('%Y-%m-%d')

    insert_query = """
    INSERT INTO boxOffice2
    (dailydate, rnum, mrank, rankinten, rankoldandnew, moviecd, movienm, opendt, salesamt, salesshare, salesinten, saleschange, salesacc, audicnt, audiinten, audichange, audiacc, scrncnt, showcnt)
    VALUES (TO_DATE(:dailydate, 'YYYY-MM-DD'), :rnum, :mrank, :rankinten, :rankoldandnew, :moviecd, :movienm, TO_DATE(:opendt, 'YYYY-MM-DD'), :salesamt, :salesshare, :salesinten, :saleschange, :salesacc, :audicnt, :audiinten, :audichange, :audiacc, :scrncnt, :showcnt)
    """
    select_query = "SELECT * FROM BOXOFFICE2 WHERE dailydate = :dailydate AND MOVIECD = :MOVIECD"


    for i in dailyBoxOfficeList: # 하루에 1위~10위 데이터 들어있음
        openDt = i['openDt']
        if len(openDt) < 3:
            continue
        
        query_params = {
            'dailydate' : dailydate,
            'rnum' : i['rnum'],
            'mrank' : i['rank'],
            'rankinten' : i['rankInten'],
            'rankoldandnew' : i['rankOldAndNew'],
            'moviecd' : i['movieCd'],
            'movienm' : i['movieNm'],
            'opendt' : openDt,
            'salesamt' : i['salesAmt'],
            'salesshare' : i['salesShare'],
            'salesinten' : i['salesInten'],
            'saleschange' : i['salesChange'],
            'salesacc' : i['salesAcc'],
            'audicnt' : i['audiCnt'],
            'audiinten' : i['audiInten'],
            'audichange' : i['audiChange'],
            'audiacc' : i['audiAcc'],
            'scrncnt' : i['scrnCnt'],
            'showcnt' : i['showCnt']
        }
        # print(query_params)
        select_result = db.execute(select_query, {"dailydate": dailydate, "MOVIECD": i['movieCd']})

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
# insert_boxoffice('20201105')
