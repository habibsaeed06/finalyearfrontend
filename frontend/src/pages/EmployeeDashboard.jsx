import { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

// --- PASTE YOUR REPLIT BACKEND URL HERE ---
const backendUrl = "https://your-replit-url.replit.co";

export default function EmployeeDashboard() {
  const [applications, setApplications] = useState([]);

  async function fetchPendingApplications() {
    try {
      const response = await axios.get(
        `${backendUrl}/api/employee/pending-applications`
      );
      setApplications(response.data);
    } catch (e) {
      alert("Failed to fetch applications.");
    }
  }

  // Fetch applications on page load
  useEffect(() => {
    fetchPendingApplications();
  }, []);

  const handleForward = async (applicationId) => {
    try {
      await axios.post(`${backendUrl}/api/employee/forward-for-review`, {
        applicationId,
      });
      alert("Application forwarded to administrator.");
      fetchPendingApplications(); // Refresh the list
    } catch (e) {
      alert("Failed to forward application.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Bank Employee Dashboard
      </Typography>
      <Typography gutterBottom>
        Review new applications and forward them for final approval.
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Loan Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app._id}>
                <TableCell>
                  {app.firstName} {app.lastName}
                </TableCell>
                <TableCell>{app.loanType}</TableCell>
                <TableCell>{app.loanAmount}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleForward(app._id)}
                  >
                    Forward to Admin
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
