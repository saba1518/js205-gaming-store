# JavaScript 205 — Final Project

ქართულად: [README_ka.md](README_ka.md)

You are going to build your first real JavaScript application: a website that loads data from a server, shows it, lets the user search and filter it, remembers what the user saved, and sends data back.

In homework, every exercise told you what to write. Here you decide. You choose the app, plan the steps, and build it in your own repository.

| | |
|---|---|
| **Work** | Alone |
| **Score** | 100 points, plus up to 20 bonus points |
| **Deadline** | 20 October 2026 (Tuesday), 23:59 |
| **Defense** | About 5 minutes per student, live, after the deadline |

| Document | What is in it |
|---|---|
| This page | Rules, how to start, how to submit |
| [PROJECTS.md](PROJECTS.md) | The projects you can choose, with detailed requirements |
| [SCORING.md](SCORING.md) | Every point: what earns it and how it is checked |

## 1. Choose a project

There are three ready-made projects. All of them use [DummyJSON](https://dummyjson.com), the API you already know from the workshops.

| Project | You build |
|---|---|
| **Recipe Book** | A cookbook: browse recipes, open one to see ingredients and steps, save favorites, add your own recipe |
| **Social Feed** | A small social network: a feed of posts, comments, user profiles, login, bookmarks |
| **Online Store** | A shop: product catalog, product page with reviews, a cart, checkout |

Or bring **your own idea** and use another free API: a weather app, a TV show finder, a Pokédex. [PROJECTS.md](PROJECTS.md) has more ideas, a list of free APIs that we tested, and the rules for your own idea. An own idea needs my approval before you start.

Every project can earn the same score. Pick the one you would enjoy building.

## 2. Rules

- **Your own JavaScript.** No React, Vue, jQuery, or any other JavaScript library or framework. Everything your app does with data — fetching, building the page, search, saving — is JavaScript that you wrote.
- **Tailwind or Bootstrap is allowed for styling.** Bootstrap's own script for components such as modals and dropdowns is allowed too. Fonts and icon sets from a CDN are also fine.
- **It runs with Live Server.** No install step and no build step. This includes Tailwind and Bootstrap: load them from a CDN with a `<link>` or `<script>` tag, not with npm.
- **The data comes from the API.** Do not type recipes, posts or products into your HTML or JavaScript.
- **Your own repository.** Not a fork and not a pull request. See section 4.
- **You can explain every line.** See section 7.

## 3. What every project needs

The same eight categories are scored in every project. [SCORING.md](SCORING.md) splits each one into small lines with points.

| | Category | In short | Points |
|---|---|---|---|
| A | Talking to the API | `fetch` with `async`/`await`, `response.ok`, `try`/`catch`, loading / error / empty messages | 20 |
| B | Building the page from data | A list view and a detail view, built with the DOM | 15 |
| C | Finding things | Search, filter, sort, pagination | 15 |
| D | Forms and sending data | A form with validation that sends a `POST` request | 10 |
| E | Remembering | Favorites, a cart or bookmarks in `localStorage` | 10 |
| F | Code quality | Clear names, small functions, tidy files, clean Console | 10 |
| G | Design and UX | Looks consistent, works on a phone | 10 |
| H | Git and delivery | Commit history and README | 10 |
| | **Total** | | **100** |

## 4. Create your repository

This is different from homework. The project lives in a repository that belongs to you.

1. Open <https://github.com/JavaScriptADI/javascript-205-final-project>.
2. Click the green **Use this template** button, then **Create a new repository**. Do not fork.
3. Owner: your account. Name: something like `js205-recipe-book`. Visibility: **Public**. Click **Create repository**.
4. Clone **your** repository and open the folder in VS Code:

   ```
   git clone https://github.com/<your-username>/<your-repository>.git
   ```

5. Create `index.html`, `style.css` and your JavaScript files in the root of the repository, next to `README.md`.
6. Open `index.html` with Live Server.

Your new repository already has these files:

| File | What it is | May you change it? |
|---|---|---|
| `README.md` | A short guide. You replace it with the README of your project. | Yes, you must |
| `assignment/` | These documents | No |
| `AGENTS.md` | Rules for AI assistants (section 6) | Only the "My rules" section |
| `AI_LOG.md` | The record of your AI use (section 6) | Add entries only |
| `.gitignore` | Keeps junk files out of git | Yes |

A structure that works well:

```
index.html
style.css
js/
  api.js       functions that fetch data and return it
  storage.js   functions that read and write localStorage
  app.js       builds the page and listens for events
```

We have not learned `import` and `export`, so load the files with several `<script>` tags. The order matters: a file must be loaded before the file that uses its functions.

## 5. Work in small steps

Do not try to build everything at once. Build one small thing, check that it works, commit, push. A good order:

| Step | Build | Rubric |
|---|---|---|
| 1 | Fetch the list and show it as cards | A1, B1 |
| 2 | Loading, error and empty messages | A2–A5 |
| 3 | The detail view | B2 |
| 4 | Search, then filter, then sort, then pagination | C |
| 5 | Saving things with `localStorage` | E |
| 6 | The form that sends data | D |
| 7 | Design, then the phone layout | G |
| 8 | Clean up the code, write the README | F, H |
| 9 | Bonus tasks, if you have time | |

### Commits

Your commit history is graded. It should tell the story of how the project grew.

- Commit every time one small thing works. Push at the end of every day you work.
- One commit is one change.
- The message says what changed and starts with a verb. Write it in English.

| Good | Bad |
|---|---|
| `Add recipe cards to the home page` | `update` |
| `Show an error message when the request fails` | `fix` |
| `Fix Next button staying enabled on the last page` | `final version 2` |
| `Save favorites in localStorage` | `asdf` |

You need at least **15 commits on at least 4 different days**. One huge commit on the last evening earns almost nothing in this category, even if the app is perfect.

## 6. Using AI

You may use AI. There are rules.

Your repository has a file called `AGENTS.md`. AI coding agents such as Command Code read it automatically. It tells the agent to:

- **write every request you make into `AI_LOG.md`**, word for word;
- explain, give hints and review your code;
- write one small function at a time, and only after you describe what it should do;
- **refuse** to build the project, a whole page or a whole feature for you.

Your part:

- Do not delete `AGENTS.md` or `AI_LOG.md`, and do not edit sections 1–5 of `AGENTS.md` or the entries in the log. Git shows every change to these files. You may add your own rules in the "My rules" section.
- Commit `AI_LOG.md` together with your code.
- If you use a chat AI in the browser (ChatGPT, Claude, Gemini), the same rules apply, and you write the log entries yourself in the same format.
- If you do not use AI, leave `AI_LOG.md` as it is. You do not lose points for using AI, and you do not gain points for avoiding it.

Using AI is not cheating. Hiding it is. And code that you cannot explain does not count — see the next section.

## 7. The defense

After the deadline each student gets about 5 minutes. You open your app and your code, and I will:

- ask you to show a feature;
- point at a function and ask what each line does;
- ask "what happens if…": the server answers 404, the search finds nothing, `localStorage` is empty;
- ask for one small change on the spot, for example "show 8 items per page instead of 12".

**If you cannot explain a part of your code, you lose the points for the category it belongs to.** If you cannot explain your pagination, category C counts as not done, even when it works.

This is why it does not help to let another person or an AI write your project. Simple code that you understand beats clever code that you do not.

## 8. Submit

1. Replace `README.md` with your own. The skeleton is in the file.
2. Push everything.
3. Test it like a stranger: clone your repository into a **new** folder, open it with Live Server, and click through the whole app with the Console open.
4. Go through [SCORING.md](SCORING.md) line by line and check yourself.
5. Open an issue in the course repository and fill in the **Final project submission** form: <https://github.com/JavaScriptADI/javascript-205-final-project/issues/new/choose>

I grade the last commit that was pushed before the deadline.

## 9. When you get stuck

Getting stuck is a normal part of a project. Try these in order:

1. Read the red message in the Console. It names the file and the line.
2. Open the Network tab. Was the request sent? What status came back? What is in the response?
3. `console.log` the value you are unsure about.
4. Check the API documentation: <https://dummyjson.com/docs>
5. Ask in class or in the group chat. Say what you expected, what happened, and what you already tried.
