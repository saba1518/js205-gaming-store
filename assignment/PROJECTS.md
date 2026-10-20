# Projects

ქართულად: [PROJECTS_ka.md](PROJECTS_ka.md)

Choose one:

1. [Recipe Book](#project-1--recipe-book)
2. [Social Feed](#project-2--social-feed)
3. [Online Store](#project-3--online-store)
4. [Another DummyJSON idea](#more-ideas-with-dummyjson)
5. [Your own idea with another API](#your-own-idea)

The letters A1, B2, C4… are the lines of [SCORING.md](SCORING.md). Each project below says what those lines mean in that project. Lines that are not mentioned (A2–A4, B3, D1, and all of F, G, H) are the same for everyone.

Every number on this page was checked against the real API on 6 October 2026. If the API has changed since then, trust the API.

## DummyJSON basics

The three ready-made projects use <https://dummyjson.com>, a free practice API. It needs no key and no sign-up. Documentation: <https://dummyjson.com/docs>

**A list comes inside an object**, next to the numbers you need for pagination:

```json
{ "products": [ ... ], "total": 194, "skip": 0, "limit": 12 }
```

**You control the list with the URL:**

| You want | Add | Example |
|---|---|---|
| One page of items | `limit` and `skip` | `/products?limit=12&skip=24` is page 3 |
| Everything at once | `limit=0` | `/products?limit=0` |
| A sorted list | `sortBy` and `order` | `/products?sortBy=price&order=asc` |
| Only some fields | `select` | `/products?select=title,price` |
| A slow answer, to test your loading message | `delay` in milliseconds | `/products?delay=3000` |

You can combine them, and they also work on search and category URLs:
`/products/search?q=phone&sortBy=price&order=asc&limit=12&skip=12`

**Errors.** When an item is not found, the status is `404` and the body is `{ "message": "Product with id '9999' not found" }`. Remember that `fetch` does not throw for a 404. You check `response.ok`.

**Saving is simulated.** `POST`, `PUT` and `DELETE` answer as if they worked, and a `POST` gives you a new `id`. But nothing is stored: reload the page and your new item is gone, and `GET /recipes/51` answers 404. This is expected. If you want your item to stay, keep it in `localStorage` yourself.

**Test users.** Log in with `POST /auth/login` and the body `{ "username": "emilys", "password": "emilyspass" }`. Every user in `/users` works: the list shows each `username` and `password`.

### Two ways to build a detail view

**A second page.** The card is a link: `<a href="recipe.html?id=7">`. On `recipe.html` you read the id from the address:

```js
const params = new URLSearchParams(location.search);
const id = params.get("id"); // "7"
```

**The same page.** Clicking a card hides the list and shows a detail section, or opens a window on top of the page.

Both get full points. Choose one.

---

## Project 1 — Recipe Book

A cookbook website. The visitor browses recipes, finds one by name, tag or meal, opens it to read the ingredients and the steps, saves favorites, and adds a recipe of their own.

API documentation: <https://dummyjson.com/docs/recipes>

### The data

| You need | Request | Checked answer |
|---|---|---|
| One page of recipes | `GET /recipes?limit=12&skip=0` | `total` is 50 |
| One recipe | `GET /recipes/1` | "Classic Margherita Pizza" |
| Search by name | `GET /recipes/search?q=pizza` | 2 recipes |
| All tag names | `GET /recipes/tags` | an array of 87 strings |
| Recipes with a tag | `GET /recipes/tag/Italian` | 6 recipes |
| Recipes for a meal | `GET /recipes/meal-type/dinner` | 25 recipes |
| Sorted | `GET /recipes?sortBy=rating&order=desc` | "Chicken Biryani" is first |
| Add a recipe (simulated) | `POST /recipes/add` | status 201, your recipe comes back with `id` 51 |
| A recipe that does not exist | `GET /recipes/9999` | status 404 |

A recipe has: `id`, `name`, `image`, `cuisine`, `difficulty`, `rating`, `reviewCount`, `prepTimeMinutes`, `cookTimeMinutes`, `servings`, `caloriesPerServing`, `tags` (array), `mealType` (array), `ingredients` (array of strings), `instructions` (array of strings).

### The views

1. **Home**: recipe cards, search, filter, sort, pagination
2. **Recipe**: one recipe in full
3. **Favorites**: the recipes the visitor saved
4. **Add a recipe**: the form

### Requirements

| Line | In this project | Check yourself |
|---|---|---|
| A1 | Use at least: the recipe list, one recipe by id, search, and tags or meal type | |
| A5 | A search with no results shows a message | `zzzz` → "No recipes found" |
| B1 | Each card shows the image, name, cuisine, difficulty, rating, and total time (`prepTimeMinutes + cookTimeMinutes`) | Recipe 1: 35 minutes |
| B2 | The recipe view shows a large image, the ingredients as a list, the instructions as numbered steps, servings, calories per serving, and tags | Recipe 1: 6 ingredients, 6 steps |
| C1 | Search by name | `pizza` → 2, `chicken` → 8 |
| C2 | Filter by tag, with a dropdown filled from `/recipes/tags`, or by meal type | `Italian` → 6, `dinner` → 25 |
| C3 | Sort by name A–Z and by best rating. Add one more if you like (fastest: `cookTimeMinutes`) | Name: "Aloo Keema" first. Rating: "Chicken Biryani" first |
| C4 | 12 recipes per page | 5 pages. Page 5 has 2 recipes |
| D2–D4 | An "Add a recipe" form. Name: required, at least 3 characters. Cuisine: required. Difficulty: a `<select>` with Easy and Medium. Ingredients: one per line, at least 2. Instructions: required. After the `POST`, show the new recipe on the page with the `id` from the answer | Status 201, `id` 51 |
| E | Favorites: a heart button on every card and in the recipe view, a Favorites view, a counter in the header | Save 2, refresh → still 2 |

**Watch out:** real data is messy. `mealType` contains both `"Snack"` and `"Snacks"`. `difficulty` is only ever `"Easy"` or `"Medium"`.

### Make it yours

These are not extra points. They make your project different from everybody else's, and they give you more to show in the defense.

- A shopping list: tick the ingredients you need to buy, saved in `localStorage`
- A "Surprise me" button that opens a random recipe
- A cooking timer that counts down from `cookTimeMinutes`
- "Recently viewed" recipes

---

## Project 2 — Social Feed

A small social network. The visitor reads a feed of posts, opens a post to see its comments, visits the author's profile, logs in, writes a comment, and bookmarks posts to read later.

API documentation: <https://dummyjson.com/docs/posts>, <https://dummyjson.com/docs/comments>, <https://dummyjson.com/docs/users>, <https://dummyjson.com/docs/auth>

### The data

| You need | Request | Checked answer |
|---|---|---|
| One page of posts | `GET /posts?limit=10&skip=0` | `total` is 251 |
| One post | `GET /posts/1` | "His mother had always taught him" |
| The comments of a post | `GET /posts/1/comments` | 3 comments |
| One user | `GET /users/5` | Emma Miller |
| Only the fields you need | `GET /users/5?select=firstName,lastName,image` | |
| The posts of a user | `GET /posts/user/5` | 2 posts |
| Search | `GET /posts/search?q=love` | 17 posts |
| All tag names | `GET /posts/tag-list` | an array of 170 strings |
| Posts with a tag | `GET /posts/tag/history` | 56 posts |
| Sorted | `GET /posts?sortBy=views&order=desc` | the first post has 4993 views |
| Log in | `POST /auth/login` with `emilys` / `emilyspass` | status 200, Emily Johnson |
| Log in with a wrong password | `POST /auth/login` | status 400, `"Invalid credentials"` |
| Add a comment (simulated) | `POST /comments/add` with `{ body, postId, userId }` | status 201, `id` 341, and `user.fullName` |

A post has: `id`, `title`, `body`, `tags` (array), `reactions` (`{ likes, dislikes }`), `views`, `userId`.
A comment has: `id`, `body`, `postId`, `likes`, `user` (`{ id, username, fullName }`).
A user has: `id`, `firstName`, `lastName`, `username`, `image`, `email`, `age`, `company` (`{ title, name }`), `address` (`{ city }`), and many more.

**Watch out:** a post has only `userId`, not the author's name. To show the name and photo on each card you fetch the author. Ten posts need up to ten more requests. Send them together with `Promise.all`, as we did in Workshop 12. Post 1 was written by user 121, Ava Harris.

### The views

1. **Feed**: post cards, search, tag filter, sort, pagination
2. **Post**: the full post, its author, its comments, and the comment form
3. **Profile**: one user and their posts
4. **Login**: the form
5. **Bookmarks**: the posts the visitor saved

### Requirements

| Line | In this project | Check yourself |
|---|---|---|
| A1 | Use at least: the post list, one post by id, its comments, and one user | |
| A5 | A search with no results shows a message. So does a post with no comments | `zzzz` → "No posts found" |
| B1 | Each card shows the title, the first 150 characters of the body followed by "…", the tags, the number of likes and views, and the author's name and photo | |
| B2 | The post view shows the full body, the author (clicking opens the profile), and every comment with its author and likes. The profile view shows the photo, name, username, job title, city, and the user's posts | Post 1 → 3 comments. User 5 → 2 posts |
| C1 | Search posts | `love` → 17 |
| C2 | Filter by tag, with the options loaded from `/posts/tag-list` | `history` → 56 |
| C3 | Sort by most viewed and by title A–Z | Most viewed: 4993 views |
| C4 | 10 posts per page | 26 pages. Page 26 has 1 post |
| D2–D4 | **Login form**: username and password are required. A wrong password shows the server's message next to the form. After login the header shows the user's name and photo and a Log out button. **Comment form**, visible only when logged in: the text is required, at most 300 characters. After the `POST`, the new comment appears in the list with the `fullName` from the answer | Wrong password → "Invalid credentials". Comment → status 201 |
| E | Bookmarks: a button on every card and in the post view, a Bookmarks view, a counter in the header. The user also stays logged in after a refresh | Bookmark 2, refresh → still 2, still logged in |

### Make it yours

- A like button: the number goes up by one and the app remembers which posts you liked
- A "New post" form with `POST /posts/add`
- Delete your own comment with `DELETE /comments/{id}`
- An estimated reading time on each card, calculated from the length of the body

---

## Project 3 — Online Store

A shop. The visitor browses the catalog, finds a product by name or category, opens it to see photos and reviews, fills a cart, and places an order.

API documentation: <https://dummyjson.com/docs/products>, <https://dummyjson.com/docs/carts>

### The data

| You need | Request | Checked answer |
|---|---|---|
| One page of products | `GET /products?limit=12&skip=0` | `total` is 194 |
| One product | `GET /products/1` | "Essence Mascara Lash Princess", 9.99 |
| Search | `GET /products/search?q=phone` | 23 products |
| All categories | `GET /products/categories` | an array of 24 objects: `{ slug, name, url }` |
| Products in a category | `GET /products/category/smartphones` | 16 products |
| Sorted | `GET /products?sortBy=price&order=asc` | "Lemon", 0.79, is first |
| Place an order (simulated) | `POST /carts/add` with `{ userId, products: [{ id, quantity }] }` | status 201 and the totals |
| A product that does not exist | `GET /products/9999` | status 404 |

A product has: `id`, `title`, `description`, `category`, `price`, `discountPercentage`, `rating`, `stock`, `availabilityStatus`, `brand`, `thumbnail`, `images` (array), `reviews` (array of `{ rating, comment, date, reviewerName }`), `shippingInformation`, `warrantyInformation`, `returnPolicy`.

**Watch out:**

- 92 of the 194 products have no `brand`. Do not print "undefined".
- `availabilityStatus` is `"In Stock"`, `"Low Stock"` or `"Out of Stock"`. Four products are out of stock, for example product 132.
- 78 products have only one image.
- A price is a plain number. Show two decimals with `price.toFixed(2)`.

### The views

1. **Catalog**: product cards, search, category filter, sort, pagination
2. **Product**: one product in full
3. **Cart**: the products the visitor chose
4. **Checkout**: the form and the order confirmation

### Requirements

| Line | In this project | Check yourself |
|---|---|---|
| A1 | Use at least: the product list, one product by id, search, and categories | |
| A5 | A search with no results shows a message. So does an empty cart | `zzzz` → "No products found" |
| B1 | Each card shows the thumbnail, title, price, a discount badge (`-10%`), rating, and stock status. The "Add to cart" button is disabled when the product is out of stock | Product 132 cannot be added |
| B2 | The product view shows a gallery (clicking a small image changes the big one), the description, brand, price, stock, shipping information, and every review with its rating, text, author and date | Product 1: 3 reviews |
| C1 | Search by name | `phone` → 23 |
| C2 | Filter by category, with the options loaded from `/products/categories` | 24 categories. `smartphones` → 16 |
| C3 | Sort by price low to high, price high to low, and best rating | Low: "Lemon" 0.79. High: "Durango SXT RWD" 36999.99. Rating: "Amazon Echo Plus" 4.99 |
| C4 | 12 products per page | 17 pages. Page 17 has 2 products |
| D2–D4 | **Checkout form**: full name (required), email (must look like an email), phone (digits only), address (required). After the `POST` to `/carts/add`, show an order confirmation that uses the numbers from the answer, then empty the cart | See the check below |
| E | **Cart**: add a product, change its quantity with + and −, remove it. Each line shows price × quantity. The cart shows the total. The header shows the number of items. The quantity cannot go below 1 or above `stock` | Add 3, refresh → still 3 |

**Checkout check.** Put 2 × product 1 and 1 × product 5 in the cart and place the order. The server answers with `total` 28.97, `discountedTotal` 26, `totalProducts` 2 and `totalQuantity` 3.

### Make it yours

- A wishlist next to the cart
- "Recently viewed" products
- A price range filter, done in JavaScript
- Show the price after discount: `price * (1 - discountPercentage / 100)`

---

## More ideas with DummyJSON

Shorter descriptions. If you choose one of these, tell me, and we agree on what each rubric line means in your app.

### Task Manager

`/todos` has 254 tasks: `{ id, todo, completed, userId }`. Add a task with `POST /todos/add`, tick it with `PUT /todos/1`, remove it with `DELETE /todos/1`. Show one user's tasks with `/todos/user/13` (6 tasks). Filter by all, active and done.

- **Easy here:** category D. You use every kind of request.
- **Harder here:** B2 and C1. A task has only four fields and there is no search endpoint, so the detail view is the user's profile with their tasks, and the search is done in JavaScript.

### People Directory

`/users` has 208 people. Search with `/users/search?q=John` (3 results), filter with `/users/filter?key=hair.color&value=Brown` (23 results), sort with `?sortBy=age&order=desc`. The profile view can show the person's posts (`/users/1/posts`) and tasks (`/users/13/todos`). Add login, and a "My profile" view that uses `GET /auth/me` with the token, as in Workshop 14.

- **Easy here:** B and C. The data is rich and the API can search, filter and sort.
- **Harder here:** E. You must decide what the visitor saves: a "My team" list works well.

### Quote Wall

`/quotes` has 1454 quotes: `{ id, quote, author }`. `/quotes/random` gives one random quote.

- **Easy here:** B1 and E. A wall of quote cards with favorites.
- **Harder here:** C and D. There is no search endpoint and no `POST`, so search and filter by author are done in JavaScript, and for D you add the DummyJSON login.

---

## Your own idea

You may build something completely different with another API. The same rubric applies, so your idea must be able to reach every line from A to H.

### Before you start

1. Test the API with the checklist below.
2. Open an issue with the **Own idea proposal** form: <https://github.com/JavaScriptADI/javascript-205-final-project/issues/new/choose>
3. Wait for my answer before you write code.

### Checklist for an API

| Question | How to check |
|---|---|
| Does it work without a secret key? | Open the URL in the browser. You see JSON, not "unauthorized" |
| Does it work from a web page? | Open any page with Live Server, then type in the Console: `fetch("THE_URL").then(r => r.json()).then(console.log)`. A red **CORS** error means the browser is not allowed to use this API |
| Does it have a list and a single item? | Without these you cannot build B1 and B2 |
| How many requests does it allow? | Look for "rate limit" in the documentation |

**About keys.** Your JavaScript is public. Anyone who opens your site can read a key that is written in it. Use an API that needs no key, or a free key that is meant to be public. Never commit a key that costs money or belongs to a private account.

### When the API cannot do something

| If your API… | Then |
|---|---|
| returns everything at once, with no pages | Paginate in JavaScript with `slice`. Full points for C4 |
| has no search endpoint | Search in JavaScript with `filter`. Full points for C1 |
| has no categories | Filter by another field: type, status, year |
| is read-only, with no `POST` | Add the DummyJSON login (`POST https://dummyjson.com/auth/login`) to your app. That earns D3 |

### APIs that we tested

All of these answered on 6 October 2026, need no key, and work from a web page.

| API | App idea | List or search | One item | Watch out |
|---|---|---|---|---|
| [Open-Meteo](https://open-meteo.com/en/docs) | Weather | `https://geocoding-api.open-meteo.com/v1/search?name=Tbilisi&count=5` | `https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto` | Two steps: city → coordinates → forecast. `weather_code` is a number that you turn into text and an icon. An unknown city answers 200 with no `results` field |
| [Rick and Morty API](https://rickandmortyapi.com/documentation) | Character guide | `https://rickandmortyapi.com/api/character?name=rick&status=alive&page=1` | `https://rickandmortyapi.com/api/character/1` | 826 characters, always 20 per page. No results is a **404**, not an empty list |
| [PokéAPI](https://pokeapi.co/docs/v2) | Pokédex | `https://pokeapi.co/api/v2/pokemon?limit=20&offset=20` | `https://pokeapi.co/api/v2/pokemon/pikachu` | The list has only names and URLs, so every card needs one more request (`Promise.all`). No search endpoint. An unknown name is a 404 |
| [TVMaze](https://www.tvmaze.com/api) | TV show finder | `https://api.tvmaze.com/search/shows?q=office` | `https://api.tvmaze.com/shows/526` and `/shows/526/episodes` | Search results are `[{ score, show }]`: the show is one level deeper |
| [Open Library](https://openlibrary.org/developers/api) | Book finder | `https://openlibrary.org/search.json?q=tolkien&limit=10&page=2` | `https://openlibrary.org/works/OL27482W.json` | Sometimes slow. Many books have missing fields. Cover image: `https://covers.openlibrary.org/b/id/14627509-M.jpg`, using the book's `cover_i` |
| [TheMealDB](https://www.themealdb.com/api.php) | Meal finder | `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken` and `/filter.php?c=Seafood` | `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772` | No pages. No results is `{ "meals": null }`. Ingredients are in 20 separate fields, `strIngredient1` to `strIngredient20` |
| [TheCocktailDB](https://www.thecocktaildb.com/api.php) | Drink finder | `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita` | `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007` | The same shape as TheMealDB |
| [CoinGecko](https://docs.coingecko.com) | Crypto tracker | `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1` and `/search?query=bit` | `https://api.coingecko.com/api/v3/coins/bitcoin` | A low request limit. Above it the status is 429, which is good practice for A4. Fits bonus X4 |
| [GitHub](https://docs.github.com/en/rest) | Developer finder | `https://api.github.com/search/users?q=luka&per_page=10` | `https://api.github.com/users/octocat` and `/users/octocat/repos?per_page=10&page=2` | 60 requests per hour, and only 10 searches per minute. Never put a token in your code |
| [Disney API](https://disneyapi.dev/docs) | Character guide | `https://api.disneyapi.dev/character?name=mickey&pageSize=10&page=1` | `https://api.disneyapi.dev/character/8484` | The answer is inside `data` |
| [Dog CEO](https://dog.ceo/dog-api/documentation) | Dog gallery | `https://dog.ceo/api/breeds/list/all` | `https://dog.ceo/api/breed/hound/images/random/3` | Very simple data. B2 and C are hard to reach |
| [NASA APOD](https://api.nasa.gov) | Space picture of the day | `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10` | `…&date=2026-10-01` | `DEMO_KEY` allows only a few requests per hour. Some days are videos, not images |
| [Frankfurter](https://frankfurter.dev) | Currency converter | `https://api.frankfurter.dev/v1/currencies` | `https://api.frankfurter.dev/v1/latest?base=USD` | It has no Georgian lari. A converter is not a list with details, so talk to me about B and C first |
| [Open Trivia DB](https://opentdb.com/api_config.php) | Quiz game | `https://opentdb.com/api_category.php` | `https://opentdb.com/api.php?amount=10&category=9` | A game is not a list with details, so talk to me about B and C first. The text contains codes such as `&quot;` |

### APIs that did not work

So that you do not lose an evening on them:

| API | Problem |
|---|---|
| REST Countries | It now redirects to a file, and the browser blocks it (CORS) |
| OMDb | Needs a key |
| Jikan (anime) | Did not answer |
| Quotable | Did not answer |
| SpaceX API | The server returns an error |

### Live feeds for bonus X4

These WebSocket feeds sent live prices on 6 October 2026, with no key.

| Feed | Address | After connecting |
|---|---|---|
| Binance | `wss://stream.binance.com:9443/ws/btcusdt@trade` | Messages start at once. The price is in `p` |
| Coinbase | `wss://ws-feed.exchange.coinbase.com` | Send `{"type":"subscribe","product_ids":["BTC-USD"],"channels":["ticker"]}` |
| Kraken | `wss://ws.kraken.com/v2` | Send `{"method":"subscribe","params":{"channel":"ticker","symbol":["BTC/USD"]}}` |

To learn how a WebSocket works, practice with `wss://echo.websocket.org`. It sends back everything you send. It is for practice only and does not earn the bonus.
