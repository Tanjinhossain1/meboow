import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '@/Component/Shared/Navbar';
import Footer from '@/Component/HomePage/Footer';

const faqData = [
  {
    category: 'General Questions',
    questions: [
      {
        question: 'What is Safarilist.com?',
        answer: 'Safarilist.com is your go-to platform for the latest articles and in-depth mobile specifications...',
      },
      {
        question: 'How can I navigate through the website?',
        answer: 'You can easily navigate Safarilist.com using the menu at the top of the page...',
      },
      {
        question: 'Is Safarilist.com free to use?',
        answer: 'Yes, Safarilist.com is completely free to use...',
      },
    ],
  },
  {
    category: 'Articles',
    questions: [
      {
        question: 'What type of articles can I find on Safarilist.com?',
        answer: 'Our articles cover a wide range of topics, including the latest tech news, mobile device reviews...',
      },
      {
        question: 'How often are new articles published?',
        answer: 'We regularly update our site with fresh content...',
      },
      {
        question: 'Can I contribute articles to Safarilist.com?',
        answer: 'Currently, we do not accept guest contributions...',
      },
    ],
  },
  {
    category: 'Mobile Specifications',
    questions: [
      {
        question: 'How do I find the specifications of a specific mobile device?',
        answer: 'You can find the specifications of a specific mobile device by navigating to the "Mobile Specifications"...',
      },
      {
        question: 'What information is included in the mobile specifications?',
        answer: 'Our mobile specification pages include detailed information about each device...',
      },
      {
        question: 'Are the mobile specifications up-to-date?',
        answer: 'Yes, we regularly update our mobile specification pages...',
      },
    ],
  },
  {
    category: 'Account & Privacy',
    questions: [
      {
        question: 'Do I need to create an account to use Safarilist.com?',
        answer: 'No, you do not need an account to browse articles or view mobile specifications...',
      },
      {
        question: 'How is my privacy protected on Safarilist.com?',
        answer: 'We take your privacy seriously. Please refer to our Privacy Policy for detailed information...',
      },
    ],
  },
  {
    category: 'Support & Feedback',
    questions: [
      {
        question: 'How can I contact Safarilist.com for support or feedback?',
        answer: 'If you have any questions, suggestions, or need support, you can reach us via the Contact Us page...',
      },
      {
        question: 'Can I request a specific mobile device to be added to the specifications section?',
        answer: 'Absolutely! If there’s a mobile device that isn’t listed on our site, please let us know...',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <Grid container>
        <Navbar />
        <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions (FAQ)
      </Typography>

      {faqData?.map((section, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom sx={{ marginTop: 3,fontWeight:600 }}>
            {section.category}
          </Typography>
          {section.questions.map((faq, idx) => (
            <Accordion defaultExpanded key={idx}>
              <AccordionSummary sx={{borderBottom:"1px solid gray"}} expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{fontWeight:600}}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ))}
    </Container>
    <Footer />
    </Grid>
  );
}
