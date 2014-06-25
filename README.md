## Gamelib

### The most uniquely named game library ever

----

This is a game library I am creating to make game creation easy (for me at
least) on web platforms. Its main purpose is to provide a large enough framework
that I can create ludum dare games, but not be so huge that it gets in the way
of anything.

It draws features from many other game libraries. It uses a scene graph for
drawing and updating, much like CGSceneGraph or Unity. It makes extensive use of
callbacks, like many other game libraries.

The goal of this library is to make something that is functional, and provides
all the necessities to making an actual game. Because the intended games are
ludum dare games, they won't be terribly complex and they won't be huge in
scale, but it is necessary that you don't waste time looking up documentation or
puzzling over how a certain part works, and can instead start programming from
the get go. Hopefully this project will accomplish this goal. (Again, I promise
this only for myself. If other people make use of this game library and find it
useful, either for making games or understanding game libraries, great! Let me
know!)

----

### Usage

Note: This section will probably change a lot as I figure out a real way to
distribute and use this.

Currently, there isn't a great way to use this library except to replace the
code in `game/game.js` with your own game. You can then host the server locally
using `make serve`, and navigate to `http://localhost:9876` to view the game.
One of the plans for the near future is setting up a way to build a standalone
version of the library. This section will be updated to demonstrate how to do
that when that happens.

----

### Q & A

Q: Why make another game library? 

A: Mostly because it's fun. I've tried to make game libraries in the past (my
github page is littered with them), but I've always tried to make something too
big or too complex. This game library is going to be small and useful.

Q: How are you going to make sure of that?

A: Instead of adding features that I think might be useful, I will instead be
making or remaking games using the library, and adding in features that are
needed in order for the game to work. That way, every feature that is added will
be something that a game might actually use.