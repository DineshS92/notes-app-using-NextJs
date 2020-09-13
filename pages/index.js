import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import {Button, Card, Icon } from 'semantic-ui-react';

const Index = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map(note => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                  {/* <Link href={`/api/notes/${note._id}`}>
                    <Icon name='trash' size='large' color='red' style={{cursor: 'pointer'}}/>
                  </Link> */}
                </Card.Content>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Index.getInitialProps = async () => {
  const res = await fetch('https://notes-app-to-learn-next-js.vercel.app/api/notes');
  const { data } = await res.json();

  return { notes: data };
}

export default Index;