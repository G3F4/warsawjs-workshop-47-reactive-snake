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
Kolejnym zadaniem jest wyświetlenie węża i owocu na siatce.
W tym celu wykorzystamy pierwszy hook `useState`.
Pozwala on przechowywać stan komponentu i go zmieniać.
Każda zmiana stanu komponentu skutkuje przerenderowaniem komponentu.
Hook `useState` jako argument czeka na stan inicjalny.
Może to być wartość albo funkcja zwracająca wartość (leniwa inicjalizacja).
Hook zwraca tablicę z dwoma elementami.
Pierwszy to aktualna wartość stanu.
Drugi to funkcja do aktualizacji stanu.
```js
const [state, setState] = useState(init);
```
Dodajemy import `useState` do istniejącego importu React'a.
Wykorzystamy ten hook to przechowywania pozycji węża i owocu.
Stany te zdefiniujemy w komponencie `App`;
Osobny stan dla pozycji węża i osobny dla pozycji owocu.
Inicjalna pozycja węża powinna być gdzieś w środku siatki.
Natomiast pozycja owocu powinna być losowa.
```js
const [snake, setSnake] = useState([
    { x: GridSize / 2, y: GridSize / 2 },
    { x: GridSize / 2, y: GridSize / 2 + 1 },
    { x: GridSize / 2, y: GridSize / 2 + 2 },
]);
const [fruit, setFruit] = useState({
    x: randomIndex(GridSize),
    y: randomIndex(GridSize),
});
```
Teraz brakuje nam losowanie indeksu. W tym celu dodajmy funkcję pomocniczą:
```js
function randomIndex(n) {
  return Math.floor(Math.random() * n);
}
```
Tak przygotowane dane możemy przekazać do komponentu siatki.
```jsx
<GameGrid gridSize={GridSize} fruit={fruit} snake={snake} />
```
Następnie przechodzimy do komponentu siatki `GameGrid`.
Najpierw dodajemy w deklaracji komponentu dwa nowe propsy: `fruit` i `snake`:
```jsx
export default function GameGrid({ gridSize, fruit, snake }) {
  // ...
}
```
Aby na siatce wyświetlić węża i owoc będziemy dodawać do odpowiedniej komórki odpowiednie klasy css.
Do pliku ze stylami dodać poniższe style:
```css
.snakeCell {
    width: 30px;
    height: 30px;
    background-color: black;
}

.fruitCell {
    width: 30px;
    height: 30px;
    background-color: green;
}
```
Następnie w komponencie `GameGrid` dodamy funkcję `getCellClass`.
Funkcja powinna przyjmować dwa argumenty: `x` i `y`, które reprezentują punkt siatki, dla którego chcemy wyliczyć klasę.
Zwracać powinna klasę komórki siatki.
Jeśli komórka jest na tej samej pozycji do owoc zwracamy `fruitCell`.
Jeśli komórka jest w zbiorze komórek węża zwracamy `snakeCell`.
Inaczej zwracamy `gridCell`.
Po przygotowaniu wszystiego, zamieniamy `div` reprezentujący komórkę na:
```jsx
<div
  className={getCellClass(x, y)}
  key={`${x}x${y}`}
/>
```

### Pętla gry i ruch węża

