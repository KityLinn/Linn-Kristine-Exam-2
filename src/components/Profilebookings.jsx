import { Card, Button } from "react-bootstrap";

export function Profilebookings({ venue, dateFrom, dateTo, id, deleteFunc }) {
  return (
    <>
      <Card border="primary">
        <Card.Header>{venue.name}</Card.Header>
        <Card.Body>
          <p>From: {new Date(dateFrom).toLocaleDateString()}</p>
          <p>To: {new Date(dateTo).toLocaleDateString()}</p>
          <div className="d-block mt-auto">
            <Button variant="danger" onClick={() => { deleteFunc(id)}}>
              Cancel venue
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
