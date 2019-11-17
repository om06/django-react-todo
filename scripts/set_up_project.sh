# Install mysql
# Reference :- https://www.digitalocean.com/community/tutorials/how-to-create-a-django-app-and-connect-it-to-a-database
# ======================================================================================================================
sudo apt-get install python3-dev
sudo apt-get install python3-dev libmysqlclient-dev
sudo apt-get install mysql-server

# Check the status and enable the mysql service
sudo systemctl status mysql.service
sudo systemctl enable mysql.service


# Create database
# Reference :- https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql
# ======================================================================================================================
sudo mysql
CREATE USER 'fractal_user'@'localhost' IDENTIFIED BY 'fractal@password';
GRANT ALL PRIVILEGES ON * . * TO 'fractal_user'@'localhost';
FLUSH PRIVILEGES;
