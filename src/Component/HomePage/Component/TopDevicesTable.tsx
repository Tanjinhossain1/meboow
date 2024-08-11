import React, { Fragment } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import { MobileArticleType } from '@/types/mobiles';

const TopDevicesTable = ({byFans,dailyInterest}:{byFans:MobileArticleType[],dailyInterest:MobileArticleType[]}) => {

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
            {dailyInterest?.map((row,index) => (
              <TableRow className={index % 2 !== 0 ? 'bg-[#e8f6e9]' : ''} key={row.id}>
                <TableCell className='p-1' sx={{m:0,p:0}}>{index + 1}.</TableCell>
                <TableCell  className='p-1' sx={{m:0,p:0,":hover":{color:"red"}}}>
                    <Link   href={`/mobile/detail/${row.id}`}>{row.title}</Link>
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
            {byFans?.map((row,index) => (
              <TableRow className={index % 2 !== 0 ? 'bg-[#e8eff6]' : ''} key={row.id}>
                <TableCell className='p-1' sx={{p:0,m:0}}>{index + 1}.</TableCell>
                <TableCell className='p-1' sx={{m:0,p:0,":hover":{color:"red"}}}>
                <Link  href={`/mobile/detail/${row.id}`}>{row.title}</Link>
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
