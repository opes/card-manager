import { client, parseData } from './client';

export async function getCards() {
  const request = await client.from('cards').select().order('title');
  return parseData(request)
}

export async function getCard(id) {
  try {
    const request = await client.from('cards').select().match({ id });
    return parseData(request);
  } catch (e) {
    console.log(e)
    return {}
  }
}

export async function getCardbyTitle(title) {
  try {
    const request = await client.from('cards').select().textSearch('title', title);
    return parseData(request);
  } catch (e) {
    console.log(e)
    return {}
  }
}

export async function updateCard({ title, id, definition, category, animal, source }) {
  const request = await client
    .from('cards')
    .update({ title, definition, category, animal, source })
    .match({ id });
  return parseData(request);
}

export async function createCard({ title, definition, category, animal, source }) {
  try {
    const request = await client
      .from('cards')
      .insert({ title, definition, category, animal, source });
    return parseData(request);
  } catch (e) {
    console.log(e)
    return {}
  }
}

export async function deleteCardById(id) {
  try {
    const request = await client.from('cards').delete().match({ id });
    return parseData(request);
  } catch (e) {
    console.log(e)
    return {}
  }
}
