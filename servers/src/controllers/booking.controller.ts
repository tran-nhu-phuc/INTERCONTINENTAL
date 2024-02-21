import express, { Request, Response } from "express";
import BookingService from "../services/booking.services";
import AuthorLogin from "../middlewares/check-authen.middleware";
import checkRolesUsers from "../middlewares/check-role-user.middleware";
import { BookingTypes } from "../types/bookings";
import checkStatusUsers from "../middlewares/check-status.middleware";
const bookingController = express.Router();
const bookingServices = new BookingService();
bookingController
  .get(
    "/",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const sort = req.query.sort || undefined;
        const limit = Number(req.query.limit) || 7;
        const page = Number(req.query.page) || 1;
        const result = await bookingServices.getAll(sort, limit, page);
        res.status(200).json(result);
      } catch (error) {
        res.status(404).json("error get booking");
      }
    }
  )
  .get(
    "/info/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const result = await bookingServices.getInFo(id);
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .get(
    "/get-by-user/:idUser",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.idUser);
        const result = await bookingServices.getByUser(id);
        res.status(200).json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .post(
    "/add-booking",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const voucher = req?.cookies?.voucher?.voucher || 0;
        const newDataBooking: BookingTypes = {
          roomId: Number(req.body.roomId),
          timeCheckIn: req.body.timeCheckIn,
          timeCheckOut: req.body.timeCheckOut,
          nameRoom: req.body.nameRoom,
          numberRooms: req.body.numberRooms,
          totalPrice: (1 - Number(voucher) / 100) * Number(req.body.totalPrice),
          userId: req.body.userId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          countryCode: req.body.countryCode,
          address: req.body.address,
          country: req.body.country,
          city: req.body.city,
          numberUser: Number(req.body.numberUser),
          numberChild: Number(req.body.numberChild),
          cityCode: Number(req.body.cityCode),
          paymentType: Number(req.body.paymentType) || 1,
          isVouchers: Number(voucher) || 0,
          firstPrice: Number(req.body.totalPrice),
        };
        const result = await bookingServices.createPayment(newDataBooking);
        res.clearCookie("voucher");
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .patch(
    "/update-status-booking/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const newStatus = Number(req.body.status);
        const result: any = await bookingServices.updateBooking(newStatus, id);
        res.json(result);
      } catch (error) {
        res.json("error update status booking");
      }
    }
  )
  .delete(
    "/remove-booking/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const result = await bookingServices.changeIsDelete(id);
        res.json(result);
      } catch (error) {
        res.json("error delete booking");
      }
    }
  )
  .get(
    "/price-in-thirty-day",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const result = await bookingServices.priceInThirtyDay();
        res.status(200).json(result);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  );

export default bookingController;
