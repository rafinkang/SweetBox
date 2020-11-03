#영화 상세정보 DB에 저장
#def movie_detail(year)

import requests
import json
from DbConn import *
from datetime import datetime, timedelta

MOVIE_DETAIL_URL='http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json'
API_SE_KEYS='de94fab2e7564e8d9c7a4e43a6a452ba'

def insert_moviedetail(moviecd):
    db = DbConn()
    
    url = MOVIE_DETAIL_URL+'?key='+API_SE_KEYS+'&movieCd='+str(moviecd)
    data = requests.get(url).json()

    movie_info_list = data['movieInfoResult']['movieInfo']
    
    insert_query = '''
    INSERT INTO movieDetail (movieCd,movieNm,movieNmEn,movieNmOg,prdtYear,showTm,openDt,prdtStatNm,typeNm,nations,genreNm,directors,actors1,actors2,actors3,actors4,audits,companyCd1,staffs)
    VALUES(:movieCd,:movieNm,:movieNmEn,:movieNmOg,:prdtYear,:showTm,:openDt,:prdtStatNm,:typeNm,:nations,:genreNm,:directors,:actors1,:actors2,:actors3,:actors4,:audits,:companyCd1,:staffs)
    '''
    select_query="SELECT * FROM movieDetail WHERE MOVIECD = :MOVIECD"


    actor1 = movie_info_list['actors'][0]['peopleNm'] if len(movie_info_list['actors']) > 0 else ''
    actor2 = movie_info_list['actors'][1]['peopleNm'] if len(movie_info_list['actors']) > 1 else ''
    actor3 = movie_info_list['actors'][2]['peopleNm'] if len(movie_info_list['actors']) > 2 else ''
    actor4 = movie_info_list['actors'][3]['peopleNm'] if len(movie_info_list['actors']) > 3 else ''

    companyCd1 = movie_info_list['companys'][0]['companyCd'] if len(movie_info_list['companys']) > 0 else ''
    
    nations = movie_info_list['nations'][0]['nationNm'] if len(movie_info_list['nations']) > 0 else ''
    
    genreNm= movie_info_list['genres'][0]['genreNm'] if len(movie_info_list['genres']) > 0 else ''

    directors= movie_info_list['directors'][0]['peopleNm'] if len(movie_info_list['directors']) > 0 else ''

    audits = movie_info_list['audits'][0]['watchGradeNm'] if len(movie_info_list['audits']) > 0 else ''
    
    staffs = movie_info_list['staffs'][0]['peopleNm'] if len(movie_info_list['staffs']) > 0 else ''

    query_params={
        'movieCd' : movie_info_list['movieCd'],
        'movieNm' : movie_info_list['movieNm'],
        'movieNmEn' : movie_info_list['movieNmEn'],
        'movieNmOg' : movie_info_list['movieNmOg'],
        'prdtYear' : movie_info_list['prdtYear'],
        'showTm' : movie_info_list['showTm'],
        'openDt' : movie_info_list['openDt'],
        'prdtStatNm' : movie_info_list['prdtStatNm'],
        'typeNm' : movie_info_list['typeNm'],
        'nations' : nations,
        'genreNm' : genreNm,
        'directors' : directors,
        'actors1' : actor1,
        'actors2' : actor2,
        'actors3' : actor3,
        'actors4' : actor4,
        'audits' : audits,
        'companyCd1' : companyCd1,
        'staffs' : staffs
    }

    select_result = db.execute(select_query, {"MOVIECD": moviecd})

    if len(select_result) == 0:
        db.execute(insert_query, query_params)

    print(movie_info_list['movieNm'], "작업 완료. -----")
    db.disconnect()

# insert_moviedetail(20124079)


def movie_detail(year):
    db = DbConn()
    cd_list = db.execute("select moviecd from boxoffice where showrange like '"+str(year)+"%' group by moviecd")
    db.disconnect()

    for movie_cd in cd_list:
        insert_moviedetail(movie_cd[0])

    print(len(cd_list),"개 인서트 끝~~~~")

movie_detail(2018)




































