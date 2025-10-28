import json
import hashlib
from typing import Dict, Any

data_store = {
    "easternTeams": None,
    "westernTeams": None,
    "upcomingGames": None,
    "playoffBracket": None,
    "rules": None,
    "captains": None,
    "captainsEmptyMessage": None,
    "scheduleEmptyMessage": None,
    "rulesEmptyMessage": None,
    "siteTitle": "VNHL",
    "siteSubtitle": "Виртуальная Национальная Хоккейная Лига",
    "siteIcon": "Trophy",
    "customIconUrl": "",
    "iconType": "lucide"
}

ADMIN_SESSION_TOKEN = 'c27d44b5f50e3661a8d276c4e1860676a3c47a0252fadc394f6fc66e9eadad03'

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для синхронизации данных сайта между устройствами
    Args: event с httpMethod (GET/POST), body с данными, headers с токеном авторизации
    Returns: HTTP response с данными или статусом сохранения
    '''
    method: str = event.get('httpMethod', 'GET')
    headers: Dict[str, str] = event.get('headers', {})
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(data_store)
        }
    
    if method == 'POST':
        admin_token = headers.get('x-admin-token', headers.get('X-Admin-Token', ''))
        
        if admin_token != ADMIN_SESSION_TOKEN:
            return {
                'statusCode': 403,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Доступ запрещён. Требуется авторизация администратора'})
            }
        
        body_str = event.get('body', '{}')
        body_data = json.loads(body_str)
        
        for key, value in body_data.items():
            if key in data_store:
                data_store[key] = value
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Данные сохранены'})
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }