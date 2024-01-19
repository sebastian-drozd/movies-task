import fs from 'fs/promises';

import { DbEntities, DbSchema } from '@db/schema';
import AppError from '@src/utils/app-error';

const DB_PATH = './db/db.json';
const DB_FILE_ENCODING = 'utf-8';

const readDb = async (): Promise<DbSchema> => {
  try {
    const dataString = await fs.readFile(DB_PATH, DB_FILE_ENCODING);
    return JSON.parse(dataString);
  } catch (error) {
    throw new AppError('Error while reading database...', 500);
  }
};

export const getAll = async <T>(entity: keyof DbSchema): Promise<T[]> => {
  const dbData = await readDb();

  return dbData[entity] as T[];
};

export const add = async <T extends Omit<R, 'id'>, R extends DbEntities[keyof DbEntities][0]>(
  entity: keyof DbEntities,
  newItem: T,
): Promise<R> => {
  try {
    const dbData = await readDb();

    const entityIds = dbData[entity].map((item) => item.id);

    const generatedId = entityIds.length ? Math.max(...entityIds) + 1 : 1;

    const itemToSave = {
      id: generatedId,
      ...newItem,
    };

    dbData[entity].push(itemToSave);

    await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2), DB_FILE_ENCODING);

    return dbData[entity][dbData[entity].length - 1] as R;
  } catch (error) {
    throw new AppError('Error while updating database...', 500);
  }
};
