#!flask/bin/python
from flask import Flask, jsonify, request, render_template, make_response
from bus import xxt_bus

app = Flask(__name__)



@app.route('/api/bus/getByName', methods=['POST'])
def get_bus():
    query_data = {
        'name': request.json['name']
    }
    result = xxt_bus(query_data, '/xxt_api/bus/getByName')
    return jsonify(result)


@app.route('/api/routeStation/getByRouteIdAndDirection', methods=['POST'])
def get_route_station():
    query_data = {
        'routeId': request.json['routeId'],
        'direction': request.json['direction']
    }
    result = xxt_bus(query_data, '/xxt_api/bus/routeStation/getByRouteIdAndDirection')
    return jsonify(result)


@app.route('/api/runbus/getByRouteAndDirection', methods=['POST'])
def get_run_bus():
    query_data = {
        'routeId': request.json['routeId'],
        'direction': request.json['direction']
    }
    result = xxt_bus(query_data, '/xxt_api/bus/runbus/getByRouteAndDirection')
    return jsonify(result)


@app.route('/api/waitTime', methods=['POST'])
def get_wait_time():
    query_data = {
        'num': 3,
        'routeStationId': request.json['routeStationId']
    }
    result = xxt_bus(query_data, '/xxt_api/bus/info/waitTime')
    return jsonify(result)




@app.route('/bus', methods=['GET'])
def search():
    return render_template("search.html")


@app.route('/bus/<int:route_id>', methods=['GET'])
def bus(route_id):
    return render_template("bus.html")


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run(debug=True)