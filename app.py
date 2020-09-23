from flask import Flask, session,render_template,request,url_for,redirect,flash,jsonify
from flask_cors import CORS, cross_origin
import os
import json 

app = Flask(__name__)
CORS(app)

@app.route('/add',methods = ['POST'])
def add():
	path = os.path.realpath(os.path.dirname(__file__)) + "/static/data.txt"
	data = json.load(open(path))
	data['list'].append(dict(request.form))
	json.dump(data,open(path,'w'))
	return jsonify({'status':200})


@app.route('/delete',methods = ['POST'])
def delete():
	id = request.form.get('id')
	path = os.path.realpath(os.path.dirname(__file__)) + "/static/data.txt"
	data = json.load(open(path))
	
	for a,i in enumerate(data['list']):
		print(i)
		d = dict(i)
		print(type(d['id']) ,type(id),d['id'] , id  )
		if d['id'] == id :
			del(data['list'][a])
	json.dump(data,open(path,'w'))
	return jsonify({'status':200})


@app.route('/list',methods = ['POST'])
def list():
	path = os.path.realpath(os.path.dirname(__file__)) + "/static/data.txt"
	data = json.load(open(path))
	return  jsonify( data['list'])


