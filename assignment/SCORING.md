# Scoring

ქართულად: [SCORING_ka.md](SCORING_ka.md)

| Part | Points |
|---|---|
| JavaScript (A–F) | 80 |
| Design and UX (G) | 10 |
| Git and delivery (H) | 10 |
| **Total** | **100** |
| Bonus | up to +20 |

Every line below has a **How I check it** column. That is exactly what I will do with your project, so do it yourself before you submit. A line that works completely gets all its points, a line that half works gets some of them, a missing line gets 0.

The lines are the same for every project. [PROJECTS.md](PROJECTS.md) says what each line means in the project you chose.

## A. Talking to the API — 20

| | Requirement | How I check it | Pts |
|---|---|---|---|
| A1 | The app uses at least **3 different endpoints**: a list, one item by id, and one more. Every request uses `async`/`await`. | I read the code and watch the Network tab | 6 |
| A2 | Every request checks `response.ok` and is inside `try`/`catch`. | I open an item that does not exist (id `9999`). The app shows a message and the Console has no uncaught error | 5 |
| A3 | **Loading**: the user sees that something is loading. | I add `?delay=3000` to a request, or set the Network tab to "Slow 4G". A "Loading…" text or spinner is visible until the data arrives | 3 |
| A4 | **Error**: when a request fails, a readable message appears on the page (not `alert`, not only the Console), with a **Try again** button that works. | I load the page, set the Network tab to "Offline", then click something that loads data. I do **not** reload. Then I go back online and click Try again | 3 |
| A5 | **Empty**: when there is nothing to show, the page says so. | I search for `zzzz` | 3 |

Why "do not reload" in A4: when the browser is offline, reloading shows Chrome's own error page instead of yours, because your `index.html` cannot load either.

## B. Building the page from data — 15

| | Requirement | How I check it | Pts |
|---|---|---|---|
| B1 | **List view**: cards built by JavaScript from API data. Each card shows an image (if the data has one), a title, and at least 3 more fields. | I press Ctrl+U (view source). The items are not in the HTML | 5 |
| B2 | **Detail view**: clicking a card shows the full information about that one item, fetched by its id. It can be a second page or a section of the same page. There is a way back to the list. | I click three different cards and watch the Network tab | 5 |
| B3 | **Clean updates**: a new search, filter or page replaces the list without reloading the page. No duplicated cards and no cards left over from the old list. | I search, change the filter and change the page many times, quickly | 5 |

## C. Finding things — 15

| | Requirement | How I check it | Pts |
|---|---|---|---|
| C1 | **Search** uses the API's search endpoint. Clearing the search brings the full list back. | I search for a word and compare the number of results with the API | 4 |
| C2 | **Filter** by category or tag. The options are loaded from the API, not typed by hand. There is an "All" option. | I pick a category and compare with the API | 4 |
| C3 | **Sort** with at least 2 choices, using `sortBy` and `order`. | I check which item comes first | 3 |
| C4 | **Pagination** with `limit` and `skip`: Next and Previous buttons, the current page and the number of pages are shown ("Page 2 of 17"), and the buttons are disabled on the first and last page. | I go to the last page and count the items | 4 |

Search and filter do not have to work together. DummyJSON cannot search inside one category in a single request, so it is fine if choosing a category clears the search box. Pagination must work on the main list. For search and filter results you may paginate too, or load them all with `limit=0`.

## D. Forms and sending data — 10

| | Requirement | How I check it | Pts |
|---|---|---|---|
| D1 | A real `<form>` handled with the `submit` event and `preventDefault()`. The page does not reload. | I submit with the button and with the Enter key | 2 |
| D2 | **Validation** before sending: required fields, and at least one more rule (minimum length, a valid email, a number above 0). The message appears next to the field, not in an `alert`. Nothing is sent while the form is invalid. | I submit an empty form and watch the Network tab | 3 |
| D3 | The form sends a **`POST`** request (or `PUT` / `DELETE`) with a JSON body and the `Content-Type` header, and checks `response.ok`. | I look at the request and its payload in the Network tab | 3 |
| D4 | The page **uses the server's answer**: it shows data that came back (the new `id`, the user's name). The form is cleared, and the submit button is disabled while the request is running. | I submit a valid form | 2 |

DummyJSON only pretends to save. It answers as if it worked, but after a reload your new item is gone. That is expected and costs no points.

## E. Remembering — 10

