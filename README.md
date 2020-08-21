# warsawjs-workshop-47-reactive-snake
WarsawJS Workshop 47 training repo

## Opis warsztatu
Celem warsztatu jest poznanie biblioteki React.
Warsztat skupia się wyłącznie na czysto funkcyjnym aspekcie tworzenia UI (komponenty funkcyjne i hooki).
Tematem warsztatów jest klasyczna gra Snake.
Środowiskiem będzie Node z menadżerem pakietów NPM lub Yarn (w opisach będzie wykorzystywany Yarn).

## Przygotowanie
* Zweryfikować wymagane środowisko Node
    ```shell script
    node -v
    ```
  przykładowy output:
    ```shell script
    v12.16.3
    ```
* Przygotować repozytorium na Github
Stworzyć nowe repozytorium o nazwie `warsawjs-workshop-47-reactive-snake`.
Pobrać repozytorium.

## Kroki

Poniżej znajdują się szczegółowe opisy zadań do wykonania w ramach warsztatu.

### Stworzenie aplikacji React

Pierwszym krokiem, jest stworzenie nowej aplikacji React.
W tym celu należy wykorzystać paczkę NPM `create-react-app`.
Przechodzimy do folderu z repozytorium.
```shell script
npx create-react-app warsawjs-workshop-47-reactive-snake
```
Wynikiem działania będzie nowy folder `warsawjs-workshop-47-reactive-snake` wewnątrz folderu z repozytorium.
Kasujemy z niego pliki `README.md` and `.gitignore` a następnie pozostałą zawartość przenosimy do folderu repozytorium.
```shell script
mv warsawjs-workshop-47-reactive-snake/* ./ && rm -rf warsawjs-workshop-47-reactive-snake/
```
Odpalamy aplikację i weryfikujemy działanie w przeglądarce.
```shell script
yarn start
```
Kolejnym krokiem jest wyczyszczenie zawartości obecnej aplikacji przykładowej.
W tym celu otwieramy plik `src/App.jsx`.
Kasujemy zawartość `div` z klasą `App` i wstawiamy tekst `tutaj będzie gra`.
Kod pliku powinien wyglądać jak poniżej:
```jsx
import React from 'react';

function App() {
  return (
    <div>
      tutaj będzie gra
    </div>
  );
}

export default App;
```
Kasujemy plik `src/App.css`.
Na koniec weryfikujemy czy aplikacja dalej działa prawidłowo i w przeglądarce widzimy napis.

### Wyświetlenie siatki gry

Podstawą gry będzie siatka, która będzie prezentować aktualny stan rozgrywki.
Siatka gry będzie posiadać tyle samo kolumn co wierszy. 
Cały kod związany z grą umieścimy w folderze `src/game`. Utwórz folder.
```shell script
mkdir src/game
```
Na potrzeby zaprezentowania siatki gry stworzyć komponent `GameGrid`.
Komponent umieścić w pliku o nazwie `GameGrid.jsx`.
```shell script
touch src/game/GameGrid.jsx
```
Każdy plik z kodem JSX musi importować `React`. 
Dodaj import React.
```js
import React from 'react';
```
Komponent będzie posiadał własne style, więc obok stwórzmy też plik `GameGrid.css`.
```shell script
touch src/game/GameGrid.css
```
Następnie uzupełnij arkusz styli poniższymi stylami:
```css
.grid {
    border: solid 30px darkgray;
}

.gridRow {
    display: flex;
}

.gridCell {
    width: 30px;
    height: 30px;
    background-color: azure;
}
```
Dodać import arkusza styli w pliku z komponentem.
```js
import './GameGrid.css';
```
Komponent `GameGrid` powinien przyjmować jeden prop: `gridSize`.
Deklaracja powinna wyglądać jak poniżej:
```jsx
export default function GameGrid({ gridSize }) {
  return <></>;
}
```
Następnie wewnątrz komponentu należy stworzyć tablicę zawierającą indeksy wierszy i komórek w wierszach.
Ponieważ ilość wierszy jest równa ilości komórek w wierszu, wykorzystamy tablicę z indeksami do stworzenia wierszy i komórek wewnątrz.
Tablica z indeksami powinna zawierać `gridSize` elementów. 
Aby utworzyć tablicę możemy wykorzystać funkcję `Array.from`.
Jako argument przekazujemy obiekt z jednym kluczem `length` i wartości `gridSize`.
Wynikiem będzie tablica z pustymi elementami.
Następnie należy przeiterować się po utworzonej tablicy i wykorzystać podczas iteracji drugi argument, który reprezentuje indeks aktualnie iterowanego elementu do wypełnienia elementów tablicy.
```js
const indexes = Array
    .from({ length: gridSize })
    .map((_, index) => index);
```
Po utworzeniu tablicy z indeksami możemy stworzyć zawartość siatki.
Komponent `GameGrid` zwraca `div`, wewnątrz którego wykonujemy iterację po tablicy indeksów.
Dla każdego indeksu tworzymy `div` z klasą `gridRow`.
Pamiętać o nadaniu `key` dla każdego wiersza.
Każdy wiersz zawiera komórki.
Wewnątrz `div` reprezentującego wiersz wykonujemy jeszcze raz iterację po tablicy indeksów.
Podczas wewnętrznej iteracji tworzymy `div` z klasą `gridCell`.
Pamiętać o nadaniu `key` dla każdej komórki.
Każda komórka na razie prezentuje tekst, który jest konkatenacją indeksu wiersza i komórki, połączone znakiem `x`.
Efektem działań powinien być kod analogiczny:
```jsx
<div>
  {indexes.map((x) => (
    <div className="gridRow" key={x}>
      {indexes.map((y) => (
        <div className="gridCell" key={`${x}x${y}`}>
          {`${x}x${y}`}
        </div>
      ))}
    </div>
  ))}
</div>
```
Tak stworzony komponent możemy wykorzystać w `src/App.js`.
Jednak do dziania siatka gry potrzebuje zdefiniowanego rozmiaru.
Dodajmy stałą reprezentującą wielkość siatki w pliku `src/App.js` na poziomie całego pliku, nie wewnątrz komponentu `App`.
```js
const GridSize = 10;
```
Następnie zmieniamy kod komponentu `App` tak, aby zamiast `div` zwracał `GameGrid`.
```jsx
return (
  <GameGrid gridSize={GridSize} />
);
```
Na koniec chcemy dodać pare styli do kontenera aplikacji aby siatka gry wyświetlała się na środku ekranu.
W tym celu otwórzmy plik `index.css` i dodajmy styl dla elementu z id równym `root`.
```css
#root {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```
W efekcie powinniśmy zobaczyć na ekranie przeglądarki wyśrodkowany kwadrat z szarym obramowaniem, wewnątrz którego jest wyświetlona siatka.

### Wyświetlanie węża i owocu

### Pętla gry i ruch węża

### Zmiana kierunku ruchu węża

### Zjadanie owocu i zwiększanie prędkości

### Wydzielenie logiki gry do własnego hooka

### Rozbicie logiki na wyspecjalizowane hooki

### Stworzenie kontekstu gry

### Pauzowanie gry i menu

### Obsługa stanu kontekstu gry z wykorzystaniem reducera
