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
Wykonać `fork` tego repozytorium lub stworzyć nowe o takiej samej nazwie. Pobrać repozytorium.

## Kroki

Poniżej znajdują się szczegółowe opisy zadań do wykonania w ramach warsztatu.

### Stworzenie aplikacji React

Pierwszym krokiem, jest stworzenie nowej aplikacji React.
W tym celu należy wykorzystać paczkę NPM `create-react-app`.
```shell script
npx create-react-app reactive-snake
```
Skrypt odpalamy w folderze z repozytorium. 
Następnie przechodzimy do folderu `reactive-snake`.
```shell script
cd reactive-snake
```
Odpalamy aplikację i weryfikujemy działanie w przeglądarce.
```shell script
yarn start
```
Kolejnym krokiem jest wyczyszczenie zawartości obecnej aplikacji przykładowej.
W tym celu otwieramy plik `reactive-snake/src/App.js`.
Kasujemy zawartość `div` z klasą `App` i wstawiamy tekst `tutaj będzie gra`.
Komponent `App` powinien wyglądać jak poniżej:
```jsx
function App() {
  return (
    <div className="App">
      tutaj będzie gra
    </div>
  );
}
```
Następnie przechodzimy do pliku ze stylami `reactive-snake/src/App.css` i kasujemy wszystkie reguły poza pierwszą. Na koniec plik powinien wyglądać jak poniżej:
```css
.App {
  text-align: center;
}

```
Na koniec weryfikujemy czy aplikacja dalej działa prawidłowo i w przeglądarce widzimy wyśrodkowany napis.

### Wyświetlenie siatki gry

Podstawą gry będzie siatka, która będzie prezentować aktualny stan rozgrywki.
Siatka gry będzie posiadać tyle samo kolumn co wierszy. 
Na potrzeby zaprezentowania siatki gry stworzyć komponent `Grid`.
Komponent umieścić w pliku o nazwie tej samej co komponent `Grid`.
Komponent `Grid` powinien przyjmować jeden prop: `gridSize`.
Pamiętaj o przekazaniu wartości propa podczas wykorzystania komponentu (dodaj `const gridSize = 10;` w komponencie `App` i przekaż jako propa do `Grid`).
Deklaracja powinna wyglądać jak poniżej:
```jsx
export default function Grid({ gridSize }) {
  // tutaj będzie kod
}
```
Następnie wewnątrz komponentu należy stworzyć tablicę zawierającą indeksy wierszy i komórek w wierszach.
Ponieważ ilość wierszy jest równa ilości komórek w wierszu, wykorzystamy tablicę z indeksami do stworzenia wierszy i komórek wewnątrz.
Tablica z indeksami powinna zawierać `gridSize` elementów. 
Aby utworzyć tablicę możemy wykorzystać funkcję `Array.from`.
Jako argument przekazujemy obiekt z jednym kluczem `length` i wartości `gridSize`.
Wynikiem będzie tablica z pustymi elementami.
Następnie należy przeiterować się po utworzonej tablicy i wykorzystać podczas iteracji drugi argument, który reprezentuje indeks aktualnie iterowanego elementu.
```js
const indexes = Array
    .from({ length: gridSize })
    .map((_, index) => index);
```
Po utworzeniu tablicy z indeksami możemy stworzyć zawartość siatki.
Komponent `Grid` zwraca na top levelu `div`, wewnątrz którego wykonujemy iterację po tablicy ideksów.
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
  {indexes.map((rowIndex) => (
    <div className="gridRow" key={rowIndex}>
      {indexes.map((cellIndex) => (
        <div className="gridCell" key={`${rowIndex}x${cellIndex}`}>
          {`${rowIndex}x${cellIndex}`}
        </div>
      ))}
    </div>
  ))}
</div>
```
Aby stworzona struktura prawidłowo się wyświetlała musimy jeszcze dodać odpowiednie style dla wiersza i komórki.
Stwórz plik `Grid.css`.
Zaimportuj go analogicznie jak jest to wykonane w pliku `App.js`.
W pliku dodaj następujące style:
```css
.gridRow {
  display: flex;
}

.gridCell {
  width: 25px;
  height: 25px;
}
```

### Wyświetlanie węża i owocu

### Pętla gry i ruch węża