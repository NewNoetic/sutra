# Sutra

> Efficiently absorb vast knowledge

## Development

### Setup

In `server/`:

```
npm install
npx now login # You may link to an existing Now project, or setup as a new one
npm run start
```

In `webext/`:

```
npm install
npm run start
```

### Icons

We are using [Octicons](https://octicons.github.com/)

```
import Octicon, { ChevronRight } from '@primer/octicons-react'
...
<Octicon icon={ ChevronRight } />
```

## Deployment

### Chrome Web Store

> Please do not deploy your own version of this extension to any online distribution channel or store.

`.env` in `webext` root:

```
# for publishing to the chrome web store
client_id=XXX-XXX.apps.googleusercontent.com
client_secret=XXX
item_id=gedajnkfkgcneabfepklknnplbghkfmo
refresh_token=XXX # get it [here](https://github.com/dfblue/chrome-webstore-upload/blob/HEAD/How%20to%20generate%20Google%20API%20keys.md)
```

Bump version and push build to Chrom Web Store:

```
npm run version:(major|minor|patch)
npm run deploy
```

### Zeit Now (API)

#### Staging

```
npm run stage
```

#### Production

```
npm run deploy
```