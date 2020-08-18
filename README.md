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