| | Requirement | How I check it | Pts |
|---|---|---|---|
| E1 | The user can **add** an item to a saved collection (favorites, cart, bookmarks) and **remove** it. The button shows the current state. | I add three items and remove one | 4 |
| E2 | The collection **survives a refresh** and closing the tab. The app also works on the very first visit, when storage is empty. | I refresh. Then I clear the storage (DevTools → Application → Clear site data) and reload: no error in the Console | 3 |
| E3 | A **view of the saved items** and a **counter** in the header. Both update immediately, without a reload. | I add and remove items and watch the counter | 3 |

## F. Code quality — 10

| | Requirement | Pts |
|---|---|---|
| F1 | Names say what things are (`renderProductCard`, not `func2`). `const` and `let`, never `var`. The formatting is consistent. | 3 |
| F2 | Small functions that do one job. Functions that fetch return data and do not touch the page. Functions that render take data and do not fetch. No copy-pasted blocks. | 3 |
| F3 | At least 2 JavaScript files with clear jobs. No dead code, no commented-out code, no leftover `console.log`. | 2 |
| F4 | No red errors in the Console while I use the app normally. | 2 |

## G. Design and UX — 10

| | Requirement | How I check it | Pts |
|---|---|---|---|
| G1 | **Consistent look**: one color palette, one or two fonts, the same spacing and card style everywhere. Text is easy to read. | I look at every view | 4 |
| G2 | **Works on a phone**: no sideways scrolling, readable text, buttons big enough to tap. | DevTools device toolbar, 375 px wide | 3 |
| G3 | **Feedback**: buttons and links react to hover and focus, disabled buttons look disabled, the active page and the active filter are highlighted. | I move through the app with the mouse and the Tab key | 3 |

You do not need to be a designer. A simple, tidy page gets full points. A fancy page that breaks on a phone does not. Tailwind or Bootstrap scores the same as CSS that you wrote yourself.

## H. Git and delivery — 10

| | Requirement | Pts |
|---|---|---|
| H1 | At least **15 commits** on at least **4 different days**. | 3 |
| H2 | One change per commit. Messages say what changed: `Add search by product name`, not `update` or `fix`. | 3 |
| H3 | A clean repository: no junk files, no "upload everything" commit. | 1 |
| H4 | **README**: what the app is, at least one screenshot, how to run it, the endpoints you use, and what you would improve. | 3 |

## Bonus — up to +20

Bonus points are added on top of the 100. You can collect at most **+20**, so choose the tasks you find interesting. Do the basic categories first: a bonus on top of a broken app is worth little.

None of these were taught in class. Finding out how they work is part of the task.

| | Bonus | How I check it | Pts |
|---|---|---|---|
| X1 | **System design diagram** | See below | +8 |
| X2 | **Debounced search**: results appear while the user types, with no button, and the app waits until the user stops typing. | I type `phone` at normal speed with the Network tab open: 1 request, not 5 | +5 |
| X3 | **Infinite scroll** instead of pagination buttons: the next items load when the user reaches the bottom. | I scroll to the end. New items are added below the old ones, a loading message shows, nothing is loaded twice, and at the end it says there is no more. This still earns C4 | +5 |
| X4 | **Live updates with WebSockets**: numbers on the page change by themselves, without a refresh and without repeated `fetch`. The page shows whether it is connected. | I watch the page, then switch the network off and on | +7 |
| X5 | **Shareable URL**: the search text, filter and page number are in the address bar. | I copy the address into a new tab and see the same results. The Back button works | +4 |
| X6 | **Published** with GitHub Pages. The link is in your README. | I open the link on my phone | +3 |
| X7 | **Stale requests are cancelled** with `AbortController`. | I click five categories quickly. The list always shows the last one I clicked, and the Network tab shows the old requests as "canceled" | +3 |
| X8 | **Dark mode** with a switch. The choice is remembered. | I switch, then refresh | +2 |

X4 is not possible with DummyJSON, because it has no WebSocket. It fits an own-idea project such as a crypto price tracker. [PROJECTS.md](PROJECTS.md) lists live feeds that we tested.

### X1. The system design diagram

Draw how your app talks to the server. Use [Excalidraw](https://excalidraw.com), [draw.io](https://draw.io), or pen and paper and a photo. Save the picture in a `docs/` folder and show it in your README.

The drawing must show:

1. **The parts**: the browser with your HTML, CSS and JavaScript files, the API server, and `localStorage`.
2. **Every request** your app makes: the method and URL, what makes the app send it, and what comes back.
3. **One user action from start to finish**, as numbered steps. For example "the user types `phone` and presses Search", from the click to the cards on the screen.

Draw it yourself. An AI-generated diagram earns nothing, and I will ask you about it in the defense.

## The defense rule

The points above are only yours if you can explain the code behind them. If you cannot explain a part of your code in the defense, you lose the points for the category it belongs to. The same is true for bonus tasks.
