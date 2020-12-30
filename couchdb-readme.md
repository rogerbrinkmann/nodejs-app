# Ubuntu CouchDb setup

### installation:
```curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc | sudo apt-key add -```

```echo "deb https://apache.bintray.com/couchdb-deb focal main" | sudo tee -a /etc/apt/sources.list```

```sudo apt update```  
```sudo apt install couchdb```

## configuration:

```/opt/couchdb/etc/local.ini```

## password reset:
Delete admin user entries in admin section of:

/opt/couchdb/etc/local.d/10-admins.ini

**example:**
```
[admins]  
admin = -pbkdf2-960eac5550a333409bd9d4a5d599396fda9c5ca90075b8b4f02444f47dcf5c3f4e958aaf,10
```

Then restart the couchdb service. At this point, access to couchdb is not possible any more.

Edit:

```/opt/couchdb/etc/local.ini```

and add a admin username and password
```
admin = password
```

CouchDB will use this file to recreate the admin account at every restart. To stop this from happening simply comment out or delete the password entry.

## set port and bind:
port = 5984  
bind = 0.0.0.0 (exposes externally)  

remember to open port through ufw  
(without server need to specify: http-> http://ip_address:5984/_utils)

## uninstall:
```sudo apt-get remove couchdb couchdb-bin couchdb-common -yf```  
```sudo apt purge couchdb```

## CouchDB on Ubuntu 

## Service commands:

```sudo systemctl restart couchdb```  
```sudo systemctl start couchdb```  
```sudo systemctl stop couchdb```

## CouchDb on Windows

## starting and stopping couchdb server
C:\>net.exe start "apache couchdb"  
C:\>net.exe stop "apache couchdb"  

