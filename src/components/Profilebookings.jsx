import { Card } from "react-bootstrap";

export function Profilebookings({ venue, dateFrom, dateTo }) {
  return (
    <>
      <Card border="primary">
        <Card.Header>{venue.name}</Card.Header>
        <Card.Body>
          <p>From: {new Date(dateFrom).toLocaleDateString()}</p>
          <p>To: {new Date(dateTo).toLocaleDateString()}</p>
        </Card.Body>
      </Card>
    </>
  );
}
