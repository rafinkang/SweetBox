from bs4 import BeautifulSoup as bs
from pprint import pprint
import requests
from pathlib import Path
import re
import time
import json

url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=d9dbe114c7c43200437493cbcb36ee74&targetDt=20180101'
resp = requests.get(url)
data = resp.json()
print(data)


# for i in range(10,11):
#     url2= url+str(i)
#     resp=requests.get(url2)
#     data=resp.json()
#     print("----------",i,"-------------")
#     print(data)
#     dataList.append(data)

