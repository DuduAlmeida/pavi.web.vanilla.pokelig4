https://dbdiagram.io/d/636051495170fb6441d28664

```classDiagram

Table Game {
  id int
  board int[]
  users User[]
  history any[]
  userIdPlaying string
}

Table Room {
  id string
  game Game
  name string
  users User[]
  chatHistory any[]
  isPrivate boolean
  namespace Namespace
}

Table Namespace {
  id string
  name string
  rooms Room[]
  endpoint string
}

Table User {
  id string
  ip string
  name string
  pokemon Pokemon
  isPlaying boolean
  canUsePrimary boolean
}


Table Pokemon {
  id string
  name string
  color string
  imageUrl string
  alternativeColor string
}

Ref: Game.id - Room.game
Ref: Room.id < Namespace.rooms
Ref: "Game"."users" < "User"."id"

Ref: "Game"."userIdPlaying" - "User"."id"

Ref: "Pokemon"."id" < "User"."pokemon"

Ref: "Room"."users" < "User"."id"

```
