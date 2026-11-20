# FaarizSheikhLearningAngularF26

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.
The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.
By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default.
You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references,
visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## API – The Movie Database (TMDB)

This project uses the **TMDB API v3** to retrieve cast and character information for *IT (2017)*.

**API Documentation:** https://developer.themoviedb.org/reference/movie-credits

**API Base URL:** `https://api.themoviedb.org/3`

**Example Request:**

```text
https://api.themoviedb.org/3/movie/346364/credits?api_key=YOUR_TMDB_V3_API_KEY&language=en-US
```

**Response Structure:**

The API returns a JSON object containing three top-level properties: `id`, `cast`, and `crew`.
The `id` represents the movie id, while `cast` and `crew` are arrays
containing cast and crew information, respectively.

**Fields to be used:**
- `id` - Actor id.
- `name` - Actor's name.
- `character` - Character's name.
- `order` - Cast billing order.

**Authentication:** A free TMDB API v3 key is required.

**Attribution:**

This product uses the TMDB API but is not endorsed or certified by TMDB.

### Loading API Data

The application uses Angular's HttpClient to retrieve character credits from TMDB.
The API response contains a cast array inside an object, so RxJS map and mapTMDBCreditsResponse
transform the response into the application's Character model
before updating the existing writable signal. I chose HttpClient because it is supported in
Angular 21 and integrates directly with the existing signal-based CRUD operations.

### Local Data Changes

Adding, editing, and deleting characters only modifies the application's in-memory signal.
There are no POST, PUT, PATCH, or DELETE requests sent to TMDB. Refreshing the page would
reload the original API data because the local changes are not saved to the server.

## Lazy loading

### Before lazy loading

Initial chunk files | Names         |  Raw size | Estimated transfer size
main-O4EQE7W3.js    | main          | 364.27 kB |                94.53 kB
styles-EIGNNWN7.css | styles        |   2.62 kB |               717 bytes

                    | Initial total | 366.90 kB |                95.24 kB

### After lazy loading

Initial chunk files | Names            |  Raw size | Estimated transfer size
main-WA7RYRPT.js    | main             | 300.13 kB |                82.13 kB
styles-EIGNNWN7.css | styles           |   2.62 kB |               717 bytes

                    | Initial total    | 302.76 kB |                82.84 kB

Lazy chunk files    | Names            |  Raw size | Estimated transfer size
chunk-CDq6JWYy.js   | character-form   |  60.21 kB |                12.93 kB
chunk-DvbSVffi.js   | character-detail |   6.67 kB |                 2.14 kB
chunk-DSyHD1LM.js   | page-not-found   | 551 bytes |               551 bytes

The character detail page, character forms, and page-not found are lazy-loaded using
Angular's `loadComponent` and dynamic imports. It reduces the JavaScript included in the
initial download because these pages are loaded only when the user visits their routes.
The character list is still eagerly loaded because it is the main / landing page of the application.

### Component Lifecycle

The application uses Angular's `OnInit` and `OnDestroy` lifecycle interfaces in the CharacterDetail
component. `ngOnInit()` retrieves the character using its required signal input, records the
opening timestamp, and logs the character's name. `ngOnDestroy()` calculates the spent time
on the detail page and logs the closing message, which will appear rounded to whole seconds.

**What happened when you read `this.id()` in the constructor, and why?**

Reading `this.id()` in the constructor resulted in Angular error NG8118 because the
required input was accessed inside the constructor before Angular assigned its value.
Angular initializes component inputs after construction, which makes `ngOnInit()`
the appropriate place to access the input.

**What actions in your app caused `ngOnDestroy` to run, and what does that tell you about
what the router does with a page when you leave it?**

When you navigate back to the character list using the custom back button or the browser's
back button, it triggers `ngOnDestroy()`. This demonstrates that Angular Router destroys the
current routed component when navigating away from its route, allowing cleanup logic execution.
