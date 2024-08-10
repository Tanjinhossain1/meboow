import React, { Fragment } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import { MobileArticleType } from '@/types/mobiles';

const TopDevicesTable = ({byFans,dailyInterest}:{byFans:MobileArticleType[],dailyInterest:MobileArticleType[]}) => {
  // Data for the tables
  const dailyInterestData = [
    { rank: 1, device: 'Samsung Galaxy A55', hits: '33,613' },
    { rank: 2, device: 'Apple iPhone 11', hits: '29,568' },
    { rank: 3, device: 'Samsung Galaxy S24 Ultra', hits: '27,732' },
    { rank: 4, device: 'Xiaomi Redmi Note 13 Pro', hits: '25,952' },
    { rank: 5, device: 'Apple iPhone 13', hits: '25,058' },
    { rank: 6, device: 'Samsung Galaxy A15', hits: '25,300' },
    { rank: 7, device: 'Xiaomi Redmi Note 13', hits: '22,884' },
    { rank: 8, device: 'Apple iPhone 15 Pro Max', hits: '20,840' },
    { rank: 9, device: 'Apple iPhone 16 Pro Max', hits: '19,861' },
    { rank: 10, device: 'Xiaomi 14 Pro', hits: '18,546' },
  ];

  const fansData = [
    { rank: 1, device: 'Samsung Galaxy S24 Ultra', favorites: '1,153' },
    { rank: 2, device: 'Xiaomi Poco F5', favorites: '737' },
    { rank: 3, device: 'Sony Xperia 1 V', favorites: '643' },
    { rank: 4, device: 'Google Pixel 8 Pro', favorites: '623' },
    { rank: 5, device: 'Apple iPhone 15 Pro Max', favorites: '615' },
    { rank: 6, device: 'OnePlus 12', favorites: '567' },
    { rank: 7, device: 'Xiaomi Redmi Note 13 Pro+', favorites: '572' },
    { rank: 8, device: 'Xiaomi Redmi Note 13 Pro', favorites: '540' },
    { rank: 9, device: 'Asus Zenfone 10', favorites: '523' },
    { rank: 10, device: 'Xiaomi 13 Ultra', favorites: '520' },
  ];

  // Render the tables
  return (
    <Fragment>
      <Typography sx={{mt:2,fontWeight:600}} variant="h6" gutterBottom>
        Top 10 by daily interest
      </Typography>
      <TableContainer  >
        <Table>
          <TableHead sx={{p:0,m:0}}>
            <TableRow sx={{p:0,m:0}}>
              <TableCell sx={{p:0,m:0,bgcolor:"#a4c08d",color:"white",fontWeight:600,width:"10px"}}></TableCell>
              <TableCell sx={{p:0,m:0,bgcolor:"#a4c08d",color:"white",fontWeight:600}}>Device</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyInterest.map((row,index) => (
              <TableRow className={index % 2 !== 0 ? 'bg-[#e8f6e9]' : ''} key={row.id}>
                <TableCell className='p-1' sx={{m:0,p:0}}>{index + 1}.</TableCell>
                <TableCell  className='p-1' sx={{m:0,p:0,":hover":{color:"red"}}}>
                    <Link  href={''}>{row.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography sx={{fontWeight:600}} variant="h6" gutterBottom style={{ marginTop: '30px' }}>
        TOP 10 BY FANS
      </Typography>
      <TableContainer  >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{p:0,m:0,bgcolor:"#82a2bd",color:"white",fontWeight:600,width:"10px"}}></TableCell>
              <TableCell sx={{p:0,m:0,bgcolor:"#82a2bd",color:"white",fontWeight:600}}>Device</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {byFans.map((row,index) => (
              <TableRow className={index % 2 !== 0 ? 'bg-[#e8eff6]' : ''} key={row.id}>
                <TableCell className='p-1' sx={{p:0,m:0}}>{index + 1}.</TableCell>
                <TableCell className='p-1' sx={{m:0,p:0,":hover":{color:"red"}}}>
                <Link  href={''}>{row.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TopDevicesTable;
