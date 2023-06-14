FROM registry.access.redhat.com/ubi9/httpd-24:latest
USER root
EXPOSE 80
COPY ./* /var/www/html/
COPY ./jet-form.html /var/www/html/index.html
COPY ./localhost.crt /etc/httpd/tls/localhost.crt
COPY ./localhost.key /etc/httpd/tls/localhost.key
RUN echo "ServerName http://jet-form-route-ephemeral-ojbcrf.apps.c-rh-c-eph.8p0c.p1.openshiftapps.com" >> /etc/httpd/conf/httpd.conf
CMD /usr/sbin/httpd -D FOREGROUND
