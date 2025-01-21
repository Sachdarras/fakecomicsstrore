// app/comics/[id]/page.jsx

export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
  return [];
}

import { getIssueById } from '../../../lib/comicvine';
import styles from '../../style/comicDetail.module.scss';
import AddToCartButton from './AddToCartButton'; // <-- import du composant client

export default async function ComicDetailPage({ params }) {
  const { id } = params;
  const issue = await getIssueById(id);

  if (!issue) {
    return (
      <main className={styles.main}>
        <h2 className={styles.title}>Aucun comic trouvé pour l’ID « {id} ».</h2>
      </main>
    );
  }

  const { name, issue_number, volume, cover_date, store_date, image, description } = issue;

  const displayedTitle = [volume?.name, issue_number ? `#${issue_number}` : null, name]
    .filter(Boolean)
    .join(' - ');

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>{displayedTitle}</h2>

      {image?.original_url && (
        <img
          src={image.original_url}
          alt={name || volume?.name || 'Couverture'}
          className={styles.cover}
        />
      )}

      <p className={styles.info}>
        <strong>Date de couverture :</strong> {cover_date || 'Inconnue'}
      </p>

      {store_date && (
        <p className={styles.info}>
          <strong>Date de sortie :</strong> {store_date}
        </p>
      )}

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: description || '<p>Aucune description.</p>'
        }}
      />

      {/* Insertion du composant client */}
      <AddToCartButton issue={issue} />
    </main>
  );
}
