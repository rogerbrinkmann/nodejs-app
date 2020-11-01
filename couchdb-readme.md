# Ubuntu CouchDb setup
### installation:
curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc | sudo apt-key add -  
echo "deb https://apache.bintray.com/couchdb-deb focal main" | sudo tee -a /etc/apt/sources.list  

sudo apt update  
sudo apt install couchdb  

### configuration:
/opt/couchdb/local.ini

### set port and bind:
port = 5984  
bind = 0.0.0.0 (exposes externally)  

remember to open port through ufw  
(without server need to specify: http-> http://ip_address:5984/_utils)

### uninstall:
sudo apt-get remove couchdb couchdb-bin couchdb-common -yf  
sudo apt purge couchdb  


# Windows CouchDb
### starting and stopping couchdb server
C:\>net.exe start "apache couchdb"  
C:\>net.exe stop "apache couchdb"  
