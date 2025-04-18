# Player payload
```
players:{
    uuid:{
        sid:"",
        x:"",
        y:"",
        colors:"",
        joined_timestamp:"",
        status:{online,ttl 5mins}
    }
}

projectiles:[
    {x:"",y:"",playerUUID:""}
]
```
* uuid from jwt token

https://www.reddit.com/r/gamedev/comments/50a4ej/my_naive_multiplayer_game_sync_algorithm_and/
https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking

# Player Lobby Management and Assigning rooms
> May be we can use another field in the player details to make sure one player does not block the whole queue.
```python
# lobby caches
players_queue : queue of player_id
rooms:avaiable = redis_sorted_set(member-> roomId, score-> players) # heap
room:room_id = metadata with ttl 10mins
```
```python
# gameplay related cache
player:player_id : player_details with TTL 5mins # kv -> a centralised store for assigning room, player state, connected seeing, disconnected seeing,etc
projectile:room_id : queue
rooms:room_id:set() # players
leaderboard: sorted_set # heap
```

* Lobby = Room
* Each lobby will be having max 5 members and min 3 members to start the game
* Technically a queuing and assinging in some priority basis
* Player joins a player-queue and it publishes an event.
    * Subscriber will listen
    * Search for the room -> rooms with max players to compelete the room fast
    * Pop the player
    * Ideally adding player and popping player should be 
    * Also add a shadow key(actually ttl). For getting the value
* When a room:room_id timesout
    * Listen to it and check the number of players
    * Take the decision of what to do with the room