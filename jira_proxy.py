"""Jira Update Proxy
This app acts as a proxy to get info from the JET website and opens a jira issue.
"""

import json
import os
import logging
import requests
from flask import Flask, request

APP = Flask(__name__, static_url_path='/static')
logging.basicConfig(level='INFO', format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
logger = logging.getLogger(__name__)

@APP.route('/', methods=['GET'])
def serve_static_assets():
    return APP.send_static_file('jet-form.html')

@APP.route('/', methods=['POST'])
def get_jira_info():
    """get_jira_info Recieves POST requests and passes the info to open_jira """
    jira_info_in = json.loads(request.data)
    logging.info("Dumping incoming JSON from user:")
    logging.info(str(json.dumps(jira_info_in, indent=4)))

    open_jira_response = open_jira(json.dumps(jira_info_in))

    return open_jira_response

def open_jira(jira_info_json):
    """open_jira - Opens a jira with the info form get_jira_info"""
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f"Bearer {os.environ.get('JIRA_TOKEN')}"
    }
    url = "https://issues.redhat.com/rest/api/2/issue"
    try:
        jira_ret = requests.post(url, data=jira_info_json, headers=headers, verify=False)
        logging.info("The response is:")
        logging.info(str(jira_ret.status_code))
        logging.info(str(jira_ret.text))
        return jira_ret.text
    except requests.exceptions.RequestException as jira_coms_exception:
        logging.error("Return Code = %s", str(jira_ret.status_code))
        logging.exception(jira_coms_exception)
        return 0


if __name__ == '__main__':
    APP.run(APP.run(host='0.0.0.0', port=80))
