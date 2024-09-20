import React, { Fragment, lazy } from 'react';
import Link from 'next/link';
import { MobileArticleType } from '@/types/mobiles';
import { formatForUrl } from '@/utils/utils';

const Table = lazy(() => import('@mui/material/Table'));
const TableBody = lazy(() => import('@mui/material/TableBody'));
const TableCell = lazy(() => import('@mui/material/TableCell'));
const TableContainer = lazy(() => import('@mui/material/TableContainer'));
const TableHead = lazy(() => import('@mui/material/TableHead'));
const TableRow = lazy(() => import('@mui/material/TableRow'));
const Typography = lazy(() => import('@mui/material/Typography'));


const TopDevicesTable = ({byFans,dailyInterest}:{byFans:MobileArticleType[],dailyInterest:MobileArticleType[]}) => {

  return (
    <Fragment>
      <Typography sx={{mt:2,fontWeight:600}} gutterBottom>
        Top 10 by daily interest
      </Typography>
      <TableContainer  >
        <Table>
          <TableHead sx={{p:0,m:0}}>
            <TableRow sx={{p:0,m:0}}>
              <TableCell className='bg-topTableHeadCustomGreen'  sx={{p:0,m:0,color:"white",fontWeight:600,width:"10px"}}></TableCell>
              <TableCell className='bg-topTableHeadCustomGreen' sx={{p:0,m:0,color:"white",fontWeight:600}}>Device</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyInterest?.map((row,index) => (
              <TableRow className={index % 2 !== 0 ? 'bg-topTableCustomGreen' : ''} key={row.id}>
                <TableCell className='p-1' sx={{m:0,p:0}}>{index + 1}.</TableCell>
                <TableCell  className='p-1' sx={{m:0,p:0,":hover":{color:"red"}}}>
                    <Link aria-label={`Mobile ${formatForUrl(row?.title)}`}  href={`/mobile/${formatForUrl(row?.title)}`}>{row.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography sx={{fontWeight:600}} gutterBottom style={{ marginTop: '30px' }}>
        TOP 10 BY FANS
      </Typography>
      <TableContainer  >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='bg-topTableHeadCustomBlue' sx={{p:0,m:0,color:"white",fontWeight:600,width:"10px"}}></TableCell>
              <TableCell className='bg-topTableHeadCustomBlue' sx={{p:0,m:0,color:"white",fontWeight:600}}>Device</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {byFans?.map((row,index) => (
              <TableRow className={index % 2 !== 0 ? 'bg-topTableCustomBlue' : ''} key={row.id}>
                <TableCell className='p-1' sx={{p:0,m:0}}>{index + 1}.</TableCell>
                <TableCell className='p-1' sx={{m:0,p:0,":hover":{color:"red"}}}>
                <Link aria-label={`Mobile ${formatForUrl(row?.title)}`}  href={`/mobile/${formatForUrl(row?.title)}`}>{row.title}</Link>
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
