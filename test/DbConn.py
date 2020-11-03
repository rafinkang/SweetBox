import cx_Oracle
""" 
민수 DB
orcl.czq0cxsnbcns.ap-northeast-2.rds.amazonaws.com, orcl, scott, tigertiger, 1521
""" 

class DbConn:
    def __init__(
        self, 
        host = "orcl.czq0cxsnbcns.ap-northeast-2.rds.amazonaws.com", 
        dbname = "orcl", 
        user = "scott", 
        password = "tigertiger", 
        port = "1521"
        ):
        self.host = host
        self.dbname = dbname
        self.user = user
        self.password = password
        self.port = port
        self.connection = cx_Oracle.connect(self.user, self.password, self.host+":"+self.port+"/"+self.dbname)

    def execute(self, sql, args=None):
        cur = self.connection.cursor()
        if args == None:
            res = cur.execute(sql)
        else:
            res = cur.execute(sql, args)
            
        if res == None:
            self.connection.commit()  
        else:
            resultList = cur.fetchall()
            return resultList
            
    
    def disconnect(self):
        self.connection.close()