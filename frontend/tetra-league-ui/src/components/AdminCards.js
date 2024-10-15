import React from 'react';
import Card from 'react-bootstrap/Card';

const AdminCards = () => {
  return (
    <div className="flex flex-wrap gap-28 p-6 col-3">
      <Card className="w-60 rounded-lg shadow-lg overflow-hidden bg-peach bg-opacity-80 p-12">
          <Card.Body>
            <Card.Title className="text-1xl font-bold text-black mb-6 font-press-start">ONGOING TOURNAMENTS</Card.Title>
            <Card.Text className="text-black text-6xl mb-2 font-press-start">
              2
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="w-60 rounded-lg shadow-lg overflow-hidden bg-yellow bg-opacity-80 p-12">
          <Card.Body>
            <Card.Title className="text-1xl font-bold text-black mb-6 font-press-start justify-center">TOTAL TOURNAMENTS</Card.Title>
            <Card.Text className="text-black text-6xl mb-2 font-press-start">
              5
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="w-60 rounded-lg shadow-lg overflow-hidden bg-skyblue bg-opacity-80 p-12">
          <Card.Body>
            <Card.Title className="text-1xl font-bold text-black mb-6 font-press-start">TOTAL PLAYERS</Card.Title>
            <Card.Text className="text-black text-6xl mb-2 font-press-start">
              37
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  );
};

export default AdminCards;
