FROM registry.access.redhat.com/ubi9/python-39
RUN mkdir static
COPY ./ /opt/app-root/src/
RUN python -m venv venv
RUN ENV PATH="/opt/app-root/src/venv/bin:$PATH 
RUN . venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt
EXPOSE 80
CMD [ "python", "jira_proxy.py" ]
