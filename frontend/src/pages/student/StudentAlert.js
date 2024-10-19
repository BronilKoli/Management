import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const StudentAlert = () => {
    const alerts = [
        "Alert 1: Mid-term exams will start from 1st November.",
        "Alert 2: Submit project proposals by 30th October.",
        "Alert 3: Attendance below 75% will be marked as defaulter."
    ];

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Alerts
            </Typography>
            <List>
                {alerts.map((alert, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={alert} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default StudentAlert;
