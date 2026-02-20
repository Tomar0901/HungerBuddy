"use client"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ProductInfoComponent({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: matches ? 2 : 5,
        px: 2
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        
        {/* INGREDIENTS */}
        <Accordion elevation={0} sx={{ background: "transparent" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontSize: matches ? 16 : 18, fontFamily: "poppins" }}>
              Ingredients list
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {data?.ingredients}
          </AccordionDetails>
        </Accordion>

        

        {/* SHARE */}
        <Accordion elevation={0} sx={{ background: "transparent" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontSize: matches ? 16 : 18, fontFamily: "poppins" }}>
              Share
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <img width={20} src="/images/linkedin.png" />
              <img width={20} src="/images/twitter.png" />
              <img width={20} src="/images/facebook.png" />
              <img width={20} src="/images/instagram.png" />
              <img width={20} src="/images/pinterest-logo.png" />
            </Box>
          </AccordionDetails>
        </Accordion>

      </Box>
    </Box>
  );
}
