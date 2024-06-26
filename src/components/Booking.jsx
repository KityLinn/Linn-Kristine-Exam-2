import { Button, Row, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import {auctionUrls} from "../api/Apiutils";
import { Error } from "./Error";
import { toast } from "react-toastify";

export function Booking({venue, onDone}) {


  const [excludeDates, setExcludeDates] = useState([]);
  const { register, handleSubmit, control, setValue, formState: { errors }, } = useForm();

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  function handleDates (dates)  {
    const [start, end] = dates;
    setDateFrom(start);
    setDateTo(end);
    setValue("dateFrom", start, {
      shouldDirty: true
    });
    setValue("dateTo", end, {
      shouldDirty: true
    });
  };

  useEffect(() => {
    setExcludeDates(getDatesFromBookings(venue.bookings));
  }, [venue])

  async function doBooking (booking) {
    let response = await sendBooking(booking);
    if (response?.data?.id) {

      toast.success("Booking has been created");
      onDone();
    } else {
      response?.errors.forEach((error)=>{
        toast.warn(error.message);
      })
    }
  }

  return (
    <section>
      <Form onSubmit={handleSubmit(doBooking)}>
        <Form.Group className="mb-3" controlId="guests">                                       
          <Form.Label>Guests (max: {venue.maxGuests}): </Form.Label>
          <Form.Control
                className={errors.guests && "error"}
                type="number"
                placeholder="Number of guests"
                {...register("guests", {
                  required: {
                    value: (v)=> v>0,
                    message: "Must be 1 or more",
                  },
                  value: 1, 
                  valueAsNumber: true,
                })}
              />
              <Error text={errors.guests?.message} />
        </Form.Group>
        <Row className="mb-2">
          <Form.Group className="d-flex justify-content-center">
            <Controller
                name="dateFrom"
                control={control}
                defaultValue={new Date()}
                render={() => (
                  <DatePicker
                    selected={dateFrom}
                    placeholderText="Select start date"
                    onChange={handleDates}
                    startDate={dateFrom}
                    endDate={dateTo}
                    excludeDates={excludeDates}
                    selectsRange
                    inline
                  />
                )}
              />
          </Form.Group>
        </Row>
        <input {...register("venueId", {required: true, value: venue.id})} type="hidden"/>
        <Row>
          <Button type="submit">Book</Button>
        </Row>
      </Form>
    </section>
  );
}

async function sendBooking(booking) {
  const token = localStorage.getItem("token");
  const res = await fetch (auctionUrls.createBooking, {
    method: "post",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2",
    },
    body: JSON.stringify(booking),
  });
  const data = await res.json();

  return data;
}

function getDatesFromBookings(bookings) {
  let dates = new Set();

  bookings?.forEach(item =>{
    let range = getDatesBetween(new Date(item.dateFrom), new Date(item.dateTo));
    range.forEach((date) => dates.add(date));
  });

  return [...dates];
}

function getDatesBetween(startDate, endDate) {
  let dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}