Kolejną rzeczą, jaką dodamy jest ruch węża.
Na początek, bez możliwości zmiany kierunku.
W tym celu wykorzystamy kolejny hook o nazwie `useEffect`.
Służy on do obsługi zdarzeń, które powodują, tak zwane „efekty".
Efektem jest taki fragment kodu, który modyfikuje w jakiś sposób stan aplikacji.
W przypadku naszej aplikacji efektem będzie tick gry.
Gra działa w określonej prędkości.
Co jakiś czas, chcemy obliczyć nową pozycję węża.
`useEffect` przyjmuje dwa argumenty. 
Pierwszy to funkcja bez argumentów, która reprezentuje kod efektu.
Drugi to tablica zależności efektu.
Efekt jest odpalany zawsze inicjalne oraz gdy jakikolwiek z elementów tablicy zależności się zmienił.
W naszej aplikacji chcemy, aby co określony czas nasz efekt się wykonał i zaktualizował pozycję węża.
Będziemy potrzebować po pierwsze określić prędkość i kierunek ruchu węża.
Zdefiniujmy na poziomie komponentu `App` dwie stałe reprezentujące te dane:
```js
const direction = 'up';
const speed = 500;
```
Następnie dodajemy import `useEffect` do istniejącego importu React'a i wykorzystujemy go wewnątrz komponentu `App`.
```js
useEffect(() => {
  // kod efektu
}, [// lista zależności]);
```
Zależnością naszego efektu będzie pozycja węża.
Następnie wewnątrz efektu, chcemy stworzyć interwał, który będzie odpalał się w odstępach, które reprezentuje stała `speed` (jest to czas w ms pomiędzy kolejnymi wyliczeniami pozycji węża).
```js
const interval = setInterval(() => {
  // wyliczenia nowej pozycji węża w zależności od kierunku
}, speed);
```
Ważnym aspektem działania efektów jest sprzątanie po nich. W naszej aplikacji za każdym razem, gdy zmieni się pozycja węża, będziemy tworzyć nowy interwał.
Stary interwał należy wyczyścić, inaczej każde kolejne odświeżenie efektu, spowoduje stworzenie kolejnego, nowego interwału, co w efekcie spowoduje powielenie odświeżeń aplikacji.
Aby posprzątać po efekcie, należy zwrócić z efektu funkcję.
Funkcja zwrócona z efektu, jest wykonywana zawsze kiedy efekt przestaje być potrzebny - czyli kiedu go ponownie wywołujemy, wcześniej wywołamy sprzątanie.
Nasz efekt powinien wyczyścić wcześniej stworzony interwał.
W tym celu skorzystać możemy z funkcji `clearInterval`, która jako argument przyjmuje obiekt, zwrócony podczas tworzenia interwału.
Nasz efekt powinien wyglądać tak:
```js
useEffect(() => {
    const interval = setInterval(() => {
      // tutaj wyliczymy nową pozycję węża
    }, speed);
    
    return () => {
      clearInterval(interval);
    };
}, [snake]);
```
Aby wyliczyć nową pozycję węża, musimy po pierwsze wyliczyć pozycję nowej głowy, oraz usunąć ostatnią cześć ciała węża.
Aby pobrać pierwszy element z tablicy możemy skorzystać z destrukcji tablic:
```js
const [snakeHead] = snake;
```
Następnie potrzebujemy kopii głowy, która będzie reprezentować nową głowę węża.
Do wykonania prostej kopii mozemy wykorzytać destrukcję obiektu:
```js
const newSnakeHead = { ...snakeHead };
```
Następnie w zależności od kierunku zmieniamy odpowiednio obiekt reprezentujący pozycję nowej głowy.
Jeśli kierunek to `up` zmniejszamy `x` głowy o 1.
Jeśli kierunek to `down` zwiększamy `x` głowy o 1.
Jeśli kierunek to `left` zmniejszamy `y` głowy o 1.
Jeśli kierunek to `right` zwiększamy `y` głowy o 1.
Następnie tworzymy `const` do którego przypiszemy tablicę reprezentującą węża w nowej pozycji.
```js
const newSnake = [newSnakeHead, ...snake.slice(0, snake.length - 1)];
```
Na koniec aktualizujemy stan pozycji węża, co spowoduje odświeżenie ekranu.
```js
setSnake(newSnake);
```
Sprawdź w przeglądarce działanie aplikacji.
Wąż powinien poruszać się w kierunku określonym w stałej `direction`;
Przetestuj ruch we wszystkich kierunkach zmieniając wartość stałej `direction`.

### Zmiana kierunku ruchu węża

Następnym zadaniem jest obsługa zmiany kierunku ruchu węża w odpowiedzi na wciśnięcie na klawiaturze strzałek.
Zmiana kierunku węża, nie powinna powodować odświeżenia ekranu.
W tym celu wykorzystamy kolejny hook `useRef`.
Jest to hook pozwalający przechowywać dane, analigicznie jak `useState`, z tą różnicą że zmiana wartości nie będzie powodować przerenderowania aplikacji.
Wartość zmiennej przechowywanej przez `useRef` możemy zmienić przez referencję.
Hook `useRef` zwraca jedną wartość, jest to obiekt z pojedynczym polem `current`, w którym jest dostępna aktualnie przechowywana wartość.
W naszej aplikacji wykorzystanie `useState` do obsługi zmiany kierunku, powodowałoby że po wciśnięciu strzałki od razu nastąpiło by odświeżenie pozycji węża z nowym kierunkiem.
Dodajemy import `useRef` do istniejącego importu React'a.
Rozpoczniemy od zmiany stałej `direction`, tak aby jej wartość była przechowywana jako zmienna przez hook `useRef`.
```js
const direction = useRef('up');
```
Następnie musimy poprawić kod w miejscach gdzie wcześniej wykorzystaliśmy `direction`, tak aby teraz zamiast bezpośrednio odnosić się do `direction` teraz odnosić się do `diretion.currect`.
Po zmianach aplikacja powinna działać bez różnicy.
Następnie dodamy obsługę zmiany kierunku, po naciśnięciu jednej ze strzałek na klawiaturze.
W tym celu znowu wykorzystamy hook `useEffect`.
Aby obsłużyć zdarzenie klawiatury dodamy nasłuchiwanie na dokumencie.
```js
useEffect(() => {
document.addEventListener('keydown', handleKeyDown);

return () => {
  document.removeEventListener('keydown', handleKeyDown);
};
}, []);
```
Brakuje nam teraz funkcji `handleKeyDown`.
```js
function handleKeyDown(event) {
  // ustalenie jaki klawisz został wciśnięty i zmiana odpowiednio wartości `direction.current`
}
```
Wewnątrz funkcji w zależności od tego, jaka strzałka została wciśnięta, chcemy mieć odpowiednio kierunek ruchu węża.
Po zaimplementowaniu tej funkcji, sprawdź aplikację w przeglądarce.

