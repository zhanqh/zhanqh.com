from base import base
import requests


def xxt_bus(query_data, path):
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
    data = base(query_data)
    url = 'http://nxxtapi.gzyyjt.net:9009' + path
    response = requests.post(url, data=data)

    return response.text