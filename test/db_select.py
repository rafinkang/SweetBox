import requests
import time
from pathlib import Path
import sys
from DbConn import *

db = DbConn()

sql = """
SELECT *
FROM BOXOFFICE
"""

result = db.execute(sql)

print(type(result), result)
