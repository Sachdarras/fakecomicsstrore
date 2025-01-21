// lib/comicvine.js

/**
 * getBatmanComicsSince2010()
 * Récupère des issues Batman publiées chez DC depuis 2010.
 */
export async function getBatmanComicsSince2010(limit = 10) {
  // Plage de dates : de 2010-01-01 à 2100-12-31
  const fromDate = '2018-01-01';
  const toDate = '2100-12-31';

  // Filtre "publisher=DC Comics", "name=Batman", "cover_date" entre 2010 et 2100
  const filter = `publisher:DC%20Comics,name:Batman,cover_date:${fromDate}|${toDate}`;

  const url = `https://comicvine.gamespot.com/api/issues/` +
              `?api_key=${process.env.COMICVINE_API_KEY}` +
              `&format=json` +
              `&filter=${filter}` +
              `&limit=${limit}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'MyBatmanComicsApp/1.0',
    },
  });

  if (!response.ok) {
    console.error('Erreur API ComicVine (getBatmanComicsSince2010):', response.status, response.statusText);
    return [];
  }

  const data = await response.json();
  return data?.results || [];
}

/**
 * getIssueById(issueId)
 * Récupère le détail complet d'une issue par son ID (ex: "4000-123456")
 */
export async function getIssueById(issueId) {
  const url = `https://comicvine.gamespot.com/api/issue/${issueId}/?api_key=${process.env.COMICVINE_API_KEY}&format=json`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'MyBatmanComicsApp/1.0',
    },
  });

  if (!response.ok) {
    console.error('Erreur API ComicVine (getIssueById):', response.status, response.statusText);
    return null;
  }

  const data = await response.json();
  // data.results contient l'objet "issue" s'il existe
  const issue = data?.results || null;
  return issue;
}
