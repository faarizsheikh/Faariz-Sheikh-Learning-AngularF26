# FaarizSheikhLearningAngularF26

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

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

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

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

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## API – The Movie Database (TMDB)

This project uses the **TMDB API v3** to retrieve cast and character information for *IT (2017)*.

**API Documentation:** https://developer.themoviedb.org/reference/movie-credits

**API Base URL:** `https://api.themoviedb.org/3`

**Example Request:**

```text
https://api.themoviedb.org/3/movie/346364/credits?api_key=YOUR_TMDB_V3_API_KEY&language=en-US
```

**Response Structure:**

The API returns a JSON object containing `id`, `cast`, and `crew`. The application will use the `cast` array to retrieve character and actor information.

**Fields to be used:**
- `credit_id`
- `id`
- `name`
- `character`
- `profile_path`
- `order`

**Authentication:** A free TMDB API v3 key is required.

**Attribution:**

This product uses the TMDB API but is not endorsed or certified by TMDB.
