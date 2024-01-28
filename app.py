from flask import Flask, request, render_template 
import sqlite3
from datetime import datetime,timezone
import json
import pytz


app = Flask(__name__)

def dbCheck():
    connection=sqlite3.connect("capsules.db")
    cursor=connection.cursor()
    
    sql="""CREATE TABLE IF NOT EXISTS caps(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT CHECK(LENGTH(name) <= 775),
        description TEXT CHECK(LENGTH(description) <= 1048576),
        content TEXT CHECK(LENGTH(content) <= 5242880),
        willOpen DATE NOT NULL CHECK(LENGTH(willOpen) <= 1048576),
        zone TEXT NOT NULL CHECK(LENGTH(zone) <= 7),
        published DATE DEFAULT (datetime('now'))
    ) """
     

    cursor.execute(sql)


def convert_to_utc(time_string):
   
    local_time = datetime.strptime(time_string, "%Y-%m-%dT%H:%M%z")
    utc_time = local_time.astimezone(pytz.utc)

    return utc_time.strftime("%Y-%m-%dT%H:%M:%S%z")


def convert_utc_to_timezone(utc_time_string, offset_string):
    utc_time_string=utc_time_string.replace(" ", "T")
    if utc_time_string[-3]==":":
        utc_time_string=utc_time_string+"+0000"

    utc_time = datetime.strptime(utc_time_string, "%Y-%m-%dT%H:%M:%S%z")
    offset_hours, offset_minutes = map(int, offset_string.split(':'))
    offset = pytz.FixedOffset(offset_hours * 60 + offset_minutes)
    local_time = utc_time.astimezone(offset)

    return local_time.strftime("%Y-%m-%dT%H:%M:%S%z")



def retrieve(sql,zone):

    dbCheck()
    connection=sqlite3.connect("capsules.db")
    cursor=connection.cursor()

    cursor.execute(sql)
    x=cursor.fetchall()
    
    connection.close()
   
    return json.dumps(status(x, zone))


def status(x, zone):

    caps=[]

    for i in x:
        
        currentTime = datetime.utcnow().replace(tzinfo=pytz.utc)
        capTime= datetime.fromisoformat(i[4])
        cap=list(i+('opened',)) if capTime< currentTime else list(i+('closed',))
        del cap[3]
        cap.insert(3,'')

        cap[4]=cap[4].replace(" ", "T")
        cap[4]=convert_utc_to_timezone(cap[4],zone)
        del cap[5]

        cap[5]=cap[5]+"+0000".replace(" ", "T")
        cap[5]=convert_utc_to_timezone(cap[5],zone)

        caps.append(cap)
   
    return caps

@app.route('/', methods=['GET','POST'])
def index():

  if request.method=='GET':
          return render_template('/index.html')
     
  elif request.method=='POST':
  
   
     data= (request.form['name'],request.form['description'],request.form['content'],request.form['willOpen'], request.form['time'],request.form['zone'])
     
     if len(data[4])==0 or datetime.fromisoformat(convert_to_utc(data[3]+'T'+data[4]+data[5]))<=datetime.now(timezone.utc):
         return "Internal Server Error", 500

     dbCheck()
     connection=sqlite3.connect("capsules.db")
     cursor=connection.cursor()
     

     sql='''INSERT INTO caps (name, description, content, willOpen, zone)
    VALUES (?, ?, ?, ?, ?)'''
     

     cursor.execute(sql, (data[0], data[1], data[2], convert_to_utc(data[3]+'T'+data[4]+data[5]), data[5]))
     
     connection.commit()

     connection.close()
     return "Success"
    
    
    
@app.route('/getCaps', methods=['POST'])
def getCaps():
    zone= request.form['zone']
    sql="""SELECT * FROM caps ORDER BY rowid DESC LIMIT 50"""
    return retrieve(sql,zone)

@app.route('/getOpenedCaps', methods=['POST'])
def getOpenedCaps():
    zone= request.form['zone']
    sql="""SELECT * FROM caps WHERE datetime(substr(willOpen, 1, 10) || ' ' || substr(willOpen, 12, 8)) < datetime('now') ORDER BY id DESC LIMIT 50;"""
    return retrieve(sql, zone)   

@app.route('/getClosedCaps', methods=['POST'])
def getClosedCaps():
    zone= request.form['zone']
    sql="""SELECT * FROM caps WHERE datetime(substr(willOpen, 1, 10) || ' ' || substr(willOpen, 12, 8)) > datetime('now') ORDER BY id DESC LIMIT 50;"""
    return retrieve(sql, zone)


@app.route('/search', methods=['POST'])
def search():

    data = (request.form["search"], request.form['searchBy'], request.form.get('request','null'),request.form['zone'])
    zone=data[3]
    search_string=data[0]
    searchBy='name' if data[1]== '6E616D65' else 'id' if data[1]=='6964' else 'null'
    
    dbCheck()
    connection=sqlite3.connect("capsules.db")
    cursor=connection.cursor()

    sql = "SELECT * FROM caps WHERE {} LIKE ? ESCAPE '!' ORDER BY id DESC LIMIT 50;".format(searchBy)

    cursor.execute(sql, ('%!' + search_string + '%',))
    x=cursor.fetchall()
    
    connection.close()
    #___________________________
    if data[2]=='getContent':
        if status(x,zone)[0][-1]=='opened':        
            return str(json.dumps(x[0][3]))
        else:
            return str(json.dumps('CAPSULE CLOSED'))
    #___________________________ getContent
    else:
        
        return str(json.dumps(status(x,zone)))
        
