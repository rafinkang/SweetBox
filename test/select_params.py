import joblib
from DbConn import *
import pandas as pd
import numpy as np

db = DbConn()

# 총 관객수 예측 모델
model = joblib.load('C:/Users/user/SweetBox/test/max_people.pkl')

# 예측할 영화 정보 초기 값
MOVIE_NAME = "극한직업"
PRODUCER = "(주)어바웃필름"
DIRECTOR = "이병헌"
ACTOR1 = "류승룡"
ACTOR2 = "이하늬"
ACTOR3 = "진선규"
ACTOR4 = "이동휘"
SCREEN = "1553"

# parameters ----------------

# producer
PROD_MAX = 0
PROD_AVG = 0
prod_sql = """
SELECT max(MAX_AUDIACC) AS PROD_MAX, avg(MAX_AUDIACC) AS PROD_AVG 
FROM MOVIE2 
WHERE PRODNM = :PRODUCER
"""
prod_res = db.execute(prod_sql, {"PRODUCER":PRODUCER})
if len(prod_res) > 0:
    PROD_MAX = prod_res[0][0]
    PROD_AVG = prod_res[0][1]
    
# director
DIRECTOR_AVG = 0
DIRECTOR_MAX = 0
DIRECTOR_100CNT = 0
director_sql = """
SELECT ROUND(max(MAX_AUDIACC)) AS DIRECTOR_MAX, ROUND(avg(MAX_AUDIACC)) AS DIRECTOR_AVG
FROM MOVIE2 m WHERE DIRECTOR = :DIRECTOR
"""
director_res = db.execute(director_sql, {"DIRECTOR":DIRECTOR})
if len(director_res) > 0:
    DIRECTOR_MAX = director_res[0][0]
    DIRECTOR_AVG = director_res[0][1]

director100_sql = """
SELECT COUNT(*) FROM MOVIE2 m WHERE DIRECTOR = :DIRECTOR AND MAX_AUDIACC > 1000000
"""
director100_res = db.execute(director100_sql, {"DIRECTOR":DIRECTOR})
if len(director100_res) > 0:
    DIRECTOR_100CNT = director100_res[0][0]


# ACTOR
actor_sql = """
SELECT max(MAX_AUDIACC) FROM MOVIE2 m WHERE ACTORS1 = :ACTORNAME OR ACTORS2 = :ACTORNAME OR ACTORS3 = :ACTORNAME OR ACTORS4 = :ACTORNAME
"""
ACTORS1_MAX = 0
actor1_res = db.execute(actor_sql, {"ACTORNAME":ACTOR1})
if len(actor1_res) > 0 :
    ACTORS1_MAX = actor1_res[0][0]

ACTORS2_MAX = 0
actor2_res = db.execute(actor_sql, {"ACTORNAME":ACTOR2})
if len(actor2_res) > 0 :
    ACTORS2_MAX = actor2_res[0][0]

ACTORS3_MAX = 0
actor3_res = db.execute(actor_sql, {"ACTORNAME":ACTOR3})
if len(actor3_res) > 0 :
    ACTORS3_MAX = actor3_res[0][0]
    
ACTORS4_MAX = 0
actor4_res = db.execute(actor_sql, {"ACTORNAME":ACTOR4})
if len(actor4_res) > 0 :
    ACTORS4_MAX = actor4_res[0][0]

SCRNCNT = int(SCREEN)


params = [
    [PROD_MAX, DIRECTOR_AVG, DIRECTOR_MAX, ACTORS1_MAX, ACTORS2_MAX, ACTORS3_MAX, ACTORS4_MAX, DIRECTOR_100CNT, PROD_AVG, SCRNCNT]
]


print("params:", params)
result = model.predict(params)
print(MOVIE_NAME,"의 예측값:", result[0])