
export interface FollowerOrdersTypes extends FollowerOrderParams {
    total: string;
    email: string;
    role: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface FundsTypes {
    email: string;
    role: string;
    fullName: string;

    amount: string;
    transactionId: string;
    method: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface FollowerOrderParams {
    category: string;
    service: string;
    link: string;
    quantity: string;
    charge: string;
} 