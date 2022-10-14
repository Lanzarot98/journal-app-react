import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { startNewNote } from '../../store/journal';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      {/* <Typography>Commodo sint adipisicing duis magna consectetur qui ipsum commodo nisi irure sunt reprehenderit laborum reprehenderit. Id aliqua quis qui aliqua tempor eu aliquip cupidatat id enim eu ipsum. Qui aliqua consectetur reprehenderit elit veniam laborum irure irure enim esse cupidatat incididunt consequat ad. Ex sint tempor amet laborum velit elit qui. Eu ex minim nostrud amet minim sunt reprehenderit incididunt in adipisicing et irure.</Typography> */}

      <NothingSelectedView />
      {/* <NoteView /> */}

      <IconButton
        onClick={ onClickNewNote } 
        size='medium'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>

  )
}
