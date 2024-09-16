import React from 'react';
import Card from 'react-bootstrap/Card'; // Import Bootstrap Card component for styling

const AdminCards = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 col-3">
      <Card className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-gray-700 bg-opacity-80 p-12">
          <Card.Body>
            <Card.Title className="text-2xl font-bold text-white mb-2 font-press-start">Card Title</Card.Title>
            <Card.Subtitle className="mb-4 text-sm text-gray-100 font-press-start">Card Subtitle</Card.Subtitle>
            <Card.Text className="text-gray-200 mb-4">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="flex flex-col gap-2">
              <Card.Link href="/manage-tournaments" className="text-yellow-500 hover:text-blue-500">
                Card Link
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
        <Card className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-gray-700 bg-opacity-80 p-12">
          <Card.Body>
            <Card.Title className="text-2xl font-bold text-white mb-2 font-press-start">Card Title</Card.Title>
            <Card.Subtitle className="mb-4 text-sm text-gray-100 font-press-start">Card Subtitle</Card.Subtitle>
            <Card.Text className="text-gray-200 mb-4">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="flex flex-col gap-2">
              <Card.Link href="/manage-tournaments" className="text-yellow-500 hover:text-blue-500">
                Card Link
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
        <Card className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-gray-700 bg-opacity-80 p-12">
          <Card.Body>
            <Card.Title className="text-2xl font-bold text-white mb-2 font-press-start">Card Title</Card.Title>
            <Card.Subtitle className="mb-4 text-sm text-gray-100 font-press-start">Card Subtitle</Card.Subtitle>
            <Card.Text className="text-gray-200 mb-4">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="flex flex-col gap-2">
              <Card.Link href="/manage-tournaments" className="text-yellow-500 hover:text-blue-500">
                Card Link
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
    </div>
  );
};

export default AdminCards;
