#영화 상세정보 DB에 저장
#def movie_detail(year)
import datetime
import requests
import json
from DbConn import *
from datetime import datetime, timedelta

MOVIE_DETAIL_URL='http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json'
# 민수 
# API_KEY = "d9dbe114c7c43200437493cbcb36ee74"
# 태욱
# API_KEY = "ef0d1cc93bc2ef58555e96b5dd6af1e4"
# 성은
API_KEY = "de94fab2e7564e8d9c7a4e43a6a452ba"
# 문정
# API_KEY = "115e6f48c454984e7ac6975401bd9544"
# API_KEY = "13891b89e385e48aa8433f01dc61d577"
# API_KEY = "c8fc5344160dbc22af948de275908b90"
# API_KEY = "1f7ced99b26cb1c06c18e6fe86d22308"

def insert_moviedetail(moviecd):
    db = DbConn()
    
    url = MOVIE_DETAIL_URL+'?key='+API_KEY+'&movieCd='+str(moviecd)
    data = requests.get(url).json()

    movie_info_list = data['movieInfoResult']['movieInfo']
    
    insert_query = '''
    INSERT INTO movie (movieCd,movieNm,movieNmEn,prdtYear,showTm,openDt,prdtStatNm,typeNm,nations,genre,genreSub,director,actors1,actors2,actors3,actors4,audits,prodCd,prodNm,distCd,distNm,staffs)
    VALUES(:movieCd,:movieNm,:movieNmEn,:prdtYear,:showTm,:openDt,:prdtStatNm,:typeNm,:nations,:genre,:genreSub,:director,:actors1,:actors2,:actors3,:actors4,:audits,:prodCd,:prodNm,:distCd,:distNm,:staffs)
    '''
    select_query="SELECT * FROM movie WHERE MOVIECD = :MOVIECD"

    #변수 조건
    actor1 = movie_info_list['actors'][0]['peopleNm'] if len(movie_info_list['actors']) > 0 else ''
    actor2 = movie_info_list['actors'][1]['peopleNm'] if len(movie_info_list['actors']) > 1 else ''
    actor3 = movie_info_list['actors'][2]['peopleNm'] if len(movie_info_list['actors']) > 2 else ''
    actor4 = movie_info_list['actors'][3]['peopleNm'] if len(movie_info_list['actors']) > 3 else ''
    
    nations = movie_info_list['nations'][0]['nationNm'] if len(movie_info_list['nations']) > 0 else ''
    
    genre = movie_info_list['genres'][0]['genreNm'] if len(movie_info_list['genres']) > 0 else ''
    genreSub= movie_info_list['genres'][1]['genreNm'] if len(movie_info_list['genres']) > 1 else ''

    director= movie_info_list['directors'][0]['peopleNm'] if len(movie_info_list['directors']) > 0 else ''

    audits = movie_info_list['audits'][0]['watchGradeNm'] if len(movie_info_list['audits']) > 0 else ''
    
    openDt = datetime.strptime(movie_info_list['openDt'], '%Y%m%d')
    prodCd=""
    prodNm=''
    distCd=''
    distNm=''

    if len(movie_info_list['companys']) > 0 :
        for n in movie_info_list['companys']:
            if n['companyPartNm'] == '제작사':
                prodCd = n['companyCd']
                prodNm = n['companyNm']
                break
        for n in movie_info_list['companys']:
            if n['companyPartNm'] == '배급사':
                distCd = n['companyCd']
                distNm = n['companyNm']
                break


    staffs = movie_info_list['staffs'][0]['peopleNm'] if len(movie_info_list['staffs']) > 0 else ''

    query_params={
        'movieCd' : movie_info_list['movieCd'],
        'movieNm' : movie_info_list['movieNm'],
        'movieNmEn' : movie_info_list['movieNmEn'],
        'prdtYear' : movie_info_list['prdtYear'],
        'showTm' : movie_info_list['showTm'],
        'openDt' : openDt,
        'prdtStatNm' : movie_info_list['prdtStatNm'],
        'typeNm' : movie_info_list['typeNm'],
        'nations' : nations,
        'genre' : genre,
        'genreSub' : genreSub,
        'director' : director,
        'actors1' : actor1,
        'actors2' : actor2,
        'actors3' : actor3,
        'actors4' : actor4,
        'audits' : audits,
        'prodCd' : prodCd,
        'prodNm' : prodNm,
        'distCd' : distCd,
        'distNm' : distNm,
        'staffs' : staffs
    }

    select_result = db.execute(select_query, {"MOVIECD": moviecd})

    if len(select_result) == 0:
        # print(insert_query, query_params)
        db.execute(insert_query, query_params)

    print(movie_info_list['movieNm'], "작업 완료. -----")
    db.disconnect()

# insert_moviedetail(20124079)


def movie_detail(year):
    db = DbConn()
    sql = "select moviecd from boxoffice2 where dailydate between TO_DATE('"+str(year)+"/01/01', 'YYYY/MM/DD') and TO_DATE('"+str(year)+"/12/31', 'YYYY/MM/DD') group by moviecd"
    print(sql)
    cd_list = db.execute(sql)
    db.disconnect()

    for movie_cd in cd_list:
        insert_moviedetail(movie_cd[0])

    print(len(cd_list),"개 인서트 끝~~~~")

# for i in range(2015,2018):
#     movie_detail(i)
movie_detail(2010)
