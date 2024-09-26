'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/get-services');
        console.log('response ',response)
        setServices(response.data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1>Services</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {services.length > 0 ? (
            services.map((service, index) => (
              <li key={index}>
                <strong className='text-[50px]'>ID:</strong> {index} <br />
                <strong>Service:</strong> {service.name} <br />
                <strong>Category:</strong> {service.category} <br />
                <strong>Type:</strong> {service.type} <br />
                <strong>Rate:</strong> {service.rate} <br />
                <strong>Min:</strong> {service.min} <br />
                <strong>Max:</strong> {service.max} <br />
                <hr />
              </li>
            ))
          ) : (
            <p>Loading services...</p>
          )}
        </ul>
      )}
    </div>
  );
}
