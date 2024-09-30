# Plant Index

## Perenual API

### API Key access

Follow [this](https://perenual.com/user/developer) link to access the Perenual API key

### API Documentation

Follow this [link](https://perenual.com/docs/api) to see the Perenual API documentation.

### Used Endpoints

The following are the API endpoints used in this project:

| Endpoint             | Purpose                                                                          |
|----------------------|----------------------------------------------------------------------------------|
| /api/species-list    | Get a list of plant species. Use optional parameters for searching and filtering |
| /api/species/details | Get full details for a plant species using it's unique ID                        |

### Parameter list

The following are optional query parameters that can be included in the API endpoint `/api/species-list`.

| Name      | Description                                                    | Type    | Options                                                  |
|-----------|----------------------------------------------------------------|---------|----------------------------------------------------------|
| Page      | The page number for the results.                               | Integer |                                                          |
| Hardiness | Hardiness Zone of plant species                                | Integer | 1 - 13                                                   |
| q         | A string query used to narrow down results. Uses species name. | String  |                                                          |
| Order     | The order for results, by species common name.                 | String  | 'Asc', 'Desc'                                            |
| Cycle     | The plant cycle of the species.                                | String  | 'perennial', 'annual', 'biennial', 'biannual'            |
| Watering  | The watering amount of the species.                            | String  | 'frequent', 'average', 'minimum', 'none'                 |
| Sunlight  | How much sunlight the species should get.                      | String  | 'full_shade', 'part_shade', 'sun-part_shade', 'full_sun' |
| Indoor    | Specifies if the species is to be kept indoors                 | Bool    |                                                          |
| Edible    | Specifies if resulting species are edible or not.              | Bool    |                                                          |
| Poisonous | Specifies if the resulting species are poisonous or not.       | Bool    |                                                          |

## NextJS

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
