import React from 'react';
import Card from 'react-bootstrap/Card'; // Import Bootstrap Card component for styling

const AdminCards = () => {
  return (
    <div className="flex flex-wrap gap-20 p-4 col-3">
      <Card className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-gray-700 bg-opacity-80 p-12">
          <Card.Body>
            <Card.Title className="text-2xl font-bold text-white mb-6 font-press-start">ONGOING TOURNAMENTS</Card.Title>
            <Card.Text className="text-green-500 text-8xl mb-2 font-press-start">
              2
            </Card.Text>
            {/* <div className="flex flex-col gap-2">
              <Card.Link href="/manage-tournaments" className="text-lg text-yellow-500 hover:text-blue-500">
                View
              </Card.Link>
            </div> */}
          </Card.Body>
        </Card>
        <Card className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-gray-700 bg-opacity-80 p-12">
          <Card.Body>
            <Card.Title className="text-2xl font-bold text-white mb-6 font-press-start">TOTAL TOURNAMENTS</Card.Title>
            <Card.Text className="text-red-400 text-8xl mb-2 font-press-start">
              5
            </Card.Text>
            {/* <div className="flex flex-col gap-2">
              <Card.Link href="/manage-tournaments" className="text-lg text-yellow-500 hover:text-blue-500">
                View
              </Card.Link>
            </div> */}
          </Card.Body>
        </Card>
        <Card className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-gray-700 bg-opacity-80 p-12">
          <Card.Body>
            <Card.Title className="text-2xl font-bold text-white mb-6 font-press-start">TOTAL PLAYERS</Card.Title>
            <Card.Text className="text-blue-400 text-8xl mb-2 font-press-start">
              37
            </Card.Text>
            {/* <div className="flex flex-col gap-2">
              <Card.Link href="/manage-participants" className="text-lg text-yellow-500 hover:text-blue-500">
                View
              </Card.Link>
            </div> */}
          </Card.Body>
        </Card>
    </div>
  );
};

export default AdminCards;
