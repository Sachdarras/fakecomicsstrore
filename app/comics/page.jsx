// app/comics/page.jsx
import { getBatmanComicsSince2010 } from '../../lib/comicvine';
import Link from 'next/link';
import styles from '../style/comics.module.scss';

export default async function ComicsListingPage() {
  const batmanComics = await getBatmanComicsSince2010(100);

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Batman Comics (depuis 2018)</h1>
      <ul className={styles.list}>
        {batmanComics.map((issue) => {
          const realIssueId = `4000-${issue.id}`;
          const title = issue.name || issue.volume?.name || 'Sans Titre';
          const thumb = issue?.image?.thumb_url;

          return (
            <li key={issue.id} className={styles.item}>
              <Link href={`/comics/${realIssueId}`}>
                <div className={styles.title}>{title}</div>
                {thumb && <img src={thumb} alt={title} className={styles.cover} />}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