### Zjadanie owocu i zwiększanie prędkości
Kolejną funkcjonalnością jaką dodamy jest możliwość zjedzenia owocu.
Po zjedzeniu owocu, owoc powinien pojawić się w nowym losowym miejscu.
Długość węża wzrasta o 1 po zjedzeniu owocu.
Prędkość gry wzrasta po zjedzeniu owocu.

Pracę rozpoczniemy od zdefiniowania na poziomie pliku `App.js` stałej reprezentującej mnożnik prędkości.
```js
const SpeedMultiplier = 0.8;
```
Następnie stałą `speed` zamienimy na stan wykorzystując `useState`:
```js
const [speed, setSpeed] = useState(500);
```
Teraz w efekcie odpowiedzialnym za aktualizacją pozycji węża, dodamy sprawdzenie, czy nowa głowa nie jest w tej samej pozycji co owoc. 
Jeśli jest, wiemy że wąż właśnie zjadł owoc.
Wartość tego wyliczenia przypiszemy do stałej:
```js
const fruitEaten = fruit.x === newSnakeHead.x && fruit.y === newSnakeHead.y;
```
Następnie w przypadku gdy owoc został zjedzony chcemy ustalić nową pozycję owocu oraz zwiększyć prędkość.
Nową pozycję owocu wyliczamy analogicznie do inicjalizacji hooka przechowujacego stan owocu.
Aby zwiększyć prędkość, mnożymy aktulną prędkość razy `SpeedMultiplier` i aktualizujemy stan prędkości.
Na koniec zostaje nam dodanie nowego elementu węża w przypadku gdy zjadł owoc.
Aktualnie podczas zmiany pozycji węża, po dodaniu nowej głowy, skracamy węża o jeden element(ostatni).
W przypadku gdy wąż zje owoc, po prostu nie skracamy węża po dodaniu nowej głowy.

### Wydzielenie logiki gry do własnego hooka

Największą zaletą hooków jest możliwość tworzenia własnych hooków.
Dzięki temu enkapsulacja oraz reużywalność kodu jest o wiele łatwiejsza i przyjemniejsza.
Każdy hook musi zachować odpowiednie nazewnitctwo, czyli zaczynać się od prefixa `use`.
Pierwszym hookiem jakiego stworzymy będzie hook `useGame`.
Hook ten będzie zawierał całą logikę naszej gry.
Dzięki temu kompletnie oddzielimy szablon od logiki.
W folderze `game` stwórz plik `useState`.
Plik ten eksportuje domyślnie funkcję o nazwie `useState`.
Funkcja ta czeka na jeden argument w postaci obiektu zawierającego na razie pola: `gridSize`, `speed` oraz `increaseSpeed`.
Zwraca obiekt z polami: `fruit` i `snake`
```js
export default function useGame({ gridSize, speed, increaseSpeed }) {
  // logika gry przeniesiona z pliku App.js
}
```
Do utworzongo hooka przenosimy całą logikę z komponentu `App`.
Zostawiamy jedynie stan prędkości. 
Potrzebujemy takżę funkcji do zwiększania prędkości, której oczekuje hook.
Definiujemy ją na poziomie komponentu `App` i przekazujemy do wywołania hooka `useGame` razem z prędkością i wielkością siatki.
Następnie po przekopiowaniu kodu logiki z komponentu `App` do hooka `useGame`, dostosowujemy kod.
Zmieniamy wszystkie odwołania do `GridSize` na `gridSize`.
Linijke odpowiedzialną za zwiększenie prędkości zamieniamy wywołaniem funkcji `increaseSpeed`.
Kasujemy nie używany stan prędkości.
Stan prędkości zostawiamy w komponencie `App`.
Po prawidłowo przeprowadzonej operacji aplikacja powinna działać bez zmian.

### Rozbicie logiki na wyspecjalizowane hooki

