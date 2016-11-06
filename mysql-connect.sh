
# Setup configuration for connecting to mysql host
HOST='us-cdbr-iron-east-04.cleardb.net'
USER='b7d1ee028b5ad9'
PASSWORD='2be9ecbb'
DATABASE='heroku_dd803884342ea93'
# Connect
mysql --host=$HOST --user=$USER --password=$PASSWORD $DATABASE
