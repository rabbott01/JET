FROM registry.access.redhat.com/ubi9/python-39
RUN mkdir static
COPY ./ /opt/app-root/src/
RUN python -m venv venv
RUN . venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt
RUN 
EXPOSE 80
#CMD /bin/bash -c "source activate venv && python jira_proxy.py"
CMD [ "python", "jira_proxy.py" ]