Kolejną właściwością hooków jest możliwość kompozycji logiki.
Nasz główny hook, przechowujący logikę gry posiada wymieszaną logikę.
Wydzielimy z niego kod reprezentujący pętlę gry oraz obsługę zmiany kierunku.
W tym celu utworzomy dwa nowe hooki i wykorzystamy je wewnątrz hooka `useGame`.
Pierwszym będzie hook `useGameDirection`.
Utwórz w folderze `game` plik o nazwie `useGameDirection.js`.
Plik ten eksportuje domyślnie jedną funckję o nazwie `useGameDirection`.
Przenieś do niego tworzenie zmiennej `direction` oraz kod związany z obsługą zdarzenia klawiatury.
Hook ma zwracać aktualny kierunek.
```js
return direction.current;
```
Wykorzystaj hook w `useGame`.
Zwróć uwagę że hook `useDirection` nie zwraca obiektu z kluczem `current` tylko płasko aktualny kierunek.
Popraw odpowiednio kod w `useGame`.
Następnie utwórz plik `useGameLoop`.
Wydzielimy do niego logikę związaną z pętlą gry.
Plik jak każdy inny hook, eksportuje domyślnie funkcję o nazwie `useGameLoop`.
Jako argument przyjmuje obiekt z polami: `speed` oraz `onTick`.
Hook nic nie zwraca.
```js
export default function useGameLoop({ onTick, speed }) {
  useEffect(() => {
    const interval = setInterval(onTick, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed, onTick]);
}
```
Hook wykona w odpowiednim interwale kod przekazany w polu `onTick`.
Następnie wewnątrz hooka `useGame`, stworzyć funkcję `handleGameTick`.
Funkcja nie przyjmuje żadnych argumentów oraz nic nie zwraca.
W jej ciele umieść kod, który dotychczas był wykonywany podczas interwału.

### Stworzenie kontekstu gry

W bardziej złożonych aplikacjach często przekazujemy głęboko propsy.
Może to powodować, że komponenty przyjmują bardzo dużo propsów, co utrudnia utrzymanie komponentów.
Jednym z rozwiązań tego problemu jest wykorzystanie kontekstu.
Kontekst jest abstrakcją, która umożliwia przechowywaniu danych w łatwo dostępnym miejscu.
Do kontekstu mają dostęp wszystkie komponenty potomne.
Kontest jest zawsze występuje w parze.
Pierwszym elementem jest tak zwany `Provider`, odpowiedzialny na przechowywanie danych, które będę udostępnione komponentom pochodnym.
Drugi jest tak zwany `Consumer`. Ten występuje w 2 postaciach: komponentu oraz hooka.
Podczas warsztatów wykorzystamy `Consumer` w postaci hooka.
W naszej aplikacji wydzielimy 2 dane jako kontekst aplikacji: prędkość gry oraz wielkość siatki.
Zaczniemy od utworzenie pliku `GameContext.js`, w którym zdefiniujemy nowy kontekst.
Do stworzenia kontekstu potrzebna jest funkcja pomocnicza z biblioteki `React` o nazwie `createContext`.
Funkcja przyjmuje jeden argument, który reprezentuje inicjalny stan kontekstu.
```js
import { createContext } from 'react';

const GameContext = createContext({ gridSize: 0, speed: 0, increaseSpeed: () => {} });

export default GameContext;
```
Następnie stworzymy nowy komponent `Game`.
Jego zadaniem będzie wywołanie hooka `useGame` oraz wyświetlenie komponentu `GameGrid`.
Aby pobrać dane z kontekstu potrzebny będzie kolejny hook `useContext`.
Jako argument czeka na obiekt konktestu.
Zwraca wartość odostepnianą przez kontekst.
```jsx
export default function Game() {
  const { gridSize, speed, increaseSpeed  } = useContext(GameContext);
  const { fruit, snake } = useGame({ gridSize, speed, increaseSpeed });

  return (
    <GameGrid gridSize={gridSize} fruit={fruit} snake={snake} />
  )
}
```
Następnie w komponencie `App` dodajemy `Provider` kontektu.
```jsx
return (
  <GameContext.Provider value={{ speed, gridSize, increaseSpeed }}>
    <Game />
  </GameContext.Provider>
);
```
Od tej pory komponent `Game` oraz wszystkie potomne mają dostęp do danych przechowywanych w kontekście.
Hook `useGame` może pobrać sam wartości z kontekstu, zamiast czekać na przekazanie w argumencie.
Skasujmy argumenty i zamieńmy je wywołaniem kontekstu na poziomie hooka.

### Pauzowanie gry i menu

### Obsługa stanu kontekstu gry z wykorzystaniem reducera
