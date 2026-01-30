import { neon } from '@neondatabase/serverless';
import styles from './homepage.module.scss';

async function getData() {
  const databaseUrl = process.env.DATABASE_URL || '';
  const sql = neon(databaseUrl);
  const response = await sql`SELECT * FROM playing_with_neon`;

  console.log(response);
  return response;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className={styles.page}>
      <h1>The Borrow Club</h1>
      <h2>My library</h2>

      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.email}</p>
        </div>
      ))}
    </div>
  );
}
