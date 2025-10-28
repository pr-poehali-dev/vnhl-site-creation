import json
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

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для синхронизации данных сайта между устройствами
    Args: event с httpMethod (GET/POST), body с данными
    Returns: HTTP response с данными или статусом сохранения
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
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
