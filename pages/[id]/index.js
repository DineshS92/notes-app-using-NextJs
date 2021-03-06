import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';


const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`https://notes-app-to-learn-next-js.vercel.app/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    setConfirm(false);
  }

  return (
    <div className="note-container">
      {isDeleting
        ? <Loader active />
        : <>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <Button color='red' onClick={() => setConfirm(true)}>Delete</Button>
          </>
      }
      <Confirm open={confirm} onCancel={() => setConfirm(false)} onConfirm={handleDelete} />
    </div>
  );

}

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`https://notes-app-to-learn-next-js.vercel.app/api/notes/${id}`);
  const { data } = await res.json();

  return {
    note: data
  }
}

export default Note;