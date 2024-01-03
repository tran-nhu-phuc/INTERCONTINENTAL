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
  id?: number;
  phoneUserOrder: string;
  firstNameUserOrder: string;
  lastNameUserOrder: string;
  codeOrder: string;
  countRoom: number;
  idRoom: number;
  idUser: number;
  timeBooking: string;
  totalPrice: number;
  emailAddress: string;
  address: string;
  cityTown: string;
  postalCode: string;
  statusBooking: number;
  codePhoneCountry: string;
  dateStartRoom: string;
  dateEndRoom: string;
  country: string;
  countUser: number;
  countChild: number;
  pay: number;
  getDateNow: string;
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
