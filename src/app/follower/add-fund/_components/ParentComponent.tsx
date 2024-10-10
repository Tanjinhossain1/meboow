"use client";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { CopyIcon, CreditCardIcon, HistoryIcon } from "lucide-react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { UsersTypes } from "@/types/users";
import { FundsTypes } from "@/types/order";
import { formatDate } from "@/utils/utils";

const data = [
  { date: "2024-10-05", amount: "$100", status: "Completed" },
  { date: "2024-10-04", amount: "$250", status: "Pending" },
  { date: "2024-10-03", amount: "$75", status: "Failed" },
  { date: "2024-10-02", amount: "$500", status: "Completed" },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "success";
    case "Pending":
      return "warning";
    case "Failed":
      return "error";
    default:
      return "default";
  }
};
export default function ParentComponent({ user }: { user: UsersTypes }) {
  const [open, setOpen] = useState<boolean>(false);
  const [transactionData, setTransactionData] = useState<FundsTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleOpen: SnackbarOpen } = useContext(SnackbarProviderContext);
  const [paymentInitialDetail, setPaymentInitialDetail] = useState<{
    amount: number;
    mainAmount: number;
    method: string;
  } | null>(null);
  const [selectedButton, setSelectedButton] = useState<
    "addFund" | "transactions"
  >("addFund"); // Default selected button

  useEffect(() => {
    if (user.email) {
      setIsLoading(true);

      axios
        .get(`/api/follower/addFund?email=${user.email}`)
        .then((response) => {
          console.log("response ", response);
          setTransactionData(response.data?.data);
          setIsLoading(false);
        })
        .catch((err: any) => {
          setIsLoading(false);
        });
    }
  }, [user.email]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, fullName, role } = user;
    const transactionId = (event.target as any)?.transactionId?.value;
    const amount = (event.target as any)?.amount?.value;
    const method = (event.target as any)?.method?.value;
    if (transactionId) {
      const data = {
        email,
        amount: paymentInitialDetail?.mainAmount,
        fullName,
        role,
        transactionId,
        method: paymentInitialDetail?.method,
        status: "Pending",
      };
      axios
        .post(`/api/follower/addFund`, data)
        .then((response) => {
          SnackbarOpen("Create Success Fully", "success");
          setOpen(false);
          setTimeout(() => {
            window.location.reload();
          }, 50);
        })
        .catch((error) => {
          SnackbarOpen("Issue in Server", "error");
        });
    } else {
      if (+amount > 0) {
        setOpen(true);
        setPaymentInitialDetail({
          amount: amount * 125,
          method,
          mainAmount: amount,
        });
      } else {
        SnackbarOpen("Minimum 1 Dollar", "error");
      }
    }
  };
  return (
    <Fragment>
      <Grid container>
        <Grid xs={12} md={7}>
          <Paper elevation={0}>
            <Box sx={{ p: 1 }} display="flex" gap={2}>
              {/* Add Fund Button */}
              <Button
                onClick={() => setSelectedButton("addFund")}
                variant={
                  selectedButton === "addFund" ? "contained" : "outlined"
                }
                color="primary"
                startIcon={<CreditCardIcon />}
                sx={{
                  backgroundColor:
                    selectedButton === "addFund" ? "#6f2bf2" : "#fff",

                  borderRadius: "10px",
                  textTransform: "none",
                  width: "100%",
                }}
              >
                Add Fund
              </Button>

              {/* Transactions Button */}
              <Button
                onClick={() => setSelectedButton("transactions")}
                variant={
                  selectedButton === "transactions" ? "contained" : "outlined"
                }
                color="primary"
                startIcon={<HistoryIcon />}
                sx={{
                  backgroundColor:
                    selectedButton === "transactions" ? "#6f2bf2" : "#fff",
                  color: selectedButton === "transactions" ? "#fff" : "#6f2bf2",
                  borderColor: "#6f2bf2",
                  borderRadius: "10px",
                  textTransform: "none",
                  width: "100%",
                }}
              >
                Transactions
              </Button>
            </Box>

            {selectedButton === "addFund" ? (
              <Box sx={{ p: 1 }}>
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select
                      sx={{ height: "40px" }}
                      name="method"
                      value={"Bkash"}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 400, // Limit height for better scrolling
                          },
                        },
                      }}
                    >
                      <MenuItem selected value={"Bkash"}>
                        Bkash
                      </MenuItem>
                      <MenuItem value={"Nagad"}>Nagad</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography
                    sx={{ fontSize: 18, fontWeight: 600 }}
                    gutterBottom
                  >
                    Amount
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    type="number"
                    name="amount"
                    helperText={
                      <Fragment>
                        <p className="text-green-600 font-semibold">
                          Ballance provide in dollar and minimum 1 dollar
                        </p>
                      </Fragment>
                    }
                    // "Min: 500 - Max: 1 000 000"
                    sx={{ mb: 2 }}
                  />
                  <Dialog onOpenChange={() => setOpen(false)} open={open}>
                    <DialogTrigger asChild>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: "100%", bgcolor: "#6f2bf2" }}
                        size="large"
                      >
                        Pay
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-red-500">
                      <DialogHeader className="text-white flex justify-between">
                        <DialogTitle className="flex justify-between text-black">
                          <span>Amount: ৳ {paymentInitialDetail?.amount}</span>
                        </DialogTitle>
                      </DialogHeader>
                      <form>
                        <Box
                          sx={{
                            maxWidth: 600,
                            margin: "0 auto",
                            padding: 3,
                            borderRadius: 2,
                            backgroundColor: "#cf2771",
                            color: "#fff",
                            boxShadow: 3,
                          }}
                        >
                          <Typography variant="h6" align="center" gutterBottom>
                            ট্রানজেকশন আইডি দিন
                          </Typography>

                          <TextField
                            fullWidth
                            required
                            name="transactionId"
                            label="ট্রানজেকশন আইডি দিন"
                            variant="outlined"
                            sx={{ backgroundColor: "#fff", mb: 2 }}
                          />

                          <Typography sx={{ fontSize: 14, mb: 1 }}>
                            <span className="text-2xl">•</span> *247# ডায়াল করে
                            আপনার BKASH মোবাইল মেনুতে যান অথবা BKASH অ্যাপে যান
                          </Typography>
                          <Typography sx={{ fontSize: 14, mb: 1 }}>
                            <span className="text-2xl">•</span>{" "}
                            <span className="text-[#ebc347] font-semibold">{`"Payment"`}</span>
                            -এ ক্লিক করুন
                          </Typography>

                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mb: 2 }}
                          >
                            <Typography>
                              <span className="text-2xl">•</span> গ্রাহক নম্বর
                              হিসাবে এই নম্বরটি লিখুন
                            </Typography>
                            <Typography
                              fontWeight="bold"
                              className="text-[#ebc347] font-semibold"
                            >
                              01979755714
                            </Typography>
                            <IconButton>
                              <CopyIcon
                                onClick={() => {
                                  const numberToCopy = "01979755714";
                                  navigator.clipboard
                                    .writeText(numberToCopy)
                                    .then(
                                      () => {
                                        console.log(
                                          "Number copied to clipboard!"
                                        );
                                        // Optionally, show a message to the user like a toast notification
                                      },
                                      (err) => {
                                        console.error("Failed to copy: ", err);
                                      }
                                    );
                                }}
                                style={{ color: "#fff" }}
                              />
                            </IconButton>
                          </Grid>

                          <Typography sx={{ fontSize: 14, mb: 1 }}>
                            <span className="text-2xl">•</span> টাকার পরিমাণ{" "}
                            <b>:</b>{" "}
                            <span className="text-[#ebc347] font-semibold">
                              {" "}
                              {paymentInitialDetail?.amount}
                            </span>
                          </Typography>

                          <Typography sx={{ fontSize: 14, mb: 2 }}>
                            <span className="text-2xl">•</span> নিশ্চিত করতে এখন
                            আপনার BKASH মোবাইল মেনু সিলেক্ট করুন
                          </Typography>
                          <Typography sx={{ fontSize: 14, mb: 2 }}>
                            <span className="text-2xl">•</span> সবকিছু ঠিক
                            থাকলে, আপনি BKASH থেকে একটি নিশ্চিতকরণ বার্তা পাবেন
                          </Typography>

                          <Typography sx={{ fontSize: 14, mb: 2 }}>
                            <span className="text-2xl">•</span> এখন উপরে রাখা
                            আপনার{" "}
                            <span className="text-[#ebc347] font-semibold">
                              {" "}
                              Transaction ID
                            </span>{" "}
                            দিন এবং নিচের{" "}
                            <span className="text-[#ebc347] font-semibold">
                              {" "}
                              VERIFY{" "}
                            </span>{" "}
                            বাটনে ক্লিক করুন।
                          </Typography>

                          <Button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents triggering outer form submit
                            }}
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                              backgroundColor: "#fff",
                              color: "#f50057",
                              fontWeight: "bold",
                              ":hover": {
                                backgroundColor: "#fff",
                                opacity: 0.8,
                              },
                            }}
                          >
                            VERIFY
                          </Button>
                        </Box>
                      </form>
                    </DialogContent>
                  </Dialog>
                </form>
              </Box>
            ) : isLoading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  {/* Table Header */}
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">method</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Table Body */}
                  <TableBody>
                    {transactionData?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(row.createdAt)}</TableCell>
                        <TableCell align="right">${row.amount}</TableCell>
                        <TableCell align="right">{row.method}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={row.status}
                            color={statusColor(row.status)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
