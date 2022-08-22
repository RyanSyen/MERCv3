export interface Order {
    email: string;
    orderID: number;
    item: any;
    receiverName: string;
    receiverHP: string;
    receiverAddress: string;
    paymentMethod: string;
    total: number;
    receiveDate: string;
    receiveTime: string;
}