# Urban Adventure
Perinteinen tasohyppelypeli kaikenikäisille. Peli on toteutettu front-back-db -arkkitehtuurilla. Ennätykset jäävät siis historiaan. Pelin kenttä generoituu satunnaisesti, joten se on jokaisella pelikerralla erilainen.

Peli on toteutettu JavaScriptillä, backend toteutettu JavaScriptillä ja tietokantana toimii MongoDB.

# Asennusohjeet
1. Kloonaa repositoriot.
```
git clone git@github.com:juakiv/urban-adventure-front.git
git clone git@github.com:juakiv/urban-adventure-back.git
```

2. Asenna dependencyt molemmissa repositorioissa ajamalla komento
```
npm install
```

3. Käynnistä React-kehityspalvelin ajamalla komento
```
npm start
```

4. Käynnistä Websocket-palvelin ajamalla komento
```
node index.js
```
tai watcherilla
```
npm run watch
```
5. Avaa selaimessa localhost:3000

# Peliohjeet
1. 