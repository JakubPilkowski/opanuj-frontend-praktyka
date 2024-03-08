import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { writeFileSync } from 'fs';
import { z } from 'zod';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readContent(pathToResource) {
  let resource = '{}';

  try {
    resource = await readFile(
      join(__dirname, `../data/${pathToResource}.json`),
      'utf-8'
    );
  } catch (err) {
    console.log(`Could not read resource ${pathToResource}.json`, err);
  }

  return resource;
}

export const createDataMiddleware = () => {
  const router = express.Router();

  router.get('/batch', async (req, res) => {
    let resource = {};
    const resources = req.query.resources.split(',');
    const data = await Promise.all(resources.map((r) => readContent(r)));

    data.forEach((entry) => {
      const parsed = JSON.parse(entry);
      resource = {
        ...resource,
        ...parsed,
      };
    });

    return res.json(resource);
  });

  router.get('/:resource', async (req, res) => {
    const resource = await readContent(req.params.resource);
    return res.json(JSON.parse(resource));
  });

  router.post('/:resource', async (req, res) => {
    return res.sendStatus(200);
  });

  router.post(
    '/add-item',
    async (req, res, next) => {
      const itemSchema = z
        .object({
          body: z
            .object({
              name: z
                .string()
                .trim()
                .toLowerCase()
                .min(1, 'Name cannot be empty')
                .max(100, 'Name cannot exceed 100 words'),
            })
            .strict(),
        })
        .strict();
      try {
        const result = await itemSchema.parseAsync({
          body: req.body,
        });
        req.body = result.body;
        return next();
      } catch (error) {
        return res.status(400).json(error);
      }
    },
    async (req, res) => {
      const resourceName = 'items';
      const resource = await readContent(resourceName);

      const items = new Set(JSON.parse(resource).items);

      const name = req.body.name;

      const oldLength = items.size;
      items.add(name);

      const expectedLength = oldLength + 1;

      try {
        const newItems = z
          .set(z.string())
          .size(expectedLength, 'Item already exists')
          .parse(items);

        const obj = { items: Array.from(newItems) };

        writeFileSync(
          join(__dirname, `../data/${resourceName}.json`),
          JSON.stringify(obj, null, 2),
          () => {}
        );

        return res.json({ data: req.body.name });
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );

  return router;
};
