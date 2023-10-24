FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
RUN chmod 777 ../media
RUN mkdir ../media/album
RUN chmod 777 ../media/album
ADD . /code/
