import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useStore from '../../store/dataStore';

const ComponentMemberDetails = () => {
  const { id } = useParams(); // Get the uuid from the URL
  const navigate = useNavigate();
  const memberData = useStore((state) => state.memberData);
  const addOrUpdateMember = useStore((state) => state.addOrUpdateMember);
  const [isEditing, setIsEditing] = React.useState(false);
  const [memberInfo, setMemberInfo] = React.useState({
    id: '',
    first_name: '',
    last_name: '',
    membership_date: '',
    membership_fee: '',
  });

  React.useEffect(() => {
    if (id) {
      // Save the last viewed member ID to localStorage
      localStorage.setItem('lastViewedMemberId', id);

      // Find the member with the given id and update the state
      const member = memberData.find((m) => m.id === id);
      if (member) {
        setMemberInfo({
          id: member.id,
          first_name: member.first_name,
          last_name: member.last_name,
          membership_date: member.membership_date,
          membership_fee: member.membership_fee,
        });
      }
    }
  }, [id, memberData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMemberInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Save the updated member info when exiting edit mode
      addOrUpdateMember(memberInfo);
    }
    setIsEditing(!isEditing);
  };

  const textFieldSx = (isEditable) => ({
    '& .MuiOutlinedInput-root.Mui-disabled': {
      '& fieldset': {
        borderColor: '#33333310',
      },
    },
  });

  return (
    <Box sx={{ width: '100%', padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Member ID"
        name="id"
        value={memberInfo.id}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        disabled={!isEditing}
        sx={textFieldSx(false)}
      />
      <TextField
        label="First Name"
        name="first_name"
        value={memberInfo.first_name}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: !isEditing,
        }}
        disabled={!isEditing}
        sx={textFieldSx(isEditing)}
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={memberInfo.last_name}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: !isEditing,
        }}
        disabled={!isEditing}
        sx={textFieldSx(isEditing)}
      />
      <TextField
        label="Membership Date"
        name="membership_date"
        value={memberInfo.membership_date}
        onChange={handleInputChange}
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        InputProps={{
          readOnly: !isEditing,
        }}
        disabled={!isEditing}
        sx={textFieldSx(isEditing)}
      />
      <TextField
        label="Membership Fee"
        name="membership_fee"
        value={memberInfo.membership_fee}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: !isEditing,
        }}
        disabled={!isEditing}
        sx={textFieldSx(isEditing)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={toggleEdit} sx={{ width: 100 }}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </Box>
    </Box>
  );
};

export default ComponentMemberDetails;
