export interface Message {
    id: number;
    senderId: number;
    text: string;
    isUser: boolean;
    timestamp: number;
}
