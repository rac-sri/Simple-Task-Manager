# Redis

### Redis + NodeJS implementation

### Command Line

```
* SET <name> value
* GET <name>
* DEL <name>
* FLUSHALL
* EXPIRE <name> 50   // expire in 50 sec
* TTL <name>  // remaining time
* SETEX <NAME> <TIME>  <VALUE>
* PERSIST <NAME>
* MSET <KEY1> <VALUE> KEY2 <VALUE>
* APPEND <KET> <NAME>
* RENAME <NAME> <NEWNAME>
* LPUSH <LISTNAME> <VALUE>
* LRANGE <LISTNAME> 0-1(RANGE)
* LPOP <LISTNAME>
* LINSERT <LISTNAME> BEFORE <ENTRY>
* SADD <NAME> <VALUE>
* SISMEMBER <NAME> <VALUE>  /IF PRESET
* SMEMBER <NAME>
* ZADD <NAME> <SCORE> <VALUE> // store in respect to score value
* ZRANK <NAME> <VALUE>  //returns score
* ZRANGE USERS <RANGE>
* HSET <NAME> <KEY> <VALUE> // hashmap
* HMSET .... // for multiple values
* HKEYS <NAME>  //return keys
* SAVE // create snapshot
```
