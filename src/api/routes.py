"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not name:
        return jsonify({'msg': 'Debe ingresar su nombre'}), 400
    
    if not email:
        return jsonify({'msg': 'Debe ingresar su email'}), 400
    
    if not password:
        return jsonify({'msg': 'Debe ingresar su password'}), 400
    
    exist = User.query.filter_by(email=email).first()
    if exist:
        return jsonify({'msg': 'El usuario ya existe'}), 409

    hashed_password = generate_password_hash(password)

    new_user = User(email=email, password=hashed_password, name=name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    current_user_email = request.json.get('email', None)
    current_user_password = request.json.get('password', None)

    
    if not current_user_email:
        return jsonify({'msg': 'Debe ingresar su email'}), 400
    
    if not current_user_password:
        return jsonify({'msg': 'Debe ingresar su password'}), 400

    user = User.query.filter_by(email=current_user_email).first()

    if not user:
        return jsonify({'message': 'El usuario no existe'}), 404
    if not check_password_hash(user.password, current_user_password):
        return jsonify({'message': 'El usuario no existe'}), 400
    
    token = create_access_token(
        identity = user.email,
        additional_claims = user.serialize()
    )

    return jsonify(token), 200


@api.route('/protected', methods=['POST'])
@jwt_required()
def secret():

    current_user_email = get_jwt_identity() #Obtengo las crendenciales del usuario

    if not current_user_email:
        return jsonify({'msg': 'No existe el usuario'}), 404
    
    user = User.query.filter_by(email = current_user_email).first()

    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404
    
    return jsonify({
        'msg': 'Acceso permitido',
        'user': user.serialize()
    }), 200

@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    
    if not users:
        return jsonify({'msg': 'No hay usuarios'}), 404
    # Serialize the users
    list_users = [user.serialize() for user in users]

    return jsonify(list_users), 200

