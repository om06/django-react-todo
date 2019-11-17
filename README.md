# TODO App in Django and react 

In this app user can create a collection of tasks known as **bucket** and can name it accordingly. Also user can add multiple tasks in the **bucket** and  mark it as *Done* or *Undone*. User can always delete and update his **Task** and **Bucket**.

**API DOCUMENTATION** : [https://documenter.getpostman.com/view/5275697/SW7XZUJq](https://documenter.getpostman.com/view/5275697/SW7XZUJq)

## Installation
 - Update the system `sudo apt-get update`
 -  Install virtualenv `sudo apt-get install virtualenv`
 - Install Python 3 `sudo apt-get install python3`
 - Install mysql database using below commands
 -  `sudo apt-get install python3-dev`
 - `sudo apt-get install python3-dev libmysqlclient-dev`
 - `sudo apt-get install mysql-server`
 - `sudo systemctl enable mysql.service`

Create a database in mysql and add user

 - `sudo mysql`
 - `CREATE USER '<db_user>'@'<host>' IDENTIFIED BY '<password>';`
 - `GRANT ALL PRIVILEGES ON * . * TO '<db_user>'@'<host>';`
 - `FLUSH PRIVILEGES;`
 - `CREATE DATABASE <db_name>;`

Set my.cnf file for mysql database connection

 - `sudo nano /etc/mysql/my.cnf`
 - Enter the below lines
`[client]`
`database = db_name`
`user = db_user`
`password = db_password`
`default-character-set = utf8`


Install the project

 - `cd ~`
 - `mkdir todo`
 - `cd todo`
 - `virtualenv -p python3 env`
 - `source env/bin/activate`
 - `git clone https://github.com/om06/django-react-todo`
 - `mv django-react-todo todo`
 - `cd todo`
 - `pip install -r requirements/base.txt`
 - `python manage.py makemigrations`
 - `python manage.py migrate`
 - If you want to add user you can do so by `python manage.py createsuperuser`
 - Install Frontend
 - `cd frontend`
 - `npm install`

Database Schema / E-R Diagram
![enter image description here](https://raw.githubusercontent.com/om06/django-react-todo/master/er_diagram.png)