From: [Ubuntu community help wiki ](https://help.ubuntu.com/community/UFW)

# ufw
## Enable and Disable
To turn UFW on with the default set of rules:

```sudo ufw enable```

Check the status (optionally verbose):

```sudo ufw status (verbose)```

Turn ufw off:

```sudo ufw disable```

## Allow:
```sudo ufw allow <port>/<optional: protocol>```

example: To allow incoming tcp and udp packet on port 53:

```sudo ufw allow 53```

example: To allow incoming tcp packets on port 53:

```sudo ufw allow 53/tcp```

example: To allow incoming udp packets on port 53:

```sudo ufw allow 53/udp```

## Deny:
```sudo ufw deny <port>/<optional: protocol>```

**example:** To deny tcp and udp packets on port 53:

```sudo ufw deny 53```

**example:** To deny incoming tcp packets on port 53:

```sudo ufw deny 53/tcp```

**example:** To deny incoming udp packets on port 53:

```sudo ufw deny 53/udp```
## Delete Existing Rule:
To delete a rule, simply prefix the original rule with delete. For example, if the original rule was:

```ufw deny 80/tcp```

Use this to delete it:

```sudo ufw delete deny 80/tcp```

## Services:
List of running services:

```less /etc/services```

Allow by Service Name:

```sudo ufw allow <service name>```

**example:** to allow ssh:

```sudo ufw allow ssh```
