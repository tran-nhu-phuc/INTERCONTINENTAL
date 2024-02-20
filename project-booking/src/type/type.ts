export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  booking: [];
  status: number;
  email: string;
  phone: number;
  password: string;
  role: number;
  avatar: [];
  comment: [];
}
export interface Room {
  id?: number;
  name: string;
  stock: number;
  cost: number;
  image: [];
  count_user: string;
  status: number;
  category: string;
  comment: [];
}
export interface Booking {
  roomId: number;
  timeCheckIn: string;
  timeCheckOut: string;
  nameRoom: string;
  numberRooms: number;
  totalPrice: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  countryCode: string;
  address: string;
  country: string;
  city: string;
  numberUser: number;
  numberChild: number;
  cityCode: number;
}
export interface Contents {
  title: string;
  content: string;
}
// export interface DataTypeHistory {
//   key: React.Key;
//   nameGuest: string;
//   dateBooking: string;
//   phoneNumber: number;
//   countRoom: number;
//   typeRoom: string;
//   costRoom: number;
//   totalPrice: number;
//   details: string;
// }
export interface DataContentHistory {
  title: string;
  dataIndex: string;
}
export interface SearchRoom {
  dataStart: string;
  dateEnd: string;
  numberRoom: number;
  countUser: number;
  countChild: number;
}
