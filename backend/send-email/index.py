import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта психолога на почту v.golosova@rambler.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    message = body.get('message', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и контакт обязательны'}, ensure_ascii=False)
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    from_email = 'v.golosova@rambler.ru'
    to_email = 'melni-v@yandex.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 560px; padding: 24px; background: #fdf8f2; border-radius: 12px;">
      <h2 style="color: #5a7a52; margin-bottom: 16px;">Новая заявка на консультацию</h2>
      <p><b>Имя:</b> {name}</p>
      <p><b>Контакт:</b> {contact}</p>
      {"<p><b>Сообщение:</b> " + message + "</p>" if message else ""}
      <hr style="border: none; border-top: 1px solid #e0d8cc; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">Заявка с сайта Валентины Голосовой</p>
    </div>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.rambler.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }